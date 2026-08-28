import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import type {
  Change,
  Held,
  Indexing,
  Judging,
  Landing,
  Refusal,
} from "../../write-system/landing.module.code.ts"
import {
  authoring,
  creating,
  land,
  refused,
  takingAway,
} from "../../write-system/landing.module.code.ts"
import type { Given } from "../calling.module.code.ts"

export type Answer = {
  readonly report: readonly string[]
  readonly refusals: readonly string[]
  readonly code: number
}

const WROTE = "write:  "

const TOOK = "took:   "

type Asked = { readonly path: string; readonly at: string }

type Parsed = {
  readonly writes: readonly Asked[]
  readonly removals: readonly string[]
  readonly refusals: readonly string[]
}

function nothingJudged(): Judging {
  return { named: [], over: () => [] }
}

function nothingKept(): Indexing {
  return { wrote: () => undefined, took: () => undefined, settle: () => undefined }
}

function refusing(said: readonly string[]): Answer {
  return { report: [], refusals: said, code: 1 }
}

function decodes(bytes: Buffer): string | null {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes)
  } catch {
    return null
  }
}

function parse(argv: readonly string[]): Parsed {
  const writes: Asked[] = []
  const removals: string[] = []
  const refusals: string[] = []
  let waiting: string | null = null
  for (let at = 0; at < argv.length; at++) {
    const one = argv[at]
    const value = argv[at + 1]
    if (one === "--content") {
      refusals.push(
        "`--content` is not an argument this takes, and there is no argument that carries a body. " +
          "A shell substitutes a backticked span inside double quotes before this process exists, so " +
          "a body naming a slug that way would land grammatical and missing exactly those words. " +
          "Write the body to a file and name it with `--content-file`."
      )
      at += value === undefined ? 0 : 1
      continue
    }
    if (one === "--file-path" || one === "--content-file" || one === "--remove") {
      if (value === undefined) {
        refusals.push(`${one} needs a value`)
        continue
      }
      at += 1
      if (one === "--file-path") {
        if (waiting !== null) refusals.push(`${waiting} was given no --content-file`)
        waiting = value
        continue
      }
      if (one === "--remove") {
        removals.push(value)
        continue
      }
      if (waiting === null) {
        refusals.push(`--content-file ${value} follows no --file-path`)
        continue
      }
      writes.push({ path: waiting, at: value })
      waiting = null
      continue
    }
    refusals.push(`\`${one}\` is not an argument this takes`)
  }
  if (waiting !== null) refusals.push(`${waiting} was given no --content-file`)
  return { writes, removals, refusals }
}

function bodyIn(at: string, from: string): string | Refusal {
  const path = resolve(from, at)
  if (!existsSync(path))
    return { refused: `${at} does not exist, so there is no body to carry from it` }
  const text = decodes(readFileSync(path))
  if (text === null) return { refused: `${at} is not UTF-8 text, so it is no body for a page` }
  return text
}

function under(path: string, given: Given): string | null {
  const full = resolve(given.from, path)
  return full === given.root || full.startsWith(`${given.root}/`) ? full : null
}

export function write(argv: readonly string[], given: Given): Answer {
  if (given.writer === null) {
    return refusing([
      "nothing identifies who is writing, so no change here could be attributed to anyone and none was made",
    ])
  }
  const asked = parse(argv)
  if (asked.writes.length === 0 && asked.removals.length === 0 && asked.refusals.length === 0) {
    return refusing(["--file-path names a file to write, and none was given"])
  }
  const held: Held = {
    corpus: given.corpus,
    record: given.record,
    writer: given.writer,
    index: nothingKept(),
    bodies: given.bodies,
    readAs: `${given.calledAs.replace(/ write$/, "")} read`,
    judge: nothingJudged(),
    root: given.root,
  }
  const refusals: string[] = [...asked.refusals]
  const changes: Change[] = []
  for (const one of asked.writes) {
    const path = under(one.path, given)
    if (path === null) {
      refusals.push(`${one.path} is outside the akasha folder, which is all this writes`)
      continue
    }
    const body = bodyIn(one.at, given.from)
    if (typeof body !== "string") {
      refusals.push(body.refused)
      continue
    }
    const what: Landing | Refusal = existsSync(path)
      ? authoring(path, body, held)
      : creating(path, body, held)
    if (refused(what)) refusals.push(what.refused)
    else changes.push(what)
  }
  for (const one of asked.removals) {
    const path = under(one, given)
    if (path === null) {
      refusals.push(`${one} is outside the akasha folder, which is all this writes`)
      continue
    }
    if (!existsSync(path)) {
      refusals.push(`${one} is not there, so there is nothing to take away`)
      continue
    }
    changes.push(takingAway(path, held))
  }
  if (refusals.length > 0) {
    return refusing([
      ...refusals,
      `nothing was written — ${changes.length + refusals.length} change(s) were asked for and they land together or not at all`,
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
    if (one.kind === "remove") report.push(`${TOOK}${named}`)
    else report.push(`${WROTE}${named}  ${Buffer.byteLength(one.body)} bytes`)
  }
  report.push(`${WROTE}${done.paths.length} change(s) landed together`)
  report.push(
    done.consulted.length === 0
      ? `${WROTE}no checks were consulted — nothing here judged this change beyond the witness`
      : `${WROTE}${done.consulted.length} check(s) consulted: ${done.consulted.join(", ")}`
  )
  return { report, refusals: [], code: 0 }
}
