import { asObjectRecord } from "akasha/code/type/narrowing/modules/as-object-record/as-object-record.module.code.ts"
import {
  knownMotifChaptersFromLore,
  type LoreBookKnown,
  styleChapters,
} from "akasha/temper/items/core/modules/motif-chapter-set/motif-chapter-set.module.code.ts"
import { loreLibraryOfPages } from "akasha/temper/player/completion/modules/lore-library-pages/lore-library-pages.module.code.ts"

const CRAFTING_MOTIFS_CATEGORY_INDEX = 2

export function motifStyleChapters(styleId: number): readonly number[] | undefined {
  loreLibraryOfPages()
  return styleChapters(styleId)
}

function loreLibraryKnowsBook(
  charData: Record<string, unknown>,
  collectionIndex: number,
  bookIndex: number
): boolean {
  const loreLibrary = asObjectRecord(charData["loreLibrary"])
  if (!loreLibrary) return false
  const motifCategory = asObjectRecord(loreLibrary[CRAFTING_MOTIFS_CATEGORY_INDEX])
  if (!motifCategory) return false
  const knownBooks = motifCategory[collectionIndex]
  if (!knownBooks) return false
  if (Array.isArray(knownBooks)) {
    for (const idx of knownBooks) {
      if (idx === bookIndex) return true
    }
    return false
  }
  const knownBooksRecord = asObjectRecord(knownBooks)
  if (knownBooksRecord) {
    for (const v of Object.values(knownBooksRecord)) {
      if (v === bookIndex) return true
    }
  }
  return false
}

function knownChapters(charData: Record<string, unknown>, styleId: number): readonly number[] {
  loreLibraryOfPages()
  const isBookKnown: LoreBookKnown = (collectionIndex, bookIndex) =>
    loreLibraryKnowsBook(charData, collectionIndex, bookIndex)
  return knownMotifChaptersFromLore(isBookKnown, styleId)
}

export function knownChapterCountForStyleByCharData(
  charData: Record<string, unknown>,
  styleId: number
): number {
  return knownChapters(charData, styleId).length
}

export function knowsMotifByCharData(
  charData: Record<string, unknown>,
  styleId: number,
  chapterId: number | null
): boolean {
  const known = knownChapters(charData, styleId)
  if (chapterId !== null) return known.includes(chapterId)
  const chapters = motifStyleChapters(styleId)
  if (chapters === undefined || chapters.length === 0) return false
  return known.length === chapters.length
}
