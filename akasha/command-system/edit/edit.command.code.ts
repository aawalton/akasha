import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { indexingAt } from "../../data-system/index/indexing.module.code.ts"
import type { Change, Held, Judging, Refusal } from "../../write-system/landing.module.code.ts"
import { authoring, land, refused } from "../../write-system/landing.module.code.ts"
import type { Given } from "../calling.module.code.ts"

export type Answer = {
  readonly report: readonly string[]
  readonly refusals: readonly string[]
  readonly code: number
}

const EDIT = "edit:   "

type Asked = { readonly path: string; readonly span: string; readonly now: string }

type Parsed = {
  readonly edits: readonly Asked[]
  readonly refusals: readonly string[]
}

function refusing(said: readonly string[]): Answer {
  return { report: [], refusals: said, code: 1 }
}

function nothingJudged(): Judging {
  return { named: [], over: () => [] }
}

function decodes(bytes: Buffer): string | null {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes)
  } catch {
    return null
  }
}

function textIn(at: string, from: string, what: string): string | Refusal {
  const path = resolve(from, at)
  if (!existsSync(path)) return { refused: `${at} does not exist, so there is no ${what} to read` }
  const text = decodes(readFileSync(path))
  if (text === null) return { refused: `${at} is not UTF-8 text, so it is no ${what} for a page` }
  return text
}

function under(path: string, given: Given): string | null {
  const full = resolve(given.from, path)
  return full === given.root || full.startsWith(`${given.root}/`) ? full : null
}

function whereFirstLine(body: string, span: string): string {
  const first = span.split("\n")[0] ?? ""
  if (first.trim() === "") return ""
  const lines = body.split("\n")
  const at: number[] = []
  for (let one = 0; one < lines.length; one++) if (lines[one]?.includes(first)) at.push(one + 1)
  if (at.length === 0) return ""
  return ` Its first line appears at line ${at.slice(0, 4).join(", ")}, so the rest of the span is what differs.`
}

export function replacing(body: string, span: string, now: string): string | Refusal {
  if (span === "") {
    return { refused: "an empty span names no place in a file, so there is nothing to replace" }
  }
  if (span === now) {
    return {
      refused: "the span and what would replace it are the same, so this edit changes nothing",
    }
  }
  const first = body.indexOf(span)
  if (first < 0) {
    return {
      refused:
        "that span is not in the file. A span is matched exactly, including whitespace and " +
        `indentation.${whereFirstLine(body, span)}`,
    }
  }
  let count = 0
  for (let at = body.indexOf(span); at >= 0; at = body.indexOf(span, at + 1)) count += 1
  if (count > 1) {
    return {
      refused:
        `that span is in the file ${count} times, and an edit names one place — give more of the ` +
        "lines around it until the span names only the one you mean",
    }
  }
  return body.slice(0, first) + now + body.slice(first + span.length)
}

function parse(argv: readonly string[]): Parsed {
  const edits: Asked[] = []
  const refusals: string[] = []
  let path: string | null = null
  let span: string | null = null
  let used = false
  for (let at = 0; at < argv.length; at++) {
    const one = argv[at]
    const value = argv[at + 1]
    if (one === "--span" || one === "--replacement") {
      refusals.push(
        `\`${one}\` is not an argument this takes, and there is no argument that carries a span. ` +
          "A shell substitutes a backticked span inside double quotes before this process exists, so " +
          "a span naming a slug that way would arrive missing exactly those words and match nothing. " +
          `Write it to a file and name it with \`${one}-file\`.`
      )
      at += value === undefined ? 0 : 1
      continue
    }
    if (one === "--file-path" || one === "--span-file" || one === "--replacement-file") {
      if (value === undefined) {
        refusals.push(`${one} needs a value`)
        continue
      }
      at += 1
      if (one === "--file-path") {
        if (span !== null) refusals.push(`${span} was given no --replacement-file`)
        else if (path !== null && !used) refusals.push(`${path} was given no --span-file`)
        path = value
        span = null
        used = false
        continue
      }
      if (path === null) {
        refusals.push(`${one} ${value} follows no --file-path`)
        continue
      }
      if (one === "--span-file") {
        span = value
        continue
      }
      if (span === null) {
        refusals.push(`--replacement-file ${value} follows no --span-file`)
        continue
      }
      edits.push({ path, span, now: value })
      span = null
      used = true
      continue
    }
    refusals.push(`\`${one}\` is not an argument this takes`)
  }
  if (span !== null) refusals.push(`${span} was given no --replacement-file`)
  else if (path !== null && !used) refusals.push(`${path} was given no --span-file`)
  return { edits, refusals }
}

