import { readFileSync, statSync } from "node:fs"
import { resolve } from "node:path"
import type { Corpus } from "../../write-system/corpus.module.code.ts"
import { difference } from "../../write-system/difference.module.code.ts"
import type { BodyStore, Record_ } from "../../write-system/reading.module.code.ts"
import { oidOf } from "../../write-system/reading.module.code.ts"
import { conditionalFor, warrantsFor } from "../../write-system/required-reading.module.code.ts"

export const CEILING = 28_000

const READ = "read:   "

const COND = "cond:   "

export type Where = {
  readonly root: string
  readonly corpus: Corpus
  readonly record: Record_
  readonly bodies: BodyStore
  readonly writer: string | null
  readonly discardedTo: string | null
  readonly calledAs: string
}

export type Answer = {
  readonly report: readonly string[]
  readonly refusals: readonly string[]
  readonly code: number
}

type Target = { readonly path: string; readonly named: string }

function costOf(lines: readonly string[]): number {
  let held = 0
  for (const one of lines) held += new TextEncoder().encode(one).length + 1
  return held
}

function numbered(body: string): string {
  const lines = body.split("\n")
  if (lines.at(-1) === "") lines.pop()
  return lines.map((one, at) => `${String(at + 1).padStart(6)}\t${one}`).join("\n")
}

function whenText(at: number): string {
  return new Date(at).toISOString().replace("T", " ").slice(0, 19)
}

function countLines(body: string): number {
  const parts = body.split("\n")
  return parts.at(-1) === "" ? parts.length - 1 : parts.length
}

function decodes(bytes: Buffer): string | null {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes)
  } catch {
    return null
  }
}

function snapshot(path: string): Buffer | null {
  for (let go = 0; go < 3; go++) {
    try {
      const before = statSync(path).mtimeMs
      const bytes = readFileSync(path)
      if (statSync(path).mtimeMs === before) return bytes
    } catch {
      return null
    }
  }
  return null
}

type Emission = {
  readonly headline: string
  readonly body: string | null
  readonly oid: string | null
  readonly kept?: string
}

function emit(one: Target, where: Where, full: boolean): Emission {
  const bytes = snapshot(one.path)
  if (bytes === null) {
    return {
      headline: `${one.named} — it moved while it was being read, so nothing was recorded of it`,
      body: null,
      oid: null,
    }
  }
  const text = decodes(bytes)
  if (text === null) {
    const lead = [...bytes.subarray(0, 8)].map((b) => b.toString(16).padStart(2, "0")).join("")
    return {
      headline:
        `${one.named} — ${bytes.length} bytes that are not UTF-8 text, beginning \`${lead}\`, ` +
        "so a body printed here would be U+FFFD wherever this file is not text rather than the " +
        "file itself, and it is recorded as read whole; nothing follows",
      body: null,
      oid: oidOf(bytes.toString("binary")),
    }
  }
  const oid = oidOf(text)
  const held = where.record.of(one.path)
  if (full || held === null) {
    const why = full
      ? "the whole file, as `--full` asks"
      : "nothing on record says you have read it"
    return {
      headline: `${one.named} — ${why}; ${countLines(text)} lines`,
      body: numbered(text),
      oid,
      kept: text,
    }
  }
  if (held.oid === oid) {
    return {
      headline:
        `${one.named} — unchanged since you read it at ${whenText(held.seenAt)}, and you have ` +
        `read all ${countLines(text)} lines; nothing follows`,
      body: null,
      oid,
      kept: text,
    }
  }
  const before = where.bodies.of(held.oid)
  if (before === null) {
    return {
      headline: `${one.named} — changed since you read it at ${whenText(held.seenAt)}, and the body you read was not kept, so the whole file follows; ${countLines(text)} lines`,
      body: numbered(text),
      oid,
      kept: text,
    }
  }
  const moved = difference(before, text)
  const whole = numbered(text)
  if (moved.length === 0 || costOf(moved) >= costOf([whole])) {
    return {
      headline: `${one.named} — changed since you read it at ${whenText(held.seenAt)}, and what moved is no smaller than the file it moved in; the whole file follows`,
      body: whole,
      oid,
      kept: text,
    }
  }
  return {
    headline: `${one.named} — changed since you read it at ${whenText(held.seenAt)}; the difference from what you last read follows`,
    body: moved.join("\n"),
    oid,
    kept: text,
  }
}

function restCall(left: readonly Target[], full: boolean, calledAs: string): readonly string[] {
  const flags = full ? " --full" : ""
  return [
    `${READ}${left.length} file(s) were left unread here: the rest of the set runs past ${CEILING} ` +
      "characters, which is the ceiling this prints to, and a file broken off partway is a body " +
      "the record would say reached you whole. This call takes what is left:",
    `${calledAs}${flags}${left.map((one) => ` --file-path ${one.named}`).join("")}`,
  ]
}

