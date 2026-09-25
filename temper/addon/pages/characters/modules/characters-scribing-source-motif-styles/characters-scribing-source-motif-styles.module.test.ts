import { describe, expect, test } from "bun:test"
import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  motifStylesDroppedBy,
  SCRIBING_SOURCE_MOTIF_STYLES,
} from "akasha/temper/addon/pages/characters/modules/characters-scribing-source-motif-styles/characters-scribing-source-motif-styles.module.code.ts"
import { draugr } from "akasha/temper/catalog/gear/temper-motif-style/pages/draugr.temper-motif-style.ts"
import { imperialCityDailies } from "akasha/temper/catalog/skill/temper-scribing-source/pages/imperial-city-dailies/imperial-city-dailies.temper-scribing-source.ts"
import { magesGuildDaily } from "akasha/temper/catalog/skill/temper-scribing-source/pages/mages-guild-daily/mages-guild-daily.temper-scribing-source.ts"
import { temperScribingSource } from "akasha/temper/catalog/skill/temper-scribing-source/temper-scribing-source.page-type.ts"
import { LORE_LIBRARY_DATA } from "akasha/temper/player/completion/modules/lore-library-data/lore-library-data.module.code.ts"

const MOTIF_STYLE_PAGES = join(
  import.meta.dir,
  "../../../../../catalog/gear/temper-motif-style/pages"
)
const CRAFTING_MOTIFS_CATEGORY_INDEX = 2

function slugsOfPagesNamingAScribingSource(): string[] {
  const slugs: string[] = []
  for (const fileName of readdirSync(MOTIF_STYLE_PAGES)) {
    if (!fileName.endsWith(".temper-motif-style.ts")) continue
    const body = readFileSync(join(MOTIF_STYLE_PAGES, fileName), "utf8")
    if (!body.includes(`"${temperScribingSource.slug}/`)) continue
    slugs.push(fileName.slice(0, -".temper-motif-style.ts".length))
  }
  return slugs.sort()
}

describe("SCRIBING_SOURCE_MOTIF_STYLES", () => {
  test("holds every motif style page naming a scribing source, and no other", () => {
    const listed = SCRIBING_SOURCE_MOTIF_STYLES.map((style) => style.slug).sort()
    expect(listed).toEqual(slugsOfPagesNamingAScribingSource())
  })

  test("each style's collection index names that style's crafting motifs collection", () => {
    const category = LORE_LIBRARY_DATA.find(
      (c) => c.categoryIndex === CRAFTING_MOTIFS_CATEGORY_INDEX
    )
    if (category === undefined) throw new Error("fixture: no crafting motifs category")
    for (const style of SCRIBING_SOURCE_MOTIF_STYLES) {
      const collection = category.collections.find(
        (c) => c.collectionIndex === style.collectionIndex
      )
      expect(collection?.name).toBe(`${style.title} Style`)
    }
  })
})

describe("motifStylesDroppedBy", () => {
  test("a guild daily drops the one style naming it", () => {
    expect(motifStylesDroppedBy(magesGuildDaily.slug).map((s) => s.slug)).toEqual([draugr.slug])
  })

  test("a source no style names drops nothing", () => {
    expect(motifStylesDroppedBy(imperialCityDailies.slug)).toEqual([])
  })
})
