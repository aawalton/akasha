import type { Finding } from "../finding.page-type.ts"

export const theInventoryChunkGapIsAlreadyClosedForEveryCaptureThatParses = {
  id: "01a06579-b61e-7000-9fa3-541761b111bc",
  pageTypeSlug: "finding",
  slug: "the-inventory-chunk-gap-is-already-closed-for-every-capture-that-parses",
  domainSlug: "domain/temper-holdings",
  claim:
    "The chunk gap should be closed rather than kept, and most of it closed already without anyone noticing. Every item stack of 151 of the 157 captures is in that capture's snapshot `stacks.jsonl`, agreeing on location, bag, slot, item and count. The other 6 are truncated at the 900,000-byte boundary and parse as nothing. What is homeless is not 377 megabytes of items but four small fields of scan bookkeeping.",
  evidence:
    "Measured 2026-09-02. Rejoining each capture's `.data.attachment.txt` in chunk-index order and flattening `locations` to `bags` to slots gives, for 151 of 157 captures, exactly the set of `locationId|bag|slot|itemId|stackCount` the snapshot's `stacks.jsonl` holds: 151 identical, 0 differing. The 11 item fields all carry across, `itemName` as `title` and `requiredCP` as `requiredCp`.\n\nThe 6 that do not are 7 files of 900,001, 900,002 or 1,800,003 bytes, each ending mid-token, one on `\"saleAvg\":11.64,\"min`. They parse as nothing, which is why no stacks landed for them. They are captures broken before the migration rather than a migration gap, and rejoining cannot recover them.\n\nWhat the chunks hold and no page does: `meta.lastFullScan`, 150 distinct values, one per capture; `meta.priceSource`, `ttc` throughout; each location's `lastScanned`, 346 distinct values; and the map from a location id to its name, 43 entries. Character locations are reachable, since `Auriel`, `Erin Solstice` and `Bastian Hallix` are all in `akasha/temper/temper-character`, but the ids are not: `8796093011111111`, `CraftBag` and `HouseBank:5462:4676` are nowhere. `lastFullScan` and `priceSource` are in akasha only inside `watcher-import-inventory.module.code.ts`, as code reading them rather than a page keeping them.\n\nSo the work is small and worth naming: give `temper-inventory-snapshot` a scanned-at and a price source, and give the 43 locations a table of their own. Then the 451 attachments of the parsing captures go, and the gap on `temper-inventory-chunk.page-type.ts` is no longer true.",
} as const satisfies Finding
