import { existsSync, statSync } from "node:fs"
import { join, relative, resolve } from "node:path"
import {
  blobIdOf,
  partly,
  type Reading,
  readingIn,
  recordRead,
} from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { akashaSeatPathForCaller } from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import { leadingBytes } from "akasha/code/body/modules/utf8-body/utf8-body.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { filePath } from "akasha/command/argument/pages/file-path.argument.ts"
import { full as fullArgument } from "akasha/command/argument/pages/full.argument.ts"
import {
  answeredWith,
  INPUT,
  OK,
  OPERATIONAL,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import { bytesAt, textOf } from "akasha/command/modules/body-reaching/body-reaching.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  ANSWER_CEILING,
  countLines,
  numbered,
  overCost,
  widthOf,
} from "akasha/command/modules/long-body/long-body.module.code.ts"
import {
  type Discard,
  discarded,
} from "akasha/command/modules/output-reaching/output-reaching.module.code.ts"
import { pagedFor } from "akasha/command/modules/page-waiting/page-waiting.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { owing } from "akasha/command/pages/read/modules/body-owing/body-owing.module.code.ts"
import {
  bodyRead,
  differenceOf,
} from "akasha/command/pages/read/modules/differing/differing.module.code.ts"
import {
  afterIn,
  budgetFor,
  longAnswer,
  reachedTo,
} from "akasha/command/pages/read/modules/long-answering/long-answering.module.code.ts"
import { barredOf } from "akasha/command/pages/read/modules/lore-barring/lore-barring.module.code.ts"
import { read as page } from "akasha/command/pages/read/read.command.ts"
import { warrantedIn } from "akasha/domain/context/modules/warranting/warranting.module.code.ts"

export const PAGE_CEILING = 60000

const A_SECOND = 1000

const SEAT = "--seat"

const MOVED = "it changed since you read it"

const NOT_IN_GIT = `${MOVED}, and the body you read is not in git`

const NOT_TEXT = `${MOVED}, and the body you read is not text`

const NO_DIFFERENCE = `${MOVED}, and git made no difference of it`

const NO_SHORTER = `${MOVED}, and what changed is no shorter than the file`

const TOO_MUCH = `${MOVED}, and what changed is past what one answer holds`

export const NO_AGENT = [
  "`AGENT_ID` names no agent, so there is no record to read this into, and this call is refused whole.",
  "This should not be possible: the supervisor sets `AGENT_ID` when it spawns an agent, every read",
  "is recorded under it, and a write is refused for a body no record shows you read, so a read",
  "recorded under nobody is work thrown away.",
  "Say that `AGENT_ID` is unset and stop here, rather than finding a way around it.",
].join("\n")

export function noPageFor(agentId: string, within: number): string {
  return [
    `The index named no page under \`${agentId}\` over the ${String(Math.round(within / A_SECOND))}`,
    "seconds this call waited for one, and your read record sits beside that page, so this read has",
    "nowhere to be recorded and the whole call is refused. Nothing was read and nothing was printed",
    "here: a body printed under no record is work thrown away, because a write is refused for a body",
    "no record shows you read.",
    "Change nothing and run this same call again. Nothing was recorded and nothing was lost, so a",
    "try costs only the wait, and the page may land while that try waits.",
    "Where this refuses again and again, say that you are refused to whoever dispatched you rather",
    "than working around the refusal.",
  ].join("\n")
}

export type SeatAt = (agentId: string) => string | null

export function noSeatFor(agentId: string): string {
  return [
    `A read naming no file reads your own seat page, and akasha holds no seat page for \`${agentId}\`,`,
    "so there is no seat reading here to hand you. You are identified: what is missing is the seat,",
    "not the agent.",
    "Name what to read with `--file-path <path>`, and say that your agent id reaches no seat page.",
  ].join("\n")
}

function ownSeatIn(agentId: string, seatAt: SeatAt): readonly string[] | null {
  const at = seatAt(agentId)
  return at === null ? null : [at]
}

export type Target = {
  readonly named: string
  readonly absolute: string
}

type Aimed = {
  readonly targets: readonly Target[]
  readonly refusals: readonly string[]
}

export function costOf(lines: readonly string[]): number {
  let total = 0
  for (const line of lines) total += widthOf(line)
  return total
}

