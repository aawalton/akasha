import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { exclusively } from "@akasha/file-system/exclusive"
import { besideAt } from "@akasha/pages/page-file-name"
import { gathered } from "../change-answer/change-answer.module.code.ts"
import type { Answer, Edit } from "../change-answer/change-answer.module.types.ts"

const SLUG = "edits"

const HELD = "jsonl"

const WRITING = ".writing"

const NO_PAGE = "a path that is no page keeps no edits"

const NO_ROW = "reads as no edit"

export type Kept = { readonly rows: readonly Edit[] } | { readonly why: string }

export function editsAt(page: string): string | null {
  return besideAt(page, SLUG, HELD)
}

function edited(said: unknown): Edit | null {
  if (typeof said !== "object" || said === null) return null
  const { path, was, body, from } = said as Record<string, unknown>
  if (typeof path !== "string") return null
  if (was !== null && typeof was !== "string") return null
  if (body !== null && typeof body !== "string") return null
  if (from !== undefined && typeof from !== "string") return null
  return from === undefined ? { path, was, body } : { path, was, body, from }
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

function readAt(full: string): string | null {
  if (!existsSync(full)) return null
  try {
    const held = readFileSync(full, "utf8")
    return held === "" ? null : held
  } catch {
    return null
  }
}

function putAt(full: string, text: string): undefined {
  const near = `${full}${WRITING}`
  writeFileSync(near, text)
  renameSync(near, full)
}

function heldAt(full: string): Kept {
  const held = readAt(full)
  return held === null ? { rows: [] } : rowsIn(held)
}

export function editsIn(root: string, page: string): Kept {
  const at = editsAt(page)
  return at === null ? { why: NO_PAGE } : heldAt(join(root, at))
}

type Rows = readonly Edit[] | null

function settled(full: string, next: Rows): Kept {
  if (next === null || next.length === 0) {
    rmSync(full, { force: true })
    return { rows: [] }
  }
  putAt(full, textOf(next))
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
    const had = heldAt(full)
    if ("why" in had) return had
    const next = act(had.rows)
    return next instanceof Promise ? next.then((one) => settled(full, one)) : settled(full, next)
  })
}

export function appendEdits(root: string, page: string, edits: readonly Edit[]): Kept {
  return keptEdits(root, page, (had) => [...had, ...edits])
}

export function foldedIn(rows: readonly Edit[]): Answer {
  return gathered(rows.map((one) => ({ edits: [one], refused: null })))
}
