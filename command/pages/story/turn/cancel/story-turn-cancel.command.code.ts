import { gameMaster } from "akasha/agent/role/pages/game-master.role.ts"
import {
  type Asking,
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { playedTurn } from "akasha/command/argument/pages/played-turn.argument.ts"
import { takeBackMechanics } from "akasha/command/argument/pages/take-back-mechanics.argument.ts"
import {
  answeredWith,
  answering,
  DATA,
  INPUT,
  keeping,
  OPERATIONAL,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { storyTurnCancel as page } from "akasha/command/pages/story/turn/cancel/story-turn-cancel.command.ts"
import { heldOf } from "akasha/command/pages/story/turn/modules/turn-holding/turn-holding.module.code.ts"
import {
  REWOUND,
  type Rewinding,
  type Seated,
  type Told,
  type Turn,
} from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import {
  besideTurn,
  seatsStopped,
  undoneOf,
} from "akasha/command/pages/story/turn/rewind/story-turn-rewind.command.code.ts"
import {
  type Drafting,
  draftedBeside,
  draftedFor,
} from "akasha/command/pages/story/turn/take-back/story-turn-take-back.command.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  putting,
  taking,
} from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import {
  bareOf,
  latestOf,
  PLAYER,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { noticedOf } from "akasha/story/world/stories/played/turns/modules/turn-seats/turn-seats.module.code.ts"

const NAMED = [playedTurn, takeBackMechanics] as const

const MASTER_ROLE = gameMaster.slug

const CANCELLED = "cancelled"

const TYPE = "type"

const SLUG = "slug"

const VALUE = "value"

const POSITION = "position"

const TURN_KEY = "turn"

const HISTORY = "history"

const HISTORY_HELD = "jsonl"

const BREAK = "\n"

export type Cancelling = Rewinding &
  Drafting & {
    readonly valueAt: (root: string, path: string) => Value | null
  }

const CANCELS: Cancelling = {
  ...REWOUND,
  draft: draftedBeside,
  valueAt: (root, path) => valueAt(path, root),
}

type Taken = { readonly turn: string; readonly takesBack: boolean }

type Refusal = { readonly refused: readonly string[] }

function taken(argv: readonly string[], calledAs: string): Taken | Refusal {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused }
  const turn = read.taken.playedTurn.trim()
  if (turn === "") return { refused: [`\`${playedTurn.said}\` names no turn`] }
  return { turn, takesBack: read.taken.takeBackMechanics }
}

function cancelNoticeOf(turn: string): string {
  return `The turn \`${turn}\` is cancelled.`
}

type Line = { readonly text: string; readonly turn: number; readonly value: number }

function lineIn(text: string): Line | null {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    return null
  }
  if (!isRecord(parsed)) return null
  const turn = parseNumber(parsed[TURN_KEY])
  const value = parseNumber(parsed[VALUE])
  return turn === undefined || value === undefined ? null : { text, turn, value }
}

type Mechanic = {
  readonly at: string
  readonly value: Value
  readonly historyAt: string
  readonly history: string
}

type Restoring = {
  readonly naming: Naming
  readonly historyAt: string
  readonly kept: string
  readonly report: string
}

type Refused = { readonly refused: string }

