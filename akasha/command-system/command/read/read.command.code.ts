import { existsSync, readFileSync, statSync } from "node:fs"
import { join, resolve } from "node:path"
import type { Answer, Given, Surface } from "../../calling.module.code.ts"

export const ANSWER_CEILING = 28000

const FILE_PATH = "--file-path"

const FULL = "--full"

const SEAT = "--seat"

const INSIDE = "akasha"

const NUMBER_WIDTH = 6

const LEADING = 8

export const surface: Surface = {
  taking: [{ said: `${FILE_PATH} <path>`, takes: "a file under `akasha/` to read whole" }],
  notes: [
    `${FILE_PATH} repeats, so several files come back from one call.`,
    `a read takes no line range, and one answer holds ${ANSWER_CEILING} bytes.`,
  ],
}

export type Target = {
  readonly named: string
  readonly absolute: string
}

type Meant = {
  readonly paths: readonly string[]
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
  const refused = (said: string): Meant => ({ paths: [], refusal: said })
  const paths: string[] = []
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
      return refused(
        `${FULL} is what overrides a record of what you last read, and this read keeps no record, so ` +
          "every file it is named comes back whole already"
      )
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
  return { paths, refusal: null }
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

function textOf(bytes: Uint8Array): string | null {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes)
  } catch {
    return null
  }
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

function bodyAt(absolute: string): Uint8Array | null {
  try {
    return readFileSync(absolute)
  } catch {
    return null
  }
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

export function read(argv: readonly string[], given: Given): Answer {
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
    const bytes = bodyAt(absolute)
    if (bytes === null) {
      refusals.push(`${named} is there and would not open, so nothing of it is here`)
      failed = true
      continue
    }
    const lines = linesFor(named, bytes)
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
  }
  report.push(...restCall(given.calledAs, left))
  return { report, refusals, code: mistaken ? 1 : failed ? 3 : 0 }
}
