import { spawn } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { basename, join } from "node:path"
import { writeMessage } from "akasha/agent/message/modules/sending/agent-message-sending.module.code.ts"
import { SEAT_MODE_HEADLESS } from "akasha/agent/seat/launching/modules/seat-modes/seat-modes.module.code.ts"
import { startSeat } from "akasha/agent/seat/launching/modules/seat-start/seat-start.module.code.ts"
import { akashaSeatPathForCaller } from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import { akashaSeatsStated } from "akasha/agent/seat/modules/akasha-read/seat-akasha-read.module.code.ts"
import {
  ALAN_PERSON,
  notify,
} from "akasha/alan/harness/notification-feed/modules/notifying/notifying.module.code.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { sweptAll } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  type Adding,
  addingAt,
} from "akasha/command/pages/story/modules/settle-asking/settle-asking.module.code.ts"
import {
  type Turn as Placed,
  settlingIndexed,
  turnsIndexed,
} from "akasha/command/pages/story/settle/story-settle.command.code.ts"
import {
  givenBack,
  heldForTurn,
  type Kept,
  keptForTurn,
  unkeptFromTurn,
} from "akasha/command/pages/story/turn/modules/turn-keeping/turn-keeping.module.code.ts"
import {
  type LoreGathered,
  loreGathered,
} from "akasha/command/pages/story/turn/modules/turn-lore-gathered/turn-lore-gathered.module.code.ts"
import {
  loreLine,
  type Recorder,
  type Reviewer,
} from "akasha/command/pages/story/turn/modules/turn-prompting/turn-prompting.module.code.ts"
import {
  type ReadyPushing,
  readyNotified,
  readyTold,
} from "akasha/command/pages/story/turn/modules/turn-ready-pushing/turn-ready-pushing.module.code.ts"
import { writtenIndexed } from "akasha/command/pages/story/turn/modules/turn-written/turn-written.module.code.ts"
import { exclusively } from "akasha/file/modules/exclusive/exclusive.module.code.ts"
import {
  listedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  foldedFor,
  type Naming,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  putting,
  taking,
} from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import { ACTION_BAR_PLAYER } from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"
import { changedLoreOfSeat } from "akasha/story/lore-disclosure/modules/lore-rereading/lore-rereading.module.code.ts"
import { storyRecorderInstructions } from "akasha/story/recorder/properties/story-recorder-instructions.file-property.ts"
import { storyRecorder } from "akasha/story/recorder/story-recorder.page-type.ts"
import { storyReviewerInstructions } from "akasha/story/reviewer/properties/story-reviewer-instructions.file-property.ts"
import { storyReviewer } from "akasha/story/reviewer/story-reviewer.page-type.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import {
  bareOf,
  type Noun,
  noticeOf,
  PLAYER,
  STEP_SENDER,
  TURN,
  type TurnStep,
  WRITER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { noticedOf } from "akasha/story/world/stories/played/turns/modules/turn-seats/turn-seats.module.code.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"
import { storyChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.ts"
import { storyWritten } from "akasha/story/world/stories/written/story-written.page-type.ts"

const CLI = "command/modules/cli/cli.module.code.ts"

const STOPPING = ["seat", "supervisor", "stop", "--force"] as const

const UNNAMED: readonly string[] = ["AGENT_ID", "CLAUDE_CODE_SESSION_ID"]

const ANNOUNCE = "announce" as const

const ALERT = "alert"

const ROLE = "role"

const ASSIGNMENT = "assignmentSlug"

const MASTER = "coordinatorAgent"

const TITLE = "title"

const NAME = "name"

const SLUG = "slug"

const INSTRUCTIONS_HELD = "md"

const SEAT_TAIL = ".seat.ts"

const ROLE_STATED = "role-slug"

const GAME_STATED = "domain-slug"

const HOLD_MS = 90_000

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
  readonly hold: <T>(root: string, turn: string, act: () => Promise<T>) => Promise<T>
  readonly turnAt: (root: string, slug: string) => Turn | null
  readonly chapterAt?: (root: string, slug: string) => Turn | null
  readonly reviewersIn: (root: string) => readonly Reviewer[]
  readonly recordersIn: (root: string) => readonly Recorder[]
  readonly keep: (root: string, agentId: string | null, turn: string) => Kept
  readonly kept: (root: string, turn: string) => Kept
  readonly unkeep: (root: string, turn: string, rows: readonly FileChange[]) => string | null
  readonly giveBack: (
    root: string,
    agentId: string | null,
    turn: string,
    rows: readonly FileChange[]
  ) => string | null
  readonly release: (root: string, turn: string) => boolean
  readonly seatOf: (root: string, agentId: string | null) => Seated | null
  readonly storyOf: (root: string, game: string) => Story | null
  readonly fold: (root: string, naming: Naming) => readonly Asking[] | { readonly refused: string }
  readonly textIn: (root: string, path: string) => string
  readonly start: (starting: Starting, done: string[]) => Promise<string>
  readonly stop: (root: string, seat: string) => undefined
  readonly notify: (to: string, body: string) => Promise<string | null>
  readonly alerted?: (title: string, body: string) => Promise<string | null>
  readonly loreGathered: (
    root: string,
    turn: Turn,
    values: Readonly<Record<string, unknown>>
  ) => LoreGathered
  readonly changedLore: (root: string, seat: string) => readonly string[]
  readonly writtenOn: (root: string, turn: Turn) => readonly string[]
  readonly readyPushed: ReadyPushing
}

type Paged = {
  readonly at: string
  readonly pageTypeSlug: string
  readonly slug: string
  readonly value: Value
}

