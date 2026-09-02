import type { Finding } from "../finding.page-type.ts"

export const theCollectiblesTableDropsACategoryTypeTheCaptureHolds = {
  id: "01a0617b-1825-7001-a9c6-15c1892ffa91",
  pageTypeSlug: "finding",
  slug: "the-collectibles-table-drops-a-category-type-the-capture-holds",
  domainSlug: "domain/temper",
  claim:
    "The collectibles capture holds `categoryType` on every collectible, the number `GetCollectibleCategoryType` answers for an id. The tier generator emits `{ id, name }` and drops it. The recreation was read from the emitted table, so the 12,906 entry rows now in akasha carry an id and a name and no type. Nothing in temper reads `categoryType` today, so nothing broke, and a recreation read from the capture rather than from the table would carry it.",
  evidence:
    "Measured on 2026-09-02 while landing the collectibles catalog as pages.\n\n`akasha/temper/temper-capture-shapes/collectibles-catalog/collectibles-catalog.module.code.ts` shapes an entry as `{ name: string, categoryType: number }`, and `akasha/temper/temper-game-catalog-capture-host/collectibles-catalog-schema/collectibles-catalog-schema.module.code.ts` holds the same two fields against the payload. The addon reads the value as `GetCollectibleCategoryType(id)` and files it under the collectible id.\n\n`extractCollectibles` in `akasha/temper/temper-catalog-generators/collectibles-catalog-tier/collectibles-catalog-tier.module.code.ts` returns `{ id: Number(idStr), name: stripEsoNameSuffix(entry.name) }`. `categoryType` is parsed by the schema and written nowhere.\n\nThree more filters run in the same file, and the recreation cannot see what any of them removed: an entry whose name is empty, a category or subcategory whose name is empty, and a subcategory holding no collectible.\n\n`stripEsoNameSuffix` at `akasha/temper/temper-build-support/eso-name/eso-name.module.code.ts` removes a trailing caret and letters, the game's gender suffix. So `collectible-name` on an akasha entry row is the stripped name rather than the name the game answers.\n\nThe only spellings of `categoryType` under `akasha/temper` are the capture shape, the schema, the capture addon and two ESO type declarations. Nothing reads it.",
} as const satisfies Finding
