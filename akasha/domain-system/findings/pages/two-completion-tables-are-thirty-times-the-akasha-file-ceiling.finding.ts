import type { Finding } from "../finding.page-type.ts"

export const twoCompletionTablesAreThirtyTimesTheAkashaFileCeiling = {
  id: "01a0607a-9cc1-79ea-b9bc-f4177edc5825",
  pageTypeSlug: "finding",
  slug: "two-completion-tables-are-thirty-times-the-akasha-file-ceiling",
  domainSlug: "domain/temper",
  claim:
    "temper/game-completion held two generated tables no akasha file can hold: lore-library-data.generated.ts at 438,494 bytes and recipe-data.generated.ts at 243,084, against a ceiling of 15,000. Both now stand in temper-completion, divided into 75 modules under two gathering modules. This page earlier said both were written out from the akasha pages table. That was wrong, and it made the work look avoidable: both are captured from Elder Scrolls Online saved variables, and no page feeds either.",
  evidence:
    "The generators read saved variables rather than pages. tools/lib/temper-catalog-generate/tiers/lore-library.ts line 17 reads accountWide.loreLibraryCatalog and tiers/recipe.ts line 15 reads accountWide.recipeCatalog, each parsed by a zod shape from temper-game-catalog-capture-host. Neither reads a page. The negative was checked too: temper-catalog/temper-world holds 171 pages across alliances, catalog-domains, dungeons, location-types, quest-givers, races, source-categories and zones, against 6,590 books and 4,027 recipes, and no book page or recipe page exists anywhere in akasha. The only lore and recipe pages are the two catalog-domain descriptors. So there was no generator and repoint to take, and landing these copied no page back into akasha. Ten files outside the package import the two tables rather than the eight this page first counted. Order was proved rather than assumed before the division landed: the whole nested structure round-trips to byte-identical ordered JSON, 6,590 lore books and 4,027 recipes agree index for index, and the recipe name to item id map agrees on all 4,024 keys, which pins the last-wins order of the three duplicated recipe names Sweetroll, Orcish Bookcase Peaked and Dwarven Pipeline Cap Sealed.",
} as const satisfies Finding
