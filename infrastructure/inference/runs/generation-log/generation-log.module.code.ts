import { Buffer } from "node:buffer"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { kebabizeKey } from "akasha/pages/access/file-rows/file-rows.module.code.ts"
import { ENTRY_CEILING } from "akasha/pages/entry-ceiling/entry-ceiling.module.code.ts"
import { FIRST_PART } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { partAt } from "akasha/pages/file-parts/page-file-parts.module.code.ts"
import {
  type Put,
  readFiles,
  readPages,
  writeFiles,
} from "akasha/pages/query/store-writing/store-writing.module.code.ts"
import type { Json } from "akasha/utils/narrow/json-value/json-value.module.code.ts"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

export function generationLogSlug(): string {
  const stated = optionalEnv("GENERATION_LOG")?.trim()
  return stated === undefined || stated === "" ? "alan" : stated
}

export const GENERATION_WRITER = "inference-cli <inference-cli@alanwalton.com>"

export function rowValuesOf(properties: Readonly<Record<string, Json>>): Record<string, Json> {
  const values: Record<string, Json> = {}
  for (const [key, value] of Object.entries(properties)) {
    values[kebabizeKey(key)] = value
  }
  return values
}

const LOG_PAGE_TYPE = "generation-log"

const HELD = "jsonl"

const TRIES = 5

const MOST_PARTS = 16

const ROW_PROPERTIES: Readonly<Record<string, string>> = {
  audio: "audios",
  image: "images",
  "inference-run": "runs",
}

export type Landing = {
  readonly readPages: typeof readPages
  readonly readFiles: typeof readFiles
  readonly writeFiles: typeof writeFiles
}

export const LANDING: Landing = { readPages, readFiles, writeFiles }

export function propertyFor(pageTypeSlug: string): string | null {
  return ROW_PROPERTIES[pageTypeSlug] ?? null
}

function noPropertySaid(pageTypeSlug: string): string {
  const named = Object.keys(ROW_PROPERTIES).join(", ")
  return `a \`${LOG_PAGE_TYPE}\` holds rows of ${named}, and \`${pageTypeSlug}\` is none of those`
}

function nowhereBeside(page: string, property: string): OperationalError {
  return new OperationalError(`\`${page}\` is no page a \`${property}\` row sits beside`)
}

async function pagePathOf(slug: string, landing: Landing): Promise<string> {
  const found = await landing.readPages([{ pageTypeSlug: LOG_PAGE_TYPE, slug }])
  if (!found.ok) throw new OperationalError(`the \`${slug}\` log did not come back: ${found.why}`)
  const page = found.bodies.find((one) => one.path.endsWith(".ts"))?.path
  if (page === undefined) {
    throw new OperationalError(`no \`${LOG_PAGE_TYPE}\` page is at \`${slug}\``)
  }
  return page
}

type Part = {
  readonly at: string
  readonly part: number
  readonly path: string
  readonly content: string | null
}

async function partRead(
  page: string,
  property: string,
  part: number,
  landing: Landing
): Promise<Part> {
  const path = partAt(page, property, HELD, part)
  if (path === null) throw nowhereBeside(page, property)
  const found = await landing.readFiles([path])
  if (!found.ok) throw new OperationalError(`\`${path}\` did not come back: ${found.why}`)
  const content = found.bodies.find((one) => one.path === path)?.content ?? null
  return { at: found.at, part, path, content }
}

async function lastPartOf(page: string, property: string, landing: Landing): Promise<Part> {
  let low = FIRST_PART
  let high = FIRST_PART + MOST_PARTS
  let held: Part | null = null
  let empty: Part | null = null
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2)
    const read = await partRead(page, property, mid, landing)
    if (read.content === null) {
      empty = read
      high = mid
    } else {
      held = read
      low = mid + 1
    }
  }
  if (held === null) {
    if (empty === null) throw nowhereBeside(page, property)
    return empty
  }
  if (held.part >= FIRST_PART + MOST_PARTS - 1) {
    throw new OperationalError(
      `the \`${property}\` beside \`${page}\` is in ${MOST_PARTS} parts, and this reads ${MOST_PARTS}`
    )
  }
  return held
}