export function restCall(
  calledAs: string,
  left: readonly Target[],
  bare: boolean
): readonly string[] {
  if (left.length === 0) return []
  const one = left.length === 1
  const named = left.map((at) => `${filePath.said} ${at.named}`).join(" ")
  return [
    `${left.length} file${one ? "" : "s"} ${one ? "was" : "were"} left unread here: the rest of the set ` +
      `runs past the ${ANSWER_CEILING} bytes one answer holds, and a read takes no line range, so no ` +
      "file is broken off partway to fit. This call takes what is left:",
    bare ? calledAs : `${calledAs} ${named}`,
  ]
}

function wrongIn(refusals: readonly string[]): readonly string[] {
  if (!refusals.some((one) => one.includes(`\`${SEAT}\``))) return []
  return [
    `${SEAT} reads what a seat is bound to, and this read answers for the paths it is named and ` +
      "nothing else",
  ]
}

function aiming(paths: readonly string[], given: Given): Aimed {
  const root = resolve(given.root)
  const targets: Target[] = []
  const refusals: string[] = []
  const already = new Set<string>()
  for (const named of paths) {
    const absolute = resolve(named.startsWith("/") ? named : join(root, named))
    if (absolute !== root && !absolute.startsWith(`${root}/`)) {
      refusals.push(
        `${named} sits outside the repository — a path is read against the repository root, ` +
          "and this reads what sits inside it"
      )
      continue
    }
    if (already.has(absolute)) {
      refusals.push(`${named} is named more than once`)
      continue
    }
    already.add(absolute)
    targets.push({ named, absolute })
  }
  return { targets, refusals }
}

function spreading(targets: readonly Target[], given: Given): readonly Target[] {
  const root = resolve(given.root)
  const said = new Map<string, string>()
  for (const one of targets) said.set(relative(root, one.absolute), one.named)
  const held: Target[] = []
  for (const at of warrantedIn(root, [...said.keys()])) {
    const absolute = join(root, at)
    if (absolute !== root && !absolute.startsWith(`${root}/`)) continue
    held.push({ named: said.get(at) ?? at, absolute })
  }
  return held
}

function alreadyOf(named: string, bytes: Uint8Array): string {
  const text = textOf(bytes)
  const held = text === null ? 0 : countLines(text)
  return `${named} — you read this body already, ${held} lines; nothing follows`
}

export function linesFor(named: string, bytes: Uint8Array): readonly string[] {
  const text = textOf(bytes)
  if (text === null) {
    return [
      `${named} — ${bytes.length} bytes that are not UTF-8 text, beginning \`${leadingBytes(bytes)}\`, ` +
        "so a body here would be U+FFFD wherever this file is not text rather than the file itself; " +
        "nothing follows",
    ]
  }
  const held = countLines(text)
  if (held === 0) return [`${named} — it is empty; nothing follows`]
  return [`${named} — the whole file follows, ${held} lines`, numbered(text)]
}

function wholeOf(named: string, text: string, why: string): readonly string[] {
  const held = countLines(text)
  if (held === 0) return [`${named} — ${why}, and it is empty now; nothing follows`]
  return [`${named} — ${why}, so the whole file follows, ${held} lines`, numbered(text)]
}

function movedOf(named: string, text: string, difference: string): readonly string[] {
  return [
    `${named} — ${MOVED}, ${countLines(text)} lines now, and what changed follows`,
    difference,
  ]
}

export function tellingWith(
  named: string,
  bytes: Uint8Array,
  oid: string,
  seen: Reading | null,
  was: Uint8Array | null
): readonly string[] {
  const held = seen !== null && partly(seen) && seen.oid !== oid ? null : seen
  if (held === null) return linesFor(named, bytes)
  if (held.oid === oid) return partly(held) ? linesFor(named, bytes) : [alreadyOf(named, bytes)]
  const text = textOf(bytes)
  if (text === null) return linesFor(named, bytes)
  if (was === null) return wholeOf(named, text, NOT_IN_GIT)
  if (textOf(was) === null) return wholeOf(named, text, NOT_TEXT)
  const difference = differenceOf(was, bytes)
  if (difference === null) return wholeOf(named, text, NO_DIFFERENCE)
  const moved = movedOf(named, text, difference)
  if (costOf(moved) >= costOf(linesFor(named, bytes))) return wholeOf(named, text, NO_SHORTER)
  if (costOf(moved) > ANSWER_CEILING) return wholeOf(named, text, TOO_MUCH)
  return moved
}

