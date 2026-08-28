---
id: 69554614-f76a-5b4d-8d34-c2dd4e51b698
slug: chunk-read-fabrication-remainder
page-type-slug: finding
title: "Chunk read fabrication remainder"
domain-slug: domain/temper
---

# Claim

Three sites in Temper's inventory-chunk read path fabricate a shorter-than-actual result instead of failing on a truncated or malformed chunk read, and are not closed by the fixes #15961 and #15962 already landed for the sibling defect class.

# Evidence

Filed as project #15978 (domain temper). Surfaced by #15962 closing the truncating-read class in the watcher, and #15961 closing the null-collapse in `readLatestInventory`. Neither fixed these; both stopped deliberately at the boundary.

Item 1 — truncating chunk reads, not a drop-in fix: `.../cli/src/temper/inventory/snapshot.ts:162` (readChunks; corrected from the originally reported :151, which is `readHeaderById`, a correctly-bounded PK probe, not a defect) and `buy-rule/list.ts:128` (`limit: CHUNK_FETCH_LIMIT` = 200). Both read temper-inventory-chunk rows with a fixed limit, discarding the cursor; rows are string shards of one JSON document, so a truncated read yields a valid-prefix parse failure. Not fixed in #15962 because these call `getPagesForView`, which has no `collectPagesForView` counterpart in `@shared/pages-access` — adding one (mirroring `collectPages` in `iterate.ts`) is probably the right shape.

Item 2 — a third copy of the collapse, UI-facing: `packages/temper/game/items/core/src/assemble-inventory.ts:43` carries both defects #15961 removed from `readLatestInventory` — `readString(c.data) ?? ""` (worse than truncation: can splice chunks into a shorter blob that still parses) and a bare catch returning null. Consumers: buy-rule CLI, snapshot CLI, `hooks-inventory.ts`. Not fixed: #15961/#15962 judged the UI behavior change a call not to make blind; the `InventoryReadResult` union #15961 built is the ready-made fix shape.

Item 3 — already fixed, for context: `inventory-plan-helpers.ts:88` had the same defect, fixed by #15962 (migrated to `collectPages`); failed loudly but misdiagnosed the cause, and still carries the fabricate-empty-string map.

Additional site (#15962's correction): `hooks-inventory.ts:75`, `limit:200` — above 200 chunks the UI renders a permanent empty skeleton.

Correction: headline is fabrication, not truncation — credit #15961. Truncation is the mechanism; fabrication is the harm, since a fabricated short answer is undetectable while an honest one is not.
