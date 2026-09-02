import { Buffer } from "node:buffer"
import { appendFileSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { lineFor, partsOver } from "../entry-writing/page-entry-writing.module.code.ts"
import { FIRST_PART } from "../file-name/page-file-name.module.code.ts"
import { partAt, partsOf } from "../file-parts/page-file-parts.module.code.ts"
import type { Value } from "../value/page-value.module.code.ts"

const NO_NAME = "is no page file, so the files beside that page have no name"

const NO_PAGE = "names no page file on disk, so nothing written beside that page is read"

export type Filling = {
  readonly path: string
  readonly part: number
  readonly filled: number
}

export type Filled = { readonly filling: Filling } | { readonly refused: string }

export type Landed = { readonly paths: readonly string[] } | { readonly refused: string }

type Chunk = { path: string; text: string }

export function bytesIn(text: string): number {
  return Buffer.byteLength(text, "utf8")
}

function filed(at: string): boolean {
  return statSync(at, { throwIfNoEntry: false })?.isFile() === true
}

function sizeOf(at: string): number {
  const found = statSync(at, { throwIfNoEntry: false })
  return found === undefined || !found.isFile() ? 0 : found.size
}

export function openedAt(root: string, page: string, propertySlug: string, held: string): Filled {
  if (!filed(join(root, page))) return { refused: `'${page}' ${NO_PAGE}` }
  const found = partsOf(page, propertySlug, held, (one) => filed(join(root, one)))
  const last = found.at(-1)
  if (last === undefined) return { refused: `'${page}' ${NO_NAME}` }
  return {
    filling: { path: last, part: FIRST_PART + found.length - 1, filled: sizeOf(join(root, last)) },
  }
}

export function rolledInto(
  page: string,
  propertySlug: string,
  held: string,
  filling: Filling,
  size: number,
  ceiling: number
): Filled {
  if (size > ceiling) {
    return {
      refused: `one value runs to ${size} bytes, over the ceiling of ${ceiling}, and no value is divided`,
    }
  }
  if (filling.filled === 0 || filling.filled + size <= ceiling) {
    return { filling: { path: filling.path, part: filling.part, filled: filling.filled + size } }
  }
  const next = partAt(page, propertySlug, held, filling.part + 1)
  if (next === null) return { refused: `'${page}' ${NO_NAME}` }
  return { filling: { path: next, part: filling.part + 1, filled: size } }
}

function chunked(into: Chunk[], path: string, text: string): undefined {
  const last = into.at(-1)
  if (last !== undefined && last.path === path) last.text += text
  else into.push({ path, text })
}

export function appendedAt(
  root: string,
  page: string,
  propertySlug: string,
  held: string,
  values: Iterable<Value>,
  ceiling: number
): Landed {
  const opened = openedAt(root, page, propertySlug, held)
  if ("refused" in opened) return opened
  let filling = opened.filling
  const chunks: Chunk[] = []
  for (const one of values) {
    const line = lineFor(one)
    const rolled = rolledInto(page, propertySlug, held, filling, bytesIn(line), ceiling)
    if ("refused" in rolled) return rolled
    filling = rolled.filling
    chunked(chunks, filling.path, line)
  }
  for (const one of chunks) appendFileSync(join(root, one.path), one.text)
  return { paths: chunks.map((one) => one.path) }
}

function pastAt(
  root: string,
  page: string,
  propertySlug: string,
  held: string,
  from: number
): readonly string[] {
  const found: string[] = []
  for (let part = from; ; part += 1) {
    const at = partAt(page, propertySlug, held, part)
    if (at === null) break
    if (!filed(join(root, at))) break
    found.push(at)
  }
  return found
}

export function landedAt(
  root: string,
  page: string,
  propertySlug: string,
  held: string,
  values: Iterable<Value>,
  ceiling: number
): Landed {
  if (!filed(join(root, page))) return { refused: `'${page}' ${NO_PAGE}` }
  const made = partsOver(page, propertySlug, held, values, ceiling)
  if ("refused" in made) return made
  const paths: string[] = []
  for (const part of made.parts) {
    const at = join(root, part.path)
    if (filed(at) && readFileSync(at, "utf8") === part.text) continue
    writeFileSync(at, part.text)
    paths.push(part.path)
  }
  for (const gone of pastAt(root, page, propertySlug, held, FIRST_PART + made.parts.length)) {
    rmSync(join(root, gone), { force: true })
    paths.push(gone)
  }
  return { paths }
}