export function restoredOf(mechanic: Mechanic, position: number): Restoring | Refused {
  const unrestored = (why: string): Refused => ({
    refused: `restoring \`${mechanic.at}\` is not well defined, since ${why}`,
  })
  const type = textAt(mechanic.value, TYPE)
  const slug = textAt(mechanic.value, SLUG)
  if (type === null || slug === null) return unrestored("it states no type and slug")
  if (typeof mechanic.value[VALUE] !== "number") {
    return unrestored(`it states no number at \`${VALUE}\``)
  }
  const historyAt = mechanic.historyAt
  const lines: Line[] = []
  for (const text of mechanic.history.split(BREAK)) {
    if (text.trim() === "") continue
    const line = lineIn(text)
    if (line === null) return unrestored(`\`${historyAt}\` holds a line that is no turn and value`)
    lines.push(line)
  }
  const first = lines.findIndex((one) => one.turn === position)
  if (first < 0) return unrestored(`\`${historyAt}\` has no line for turn ${position}`)
  const later = lines.slice(first).find((one) => one.turn !== position)
  if (later !== undefined) {
    return unrestored(
      `\`${historyAt}\` has a line for turn ${later.turn} after the lines for turn ${position}`
    )
  }
  const before = lines[first - 1]
  if (before === undefined) {
    return unrestored(
      `\`${historyAt}\` has no line before turn ${position}'s, so what the value was is not known`
    )
  }
  return {
    naming: {
      pageTypeSlug: bareOf(type),
      slug,
      path: mechanic.at,
      values: { [VALUE]: before.value },
      merge: true,
    },
    historyAt,
    kept: `${lines
      .slice(0, first)
      .map((one) => one.text)
      .join(BREAK)}${BREAK}`,
    report: `restored\t${mechanic.at}\t${VALUE}\t${before.value}`,
  }
}

type Rewritten = { readonly at: string; readonly kept: string }

type Mechanics = {
  readonly namings: readonly Naming[]
  readonly rewritten: readonly Rewritten[]
  readonly report: readonly string[]
}

function restoringOf(
  reach: Cancelling,
  root: string,
  turn: Turn,
  written: readonly string[]
): readonly Restoring[] | Refused {
  const position = parseNumber(turn.value[POSITION])
  if (position === undefined) return { refused: `\`${turn.at}\` states no position` }
  const restoring: Restoring[] = []
  for (const at of written) {
    const value = reach.valueAt(root, at)
    if (value === null) {
      return {
        refused: `\`${at}\`, whose history has a line for \`${turn.slug}\`, is no page here`,
      }
    }
    const historyAt = besideAt(at, HISTORY, textAt(value, HISTORY) ?? HISTORY_HELD)
    if (historyAt === null)
      return { refused: `\`${at}\` is no page file, so no history sits beside it` }
    const history = reach.textIn(root, historyAt)
    const restored = restoredOf({ at, value, historyAt, history }, position)
    if ("refused" in restored) return restored
    restoring.push(restored)
  }
  return restoring
}

async function mechanicsOf(
  reach: Cancelling,
  root: string,
  turn: Turn,
  gone: readonly string[],
  takesBack: boolean
): Promise<Mechanics | Refused> {
  const written = reach.writtenOn(root, turn)
  const undone = await undoneOf(reach, root, turn, gone)
  if ("refused" in undone) return undone
  const added = undone.namings.map((one) => one.path)
  if (written.length === 0 && added.length === 0) return { namings: [], rewritten: [], report: [] }
  if (!takesBack) {
    const named = [...new Set([...written, ...added])].map((one) => `\`${one}\``).join(", ")
    return {
      refused: `mechanics were already written for \`${turn.slug}\` on ${named}, so it is cancelled only with \`${takeBackMechanics.said}\`, which takes them back`,
    }
  }
  const both = written.find((one) => added.includes(one))
  if (both !== undefined) {
    return {
      refused: `restoring \`${both}\` is not well defined, since both its history and the turn's outcomes changed it`,
    }
  }
  const restoring = restoringOf(reach, root, turn, written)
  if ("refused" in restoring) return restoring
  return {
    namings: [...restoring.map((one) => one.naming), ...undone.namings],
    rewritten: restoring.map((one) => ({ at: one.historyAt, kept: one.kept })),
    report: [...restoring.map((one) => one.report), ...undone.report],
  }
}

function callerRefused(seat: Seated | null, game: string): string | null {
  if (seat === null) return null
  if (seat.role === MASTER_ROLE && seat.game === game) return null
  const from =
    seat.role === null
      ? `the seat \`${seat.name}\`, which holds no role`
      : `a ${seat.role} seat${seat.game === null ? "" : ` of \`${seat.game}\``}`
  return `a turn of \`${game}\` is cancelled by its ${MASTER_ROLE} or by a caller in no seat, and this cancel comes from ${from}`
}

