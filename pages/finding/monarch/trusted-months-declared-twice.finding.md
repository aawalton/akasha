---
id: 1fbd0524-142b-5f8b-b619-8ec78edcfcc6
page-type-slug: finding
title: "Trusted months declared twice"
domain-slug: domain/monarch
---

# Claim

`TRUSTED_MONTHS` is declared twice in `monarch/`, and the second copy is the one the evidence SQL reads. Changing Alan's boundary moves the sync window and the report and silently leaves the evidence query on the old figure.

# Evidence

`monarch/transaction.ts:103` is `export const TRUSTED_MONTHS = 12`, with a docblock at :95 calling it "How far back a standing category may be believed — Alan's boundary". `monarch/evidence.ts:34` is a separate private `const TRUSTED_MONTHS = 12`, interpolated into SQL at `evidence.ts:65` and into printed prose at `:270`. `monarch/report.ts:32` imports the exported one; nothing connects the two. `rg -n 'TRUSTED_MONTHS' .` over `~/instructions` returns exactly these seven lines.

The single-source reading is what commit `97e01a9f3` was for: it replaced the sync's own 270-day figure with `trustedFrom()`, its message saying a window narrower than the period being scored left scored rows never refreshed, and `sync.ts:26-29` states that one boundary "declared where it is Alan's to set" is what keeps the two from parting again. The duplicate one file over reopens exactly that.

`monarch/page-type.ts:23-26` records the same shape having already cost something here: two copies of the page-type seeder stood until 2026-08-08 and "had already drifted by the time they were collapsed".