export function read(argv: readonly string[], where: Where): Answer {
  if (where.discardedTo !== null) {
    return {
      report: [],
      refusals: [
        `nothing was read — this is printing to ${where.discardedTo}, so no body would reach you ` +
          "and a record would have said one had. Run it again with the output reaching you.",
      ],
      code: 1,
    }
  }

  const asked: string[] = []
  let full = false
  for (let at = 0; at < argv.length; at++) {
    const one = argv[at]
    if (one === "--full") {
      full = true
    } else if (one === "--file-path" || one === "--slug") {
      const value = argv[at + 1]
      if (value === undefined) return { report: [], refusals: [`${one} needs a value`], code: 1 }
      asked.push(one === "--slug" ? `slug:${value}` : value)
      at += 1
    } else {
      return { report: [], refusals: [`\`${one}\` is not an argument this takes`], code: 1 }
    }
  }
  if (asked.length === 0) {
    return {
      report: [],
      refusals: ["--file-path names a file to read, and none was given"],
      code: 1,
    }
  }

  const refusals: string[] = []
  const targets: Target[] = []
  const seen = new Set<string>()
  for (const one of asked) {
    let path: string
    if (one.startsWith("slug:")) {
      const named = one.slice(5)
      const what = where.corpus.resolve(named, null)
      if (what.kind === "none") {
        refusals.push(`no page carries the slug \`${named}\``)
        continue
      }
      if (what.kind === "many") {
        const among = what.among.map(
          (each) => `  --file-path ${each.path.slice(where.root.length + 1)}`
        )
        refusals.push(
          `\`${named}\` is carried by ${what.among.length} pages, and a slug is unique among the ` +
            `pages of its page type, so this names more than one:\n${among.join("\n")}`
        )
        continue
      }
      path = what.at.path
    } else {
      path = resolve(where.root, one)
    }
    if (!path.startsWith(`${where.root}/`)) {
      refusals.push(`${one} is outside the akasha folder, which is all this reads`)
      continue
    }
    if (seen.has(path)) {
      refusals.push(`${one} is named more than once`)
      continue
    }
    seen.add(path)
    targets.push({ path, named: path.slice(where.root.length + 1) })
  }
  if (targets.length === 0) return { report: [], refusals, code: 1 }

  const owed = new Set<string>()
  for (const one of targets) {
    if (where.corpus.at(one.path) === null) continue
    for (const named of warrantsFor(one.path, where.corpus)) owed.add(named)
  }
  for (const one of targets) owed.delete(one.path)

  const required: Target[] = []
  for (const path of [...owed].sort()) {
    required.push({ path, named: path.slice(where.root.length + 1) })
  }

  const conditional = conditionalFor(
    [...targets, ...required].map((one) => one.path),
    where.corpus
  ).filter((one) => !owed.has(one) && !targets.some((each) => each.path === one))

  const kept: string[] = []
  if (conditional.length > 0) {
    kept.push(
      `${READ}${conditional.length} document(s) below are conditional reading: what stands above ` +
        "names them, and each is required once you judge it bears on what you are doing. Its " +
        "definition is here and its body is not — read the one you need by its path and you have it whole."
    )
    for (const one of conditional) {
      const at = where.corpus.at(one)
      if (at === null) continue
      kept.push(`${COND}${at.slug} — ${one.slice(where.root.length + 1)}`)
      kept.push(`- **${at.slug}** — ${where.corpus.definitionOf(one)}`)
    }
  }

  const report: string[] = []
  if (where.writer === null) {
    report.push(
      `${READ}nothing identifies who is reading, so no read here can be attributed to you and the ` +
        "change you make next is refused for it"
    )
  }

  const queue = [...targets, ...required]
  let spent = costOf(report)
  let taken = 0
  let opened = false
  for (let order = 0; order < queue.length; order++) {
    const one = queue[order]
    if (one === undefined) continue
    const isRequired = order >= targets.length
    const emission = emit(one, where, full && !isRequired)
    const lines: string[] = []
    if (isRequired && !opened) {
      lines.push(
        `${READ}${required.length} file(s) below were not asked for: they are required for what ` +
          "was, or specify its shape, and are the set a write is refused for not having read"
      )
    }
    lines.push(`${READ}${emission.headline}`)
    if (emission.body !== null) lines.push(emission.body)
    const cost = costOf(lines)

    if (cost > CEILING) {
      refusals.push(
        `${one.named} — its ${cost} characters are past the ${CEILING} one answer holds, so the ` +
          "body would reach nobody and nothing is recorded of it. A read takes no line range, so " +
          "no call returns it: an authored file is split before it is changed"
      )
      continue
    }
    const left = queue.slice(order)
    if (
      taken > 0 &&
      spent + cost + costOf(kept) + costOf(restCall(left, full, where.calledAs)) > CEILING
    ) {
      report.push(...restCall(left, full, where.calledAs))
      where.record.flush()
      return { report, refusals, code: refusals.length === 0 ? 0 : 1 }
    }
    report.push(...lines)
    spent += cost
    taken += 1
    if (isRequired) opened = true
    if (emission.oid !== null) {
      where.record.keep(one.path, emission.oid, Date.now())
      if (emission.kept !== undefined) where.bodies.keep(emission.oid, emission.kept)
    }
  }

  report.push(...kept)
  where.record.flush()
  return { report, refusals, code: refusals.length === 0 ? 0 : 1 }
}
