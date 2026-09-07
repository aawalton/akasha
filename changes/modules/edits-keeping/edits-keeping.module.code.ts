import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs"
import { dirname, join } from "node:path"
import { exclusively } from "@akasha/file-system/exclusive"
import { said as gitIn, told as gitTold } from "@akasha/git/git-running"
import { besideAt } from "@akasha/pages/page-file-name"
import { gathered } from "../change-answer/change-answer.module.code.ts"
import type { Answer, Edit } from "../change-answer/change-answer.module.types.ts"

const SLUG = "edits"

const HELD = "jsonl"

const KEPT = "refs/akasha/edits"

const HANDED = "refs/akasha/edits-handed"

const BYTES = new TextEncoder()

const NO_PAGE = "a path that is no page keeps no edits"

const NO_ROW = "reads as no edit"

export type Kept = { readonly rows: readonly Edit[] } | { readonly why: string }

export function editsAt(page: string): string | null {
  return besideAt(page, SLUG, HELD)
}

export function keptAt(page: string): string | null {
  const at = editsAt(page)
  return at === null ? null : `${KEPT}/${at}`
}

function edited(said: unknown): Edit | null {
  if (typeof said !== "object" || said === null) return null
  const { path, was, body, from, readersOweReading, writerOwesReading } = said as Record<
    string,
    unknown
  >
  if (typeof path !== "string") return null
  if (was !== null && typeof was !== "string") return null
  if (body !== null && typeof body !== "string") return null
  if (from !== undefined && typeof from !== "string") return null
  if (readersOweReading !== undefined && typeof readersOweReading !== "boolean") return null
  if (writerOwesReading !== undefined && typeof writerOwesReading !== "boolean") return null
  return {
    path,
    was,
    body,
    ...(from === undefined ? {} : { from }),
    ...(readersOweReading === undefined ? {} : { readersOweReading }),
    ...(writerOwesReading === undefined ? {} : { writerOwesReading }),
  }
}

function parsed(line: string): unknown {
  try {
    return JSON.parse(line)
  } catch {
    return undefined
  }
}

function rowsIn(text: string): Kept {
  const rows: Edit[] = []
  const lines = text.split("\n")
  for (let at = 0; at < lines.length; at += 1) {
    const line = lines[at]
    if (line === undefined || line === "") continue
    const one = edited(parsed(line))
    if (one === null) return { why: `line ${String(at + 1)} ${NO_ROW}` }
    rows.push(one)
  }
  return { rows }
}

function textOf(rows: readonly Edit[]): string {
  return rows.map((one) => `${JSON.stringify(one)}\n`).join("")
}

function staleAt(root: string, at: string): string | null {
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

function readAt(root: string, at: string): string | null {
  return readUnder(root, `${KEPT}/${at}`) ?? staleAt(root, at)
}

function putAt(root: string, at: string, text: string): undefined {
  putUnder(root, `${KEPT}/${at}`, text)
  rmSync(join(root, at), { force: true })
}

function heldAt(root: string, at: string): Kept {
  const held = readAt(root, at)
  return held === null ? { rows: [] } : rowsIn(held)
}

export function editsIn(root: string, page: string): Kept {
  const at = editsAt(page)
  return at === null ? { why: NO_PAGE } : heldAt(root, at)
}

type Rows = readonly Edit[] | null

function settled(root: string, at: string, next: Rows): Kept {
  if (next === null || next.length === 0) {
    dropUnder(root, `${KEPT}/${at}`)
    rmSync(join(root, at), { force: true })
    return { rows: [] }
  }
  putAt(root, at, textOf(next))
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
    const had = heldAt(root, at)
    if ("why" in had) return had
    const next = act(had.rows)
    return next instanceof Promise
      ? next.then((one) => settled(root, at, one))
      : settled(root, at, next)
  })
}

export function appendEdits(root: string, page: string, edits: readonly Edit[]): Kept {
  return keptEdits(root, page, (had) => [...had, ...edits])
}

export function foldedIn(rows: readonly Edit[]): Answer {
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
