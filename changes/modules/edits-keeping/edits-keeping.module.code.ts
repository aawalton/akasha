import { Buffer } from "node:buffer"
import { appendFileSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs"
import { dirname, join } from "node:path"
import { decodeUtf8 } from "@akasha/code/utf8-body"
import { ENTRY_CEILING } from "@akasha/pages/entry-ceiling"
import { uncommittedPartAt, uncommittedPartsOf } from "@akasha/pages/page-file-parts"
import { sizeOnDisk } from "@akasha/utils/fs/file-size"
import { exclusively } from "akasha/file-system/exclusive/exclusive.module.code.ts"
import { type BodyOf, gathered, NOT_TEXT } from "../answer/change-answer.module.code.ts"
import type { Answer, FileChange, Held, Reading } from "../answer/change-answer.module.types.ts"

const SLUG = "edits"

const HELD = "jsonl"

const FIRST_PART = 1

const NO_PAGE = "a path that is no page keeps no edits"

const NO_ROW = "reads as no edit"

export type Kept = { readonly rows: readonly FileChange[] } | { readonly why: string }

function partAt(page: string, part: number): string | null {
  return uncommittedPartAt(page, SLUG, HELD, part)
}

export function editsAt(page: string): string | null {
  return partAt(page, FIRST_PART)
}

export function keptAt(page: string): string | null {
  return editsAt(page)
}

function owing(said: Record<string, unknown>): Reading | null {
  const { readersOweReading, writerOwesReading } = said
  if (readersOweReading !== undefined && typeof readersOweReading !== "boolean") return null
  if (writerOwesReading !== undefined && typeof writerOwesReading !== "boolean") return null
  return {
    ...(readersOweReading === undefined ? {} : { readersOweReading }),
    ...(writerOwesReading === undefined ? {} : { writerOwesReading }),
  }
}

function stated(said: unknown): FileChange | null {
  if (typeof said !== "object" || said === null) return null
  const one = said as Record<string, unknown>
  const owed = owing(one)
  if (owed === null) return null
  const { kind, path, content, contentFrom, contentTo, pathFrom, pathTo } = one
  const at = typeof path === "string" ? path : null
  if (kind === "add" && at !== null && typeof content === "string") {
    return { ...owed, kind: "add", path: at, content }
  }
  if (kind === "replace" && at !== null) {
    if (typeof contentFrom !== "string" || typeof contentTo !== "string") return null
    return { ...owed, kind: "replace", path: at, contentFrom, contentTo }
  }
  if (kind === "remove" && at !== null) return { ...owed, kind: "remove", path: at }
  if (kind === "move" && typeof pathFrom === "string" && typeof pathTo === "string") {
    return { ...owed, kind: "move", pathFrom, pathTo }
  }
  return null
}

function parsed(line: string): unknown {
  try {
    return JSON.parse(line)
  } catch {
    return undefined
  }
}

export function bodyIn(root: string): BodyOf {
  return (path) => (existsSync(join(root, path)) ? (bodyAt(root, path) ?? "") : null)
}

function bodyAt(root: string, at: string): Held | null {
  const full = join(root, at)
  if (!existsSync(full)) return null
  try {
    return decodeUtf8(readFileSync(full)) ?? NOT_TEXT
  } catch {
    return null
  }
}

function rowsIn(text: string): Kept {
  const said: FileChange[] = []
  const lines = text.split("\n")
  for (let at = 0; at < lines.length; at += 1) {
    const line = lines[at]
    if (line === undefined || line === "") continue
    const read = parsed(line)
    const one = stated(read)
    if (one === null) return { why: `line ${String(at + 1)} ${NO_ROW}` }
    said.push(one)
  }
  return { rows: said }
}

function textAt(root: string, at: string): string | null {
  const full = join(root, at)
  if (!existsSync(full)) return null
  try {
    const held = readFileSync(full, "utf8")
    return held === "" ? null : held
  } catch {
    return null
  }
}

function partsAt(root: string, page: string): readonly string[] {
  return uncommittedPartsOf(page, SLUG, HELD, (at) => existsSync(join(root, at)))
}

function textOver(root: string, page: string): string | null {
  const held: string[] = []
  for (const at of partsAt(root, page)) {
    const text = textAt(root, at)
    if (text !== null) held.push(text.endsWith("\n") ? text : `${text}\n`)
  }
  return held.length === 0 ? null : held.join("")
}

function heldIn(root: string, page: string): Kept {
  const held = textOver(root, page)
  return held === null ? { rows: [] } : rowsIn(held)
}

export function editsIn(root: string, page: string): Kept {
  return editsAt(page) === null ? { why: NO_PAGE } : heldIn(root, page)
}

function fillingAt(root: string, page: string, adding: number): string | null {
  let part = FIRST_PART
  let found = partAt(page, part)
  if (found === null) return null
  for (;;) {
    const next = partAt(page, part + 1)
    if (next === null || !existsSync(join(root, next))) break
    part += 1
    found = next
  }
  const size = sizeOnDisk(join(root, found))
  if (size === 0 || size + adding <= ENTRY_CEILING) return found
  return partAt(page, part + 1) ?? found
}

function appended(root: string, page: string, text: string): undefined {
  const at = fillingAt(root, page, Buffer.byteLength(text, "utf8"))
  if (at === null) return
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  appendFileSync(full, text)
}

function poured(root: string, page: string, lines: readonly string[]): undefined {
  let held: string[] = []
  let bytes = 0
  for (const line of lines) {
    const size = Buffer.byteLength(line, "utf8")
    if (bytes > 0 && bytes + size > ENTRY_CEILING) {
      appended(root, page, held.join(""))
      held = []
      bytes = 0
    }
    held.push(line)
    bytes += size
  }
  if (held.length > 0) appended(root, page, held.join(""))
}

function appending(root: string, page: string, rows: readonly FileChange[]): undefined {
  poured(
    root,
    page,
    rows.map((one) => `${JSON.stringify(one)}\n`)
  )
}

function swept(root: string, page: string): undefined {
  for (const at of partsAt(root, page)) rmSync(join(root, at), { force: true })
}

export function linesIn(root: string, page: string): readonly string[] {
  const held = textOver(root, page)
  return held === null ? [] : held.split("\n").filter((one) => one !== "")
}

export function droppedFirst(root: string, page: string, went: readonly string[]): undefined {
  const at = editsAt(page)
  if (at === null) return
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  exclusively(full, (): undefined => {
    const held = linesIn(root, page)
    if (held.length < went.length) return
    for (let one = 0; one < went.length; one += 1) if (held[one] !== went[one]) return
    const left = held.slice(went.length)
    swept(root, page)
    poured(
      root,
      page,
      left.map((one) => `${one}\n`)
    )
  })
}

type Rows = readonly FileChange[] | null

function followsOn(had: readonly FileChange[], next: readonly FileChange[]): boolean {
  if (next.length < had.length) return false
  for (let at = 0; at < had.length; at += 1) if (next[at] !== had[at]) return false
  return true
}

function settled(root: string, page: string, had: readonly FileChange[], next: Rows): Kept {
  if (next === null || next.length === 0) {
    swept(root, page)
    return { rows: [] }
  }
  if (followsOn(had, next)) {
    appending(root, page, next.slice(had.length))
    return { rows: next }
  }
  swept(root, page)
  appending(root, page, next)
  return { rows: next }
}

export function keptEdits(
  root: string,
  page: string,
  act: (had: readonly FileChange[]) => Rows
): Kept
export function keptEdits(
  root: string,
  page: string,
  act: (had: readonly FileChange[]) => Promise<Rows>
): Promise<Kept>
export function keptEdits(
  root: string,
  page: string,
  act: (had: readonly FileChange[]) => Rows | Promise<Rows>
): Kept | Promise<Kept> {
  const at = editsAt(page)
  if (at === null) return { why: NO_PAGE }
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  return exclusively(full, (): Kept | Promise<Kept> => {
    const had = heldIn(root, page)
    if ("why" in had) return had
    const next = act(had.rows)
    return next instanceof Promise
      ? next.then((one) => settled(root, page, had.rows, one))
      : settled(root, page, had.rows, next)
  })
}

export function appendEdits(root: string, page: string, edits: readonly FileChange[]): Kept {
  const at = editsAt(page)
  if (at === null) return { why: NO_PAGE }
  if (edits.length === 0) return { rows: [] }
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  return exclusively(full, (): Kept => {
    appending(root, page, edits)
    return { rows: edits }
  })
}

export function foldedIn(rows: readonly FileChange[]): Answer {
  return gathered(rows.map((one) => ({ edits: [one], refused: null })))
}

export function droppedAll(root: string, page: string): undefined {
  keptEdits(root, page, () => null)
}
