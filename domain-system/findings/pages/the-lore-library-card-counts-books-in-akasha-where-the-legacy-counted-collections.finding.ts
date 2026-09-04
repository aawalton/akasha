import type { Finding } from "../finding.page-type.ts"

export const theLoreLibraryCardCountsBooksInAkashaWhereTheLegacyCountedCollections = {
  id: "01a063ec-37ae-78e5-bfae-d5c066fc944b",
  pageTypeSlug: "finding",
  slug: "the-lore-library-card-counts-books-in-akasha-where-the-legacy-counted-collections",
  domainSlug: "domain/temper",
  claim:
    "The lore-library card changed the unit it counts when it crossed. The legacy checker declared only `isItemComplete` and its picker ended at Collection, so the leaf sum added one per finished collection out of 211. The akasha resolver hands off to `countLoreLibrary`, which loops over each collection's books and counts books out of 6,590. A player's card reads a different fraction and moves on every book rather than on every finished collection. Nothing records the decision.",
  evidence:
    "Measured 2026-09-02 at `24e58a861d`, and found by recreating the four resolver tests `09f964f5c5` deleted.\n\nLegacy: `temper/player-completion/src/character-progression-checkers.ts` line 94 declares `lore-library-character` with `isItemComplete` and `getItemPickerLevels` and no `getItemProgress`. The picker answers Category at path length 0, Collection at length 1, and null beyond, so a collection is a leaf. `sumLeaves` in `completion-generic-checker-progress.ts` lines 66 to 78 takes the `getItemProgress` branch where it can and otherwise adds `isItemComplete ? 1 : 0` against `total += 1`. With no `getItemProgress` declared, every lore-library leaf goes down the second branch.\n\nAkasha: `characters-task-progress-resolver-world.module.code.ts` `resolveLoreLibrary` calls `countLoreLibrary`, whose loop at `completion-lore-library-progress.module.code.ts` lines 63 to 67 is `for (const book of col.books) { total++ }`.\n\nThe two denominators, counted twice by different instruments that agree: a regex over the 37 `lore-collections-*` shards, and running `LORE_LIBRARY_DATA` itself. Both answer 3 categories, 211 collections, 6,590 books.\n\nWhich is right is a product question rather than a migration one. Books are what a player accumulates, and 1 of 211 hides all movement inside a collection. But the change is visible on the card, it was not asked for by any page here, and the tests that would have caught it were the ones deleted.",
} as const satisfies Finding