function appendedTo(page: string, property: string, last: Part, line: string): Put {
  const held = last.content ?? ""
  const ended = held === "" || held.endsWith("\n") ? held : `${held}\n`
  const room = Buffer.byteLength(ended) + Buffer.byteLength(line) <= ENTRY_CEILING
  if (ended === "" || room) return { path: last.path, content: ended + line }
  const at = partAt(page, property, HELD, last.part + 1)
  if (at === null) throw nowhereBeside(page, property)
  return { path: at, content: line }
}

function rowIn(line: string): Record<string, Json> | null {
  try {
    const held: unknown = JSON.parse(line)
    if (typeof held !== "object" || held === null || Array.isArray(held)) return null
    return held as Record<string, Json>
  } catch {
    return null
  }
}

type Merged = { readonly at: string; readonly put: Put }

async function mergedInto(
  page: string,
  property: string,
  last: Part,
  id: string,
  patch: Readonly<Record<string, Json>>,
  landing: Landing
): Promise<Merged | null> {
  for (let part = last.part; part >= FIRST_PART; part -= 1) {
    const read = part === last.part ? last : await partRead(page, property, part, landing)
    const lines = (read.content ?? "").split("\n")
    for (let at = lines.length - 1; at >= 0; at -= 1) {
      const line = lines[at] ?? ""
      if (!line.includes(id)) continue
      const row = rowIn(line)
      if (row === null || row["id"] !== id) continue
      lines[at] = JSON.stringify({ ...row, ...patch })
      return { at: read.at, put: { path: read.path, content: lines.join("\n") } }
    }
  }
  return null
}

export async function landRow(
  pageTypeSlug: string,
  properties: Readonly<Record<string, Json>>,
  id: string = Bun.randomUUIDv7(),
  landing: Landing = LANDING
): Promise<string> {
  const slug = generationLogSlug()
  const opening = `the ${pageTypeSlug} row ${id} did not land in \`${slug}\``
  const property = propertyFor(pageTypeSlug)
  if (property === null) {
    throw new OperationalError(`${opening}: ${noPropertySaid(pageTypeSlug)}`)
  }
  const page = await pagePathOf(slug, landing)
  const line = `${JSON.stringify({ id, ...rowValuesOf(properties) })}\n`
  const said = `land ${pageTypeSlug} ${id} in ${slug}`
  let why = "nothing was tried"
  for (let taken = 1; taken <= TRIES; taken += 1) {
    const last = await lastPartOf(page, property, landing)
    const put = appendedTo(page, property, last, line)
    const wrote = await landing.writeFiles(
      [put],
      GENERATION_WRITER,
      said,
      undefined,
      undefined,
      last.at
    )
    if (wrote.ok) return id
    why = wrote.why
  }
  throw new OperationalError(`${opening} over ${TRIES} tries: ${why}`)
}

export async function mergeRow(
  pageTypeSlug: string,
  id: string,
  properties: Readonly<Record<string, Json>>,
  landing: Landing = LANDING
): Promise<void> {
  const slug = generationLogSlug()
  const opening = `the patch of ${pageTypeSlug} row ${id} did not land in \`${slug}\``
  const property = propertyFor(pageTypeSlug)
  if (property === null) {
    throw new OperationalError(`${opening}: ${noPropertySaid(pageTypeSlug)}`)
  }
  const page = await pagePathOf(slug, landing)
  const patch = rowValuesOf(properties)
  const said = `patch ${pageTypeSlug} ${id} in ${slug}`
  let why = "nothing was tried"
  for (let taken = 1; taken <= TRIES; taken += 1) {
    const last = await lastPartOf(page, property, landing)
    const held = await mergedInto(page, property, last, id, patch, landing)
    if (held === null) throw new OperationalError(`${opening}: no row of that id is there`)
    const wrote = await landing.writeFiles(
      [held.put],
      GENERATION_WRITER,
      said,
      undefined,
      undefined,
      held.at
    )
    if (wrote.ok) return
    why = wrote.why
  }
  throw new OperationalError(`${opening} over ${TRIES} tries: ${why}`)
}
