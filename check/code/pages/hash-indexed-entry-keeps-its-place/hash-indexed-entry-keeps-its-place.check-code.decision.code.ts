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

const SLUG = "slug"

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
  readonly valueOf: (path: string) => Value | null
}

type Moved = {
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

type Row = {
  readonly slug: string
  readonly by: string | number
}

function compared(one: string | number, two: string | number): number {
  if (typeof one === "number" && typeof two === "number") return one - two
  const left = String(one)
  const right = String(two)
  return left < right ? -1 : left > right ? 1 : 0
}

function rowOf(path: string, name: string, world: World): Row | string {
  const slug = partedIn(path)?.slug
  if (slug === undefined) return `${path} is named as no page is`
  if (name === SLUG) return { slug, by: slug }
  const by = world.valueOf(path)?.[name]
  if (typeof by === "number" || typeof by === "string") return { slug, by }
  return `${path} states no \`${name}\` to be put in order by`
}

function rowsIn(one: Marked, kind: string, world: World): TableRead {
  const rows = world.rowsOf(kind)
  const paths = [one.page, ...rows]
  const found: Row[] = []
  for (const path of rows) {
    const row = rowOf(path, one.name, world)
    if (typeof row === "string") return { unread: row, paths }
    found.push(row)
  }
  found.sort((left, right) => compared(left.by, right.by) || compared(left.slug, right.slug))
  return { entries: found.map((row) => row.slug), paths }
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
  if (one.code === null) {
    return `the \`${rowTypeOf(one) ?? one.page}\` pages, in order of \`${one.name}\`,`
  }
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