export type Rewinding = Reach & {
  readonly turnsOf: (root: string, game: string) => readonly Placed[]
  readonly seatsIn: () => readonly Seated[]
  readonly present: (root: string, path: string) => boolean
  readonly addingOf: (root: string, check: string) => Promise<Adding | null>
  readonly pageAt: (root: string, page: string) => Paged | null
}

export type Told = { readonly report: string[]; readonly faults: string[] }

export async function noticesSent(
  reach: Reach,
  root: string,
  game: string,
  master: string | null,
  turn: string,
  status: TurnStep,
  after: Told,
  toRead: readonly string[] = [],
  noun: Noun = TURN,
  toMaster = ""
): Promise<undefined> {
  if (status === PLAYER) await readyTold(reach.readyPushed, root, game, turn, after.report, noun)
  if (master === null) {
    after.faults.push(
      `\`${game}\` names no game master seat, so no seat was told the ${noun} moved`
    )
    return undefined
  }
  const cast = status === WRITER && toRead.length > 0 ? `\n\n${loreLine(toRead, noun)}` : ""
  for (const to of noticedOf(master, game)) {
    const said = noticeOf(turn, status, reach.changedLore(root, to), noun)
    const more = to === master ? toMaster : ""
    const why = await reach.notify(to, `${said}${cast}${more}`)
    if (why === null) after.report.push(`told\t${to}`)
    else after.faults.push(`\`${to}\` was not told the ${noun} moved: ${why}`)
  }
  return undefined
}

function turnIndexed(root: string, slug: string, type: string = storyTurnPlayed.slug) {
  const listed = listedAt(root, type, slug)[0]
  if (listed === undefined) return null
  const value = valueAt(listed.path, root)
  return value === null ? null : { at: listed.path, slug, value }
}

function reviewersIndexed(root: string): readonly Reviewer[] {
  return staffIndexed(root, storyReviewer.slug, storyReviewerInstructions.propertySlug)
}

function recordersIndexed(root: string): readonly Recorder[] {
  return staffIndexed(root, storyRecorder.slug, storyRecorderInstructions.propertySlug)
}

function staffIndexed(root: string, type: string, kept: string): readonly Reviewer[] {
  return valuesOfType(root, type).flatMap((one) => {
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
  const listed = [storyPlayed.slug, storyWritten.slug].flatMap((type) =>
    listedAt(root, type, game)
  )[0]
  if (listed === undefined) return null
  const value = valueAt(listed.path, root) ?? {}
  return { title: textAt(value, TITLE) ?? game, master: textAt(value, MASTER) }
}

function heldAlready(at: string, content: string): boolean {
  return existsSync(at) && readFileSync(at, "utf8") === content
}

function foldedOver(
  root: string,
  naming: Naming
): readonly Asking[] | { readonly refused: string } {
  const folded = foldedFor(root, [naming])
  if ("refused" in folded) return { refused: folded.refused }
  const puts = folded.puts.filter((one) => !heldAlready(join(root, one.path), one.content))
  return [...puts.map(putting), ...folded.removes.map(taking)]
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
    from: STEP_SENDER,
    warrant: ANNOUNCE,
    body,
    startedOnDemand: true,
  })
  return wrote.kind === "refused" ? wrote.detail : null
}

async function alanAlerted(title: string, body: string): Promise<string | null> {
  try {
    await notify(ALAN_PERSON, { title, body, kind: ALERT, source: STEP_SENDER })
    return null
  } catch (thrown) {
    return thrown instanceof Error ? thrown.message : String(thrown)
  }
}

async function heldApart<T>(root: string, turn: string, act: () => Promise<T>): Promise<T> {
  return await exclusively(join(root, turn), act, HOLD_MS)
}

export const REACHED: Reach = {
  hold: heldApart,
  turnAt: (root, slug) => turnIndexed(root, slug),
  chapterAt: (root, slug) => turnIndexed(root, slug, storyChapterWritten.slug),
  reviewersIn: reviewersIndexed,
  recordersIn: recordersIndexed,
  keep: keptForTurn,
  kept: heldForTurn,
  unkeep: unkeptFromTurn,
  giveBack: givenBack,
  release: sweptAll,
  seatOf: seatIndexed,
  storyOf: storyIndexed,
  fold: foldedOver,
  textIn: (root, path) => readFileSync(join(root, path), "utf8"),
  start: seatStarted,
  stop: stoppedApart,
  notify: noticeSent,
  alerted: alanAlerted,
  loreGathered,
  changedLore: changedLoreOfSeat,
  writtenOn: writtenIndexed,
  readyPushed: readyNotified,
}

function seatsStated(): readonly Seated[] {
  return akashaSeatsStated().map((one) => {
    const role = textAt(one.values, ROLE_STATED)
    const game = textAt(one.values, GAME_STATED)
    return {
      name: one.name,
      role: role === null ? null : bareOf(role),
      game: game === null ? null : bareOf(game),
    }
  })
}

async function addingIndexed(root: string, check: string): Promise<Adding | null> {
  const at = settlingIndexed(root, check)
  return at === null ? null : await addingAt(join(root, at))
}

function pageIndexed(root: string, page: string): Paged | null {
  const address = addressIn(page)
  if (address.kind !== "qualified") return null
  const listed = listedAt(root, address.pageTypeSlug, address.slug)[0]
  const value = listed === undefined ? null : valueAt(listed.path, root)
  if (listed === undefined || value === null) return null
  return { at: listed.path, pageTypeSlug: address.pageTypeSlug, slug: address.slug, value }
}

export const REWOUND: Rewinding = {
  ...REACHED,
  turnsOf: turnsIndexed,
  seatsIn: seatsStated,
  present: (root, path) => existsSync(join(root, path)),
  addingOf: addingIndexed,
  pageAt: pageIndexed,
}
