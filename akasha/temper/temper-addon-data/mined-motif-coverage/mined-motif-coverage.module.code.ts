import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { partAt } from "@akasha/pages-system/page-file-parts"
import { LORE_LIBRARY_DATA } from "@akasha/temper-completion/lore-library-data"
import { parseMotifBookName } from "@akasha/temper-items-core/motif-name-parser"

const MINE_PAGE = "akasha/temper/temper-character/mines/pages/eso/eso.temper-mine.ts"

const ITEMS = "items"

const HELD = "jsonl"

const FIRST_PART = 1

/** What the game calls a motif book and a motif chapter among the kinds an item can be. */
const MOTIF_BOOK = 60

const MOTIF_CHAPTER = 61

/** Where the lore library keeps the crafting motifs, among its categories. */
const CRAFTING_MOTIFS_CATEGORY_INDEX = 2

/** A row is read only where its line already names a motif kind, so most lines are never parsed. */
const MOTIF_KIND_MARK = '"specializedItemType":6'

const TOME_EDITION = /, Tome Edition$/

const MOTIF_PREFIXES: readonly string[] = ["Crafting Motif ", "Crown Crafting Motif "]

/** A motif book, or one chapter of one, named by the style it dresses and the piece it covers. */
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

/**
 * A tome edition restates a book already named without it, so counting one would name a style
 * twice. The parser drops the tail either way; this leaves the restatement out before parsing.
 */
export function isCanonicalMotifTitle(title: string): boolean {
  return !TOME_EDITION.test(title)
}

export function isMotifShapedLoreName(name: string): boolean {
  return MOTIF_PREFIXES.some((one) => name.startsWith(one))
}

/** The files the sweep's rows are kept in, in order, under the checkout this runs against. */
export function minedItemParts(root: string): readonly string[] {
  const found: string[] = []
  for (let part = FIRST_PART; ; part += 1) {
    const at = partAt(MINE_PAGE, ITEMS, HELD, part)
    if (at === null) break
    const whole = join(root, at)
    if (!existsSync(whole)) break
    found.push(whole)
  }
  return found
}

/** The title every motif book and motif chapter the sweep read carries. */
export function minedMotifTitles(root: string): readonly string[] {
  const parts = minedItemParts(root)
  if (parts.length === 0) {
    throw new Error(`no page carries the sweep's \`${ITEMS}\` rows — looked beside ${MINE_PAGE}`)
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

/** Every motif the lore library names, read off the crafting motifs category alone. */
export function loreMotifNames(): readonly string[] {
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

/**
 * The items the lore library names nothing for. A book item is covered where the library names any
 * chapter of that style, because a style told chapter by chapter is one the book still opens.
 */
export function itemsMissingLore(items: MotifTuples, lore: MotifTuples): readonly string[] {
  const missing: string[] = []
  for (const one of items.values()) {
    if (lore.has(motifKey(one))) continue
    if (one.chapterId === null && holdsChapterForStyle(lore, one.styleId)) continue
    missing.push(motifWording(one))
  }
  return missing
}

/**
 * The lore entries no item answers. A chapter entry is covered where an item names the style's
 * book, because a style sold whole covers every chapter the library lists for it.
 */
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

/** Both sides gathered off this checkout, and each side's gaps against the other. */
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