function latestRefused(reach: Cancelling, root: string, slug: string, game: string): string | null {
  const latest = latestOf(reach.turnsOf(root, game))
  if (latest?.slug === slug) return null
  const instead = latest === null ? "" : `, and \`${latest.slug}\` is`
  return `\`${slug}\` is not the latest turn of \`${game}\`${instead}, so the turns after it would follow a turn never sent`
}

function askingOf(
  reach: Cancelling,
  root: string,
  turn: Turn,
  mechanics: Mechanics
): readonly Asking[] | Refused {
  const asking: Asking[] = []
  for (const one of mechanics.namings) {
    const folded = reach.fold(root, one)
    if ("refused" in folded) return folded
    asking.push(...folded)
  }
  for (const one of mechanics.rewritten) {
    asking.push(taking(one.at), putting({ path: one.at, content: one.kept }))
  }
  asking.push(taking(turn.at))
  return asking
}

async function noticesOf(
  reach: Cancelling,
  root: string,
  game: string,
  turn: string,
  after: Told
): Promise<undefined> {
  const master = reach.storyOf(root, game)?.master ?? null
  if (master === null) {
    after.faults.push(
      `\`${game}\` names no game master seat, so no seat was told the turn was cancelled`
    )
    return undefined
  }
  for (const to of noticedOf(master, game)) {
    const why = await reach.notify(to, cancelNoticeOf(turn))
    if (why === null) after.report.push(`told\t${to}`)
    else after.faults.push(`\`${to}\` was not told the turn was cancelled: ${why}`)
  }
  return undefined
}

async function heldOn(
  done: string[],
  read: Taken,
  slug: string,
  given: Given,
  landing: Landing,
  reach: Cancelling
): Promise<Answer> {
  const turn = reach.turnAt(given.root, slug)
  if (turn === null) return refused(`\`${read.turn}\` names no played turn here`, DATA)
  const held = heldOf(turn)
  if ("refused" in held) return refused(held.refused, DATA)
  const caller = callerRefused(reach.seatOf(given.root, given.agentId), held.game)
  if (caller !== null) return refused(caller, DATA)
  if (held.status === PLAYER) {
    return refused(
      `\`${slug}\` is at ${PLAYER}, so it is published to the player already, and a published turn is not cancelled`,
      DATA
    )
  }
  const notLatest = latestRefused(reach, given.root, slug, held.game)
  if (notLatest !== null) return refused(notLatest, DATA)
  const gone = besideTurn(reach, given.root, turn)
  const mechanics = await mechanicsOf(reach, given.root, turn, gone, read.takesBack)
  if ("refused" in mechanics) return refused(mechanics.refused, DATA)
  const asking = askingOf(reach, given.root, turn, mechanics)
  if ("refused" in asking) return refused(asking.refused, DATA)
  const message = `${slug} is cancelled at ${held.status}`
  const by = { agentId: given.agentId, writer: given.writer, done }
  const landed = await landing(given.root, asking, message, by)
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  const after: Told = {
    report: [
      `${slug}\t${held.status}\t${CANCELLED}`,
      `removed\t${turn.at}`,
      ...gone.map((one) => `removed\t${one}`),
      ...mechanics.report,
    ],
    faults: [],
  }
  draftedFor(reach, given.root, held.game, turn, after)
  seatsStopped(reach, given.root, held.game, after)
  if (reach.release(given.root, turn.at)) after.report.push(`discarded\tthe recorders' kept edits`)
  await noticesOf(reach, given.root, held.game, turn.at, after)
  if (after.faults.length === 0) return told(after.report)
  return answeredWith(after.report, after.faults, OPERATIONAL)
}

async function cancelledOn(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing,
  reach: Cancelling
): Promise<Answer> {
  const read = taken(argv, given.calledAs)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const slug = bareOf(read.turn)
  const placed = reach.turnAt(given.root, slug)
  if (placed === null) return refused(`\`${read.turn}\` names no played turn here`, DATA)
  const holding = async () => await heldOn(done, read, slug, given, landing, reach)
  return await reach.hold(given.root, placed.at, holding)
}

export async function storyTurnCancel(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange,
  reach: Cancelling = CANCELS
): Promise<Answer> {
  return await answering(async (done) => await cancelledOn(done, argv, given, landing, reach))
}
