import { spawn } from "node:child_process"
import { basename, join } from "node:path"
import { writeMessage } from "akasha/agent/message/modules/sending/agent-message-sending.module.code.ts"
import { SEAT_MODE_HEADLESS } from "akasha/agent/seat/launching/modules/seat-modes/seat-modes.module.code.ts"
import { startSeat } from "akasha/agent/seat/launching/modules/seat-start/seat-start.module.code.ts"
import { akashaSeatPathForCaller } from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { Reviewer } from "akasha/command/pages/story/turn/advance/modules/turn-prompting/turn-prompting.module.code.ts"
import {
  listedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  foldedFor,
  type Naming,
  pagesAtFor,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  putting,
  taking,
} from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import { ACTION_BAR_PLAYER } from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"
import { storyReviewerInstructions } from "akasha/story/reviewer/properties/story-reviewer-instructions.file-property.ts"
import { storyReviewer } from "akasha/story/reviewer/story-reviewer.page-type.ts"
import { styleRule } from "akasha/story/style/style-rule/style-rule.page-type.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import {
  bareOf,
  TURN_SENDER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"

const CLI = "command/modules/cli/cli.module.code.ts"

const STOPPING = ["seat", "supervisor", "stop", "--force"] as const

const UNNAMED: readonly string[] = ["AGENT_ID", "CLAUDE_CODE_SESSION_ID"]

const ANNOUNCE = "announce" as const

const ROLE = "role"

const ASSIGNMENT = "assignmentSlug"

const MASTER = "coordinatorAgent"

const TITLE = "title"

const NAME = "name"

const SLUG = "slug"

const INSTRUCTIONS_HELD = "md"

const SEAT_TAIL = ".seat.ts"

export type Turn = { readonly at: string; readonly slug: string; readonly value: Value }

export type Seated = {
  readonly name: string
  readonly role: string | null
  readonly game: string | null
}

export type Story = { readonly title: string; readonly master: string | null }

export type Starting = {
  readonly persona: string
  readonly role: string
  readonly game: string
  readonly flex: string | null
  readonly prompt: string
}

export type Reach = {
  readonly turnAt: (root: string, slug: string) => Turn | null
  readonly reviewersIn: (root: string) => readonly Reviewer[]
  readonly seatOf: (root: string, agentId: string | null) => Seated | null
  readonly storyOf: (root: string, game: string) => Story | null
  readonly rulesAt: (root: string) => string
  readonly fold: (root: string, naming: Naming) => readonly Asking[] | { readonly refused: string }
  readonly start: (starting: Starting, done: string[]) => Promise<string>
  readonly stop: (root: string, seat: string) => undefined
  readonly notify: (to: string, body: string) => Promise<string | null>
}

function turnIndexed(root: string, slug: string): Turn | null {
  const listed = listedAt(root, storyTurnPlayed.slug, slug)[0]
  if (listed === undefined) return null
  const value = valueAt(listed.path, root)
  return value === null ? null : { at: listed.path, slug, value }
}

function reviewersIndexed(root: string): readonly Reviewer[] {
  const kept = storyReviewerInstructions.propertySlug
  return valuesOfType(root, storyReviewer.slug).flatMap((one) => {
    const slug = textAt(one.value, SLUG)
    if (slug === null) return []
    const ending = textAt(one.value, kept) ?? INSTRUCTIONS_HELD
    return [
      {
        slug,
        name: textAt(one.value, NAME) ?? slug,
        at: one.path,
        instructionsAt: besideAt(one.path, kept, ending) ?? one.path,
      },
    ]
  })
}

function seatIndexed(root: string, agentId: string | null): Seated | null {
  if (agentId === null || agentId === "") return null
  const at = akashaSeatPathForCaller(agentId)
  if (at === null) return null
  const value = valueAt(at, root)
  const file = basename(at)
  const role = value === null ? null : textAt(value, ROLE)
  const game = value === null ? null : textAt(value, ASSIGNMENT)
  return {
    name: file.endsWith(SEAT_TAIL) ? file.slice(0, -SEAT_TAIL.length) : file,
    role: role === null ? null : bareOf(role),
    game: game === null ? null : bareOf(game),
  }
}

function storyIndexed(root: string, game: string): Story | null {
  const listed = listedAt(root, storyPlayed.slug, game)[0]
  if (listed === undefined) return null
  const value = valueAt(listed.path, root) ?? {}
  return { title: textAt(value, TITLE) ?? game, master: textAt(value, MASTER) }
}

function foldedOver(
  root: string,
  naming: Naming
): readonly Asking[] | { readonly refused: string } {
  const folded = foldedFor(root, [naming])
  if ("refused" in folded) return { refused: folded.refused }
  return [...folded.puts.map(putting), ...folded.removes.map(taking)]
}

async function seatStarted(starting: Starting, done: string[]): Promise<string> {
  const started = await startSeat(
    {
      startMode: SEAT_MODE_HEADLESS,
      persona: starting.persona,
      role: starting.role,
      domain: starting.game,
      principal: ACTION_BAR_PLAYER,
      ...(starting.flex === null ? {} : { flex: starting.flex }),
      prompt: starting.prompt,
      parent: null,
    },
    done
  )
  return started.name
}

function stoppedApart(root: string, seat: string): undefined {
  const env = Object.fromEntries(
    Object.entries(process.env).filter(([key]) => !UNNAMED.includes(key))
  )
  const child = spawn(process.execPath, [join(root, CLI), ...STOPPING, seat], {
    cwd: root,
    detached: true,
    stdio: "ignore",
    env,
  })
  child.unref()
  return undefined
}

async function noticeSent(to: string, body: string): Promise<string | null> {
  const wrote = await writeMessage({
    to,
    from: TURN_SENDER,
    warrant: ANNOUNCE,
    body,
    startedOnDemand: true,
  })
  return wrote.kind === "refused" ? wrote.detail : null
}

export const REACHED: Reach = {
  turnAt: turnIndexed,
  reviewersIn: reviewersIndexed,
  seatOf: seatIndexed,
  storyOf: storyIndexed,
  rulesAt: (root) => pagesAtFor(root, styleRule.slug),
  fold: foldedOver,
  start: seatStarted,
  stop: stoppedApart,
  notify: noticeSent,
}