function tellingOf(
  root: string,
  named: string,
  bytes: Uint8Array,
  oid: string,
  seen: Reading | null
): readonly string[] {
  const asked = seen === null || seen.oid === oid ? null : seen.oid
  return tellingWith(named, bytes, oid, seen, asked === null ? null : bodyRead(root, asked))
}

export function readWith(
  argv: readonly string[],
  given: Given,
  thrown: Discard | null,
  seatAt: SeatAt = akashaSeatPathForCaller,
  within: number = PAGE_CEILING
): Answer {
  if (thrown !== null) {
    return mistaking([
      `this call's output goes to ${thrown}, so the body would reach nobody. What the record says ` +
        "is that the body reached you, so nothing is read here and nothing is recorded. Run it " +
        "again with the output reaching you",
    ])
  }
  const agentId = given.agentId
  if (agentId === null) return mistaking([NO_AGENT])
  if (!pagedFor(given.root, agentId, within)) {
    return refusedBy([noPageFor(agentId, within)], OPERATIONAL)
  }
  const meant = takenFor(argv, given.calledAs, page, [filePath, fullArgument])
  if ("refused" in meant) return mistaking([...wrongIn(meant.refused), ...meant.refused])
  const paths = meant.taken.filePath
  const whole = meant.taken.full
  const bare = paths.length === 0
  const asked = bare ? ownSeatIn(agentId, seatAt) : paths
  if (asked === null) return mistaking([noSeatFor(agentId)])
  const aimed = aiming(asked, given)
  if (aimed.refusals.length > 0) return mistaking(aimed.refusals)
  const aimedAt = bare ? spreading(aimed.targets, given) : aimed.targets
  const barred = barredOf(given.root, agentId, aimedAt, bare)
  if (!bare && barred.refusal !== null) return mistaking([barred.refusal])
  const queue = barred.kept
  const report: string[] = []
  const refusals: string[] = barred.refusal === null ? [] : [barred.refusal]
  let spent = 0
  let taken = 0
  let mistaken = false
  let failed = false
  let left: readonly Target[] = []
  for (const [order, target] of queue.entries()) {
    const { named, absolute } = target
    if (!existsSync(absolute) || !statSync(absolute).isFile()) {
      refusals.push(`${named} names no file — this reads one that is there`)
      mistaken = true
      continue
    }
    const held = bytesAt(absolute)
    if (!("bytes" in held)) {
      const why = "unreadable" in held ? ` — ${held.unreadable}` : ""
      refusals.push(`${named} is there and would not open, so nothing of it is here${why}`)
      failed = true
      continue
    }
    const bytes = held.bytes
    const at = relative(resolve(given.root), absolute)
    const oid = blobIdOf(bytes)
    const seen = whole ? null : readingIn(given.root, agentId, at)
    const lines = tellingOf(given.root, named, bytes, oid, seen)
    const cost = costOf(lines)
    const rest = queue.slice(order)
    const text = textOf(bytes)
    if (cost > ANSWER_CEILING && text !== null) {
      if (taken > 0) {
        left = rest
        break
      }
      const over = queue.slice(order + 1)
      const away =
        costOf(restCall(given.calledAs, over, bare)) +
        overCost(given.calledAs, named, countLines(text))
      const after = afterIn(seen, oid)
      const budget = budgetFor(ANSWER_CEILING, spent, away)
      const long = longAnswer({ calledAs: given.calledAs, named, text, after, budget })
      if (long.run === null) {
        refusals.push(long.refusal ?? "")
        failed = true
        continue
      }
      report.push(...long.lines)
      left = over
      recordRead(given.root, agentId, {
        path: at,
        oid,
        seenAt: Date.now(),
        carriedOid: null,
        readThrough: reachedTo(long.run),
      })
      break
    }
    if (taken > 0 && spent + cost + costOf(restCall(given.calledAs, rest, bare)) > ANSWER_CEILING) {
      left = rest
      break
    }
    report.push(...lines)
    spent += cost
    taken += 1
    if (text !== null) {
      recordRead(given.root, agentId, {
        path: at,
        oid,
        seenAt: Date.now(),
        carriedOid: null,
      })
    }
  }
  const owed = whole ? left : owing(given.root, agentId, left)
  report.push(...restCall(given.calledAs, owed, bare))
  return answeredWith(report, refusals, mistaken ? INPUT : failed ? OPERATIONAL : OK)
}

export function read(argv: readonly string[], given: Given): Answer {
  return readWith(argv, given, discarded())
}
