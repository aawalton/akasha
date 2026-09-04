import type { Finding } from "../finding.page-type.ts"

export const nothingCanPointAtACollectibleBecauseACollectibleIsARow = {
  id: "01a0617b-1824-7000-9c01-b27261d49fe4",
  pageTypeSlug: "finding",
  slug: "nothing-can-point-at-a-collectible-because-a-collectible-is-a-row",
  domainSlug: "domain/temper",
  claim:
    "The collectibles catalog holds its 12,906 collectibles as `collectibles` entry rows on 130 subcategory pages rather than as pages. Each carries an id the game names it by, all distinct, and `tribute-data.generated.ts` already reaches twelve by `collectibleId`. An entry row has no slug and is reached only through the page carrying it, so no relation property can name a collectible, and the twelve `esoCollectibleId` numbers the patron pages state resolve against nothing.",
  evidence:
    "Measured on 2026-09-02 while landing the collectibles catalog as pages, commits 1af6d16c29 through 4978243cf1.\n\nThe recreation is 16 category pages and 130 subcategory pages of `temper-collectible-category` under `akasha/temper/temper-catalog/temper-pursuits/collectible-categories/pages`, with 130 `.jsonl` sidecars holding 12,906 lines of `eso-collectible-id` and `collectible-name`.\n\nPages for the collectibles were refused on population. The largest page type in akasha today is `temper-skill` at 1,636 pages; 12,906 would be near eight times that, and a collectible row carries an id and a name and nothing more.\n\nThe twelve ids `tribute-data.generated.ts` reaches, every one resolving to a row of Patrons/General: 11242 Almalexia, 10591 Ansei Frandar Hunding, 10406 Duke of Crows, 10405 Grandmaster Delmene Hlaalu, 11564 Hermaeus Mora, 10407 Psijic Loremaster Celarus, 10575 Rajhin, 10574 Red Eagle, 12442 Saint Alessia, 10403 Saint Pelin, 10607 Sorcerer-King Orgnum, 10911 The Druid King. Each patron page under `akasha/temper/temper-catalog/temper-pursuits/tribute-patrons/pages` states the number as `esoCollectibleId`, a property `temper-pursuit-thing` declares, and `relation-resolves` never judges it because a number property is no relation.\n\nThe two tables disagree on three of those names. Tribute writes `Rajhin, the Purring Liar` and `Red Eagle, King of the Reach` where the collectibles rows write `Rajhin` and `Red Eagle`. No page holds either name once, so nothing reconciles them.",
} as const satisfies Finding
