import { describe, expect, test } from "bun:test"
import {
  countUnlearnedMotifStyles,
  withUnlearnedMotifStyles,
} from "akasha/temper/addon/pages/characters/modules/characters-scribing-sources/characters-scribing-sources.module.code.ts"
import { draugr } from "akasha/temper/catalog/gear/temper-motif-style/pages/draugr.temper-motif-style.ts"
import { dlcIncursionDailies } from "akasha/temper/catalog/skill/temper-scribing-source/pages/dlc-incursion-dailies/dlc-incursion-dailies.temper-scribing-source.ts"
import { imperialCityDailies } from "akasha/temper/catalog/skill/temper-scribing-source/pages/imperial-city-dailies/imperial-city-dailies.temper-scribing-source.ts"
import { magesGuildDaily } from "akasha/temper/catalog/skill/temper-scribing-source/pages/mages-guild-daily/mages-guild-daily.temper-scribing-source.ts"
import { LORE_LIBRARY_DATA } from "akasha/temper/player/completion/modules/lore-library-data/lore-library-data.module.code.ts"

const CRAFTING_MOTIFS_CATEGORY_INDEX = 2

function draugrChapterKeys(): string[] {
  const category = LORE_LIBRARY_DATA.find((c) => c.categoryIndex === CRAFTING_MOTIFS_CATEGORY_INDEX)
  const collection = category?.collections.find((c) => c.collectionIndex === draugr.collectionIndex)
  if (collection === undefined) throw new Error("fixture: no draugr collection")
  return collection.books.map(
    (book) => `${CRAFTING_MOTIFS_CATEGORY_INDEX}:${draugr.collectionIndex}:${book.bookIndex}`
  )
}

describe("countUnlearnedMotifStyles", () => {
  test("a character whose lore library is not read yet counts nothing", () => {
    expect(countUnlearnedMotifStyles(magesGuildDaily.slug, undefined)).toBeUndefined()
  })

  test("a source dropping no style counts nothing", () => {
    expect(countUnlearnedMotifStyles(imperialCityDailies.slug, new Set())).toBeUndefined()
  })

  test("a character knowing no chapter counts every style the source drops", () => {
    expect(countUnlearnedMotifStyles(magesGuildDaily.slug, new Set())).toBe(1)
    expect(countUnlearnedMotifStyles(dlcIncursionDailies.slug, new Set())).toBe(7)
  })

  test("a style with every chapter known is learned", () => {
    expect(countUnlearnedMotifStyles(magesGuildDaily.slug, new Set(draugrChapterKeys()))).toBe(0)
  })

  test("a style with one chapter unknown is not learned", () => {
    const known = new Set(draugrChapterKeys().slice(1))
    expect(countUnlearnedMotifStyles(magesGuildDaily.slug, known)).toBe(1)
  })
})

describe("withUnlearnedMotifStyles", () => {
  test("a count is spelled after the text", () => {
    expect(withUnlearnedMotifStyles("Siege Camp Defender (1/3)", 3)).toBe(
      "Siege Camp Defender (1/3) (3 motifs)"
    )
  })

  test("one style is spelled singular", () => {
    expect(withUnlearnedMotifStyles("Mages Guild Daily", 1)).toBe("Mages Guild Daily (1 motif)")
  })

  test("no style left, or none counted, leaves the text alone", () => {
    expect(withUnlearnedMotifStyles("Mages Guild Daily", 0)).toBe("Mages Guild Daily")
    expect(withUnlearnedMotifStyles("Mages Guild Daily", undefined)).toBe("Mages Guild Daily")
  })
})
