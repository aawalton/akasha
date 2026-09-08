import { Buffer } from "node:buffer"
import { appendFileSync, existsSync, mkdirSync, readFileSync, rmSync, statSync } from "node:fs"
import { dirname, join } from "node:path"
import { exclusively } from "@akasha/file-system/exclusive"
import { said as gitIn, told as gitTold } from "@akasha/git/git-running"
import { ENTRY_CEILING } from "@akasha/pages/entry-ceiling"
import { besideAt } from "@akasha/pages/page-file-name"
import { uncommittedPartAt, uncommittedPartsOf } from "@akasha/pages/page-file-parts"
import {
  type BodyOf,
  expanded,
  gathered,
  narrowed,
} from "../change-answer/change-answer.module.code.ts"
import type { Answer, Edit, Reading, Stated } from "../change-answer/change-answer.module.types.ts"

const SLUG = "edits"

const HELD = "jsonl"

const FIRST_PART = 1

const KEPT = "refs/akasha/edits"

const HANDED = "refs/akasha/edits-handed"

const BYTES = new TextEncoder()

const NO_PAGE = "a path that is no page keeps no edits"

const NO_ROW = "reads as no edit"

export type Kept = { readonly rows: readonly Stated[] } | { readonly why: string }

function partAt(page: string, part: number): string | null {
  return uncommittedPartAt(page, SLUG, HELD, part)
}

export function editsAt(page: string): string | null {
  return partAt(page, FIRST_PART)
}

export function keptAt(page: string): string | null {
  return editsAt(page)
}

