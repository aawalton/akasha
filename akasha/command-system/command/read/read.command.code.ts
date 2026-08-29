import { existsSync, statSync } from "node:fs"
import { join, relative, resolve } from "node:path"
import { bytesAt, textOf } from "../../asking.module.code.ts"
import type { Answer, Given, Surface } from "../../calling.module.code.ts"
import { bodyRead, differenceOf } from "../../differing.module.code.ts"
import {
  blobIdOf,
  type Discard,
  discarded,
  type Reading,
  readingIn,
  recordRead,
} from "../../reading.module.code.ts"

export const ANSWER_CEILING = 28000

const FILE_PATH = "--file-path"

const FULL = "--full"

const SEAT = "--seat"

const INSIDE = "akasha"

const NUMBER_WIDTH = 6

const LEADING = 8

const MOVED = "it changed since you read it"

const NOT_IN_GIT = `${MOVED}, and the body you read is not in git`

const NOT_TEXT = `${MOVED}, and the body you read is not text`

const NO_DIFFERENCE = `${MOVED}, and git made no difference of it`

const NO_SHORTER = `${MOVED}, and what changed is no shorter than the file`

const TOO_MUCH = `${MOVED}, and what changed is past what one answer holds`

export const surface: Surface = {
  taking: [
    { said: `${FILE_PATH} <path>`, takes: "a file under `akasha/` to read" },
    { said: FULL, takes: "the whole body, whatever your record holds" },
  ],
  notes: [
    `${FILE_PATH} repeats, so several files come back from one call.`,
    "a body your record already holds comes back as one line rather than the file.",
    "a body that moved since your record holds it comes back as what changed, where that is shorter.",
    `a read takes no line range, and one answer holds ${ANSWER_CEILING} bytes.`,
  ],
}

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
  for (const line of lines) total += new TextEncoder().encode(line).length + 1
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
  const bound = join(resolve(given.root), INSIDE)
  const targets: Target[] = []
  const refusals: string[] = []
  const already = new Set<string>()
  for (const named of paths) {
    const absolute = resolve(named.startsWith("/") ? named : join(given.from, named))
    if (absolute !== bound && !absolute.startsWith(`${bound}/`)) {
      refusals.push(`${named} stands outside \`${INSIDE}/\`, and this reads what stands inside it`)
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

function leadingOf(bytes: Uint8Array): string {
  return [...bytes.subarray(0, LEADING)].map((one) => one.toString(16).padStart(2, "0")).join("")
}

function countLines(body: string): number {
  if (body === "") return 0
  const lines = body.split("\n")
  return lines[lines.length - 1] === "" ? lines.length - 1 : lines.length
}

function numbered(body: string): string {
  const lines = body.split("\n")
  if (lines[lines.length - 1] === "") lines.pop()
  return lines.map((line, at) => `${String(at + 1).padStart(NUMBER_WIDTH)}\t${line}`).join("\n")
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
  if (seen === null) return linesFor(named, bytes)
  if (seen.oid === oid) return [alreadyOf(named, bytes)]
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
  const meant = meaning(argv)
  if (meant.refusal !== null) return { report: [], refusals: [meant.refusal], code: 1 }
  const aimed = aiming(meant.paths, given)
  if (aimed.refusals.length > 0) return { report: [], refusals: aimed.refusals, code: 1 }
  const queue = aimed.targets
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
    const bytes = bytesAt(absolute)
    if (bytes === null) {
      refusals.push(`${named} is there and would not open, so nothing of it is here`)
      failed = true
      continue
    }
    const at = relative(resolve(given.root), absolute)
    const oid = blobIdOf(bytes)
    const seen =
      meant.full || given.agentId === null ? null : readingIn(given.root, given.agentId, at)
    const lines = tellingOf(given.root, named, bytes, oid, seen)
    const cost = costOf(lines)
    if (cost > ANSWER_CEILING) {
      refusals.push(
        `${named} — its ${cost} bytes are past the ${ANSWER_CEILING} one answer holds, so the body ` +
          "would reach nobody. A read takes no line range, so no call returns it: a file this long is " +
          "split before it is read"
      )
      failed = true
      continue
    }
    const rest = queue.slice(order)
    if (taken > 0 && spent + cost + costOf(restCall(given.calledAs, rest)) > ANSWER_CEILING) {
      left = rest
      break
    }
    report.push(...lines)
    spent += cost
    taken += 1
    if (given.agentId !== null && textOf(bytes) !== null) {
      recordRead(given.root, given.agentId, { path: at, oid, seenAt: Date.now() })
    }
  }
  if (taken > 0 && given.agentId === null) {
    report.push(
      "nothing here was recorded as read: `AGENT_ID` names no agent, and a reading belongs to one " +
        "agent or to none"
    )
  }
  report.push(...restCall(given.calledAs, left))
  return { report, refusals, code: mistaken ? 1 : failed ? 3 : 0 }
}

export function read(argv: readonly string[], given: Given): Answer {
  return readWith(argv, given, discarded())
}
