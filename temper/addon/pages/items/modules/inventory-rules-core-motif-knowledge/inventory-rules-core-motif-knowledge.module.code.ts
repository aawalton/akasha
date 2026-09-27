import { asObjectRecord } from "akasha/code/type/narrowing/modules/as-object-record/as-object-record.module.code.ts"
import {
  knownMotifChaptersFromLore,
  type LoreBookKnown,
  STYLE_TO_CHAPTERS,
} from "akasha/temper/items/core/modules/motif-chapter-set/motif-chapter-set.module.code.ts"

const CRAFTING_MOTIFS_CATEGORY_INDEX = 2

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
  const styleChapters = STYLE_TO_CHAPTERS[styleId]
  if (styleChapters === undefined || styleChapters.length === 0) return false
  return known.length === styleChapters.length
}
