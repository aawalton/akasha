---
id: 01a046c4-1975-79ac-99ea-c7c200487ebc
slug: required-reading-resolves-from-rows-nothing-tests-them
page-type-slug: finding
title: "Required reading resolves a slug from index rows and tests nothing about their currency"
domain-slug: domain/pages-system
---

# Claim

`addressIndexIn` resolves a slug to a page from index rows alone (`page/required-reading/address-index/address-index.ts:41`), then reads that page's body live. Nothing on the required-reading path calls either freshness guard in `page/index/store/store.ts`, so a row whose stated `slug:` has drifted resolves to the wrong page and then reads that page correctly — wrong, with nothing saying so. Measured 2026-08-27: zero drift across 58,994 rows, so the hazard is real in shape and not firing.

# Evidence

Read `store.ts:219` `indexReaches` (a canonical path compare) and `store.ts:235` `indexFreshFor` (the stored mark against a fresh git walk). Traced every caller: `indexFreshFor` at `graph/page-index/page-index.ts:80` and `graph/edge-producer/relation/relation.graph-edge-producer.code.attachment.ts:130`; `indexReaches` at `page/index/scan/scan.ts:26`, `tools/lib/page-declared.ts:106`, `repo/land/landing.ts:72`. Neither is reached from `page/required-reading/warrant/warrant.ts` or `address-index.ts`.

The exposed surface is wider than those two files. `standingHere()` is called from `ops-cli/global/read/seat.ts:22`, `required.ts:28`, `conditional.ts:43`, and from `checks-system/check/read-before-write/read-before-write.check.code.attachment.ts:108` and `read-what-is-required/read-what-is-required.check.code.attachment.ts:99`. A seat taking its own reading resolves through this path.

`warrant.ts:16` holds `let held: Standing | null` at module scope with no TTL, no stamp and no clear. `during-call/during-call.ts:14-16` states the opposite discipline: nothing is held outside a call, which is what keeps a held answer from outliving the files it was taken from. This cache sits outside that discipline and lasts the process. For a CLI run that ends in a second it is harmless; for a long-lived host it is not, and the `AddressIndex` it holds memoises live-read bodies too.

Scanned every row, comparing it against `statedOf(heldOf(live file))`: 58,994 rows, 0 drifted, 0 missing, 0 unparsable. I did not construct a drifting page and watch it misresolve, and I did not measure how long such a window lasts.
