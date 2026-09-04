import { existsSync, statSync } from "node:fs"
import { join, relative, resolve } from "node:path"
import { warrantedIn } from "@akasha/context-system/warranting"
import { bytesAt, textOf } from "../../asking/asking.module.code.ts"
import type { Answer, Given } from "../../calling/calling.module.code.ts"
import { bodyRead, differenceOf } from "../../differing/differing.module.code.ts"
import {
  blobIdOf,
  type Discard,
  discarded,
  partly,
  type Reading,
  reachOf,
  readingIn,
  recordRead,
} from "../../reading/reading.module.code.ts"
import type { Run } from "./long-body/long-body.module.code.ts"
import {
  countLines,
  linesOf,
  moreCall,
  numbered,
  overCost,
  runFrom,
  runLines,
  tooWide,
  widthOf,
} from "./long-body/long-body.module.code.ts"

export const ANSWER_CEILING = 28000

const FILE_PATH = "--file-path"

const FULL = "--full"

const SEAT = "--seat"

const LEADING = 8

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

export type Target = {
  readonly named: string
  readonly absolute: string
}

type Meant = {
  readonly paths: readonly string[]
  readonly full: boolean
  readonly refusal: string | null
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

export function restCall(calledAs: string, left: readonly Target[]): readonly string[] {
  if (left.length === 0) return []
  const one = left.length === 1
  const named = left.map((at) => `${FILE_PATH} ${at.named}`).join(" ")
  return [
    `${left.length} file${one ? "" : "s"} ${one ? "was" : "were"} left unread here: the rest of the set ` +
      `runs past the ${ANSWER_CEILING} bytes one answer holds, and a read takes no line range, so no ` +
      "file is broken off partway to fit. This call takes what is left:",
    `${calledAs} ${named}`,
  ]
}

function meaning(argv: readonly string[]): Meant {
  const refused = (said: string): Meant => ({ paths: [], full: false, refusal: said })
  const paths: string[] = []
  let full = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at] ?? ""
    if (one === FILE_PATH) {
      const value = argv[at + 1]
      if (value === undefined) return refused(`${FILE_PATH} names a file, and nothing followed it`)
      paths.push(value)
      at += 1
      continue
    }
    if (one === FULL) {
      full = true
      continue
    }
    if (one === SEAT) {
      return refused(
        `${SEAT} reads what a seat is bound to, and this read answers for the paths it is named and ` +
          "nothing else"
      )
    }
    return refused(`\`${one}\` is not an argument this takes — it takes \`${FILE_PATH} <path>\``)
  }
  if (paths.length === 0) return refused(`${FILE_PATH} names a file to read, and none was given`)
  return { paths, full, refusal: null }
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
        `${named} stands outside the repository — a path is read against the repository root, ` +
          "and this reads what stands inside it"
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

export function spreading(targets: readonly Target[], given: Given): readonly Target[] {
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

function leadingOf(bytes: Uint8Array): string {
  return [...bytes.subarray(0, LEADING)].map((one) => one.toString(16).padStart(2, "0")).join("")
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
      `${named} — ${bytes.length} bytes that are not UTF-8 text, beginning \`${leadingOf(bytes)}\`, ` +
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

export type Longing = {
  readonly calledAs: string
  readonly named: string
  readonly text: string
  readonly after: number
  readonly budget: number
}

export type Longed = {
  readonly lines: readonly string[]
  readonly run: Run | null
  readonly refusal: string | null
}

export function longAnswer(one: Longing): Longed {
  const lines = linesOf(one.text)
  const run = runFrom(lines, one.after, one.budget)
  if (run === null) {
    return { lines: [], run: null, refusal: tooWide(one.named, lines, one.after, one.budget) }
  }
  const said = [...runLines(one.named, run), ...moreCall(one.calledAs, one.named, run)]
  return { lines: said, run, refusal: null }
}

export function reachedTo(run: Run): number | null {
  return run.through === run.of ? null : run.through
}

export function readWith(argv: readonly string[], given: Given, thrown: Discard | null): Answer {
  if (thrown !== null) {
    return {
      report: [],
      refusals: [
        `this call's output goes to ${thrown}, so the body would reach nobody. What the record says ` +
          "is that the body reached you, so nothing is read here and nothing is recorded. Run it " +
          "again with the output reaching you",
      ],
      code: 1,
    }
  }
  const agentId = given.agentId
  if (agentId === null) return { report: [], refusals: [NO_AGENT], code: 1 }
  const meant = meaning(argv)
  if (meant.refusal !== null) return { report: [], refusals: [meant.refusal], code: 1 }
  const aimed = aiming(meant.paths, given)
  if (aimed.refusals.length > 0) return { report: [], refusals: aimed.refusals, code: 1 }
  const queue = spreading(aimed.targets, given)
  const report: string[] = []
  const refusals: string[] = []
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
    const seen = meant.full ? null : readingIn(given.root, agentId, at)
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
        costOf(restCall(given.calledAs, over)) + overCost(given.calledAs, named, countLines(text))
      const after = seen !== null && seen.oid === oid ? (reachOf(seen.readThrough) ?? 0) : 0
      const budget = Math.max(ANSWER_CEILING - spent - away, 0)
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
        mechanicalOid: null,
        readThrough: reachedTo(long.run),
      })
      break
    }
    if (taken > 0 && spent + cost + costOf(restCall(given.calledAs, rest)) > ANSWER_CEILING) {
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
        mechanicalOid: null,
      })
    }
  }
  report.push(...restCall(given.calledAs, left))
  return { report, refusals, code: mistaken ? 1 : failed ? 3 : 0 }
}

export function read(argv: readonly string[], given: Given): Answer {
  return readWith(argv, given, discarded())
}