export function edit(argv: readonly string[], given: Given): Answer {
  if (given.writer === null) {
    return refusing([
      "nothing identifies who is editing, so no change here could be attributed to anyone and none was made",
    ])
  }
  const asked = parse(argv)
  if (asked.edits.length === 0 && asked.refusals.length === 0) {
    return refusing(["--file-path names a file to edit, and none was given"])
  }
  const held: Held = {
    corpus: given.corpus,
    record: given.record,
    writer: given.writer,
    index: indexingAt(given.index),
    bodies: given.bodies,
    readAs: `${given.calledAs.replace(/ edit$/, "")} read`,
    judge: nothingJudged(),
    root: given.root,
  }
  const refusals: string[] = [...asked.refusals]
  const bodies = new Map<string, string>()
  const order: string[] = []
  for (const one of asked.edits) {
    const path = under(one.path, given)
    if (path === null) {
      refusals.push(`${one.path} is outside the akasha folder, which is all this edits`)
      continue
    }
    if (!existsSync(path)) {
      refusals.push(`${one.path} is not there, so there is no body to edit — write it instead`)
      continue
    }
    const span = textIn(one.span, given.from, "span")
    if (typeof span !== "string") {
      refusals.push(span.refused)
      continue
    }
    const now = textIn(one.now, given.from, "replacement")
    if (typeof now !== "string") {
      refusals.push(now.refused)
      continue
    }
    const was = bodies.get(path) ?? readFileSync(path, "utf8")
    if (!bodies.has(path)) order.push(path)
    const made = replacing(was, span, now)
    if (typeof made !== "string") {
      refusals.push(`${one.path} — ${made.refused}`)
      continue
    }
    bodies.set(path, made)
  }
  const changes: Change[] = []
  for (const path of order) {
    const body = bodies.get(path)
    if (body === undefined) continue
    const what = authoring(path, body, held)
    if (refused(what)) refusals.push(what.refused)
    else changes.push(what)
  }
  if (refusals.length > 0) {
    return refusing([
      ...refusals,
      `nothing was written — ${asked.edits.length} edit(s) were asked for and they land together or not at all`,
    ])
  }
  const done = land(changes, held)
  if (done.kind === "refused") {
    return refusing([
      ...done.by.map((one) => `${one.path} — ${one.reason}`),
      `nothing was written — ${done.by.length} check(s) refused this change`,
    ])
  }
  const report: string[] = []
  for (const one of changes) {
    const named = one.path.startsWith(`${given.from}/`)
      ? one.path.slice(given.from.length + 1)
      : one.path
    if (one.kind !== "remove") {
      report.push(`${EDIT}${named}  ${Buffer.byteLength(one.body)} bytes`)
    }
  }
  report.push(
    `${EDIT}${asked.edits.length} edit(s) over ${done.paths.length} file(s), landed together`
  )
  for (const one of done.noted) report.push(`${EDIT}the index did not file: ${one}`)
  report.push(
    done.consulted.length === 0
      ? `${EDIT}no checks were consulted — nothing here judged this change beyond the witness`
      : `${EDIT}${done.consulted.length} check(s) consulted: ${done.consulted.join(", ")}`
  )
  return { report, refusals: [], code: 0 }
}
