import { readFileSync } from "node:fs"
import { join } from "node:path"
import { reviewer as reviewerRole } from "akasha/agent/role/pages/reviewer.role.ts"
import { storyRecorder as storyRecorderRole } from "akasha/agent/role/pages/story-recorder.role.ts"
import { worldBuilder as worldBuilderRole } from "akasha/agent/role/pages/world-builder.role.ts"
import { writer as writerRole } from "akasha/agent/role/pages/writer.role.ts"
import { role as rolePageType } from "akasha/agent/role/role.page-type.ts"
import {
  inOrder,
  type Paged,
  storyIndexed,
} from "akasha/command/pages/story/modules/turn-scenes/turn-scenes.module.code.ts"
import {
  type Checking,
  checklistSaid,
} from "akasha/command/pages/story/turn/modules/turn-checklist/turn-checklist.module.code.ts"
import {
  type Crossing,
  crossedIndexed,
  crossedSaid,
} from "akasha/command/pages/story/turn/modules/turn-crossed/turn-crossed.module.code.ts"
import { describedIndexed } from "akasha/command/pages/story/turn/modules/turn-described/turn-described.module.code.ts"
import {
  heldOf,
  repairsAfter,
} from "akasha/command/pages/story/turn/modules/turn-holding/turn-holding.module.code.ts"
import { loreLine } from "akasha/command/pages/story/turn/modules/turn-prompting/turn-prompting.module.code.ts"
import {
  REACHED,
  type Reach,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { NO_BEATS } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"
import { flowsOn } from "akasha/story/world/stories/played/turns/modules/turn-beating/turn-beating.module.code.ts"
import {
  BEATS,
  GAME_MASTER,
  type Held,
  intentLine,
  MECHANICS,
  moved,
  noticeOf,
  PLAYER,
  stepIn,
  TURN,
  type TurnStep,
  WORLD_BUILDER,
  WRITER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { MEMORY_OWED } from "akasha/story/world/stories/played/turns/modules/turn-remembering/turn-remembering.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

const STATUS = "stepStatus"

const PARTED = "/"

const TEXT = "utf8"

const ROLES: readonly string[] = [
  worldBuilderRole.slug,
  writerRole.slug,
  storyRecorderRole.slug,
  reviewerRole.slug,
]

const BEFORE_BEATS: readonly TurnStep[] = [WORLD_BUILDER, GAME_MASTER]

type Reaching = Pick<
  Reach,
  "storyOf" | "reviewersIn" | "recordersIn" | "loreGathered" | "writtenOn" | "changedLore"
>

export type Serving = {
  readonly reach: Reaching
  readonly turnsOf: (root: string, game: string) => readonly Paged[]
  readonly describedOf: (root: string, turn: { readonly at: string }) => readonly string[]
  readonly crossedOf: Crossing
  readonly rolePathOf: (root: string, role: string) => string | null
  readonly textOf: (root: string, path: string) => string
}

const SERVED: Serving = {
  reach: REACHED,
  turnsOf: (root, game) => storyIndexed(root, game, false),
  describedOf: describedIndexed,
  crossedOf: crossedIndexed,
  rolePathOf: (root, role) => listedAt(root, rolePageType.slug, role)[0]?.path ?? null,
  textOf: (root, path) => readFileSync(join(root, path), TEXT),
}

function openOf(turns: readonly Paged[]): Paged | null {
  const open = inOrder(turns).find((one) => {
    if (one.closed === true || one.at === undefined) return false
    const status = stepIn(one.value[STATUS])
    return status !== null && (status !== PLAYER || one.value[MEMORY_OWED] === true)
  })
  return open ?? null
}

function flowsAhead(held: Held): boolean {
  return BEFORE_BEATS.includes(held.status) && flowsOn(held)
}

function rolesOf(serving: Serving, root: string): Readonly<Record<string, string>> {
  return Object.fromEntries(
    ROLES.flatMap((one) => {
      const at = serving.rolePathOf(root, one)
      return at === null ? [] : [[one, at]]
    })
  )
}

export function checklistServed(
  root: string,
  game: string,
  calledAs: string,
  serving: Serving = SERVED
): string {
  const { reach } = serving
  const story = reach.storyOf(root, game)
  const title = story?.title ?? game
  const open = openOf(serving.turnsOf(root, game))
  if (open?.at === undefined) {
    return `Every turn of ${title} is at player with its memory in, so no item waits on this seat: end your turn, and the next turn's notice comes as a message.`
  }
  const turn = { at: open.at, slug: open.slug, value: open.value }
  const held = heldOf(turn, (path) => serving.textOf(root, path))
  if ("refused" in held) return held.refused
  const flow = open.beats ?? NO_BEATS
  if ("refused" in flow) return flow.refused
  const lore = reach.loreGathered(root, turn, {}).named
  const repairs = repairsAfter(turn.at, held, moved(held.status, {}))
  const recorders = reach.recordersIn(root)
  const master = story?.master ?? null
  const notice = (step: TurnStep): string => {
    const changed = master === null ? [] : reach.changedLore(root, master)
    const said = noticeOf(turn.at, step, changed, TURN, repairs)
    if (step === WRITER) return lore.length === 0 ? said : `${said}\n\n${loreLine(lore)}`
    if (step !== GAME_MASTER) return said
    return `${said}${crossedSaid(serving.crossedOf(root, game, turn))}${intentLine(story?.intent)}`
  }
  const checking: Checking = {
    prompting: {
      title,
      turnAt: turn.at,
      address: `${storyTurnPlayed.slug}${PARTED}${turn.slug}`,
      calledAs,
      lore,
      written: reach.writtenOn(root, turn),
      described: serving.describedOf(root, turn),
      repairs,
    },
    slug: turn.slug,
    status: held.status,
    memoryOwed: held.memoryOwed === true,
    flows: held.status === BEATS || held.memoryOwed === true || flowsAhead(held),
    flow,
    reviewedBy: held.reviewedBy,
    recordedBy: held.recordedBy,
    reviewers: reach.reviewersIn(root),
    recorders,
    mechanics: recorders.filter((one) => one.step === MECHANICS).map((one) => one.slug),
    roles: rolesOf(serving, root),
    notice,
  }
  return checklistSaid(checking)
}
