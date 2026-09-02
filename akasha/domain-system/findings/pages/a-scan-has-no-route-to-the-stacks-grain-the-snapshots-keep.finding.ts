import type { Finding } from "../finding.page-type.ts"

export const aScanHasNoRouteToTheStacksGrainTheSnapshotsKeep = {
  id: "01a060b3-6300-7046-996e-5f980d0e10c6",
  pageTypeSlug: "finding",
  slug: "a-scan-has-no-route-to-the-stacks-grain-the-snapshots-keep",
  domainSlug: "domain/temper",
  claim:
    "The watcher now files a net worth reading into akasha and still files no inventory snapshot. `temper-inventory-snapshot` keeps a scan as one `stacks` line per slot and `temper-inventory-chunk` keeps a byte count alone, while the writer holds the scan as sharded JSON. Turning a scan into those lines is a conversion nobody has written or proved, so the writer reports which numbers it could not keep rather than filing a second shape of them.",
  evidence:
    "`temper/scripts/src/watcher/import-inventory.ts` parses the scan, computes the total and the net worth, and shards the JSON with `shardInventoryJson`. It now lands the net worth on its hour page through `writeFiles`, and reports the snapshot unfiled.\n\n`akasha/temper/temper-holdings/inventory-snapshots` holds 162 pages, each a page file and a `stacks.jsonl` of one line to a slot, keyed `id, locationId, bag, slot, itemId, title, itemLink, quality, filterType, itemType, traitType, requiredLevel, requiredCp, stackCount, specializedItemType`. The old store held the same reading as the sharded JSON itself, at `pages/temper-inventory-chunk/*.data.attachment.txt`. So the recreation broke the document into rows, renaming `itemName` to `title` and `requiredCP` to `requiredCp`. `akasha/temper/temper-holdings/inventory-chunks` keeps 458 chunk pages carrying `chunkIndex` and `byteCount`, and states the gap outright: `The bytes a page here counts are not in akasha`.\n\nFiling the net worth and not the snapshot loses nothing that was being kept. Neither landed before, because the writer threw at its first store touch, and the throw named the snapshot it dropped.\n\nWhat a writer emits here wants proving against the 162 snapshots already landed, the way the day and the hour grains were proved against the 119 day pages and the 787 hour pages the recreation left.",
} as const satisfies Finding