function staleAt(page: string): string | null {
  return besideAt(page, SLUG, HELD)
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

function edited(said: unknown): Edit | null {
  if (typeof said !== "object" || said === null) return null
  const one = said as Record<string, unknown>
  const { path, was, body, from } = one
  if (typeof path !== "string") return null
  if (was !== null && typeof was !== "string") return null
  if (body !== null && typeof body !== "string") return null
  if (from !== undefined && typeof from !== "string") return null
  const owed = owing(one)
  if (owed === null) return null
  return { path, was, body, ...(from === undefined ? {} : { from }), ...owed }
}

function stated(said: unknown): Stated | null {
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
  return (path) => (existsSync(join(root, path)) ? (textAt(root, path) ?? "") : null)
}

function rowsIn(text: string): Kept {
  const said: Stated[] = []
  const lines = text.split("\n")
  for (let at = 0; at < lines.length; at += 1) {
    const line = lines[at]
    if (line === undefined || line === "") continue
    const read = parsed(line)
    const one = edited(read) ?? stated(read)
    if (one === null) return { why: `line ${String(at + 1)} ${NO_ROW}` }
    if (one.kind === undefined) said.push(...narrowed(one))
    else said.push(one)
  }
  return { rows: said }
}

function textOf(rows: readonly Edit[]): string {
  return rows.map((one) => `${JSON.stringify(one)}\n`).join("")
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

export function readUnder(root: string, ref: string): string | null {
  const held = gitTold(root, ["cat-file", "blob", ref])
  return held === null || held === "" ? null : held
}

export function putUnder(root: string, ref: string, text: string): undefined {
  const oid = gitIn(root, ["hash-object", "-w", "--stdin"], { stdin: BYTES.encode(text) }).trim()
  gitIn(root, ["update-ref", ref, oid])
}

export function dropUnder(root: string, ref: string): undefined {
  gitTold(root, ["update-ref", "-d", ref])
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

function staleIn(root: string, page: string): string | null {
  const old = staleAt(page)
  if (old === null) return null
  return readUnder(root, `${KEPT}/${old}`) ?? textAt(root, old)
}

function heldIn(root: string, page: string): Kept {
  const held = textOver(root, page) ?? staleIn(root, page)
  return held === null ? { rows: [] } : rowsIn(held)
}

export function editsIn(root: string, page: string): Kept {
  return editsAt(page) === null ? { why: NO_PAGE } : heldIn(root, page)
}

function sizeOf(root: string, at: string): number {
  try {
    return statSync(join(root, at)).size
  } catch {
    return 0
  }
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
  const size = sizeOf(root, found)
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

function wasIn(one: Edit): BodyOf {
  const came = one.from === undefined || one.from === one.path ? one.path : one.from
  return (path) => (path === came ? one.was : null)
}

function sameRow(one: Edit, two: Edit): boolean {
  return (
    one.path === two.path &&
    one.was === two.was &&
    one.body === two.body &&
    one.from === two.from &&
    one.readersOweReading === two.readersOweReading &&
    one.writerOwesReading === two.writerOwesReading
  )
}

function narrowIn(one: Edit): Stated | null {
  const narrow = narrowed(one)
  const only = narrow.length === 1 ? narrow[0] : undefined
  if (only === undefined || only.kind === "replace") return null
  const back = expanded(only, wasIn(one))
  if ("refused" in back) return null
  return sameRow(back.edit, one) ? only : null
}

function narrowly(one: Edit): string {
  return JSON.stringify(narrowIn(one) ?? one)
}

function wholly(one: Edit): string {
  return JSON.stringify(one)
}

function appending(
  root: string,
  page: string,
  rows: readonly Edit[],
  said: (one: Edit) => string
): undefined {
  poured(
    root,
    page,
    rows.map((one) => `${said(one)}\n`)
  )
}

function abandoned(root: string, page: string): undefined {
  const old = staleAt(page)
  if (old === null) return
  dropUnder(root, `${KEPT}/${old}`)
  rmSync(join(root, old), { force: true })
}

function swept(root: string, page: string): undefined {
  for (const at of partsAt(root, page)) rmSync(join(root, at), { force: true })
  abandoned(root, page)
}

export function linesIn(root: string, page: string): readonly string[] {
  const held = textOver(root, page) ?? staleIn(root, page)
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

function migrated(root: string, page: string): undefined {
  const at = editsAt(page)
  if (at === null || existsSync(join(root, at))) return
  const stale = staleIn(root, page)
  if (stale === null) return
  const read = rowsIn(stale)
  if ("why" in read) return
  appending(root, page, read.rows, narrowly)
  abandoned(root, page)
}

type Rows = readonly Edit[] | null

function followsOn(had: readonly Edit[], next: readonly Edit[]): boolean {
  if (next.length < had.length) return false
  for (let at = 0; at < had.length; at += 1) if (next[at] !== had[at]) return false
  return true
}

function settled(root: string, page: string, had: readonly Edit[], next: Rows): Kept {
  if (next === null || next.length === 0) {
    swept(root, page)
    return { rows: [] }
  }
  if (followsOn(had, next)) {
    appending(root, page, next.slice(had.length), narrowly)
    return { rows: next }
  }
  swept(root, page)
  appending(root, page, next, wholly)
  return { rows: next }
}

export function keptEdits(root: string, page: string, act: (had: readonly Edit[]) => Rows): Kept
export function keptEdits(
  root: string,
  page: string,
  act: (had: readonly Edit[]) => Promise<Rows>
): Promise<Kept>
export function keptEdits(
  root: string,
  page: string,
  act: (had: readonly Edit[]) => Rows | Promise<Rows>
): Kept | Promise<Kept> {
  const at = editsAt(page)
  if (at === null) return { why: NO_PAGE }
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  return exclusively(full, (): Kept | Promise<Kept> => {
    migrated(root, page)
    const had = heldIn(root, page)
    if ("why" in had) return had
    const next = act(had.rows)
    return next instanceof Promise
      ? next.then((one) => settled(root, page, had.rows, one))
      : settled(root, page, had.rows, next)
  })
}

export function appendEdits(root: string, page: string, edits: readonly Edit[]): Kept {
  const at = editsAt(page)
  if (at === null) return { why: NO_PAGE }
  if (edits.length === 0) return { rows: [] }
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  return exclusively(full, (): Kept => {
    migrated(root, page)
    appending(root, page, edits, narrowly)
    return { rows: edits }
  })
}

export function appendStated(root: string, page: string, rows: readonly Stated[]): string | null {
  const at = editsAt(page)
  if (at === null) return NO_PAGE
  if (rows.length === 0) return null
  const full = join(root, at)
  mkdirSync(dirname(full), { recursive: true })
  return exclusively(full, (): string | null => {
    migrated(root, page)
    poured(
      root,
      page,
      rows.map((one) => `${JSON.stringify(one)}\n`)
    )
    return null
  })
}

export function foldedIn(rows: readonly Stated[]): Answer {
  return gathered(rows.map((one) => ({ edits: [one], refused: null })))
}

export function handedRef(seat: string, under: string): string | null {
  const at = editsAt(seat)
  return at === null ? null : `${HANDED}/${at}/${under}`
}

export function handedUnder(root: string, seat: string): readonly string[] {
  const at = editsAt(seat)
  if (at === null) return []
  const held = `${HANDED}/${at}/`
  const said = gitTold(root, ["for-each-ref", "--format=%(refname)", `${held}*`])
  if (said === null) return []
  return said
    .split("\n")
    .filter((one) => one !== "")
    .map((one) => one.slice(held.length))
    .sort()
}

export function handedIn(root: string, seat: string, under: string): Kept {
  const ref = handedRef(seat, under)
  if (ref === null) return { why: NO_PAGE }
  const held = readUnder(root, ref)
  return held === null ? { rows: [] } : rowsIn(held)
}

export function handedOver(root: string, seat: string, from: string, under: string): Kept {
  const ref = handedRef(seat, under)
  if (ref === null) return { why: NO_PAGE }
  const held = editsIn(root, from)
  if ("why" in held) return held
  if (held.rows.length === 0) return { rows: [] }
  const had = handedIn(root, seat, under)
  if ("why" in had) return had
  putUnder(root, ref, textOf([...had.rows, ...held.rows]))
  keptEdits(root, from, () => null)
  return { rows: held.rows }
}

export function handedAway(root: string, seat: string, under: string): undefined {
  const ref = handedRef(seat, under)
  if (ref !== null) dropUnder(root, ref)
}
