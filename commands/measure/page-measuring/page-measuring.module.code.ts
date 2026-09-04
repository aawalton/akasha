import { fileKeysAt, pageTypesIn } from "@akasha/indexes/entries"
import { heldIn, partedIn } from "@akasha/pages-system/page-file-name"
import {
  columnsOf,
  linesAt,
  madeBy,
  pathsIn,
} from "../checkout-counting/checkout-counting.module.code.ts"

const TOTAL = "total"

const PAGE = "page"

const PROPERTY = "property"

const HEADING: readonly string[] = ["type", "pages", "page lines", "properties", "property lines"]

const UNREAD = "these were not read, and count no lines:"

export interface Tally {
  readonly files: number
  readonly lines: number
}

export interface Counted {
  readonly type: string
  readonly pages: Tally
  readonly properties: Tally
}

export interface Counts {
  readonly types: readonly Counted[]
  readonly pages: Tally
  readonly properties: Tally
  readonly outside: number
  readonly unread: readonly string[]
}

interface Held {
  pages: { files: number; lines: number }
  properties: { files: number; lines: number }
}

function emptyHeld(): Held {
  return { pages: { files: 0, lines: 0 }, properties: { files: 0, lines: 0 } }
}

export function pageTypeOf(path: string, pageTypes: ReadonlySet<string>): string | null {
  const said = partedIn(path)
  if (said === null) return null
  return pageTypes.has(said.pageType) ? said.pageType : null
}

function linesOfType(one: Counted): number {
  return one.pages.lines + one.properties.lines
}

export function countsOver(
  root: string,
  paths: readonly string[],
  pageTypes: ReadonlySet<string>,
  fileProperties: ReadonlySet<string>
): Counts {
  const held = new Map<string, Held>()
  const unread: string[] = []
  let outside = 0
  for (const path of paths) {
    if (madeBy(path)) continue
    const kind = heldIn(path, pageTypes, fileProperties).kind
    const type = pageTypeOf(path, pageTypes)
    if (type === null || (kind !== PAGE && kind !== PROPERTY)) {
      outside += 1
      continue
    }
    const found = linesAt(root, path)
    if (found === null) unread.push(path)
    const one = held.get(type) ?? emptyHeld()
    const at = kind === PAGE ? one.pages : one.properties
    at.files += 1
    at.lines += found ?? 0
    held.set(type, one)
  }
  const types = [...held].map(([type, one]) => ({
    type,
    pages: { files: one.pages.files, lines: one.pages.lines },
    properties: { files: one.properties.files, lines: one.properties.lines },
  }))
  types.sort((a, b) => linesOfType(b) - linesOfType(a) || a.type.localeCompare(b.type))
  const pages = {
    files: types.reduce((sum, one) => sum + one.pages.files, 0),
    lines: types.reduce((sum, one) => sum + one.pages.lines, 0),
  }
  const properties = {
    files: types.reduce((sum, one) => sum + one.properties.files, 0),
    lines: types.reduce((sum, one) => sum + one.properties.lines, 0),
  }
  return { types, pages, properties, outside, unread }
}

export function countsIn(root: string): Counts {
  return countsOver(
    root,
    pathsIn(root),
    pageTypesIn(root),
    new Set<string>(fileKeysAt(root).keys())
  )
}

function rowOf(type: string, pages: Tally, properties: Tally): readonly string[] {
  return [
    type,
    String(pages.files),
    String(pages.lines),
    String(properties.files),
    String(properties.lines),
  ]
}

export function linesOf(counts: Counts): readonly string[] {
  const said = columnsOf([
    HEADING,
    ...counts.types.map((one) => rowOf(one.type, one.pages, one.properties)),
    rowOf(TOTAL, counts.pages, counts.properties),
  ])
  const body = [...said.slice(0, -1), "", said[said.length - 1] ?? ""]
  const outside = `files the checkout holds that are no page: ${String(counts.outside)}`
  const whole = [...body, outside]
  if (counts.unread.length === 0) return whole
  return [...whole, "", UNREAD, ...counts.unread]
}
