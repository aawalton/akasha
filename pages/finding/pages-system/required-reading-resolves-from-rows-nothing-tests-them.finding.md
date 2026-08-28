---
id: 01a046c4-1975-79ac-99ea-c7c200487ebc
slug: required-reading-resolves-from-rows-nothing-tests-them
page-type-slug: finding
title: "Required reading resolves a slug from index rows and tests nothing about their currency"
domain-slug: domain/pages-system
---

# Claim

`addressIndexIn` resolves a slug to a page from index rows alone (`page/required-reading/address-index/address-index.ts:41`), then reads that page's body live. Nothing on the required-reading path calls either freshness guard in `page/index/store/store.ts`. A row whose stated `slug:` has drifted keeps resolving the retired address and stops resolving the current one, and where another page has taken the retired slug it resolves to that one — read correctly, wrong, with nothing saying so.

# Evidence

Read `store.ts:219` `indexReaches` (a canonical path compare) and `store.ts:235` `indexFreshFor` (the stored mark against a fresh git walk). Traced every caller: `indexFreshFor` at `graph/page-index/page-index.ts:80` and `graph/edge-producer/relation/relation.graph-edge-producer.code.attachment.ts:130`; `indexReaches` at `page/index/scan/scan.ts:26`, `tools/lib/page-declared.ts:106`, `repo/land/landing.ts:72`. Neither is reached from `warrant.ts` or `address-index.ts`.

The surface is wider than those two files. `standingHere()` is called from `ops-cli/global/read/seat.ts:22`, `required.ts:28`, `conditional.ts:43`, and from both read gates (`read-before-write:108`, `read-what-is-required:99`). `ops read --seat` resolves through it, so this is the path by which every agent in the fleet learns what it is required to know.

`warrant.ts:16` holds `let held: Standing | null` at module scope with no TTL, no stamp and no clear. `during-call/during-call.ts:14-16` states the opposite discipline: nothing is held outside a call, which is what keeps a held answer from outliving the files it was taken from. This cache is outside it and lasts the process — harmless for a run that ends in a second, not for the editor extension host.

Scanned every row against `statedOf(heldOf(live file))`: 58,994 rows, 0 drifted, 0 missing, 0 unparsable, so it is not firing here. Constructed it in a clone: changing one finding's `slug:` without landing it left `domainAt` resolving the retired address to that page while the body it then read stated the new slug, and the current address resolved to null. Resolution follows the row; the read that follows it is live and correct.
