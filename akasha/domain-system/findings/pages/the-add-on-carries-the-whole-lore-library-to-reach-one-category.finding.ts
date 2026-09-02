import type { Finding } from "../finding.page-type.ts"

export const theAddOnCarriesTheWholeLoreLibraryToReachOneCategory = {
  id: "01a06358-4f7c-76fb-ab01-8e4d54d18a19",
  pageTypeSlug: "finding",
  slug: "the-add-on-carries-the-whole-lore-library-to-reach-one-category",
  domainSlug: "domain/temper",
  claim:
    "`SHALIDOR_LIBRARY_COLLECTIONS` reads its 29 collections out of `LORE_LIBRARY_DATA`, which imports all 37 `lore-collections-NN` chunks. The TemperCharacters add-on wants only Shalidor's Library and now compiles the Crafting Motifs and Eidetic Memory catalogs beside it. The legacy generated file it replaced held Shalidor alone at 20,433 bytes; the chunks behind the new reach total 433,173, so the add-on bundle takes about twenty-one times the bytes for the same 297 books.",
  evidence:
    "Measured 2026-09-02 at 4fc76aaee5. `akasha/temper/temper-completion/lore-library-data/lore-library-data.module.code.ts` imports `LORE_COLLECTIONS_00` through `LORE_COLLECTIONS_36` and folds them into three categories: index 1 Shalidor's Library from chunks 00 and 01, index 2 Crafting Motifs from 02 to 12, index 3 Eidetic Memory from 13 to 36.\n\n`temper/player-completion-addon/src/ui/task-hud-enrichment.ts:6` now imports `SHALIDOR_LIBRARY_COLLECTIONS` from `@akasha/temper-player-completion/shalidor-library-collections`, which selects category 1 by its index. Resolving that specifier answers 29 collections and 297 books, matching the legacy `shalidorLibraryCollections` leaf for leaf at 0 differences, with a seeded one-character change turning the comparison red at 1.\n\nThe byte counts: `temper/player-completion/src/generated/lore-shalidor-data.generated.ts` was 20,433 bytes; the 37 chunk code files total 433,173.\n\nSelecting by category index rather than by naming chunks 00 and 01 was deliberate: the chunk boundary is an artifact of the 15,000-byte page ceiling, and a rechunking would silently answer the wrong books, where the category index is what the game itself keeps.\n\nThe add-on is compiled to Lua by tstl, which does not drop an unreached table, so the cost is paid at load rather than only on disk. Nothing measured how long that load takes.",
} as const satisfies Finding
