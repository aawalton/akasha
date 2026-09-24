import {
  type Reader,
  type TableRead,
  tableIn,
} from "akasha/check/code/pages/hash-indexed-entry-keeps-its-place/modules/hash-table-entries/hash-table-entries.module.code.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { besideAt, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  textAt,
  textsAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const HASH_INDEXED = "hashIndexed"

const CODE = "code"

const ORDERED_BY = "slug"

const SHOWN = 10

export const MARKING: ReadonlySet<string> = new Set([module.slug, pageType.slug])

export type Marked = {
  readonly page: string
  readonly name: string
  readonly code: string | null
}

export type World = {
  readonly read: Reader
  readonly rowsOf: (pageTypeSlug: string) => readonly string[]
}

export type Moved = {
  readonly entry: string
  readonly was: number
  readonly now: number | null
}

export function marksOf(page: string, value: Value): readonly Marked[] {
  const names = textsAt(value, HASH_INDEXED) ?? []
  const held = textAt(value, CODE)
  const code = held === null ? null : besideAt(page, CODE, held)
  return names.map((name) => ({ page, name, code }))
}

export function markedIn(index: Answering): readonly Marked[] {
  const found: Marked[] = []
  for (const kind of MARKING) {
    for (const [page, value] of index.valuesByPath(kind)) found.push(...marksOf(page, value))
  }
  return found
}

export function keyOf(one: Marked): string {
  return `${one.page} ${one.name}`
}

export function rowTypeOf(one: Marked): string | null {
  if (one.code !== null) return null
  return partedIn(one.page)?.slug ?? null
}

function slugsOf(rows: readonly string[]): readonly string[] {
  const found: string[] = []
  for (const one of rows) {
    const slug = partedIn(one)?.slug
    if (slug !== undefined) found.push(slug)
  }
  return found.sort((one, two) => (one < two ? -1 : one > two ? 1 : 0))
}

function rowsIn(one: Marked, kind: string, world: World): TableRead {
  if (one.name !== ORDERED_BY) {
    return {
      unread: `${one.page} names \`${one.name}\`, and a page type's pages are read in order of \`${ORDERED_BY}\` alone`,
      paths: [one.page],
    }
  }
  const rows = world.rowsOf(kind)
  return { entries: slugsOf(rows), paths: [one.page, ...rows] }
}

export function tableOf(one: Marked, world: World): TableRead {
  if (one.code !== null) return tableIn(world.read, one.code, one.name)
  const kind = rowTypeOf(one)
  if (kind === null) return { unread: `${one.page} names no page type`, paths: [one.page] }
  return rowsIn(one, kind, world)
}

export function placeOf(one: Marked): string {
  return one.code ?? one.page
}

function describedAs(one: Marked): string {
  if (one.code === null) return `the \`${rowTypeOf(one) ?? one.page}\` pages, in order of slug,`
  return `\`${one.name}\` in ${one.code}`
}

export function movedIn(was: readonly string[], now: readonly string[]): readonly Moved[] {
  const at = new Map<string, number>()
  now.forEach((one, place) => {
    if (!at.has(one)) at.set(one, place)
  })
  const moved: Moved[] = []
  was.forEach((one, place) => {
    const found = at.get(one) ?? null
    if (found !== place) moved.push({ entry: one, was: place, now: found })
  })
  return moved
}

function movedSaid(one: Moved): string {
  const entry = JSON.stringify(one.entry)
  if (one.now === null) return `${entry} was at index ${one.was} and is gone`
  return `${entry} moved from index ${one.was} to index ${one.now}`
}

export function reasonFor(one: Marked, moved: readonly Moved[]): string | null {
  if (moved.length === 0) return null
  const shown = moved.slice(0, SHOWN).map(movedSaid).join("; ")
  const rest = moved.length > SHOWN ? `; and ${moved.length - SHOWN} more moved` : ""
  return (
    `${describedAs(one)} is a table a build hash reads by place, and a saved hash names an ` +
    `entry by its index — ${shown}${rest}. An entry keeps its place, and a new one goes at the end`
  )
}

export function unreadFor(one: Marked, why: string): string {
  return `${describedAs(one)} is named as a table a build hash reads by place and could not be read — ${why}`
}

export function judged(one: Marked, was: TableRead, now: TableRead): string | null {
  if ("unread" in was) return null
  if ("unread" in now) return unreadFor(one, now.unread)
  return reasonFor(one, movedIn(was.entries, now.entries))
}
