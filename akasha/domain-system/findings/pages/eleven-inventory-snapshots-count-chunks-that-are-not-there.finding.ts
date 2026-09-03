import type { Finding } from "../finding.page-type.ts"

export const elevenInventorySnapshotsCountChunksThatAreNotThere = {
  id: "01a05fdf-9a2c-70a0-b16d-dff82335e524",
  pageTypeSlug: "finding",
  slug: "eleven-inventory-snapshots-count-chunks-that-are-not-there",
  domainSlug: "domain/temper-holdings",
  claim:
    "Eleven of temper's 162 inventory snapshots say they were divided into three chunks and fewer than three chunks were kept. Five kept none at all, and name no capture group anywhere in the source. All eleven carry no `stacks` sidecar, so no slot of those eleven readings is in akasha. The six that kept one chunk or two are not wholly gone: their prefixes hold 11,691 whole item objects.",
  evidence:
    "Counting the chunk pages by the snapshot each names, against the `chunk-count` each snapshot states: 2026-08-23-19-20-52, 2026-08-27-16-18-43, 2026-08-27-16-28-34, 2026-08-27-16-41-32 and 2026-08-27-16-49-08 have none of the three; 2026-08-21-22-50-38, 2026-08-21-23-20-05, 2026-08-23-17-49-17, 2026-08-23-18-45-06 and 2026-08-23-19-46-46 have one of three; 2026-08-23-19-57-23 has two of three. The other 151 hold every chunk they count.\n\nCounted again on 2026-09-03 from both sides. `pages/temper-inventory-chunk` holds 458 shard files in 157 capture groups, and every one of the 157 has a snapshot page under `akasha/temper/temper-holdings/inventory-snapshots/pages`. There are 162 such page folders, so the surplus is exactly the five, which name no capture group at all rather than a partial one. Each of the five states `chunkCount: 3`. Eleven of the 162 folders hold no `.stacks.jsonl`, and they are these eleven; the other 151 hold one, 674,612 rows together.\n\nThe loss is in the source under `pages/temper-inventory-chunk`, ahead of the migration, so recreating carried it across unchanged. Whatever wrote the chunks lost some without lowering the count the snapshot states, so nothing in temper noticed.",
} as const satisfies Finding
