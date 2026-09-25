import {
  shalidorPinsOf,
  tableValuesOf,
} from "akasha/command/pages/temper/catalog/import-lore-books/modules/lore-book-rows/lore-book-rows.module.code.ts"
import { nameFaultIn } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import type {
  EideticBookTable,
  EideticLibraryTable,
  ShalidorDataTable,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-types/lorebooks-types.module.code.ts"
import type { LoreCategoryEntry } from "akasha/temper/player/completion/modules/lore-library-types/lore-library-types.module.code.ts"

export type Sources = {
  readonly table: EideticBookTable
  readonly library: EideticLibraryTable
  readonly shalidor: ShalidorDataTable
  readonly captured: readonly LoreCategoryEntry[]
}

type PlannedBook = {
  readonly slug: string
  readonly values: Readonly<Record<string, unknown>>
}

export type PlannedCollection = {
  readonly slug: string
  readonly category: number
  readonly index: number | null
  readonly name: string
  readonly values: Readonly<Record<string, unknown>>
  readonly books: readonly PlannedBook[]
}

export type Plan = {
  readonly collections: readonly PlannedCollection[]
  readonly unfiled: readonly PlannedBook[]
}

export type Existing = (category: number, index: number) => string | null

const SHALIDOR = 1
const EIDETIC = 3
const SLUG_TAKES = 90
const COLLECTION_TYPE = "temper-lore-collection"
const CATEGORY_WORDS: Readonly<Record<number, string>> = {
  1: "shalidors-library",
  2: "crafting-motifs",
  3: "eidetic-memory",
}

export function slugged(text: string): string {
  const plain = text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  if (plain.length <= SLUG_TAKES) return plain
  const clipped = plain.slice(0, SLUG_TAKES)
  const at = clipped.lastIndexOf("-")
  return at > 0 ? clipped.slice(0, at) : clipped
}

function named(slug: string, opening: string): string {
  return slug !== "" && nameFaultIn(slug) === null ? slug : `${opening}-${slug}`.replace(/-$/, "")
}

type Drafted = {
  readonly base: string
  readonly tail: string
  readonly values: Record<string, unknown>
}

type Gathering = {
  readonly category: number
  readonly index: number | null
  readonly name: string
  readonly library: Record<string, unknown> | null
  readonly drafted: Drafted[]
}

function libraryValues(entry: {
  d?: string
  g?: string
  h?: boolean
  k?: number
  t?: number
}): Record<string, unknown> {
  const values: Record<string, unknown> = {}
  if (entry.k !== undefined) values.esoLoreCollectionId = entry.k
  if (entry.d !== undefined) values.loreCollectionDescription = entry.d
  if (entry.g !== undefined) values.gamepadIcon = entry.g
  if (entry.h !== undefined) values.hidden = entry.h
  if (entry.t !== undefined) values.bookTotal = entry.t
  return values
}

function titled(title: string | number | undefined, fallback: string): string {
  if (typeof title === "string" && title !== "") return slugged(title)
  return typeof title === "number" ? `book-${title}` : fallback
}

function capturedBook(
  category: number,
  collectionIndex: number,
  book: { bookIndex: number; name: string },
  extra: Record<string, unknown>
): Drafted {
  return {
    base: titled(book.name, `book-${category}-${collectionIndex}-${book.bookIndex}`),
    tail: `${category}-${collectionIndex}-${book.bookIndex}`,
    values: { title: book.name, ...extra, bookIndex: book.bookIndex },
  }
}

function tableBook(bookId: number, sources: Sources): Drafted {
  const book = sources.table[bookId]
  if (book === undefined) throw new Error(`book ${bookId} is in no table`)
  const values = tableValuesOf(bookId, book)
  return {
    base: titled(book.n, `book-${bookId}`),
    tail: String(bookId),
    values: typeof book.n === "string" ? { title: book.n, ...values } : values,
  }
}

function keyOf(collection: string | undefined, title: unknown): string {
  return `${collection ?? ""}\u0000${String(title)}`
}

function gathered(sources: Sources): { gatherings: Gathering[]; unfiled: Drafted[] } {
  const gatherings: Gathering[] = []
  const byName = new Map<string, Gathering>()
  const byTitle = new Map<string, number[]>()
  const ids = Object.keys(sources.table)
    .map(Number)
    .sort((a, b) => a - b)
  for (const id of ids) {
    const book = sources.table[id]
    if (book === undefined) continue
    const key = keyOf(book.cn, book.n)
    byTitle.set(key, [...(byTitle.get(key) ?? []), id])
  }
  const merged = new Set<number>()
  for (const category of sources.captured) {
    for (const collection of category.collections) {
      const entry = sources.library[category.categoryIndex]?.[collection.collectionIndex]
      const gathering: Gathering = {
        category: category.categoryIndex,
        index: collection.collectionIndex,
        name: collection.name,
        library: entry === undefined ? null : libraryValues(entry),
        drafted: [],
      }
      gatherings.push(gathering)
      if (category.categoryIndex === EIDETIC) byName.set(collection.name, gathering)
      const counted = new Map<string, number>()
      for (const book of collection.books) counted.set(book.name, (counted.get(book.name) ?? 0) + 1)
      for (const book of collection.books) {
        const extra: Record<string, unknown> = {}
        if (category.categoryIndex === SHALIDOR) {
          const pins = shalidorPinsOf(sources.shalidor, collection.collectionIndex, book.bookIndex)
          if (pins.length > 0) extra.shalidorPins = pins
        }
        const found = byTitle.get(keyOf(collection.name, book.name)) ?? []
        const only = found.length === 1 && counted.get(book.name) === 1 ? found[0] : undefined
        if (category.categoryIndex === EIDETIC && only !== undefined) {
          merged.add(only)
          const drafted = tableBook(only, sources)
          gathering.drafted.push({
            ...drafted,
            values: { ...drafted.values, bookIndex: book.bookIndex },
          })
          continue
        }
        gathering.drafted.push(
          capturedBook(category.categoryIndex, collection.collectionIndex, book, extra)
        )
      }
    }
  }
  const unfiled: Drafted[] = []
  for (const id of ids) {
    if (merged.has(id)) continue
    const book = sources.table[id]
    if (book === undefined) continue
    if (book.cn === undefined) {
      unfiled.push(tableBook(id, sources))
      continue
    }
    let gathering = byName.get(book.cn)
    if (gathering === undefined) {
      gathering = { category: EIDETIC, index: null, name: book.cn, library: null, drafted: [] }
      gatherings.push(gathering)
      byName.set(book.cn, gathering)
    }
    gathering.drafted.push(tableBook(id, sources))
  }
  return { gatherings, unfiled }
}

function collectionSlug(gathering: Gathering, existing: Existing): string {
  const had = gathering.index === null ? null : existing(gathering.category, gathering.index)
  if (had !== null) return had
  const words = slugged(gathering.name)
  const bare = words === "" ? `${CATEGORY_WORDS[gathering.category]}-${gathering.index}` : words
  return named(bare, "collection")
}

function booksNamed(all: readonly Drafted[]): Map<Drafted, string> {
  const counted = new Map<string, number>()
  for (const one of all) counted.set(one.base, (counted.get(one.base) ?? 0) + 1)
  const slugs = new Map<Drafted, string>()
  const taken = new Set<string>()
  for (const one of all) {
    const bare = (counted.get(one.base) ?? 0) > 1 ? `${one.base}-${one.tail}` : one.base
    let slug = named(bare, "book")
    for (let again = 2; taken.has(slug); again += 1) slug = `${named(bare, "book")}-${again}`
    taken.add(slug)
    slugs.set(one, slug)
  }
  return slugs
}

export function apartFrom(collection: string, book: string, tail: string): string {
  return book === collection ? `${book}-book-${tail}` : book
}

export function planned(sources: Sources, existing: Existing): Plan {
  const { gatherings, unfiled } = gathered(sources)
  const slugs = booksNamed([...gatherings.flatMap((one) => one.drafted), ...unfiled])
  const taken = new Set<string>()
  const collections: PlannedCollection[] = []
  for (const gathering of gatherings) {
    let slug = collectionSlug(gathering, existing)
    if (taken.has(slug)) slug = `${slug}-${gathering.category}`
    taken.add(slug)
    const values: Record<string, unknown> = {}
    if (gathering.name !== "") values.title = gathering.name
    values.esoLoreCategoryId = gathering.category
    if (gathering.index !== null) values.esoCollectionIndex = gathering.index
    Object.assign(values, gathering.library ?? {})
    const address = `${COLLECTION_TYPE}/${slug}`
    collections.push({
      slug,
      category: gathering.category,
      index: gathering.index,
      name: gathering.name,
      values,
      books: gathering.drafted.map((one) => ({
        slug: apartFrom(slug, slugs.get(one) ?? one.base, one.tail),
        values: { ...one.values, collection: address },
      })),
    })
  }
  return {
    collections,
    unfiled: unfiled.map((one) => ({ slug: slugs.get(one) ?? one.base, values: one.values })),
  }
}
