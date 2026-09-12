import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { partAt } from "akasha/pages/file-parts/page-file-parts.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"
import { LORE_LIBRARY_DATA } from "akasha/temper/completion/lore-library-data/lore-library-data.module.code.ts"
import { parseMotifBookName } from "akasha/temper/items-core/motif-name-parser/motif-name-parser.module.code.ts"

const MINE = "temper-mine"

const MINE_SLUG = "eso"

function minePageAt(root: string): string {
  const listed = listedAt(root, MINE, MINE_SLUG)[0]
  if (listed === undefined) {
    throw new Error(`no \`${MINE}\` is slugged \`${MINE_SLUG}\`, so the sweep's rows sit nowhere`)
  }
  return listed.path
}

const ITEMS = "items"

const HELD = "jsonl"

const FIRST_PART = 1

const MOTIF_BOOK = 60

const MOTIF_CHAPTER = 61

const CRAFTING_MOTIFS_CATEGORY_INDEX = 2

const MOTIF_KIND_MARK = '"specializedItemType":6'

const TOME_EDITION = /, Tome Edition$/

const MOTIF_PREFIXES: readonly string[] = ["Crafting Motif ", "Crown Crafting Motif "]

export type MotifTuple = {
  readonly styleId: number
  readonly chapterId: number | null
}

export type MotifTuples = ReadonlyMap<string, MotifTuple>

export type Gathered = {
  readonly tuples: MotifTuples
  readonly unparseable: readonly string[]
}

export function motifKey(tuple: MotifTuple): string {
  return `${tuple.styleId}:${tuple.chapterId === null ? "B" : tuple.chapterId}`
}

export function motifWording(tuple: MotifTuple): string {
  return tuple.chapterId === null
    ? `style ${tuple.styleId} book`
    : `style ${tuple.styleId} chapter ${tuple.chapterId}`
}

export function isCanonicalMotifTitle(title: string): boolean {
  return !TOME_EDITION.test(title)
}

export function isMotifShapedLoreName(name: string): boolean {
  return MOTIF_PREFIXES.some((one) => name.startsWith(one))
}

function minedItemParts(root: string): readonly string[] {
  const page = minePageAt(root)
  const found: string[] = []
  for (let part = FIRST_PART; ; part += 1) {
    const at = partAt(page, ITEMS, HELD, part)
    if (at === null) break
    const whole = join(root, at)
    if (!existsSync(whole)) break
    found.push(whole)
  }
  return found
}

function minedMotifTitles(root: string): readonly string[] {
  const parts = minedItemParts(root)
  if (parts.length === 0) {
    throw new Error(
      `no page carries the sweep's \`${ITEMS}\` rows — looked beside ${minePageAt(root)}`
    )
  }
  const titles: string[] = []
  for (const path of parts) {
    for (const line of readFileSync(path, "utf8").split("\n")) {
      if (!line.includes(MOTIF_KIND_MARK)) continue
      let values: Record<string, unknown>
      try {
        values = JSON.parse(line) as Record<string, unknown>
      } catch {
        continue
      }
      const kind = values.specializedItemType
      if (kind !== MOTIF_BOOK && kind !== MOTIF_CHAPTER) continue
      const title = values.title
      if (typeof title !== "string" || title.length === 0) continue
      if (!isCanonicalMotifTitle(title)) continue
      titles.push(title)
    }
  }
  return titles
}

export function motifTuplesOf(names: readonly string[]): Gathered {
  const tuples = new Map<string, MotifTuple>()
  const unparseable: string[] = []
  for (const name of names) {
    const parsed = parseMotifBookName(name)
    if (parsed === undefined) {
      unparseable.push(name)
      continue
    }
    tuples.set(motifKey(parsed), parsed)
  }
  return { tuples, unparseable }
}

function loreMotifNames(): readonly string[] {
  const category = LORE_LIBRARY_DATA.find(
    (one) => one.categoryIndex === CRAFTING_MOTIFS_CATEGORY_INDEX
  )
  if (category === undefined) return []
  const names: string[] = []
  for (const collection of category.collections) {
    for (const book of collection.books) {
      if (isMotifShapedLoreName(book.name)) names.push(book.name)
    }
  }
  return names
}

function holdsChapterForStyle(tuples: MotifTuples, styleId: number): boolean {
  for (const one of tuples.values()) {
    if (one.styleId === styleId && one.chapterId !== null) return true
  }
  return false
}

function holdsBookForStyle(tuples: MotifTuples, styleId: number): boolean {
  for (const one of tuples.values()) {
    if (one.styleId === styleId && one.chapterId === null) return true
  }
  return false
}

export function itemsMissingLore(items: MotifTuples, lore: MotifTuples): readonly string[] {
  const missing: string[] = []
  for (const one of items.values()) {
    if (lore.has(motifKey(one))) continue
    if (one.chapterId === null && holdsChapterForStyle(lore, one.styleId)) continue
    missing.push(motifWording(one))
  }
  return missing
}

export function loreMissingItems(items: MotifTuples, lore: MotifTuples): readonly string[] {
  const missing: string[] = []
  for (const one of lore.values()) {
    if (items.has(motifKey(one))) continue
    if (one.chapterId !== null && holdsBookForStyle(items, one.styleId)) continue
    missing.push(motifWording(one))
  }
  return missing
}

export type Coverage = {
  readonly items: Gathered
  readonly lore: Gathered
  readonly itemsMissingLore: readonly string[]
  readonly loreMissingItems: readonly string[]
}

export function minedMotifCoverage(root: string = rootFor(resolveRoots(), AKASHA)): Coverage {
  const items = motifTuplesOf(minedMotifTitles(root))
  const lore = motifTuplesOf(loreMotifNames())
  return {
    items,
    lore,
    itemsMissingLore: itemsMissingLore(items.tuples, lore.tuples),
    loreMissingItems: loreMissingItems(items.tuples, lore.tuples),
  }
}
