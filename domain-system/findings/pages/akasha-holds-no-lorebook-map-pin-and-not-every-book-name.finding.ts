import type { Finding } from "../finding.page-type.ts"

export const akashaHoldsNoLorebookMapPinAndNotEveryBookName = {
  id: "01a06151-7889-74ea-a862-da7c8f36d06a",
  pageTypeSlug: "finding",
  slug: "akasha-holds-no-lorebook-map-pin-and-not-every-book-name",
  domainSlug: "domain/temper",
  claim:
    "The eidetic lorebook table in game-collections-addon cannot be rebuilt out of akasha, and the shortfall is wider than the map pins. Akasha holds no pin coordinate and no map count at all, and it is also missing 445 of the 4,773 book names the table carries. A seat treating the table as build output would lose 6,131 pins, 2,081 map counts and 445 names. The table is hand-written source and migrates as data.",
  evidence:
    "Measured on 2026-09-02 by importing both sides and comparing what each answers, rather than by grep.\n\n`temper/game-collections-addon/src/lorebooks/data/eidetic-book-data.ts` exports one object `bookData` of 4,805 records keyed by a flat eidetic book identifier. Each record carries `c`, `cn`, `e`, `m`, `n` and `r`. Across them: 4,773 distinct book names, 59 distinct collection names, 6,131 map pins shaped `{mn, pm, px, py}` over 4,558 records, and 2,081 map-count entries.\n\n`akasha/temper/temper-completion/lore-library-data` answers `LORE_LIBRARY_DATA`, three categories holding 211 collections and 6,590 books between them. Its Eidetic Memory category holds 60 collections and 4,500 books. A book there carries `bookIndex` and `name`, and nothing besides.\n\nComparing the two: 4,328 of the 4,773 temper book names are found in akasha's Eidetic Memory and 445 are absent, and 57 of the 59 collection names are found. No pin coordinate and no map count appears anywhere in akasha.\n\nAn earlier measurement recorded the pins and the counts, but read the names as duplicated between the two. Only 90.7 percent of them are, so the name set is not recoverable either.\n\nThe table is 1,256,215 bytes, about 84 times the byte ceiling. Landing it needs an ordered division into parts with an index-for-index proof, because the addon reads each record's `m` by insertion order.",
} as const satisfies Finding
