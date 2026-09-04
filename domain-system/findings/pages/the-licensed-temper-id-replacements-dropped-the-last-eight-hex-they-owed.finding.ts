import type { Finding } from "../finding.page-type.ts"

export const theLicensedTemperIdReplacementsDroppedTheLastEightHexTheyOwed = {
  id: "01a0659d-67fa-71f8-88ab-4225834b7522",
  pageTypeSlug: "finding",
  slug: "the-licensed-temper-id-replacements-dropped-the-last-eight-hex-they-owed",
  domainSlug: "domain/temper",
  claim:
    "1,048 temper pages held a uuid version 5 rather than a version 7, so `page.page-type.ts` licensed replacing their ids. The replacements kept none of the last eight hex that same page type says a licensed replacement keeps. These 1,048 ids are licensed but incorrect. Nothing in the repository references them, so correcting them costs 1,048 rewrites and breaks nothing, whenever anyone judges it worth doing.",
  evidence:
    "Measured 2026-09-02 by joining the 12,270 pages under `akasha/temper` to their markdown twins under `/var/home/walton/repos/akasha-backup-2026-09-02/pages` on page type and slug, never on id. 5,441 twin. 4,825 had their id changed: 3,777 old ids were already version 7, were replaced with no licence, and have been restored; 1,048 were version 5. Of all 4,825 replacements, 0 kept the last eight hex.\n\nThe version split runs whole page types rather than scattering, so sampling one type reads as all v7 or all v5 and hides the split. The v5 types are temper-item-category-tree 439, temper-completion-category 60, temper-dungeon 58, temper-companion-skill-line 45, temper-eso-trait-map 36, temper-affix-script 27, and 35 smaller ones.\n\nThe instrument was controlled both ways. persona-day showed 1,995 of 2,079 carried, so it detects a carry. Seven seeded perturbations moved its changed count from 84 to exactly 91. A repo-wide scan finds each of the 1,048 current ids exactly once, in its own page file, and a seeded control moved that scan from 3 hits to exactly 8, so the zero references is a true zero rather than a blind instrument.\n\nThe backup is not a pre-migration reference for temper. Its own `akasha/temper` folder already holds the minted ids: 12,269 of 12,269 pages match it identically. The only sources for a pre-migration temper id are the markdown under the backup's `pages/temper-*` and this repository's git history, which agreed on every pair sampled.",
} as const satisfies Finding
