---
id: 2ec06270-3286-51dd-97a3-898085d6d333
slug: refund-pairing-amazon-only
page-type-slug: finding
title: "Refund pairing amazon only"
domain-slug: page-type/monarch-transaction
---

# Claim

Nothing joins a purchase to its refund outside Amazon. The only pairing key in the corpus is `amazonOrderNumber`, rebuilt from order-confirmation emails by #18168 and #18169 and carried by 118 of roughly 10,500 transactions; Monarch's own `linkedRetailTransactionId` is unset across the entire population. So the question *does a refund agree with the purchase it reverses* can be put to Amazon rows and to nothing else.

# Evidence

`bun ~/instructions/monarch/amazon-pairs.ts` — `monarch/amazon-pairs.ts` in akasha now — on 2026-08-09 reports 118 transactions carrying `amazonOrderNumber` across 89 orders, 26 of which hold both a charge and a refund. It found one real divergence — order `112-2256033-4142645`, a `Shopping` charge on 2026-07-01 at −$30.08 against a `Jenny's Spending` refund on 2026-07-30 at +$30.08 — which Alan settled to `Jenny's Spending` on both legs the same day.

The header of `monarch/amazon-pairs.ts` records that `linkedRetailTransactionId` is unset across the whole Amazon population, which is why the attribute had to be reconstructed from email at all.

The check reports a second and commoner fault beside divergence: a pair whose sides agree on `Uncategorized`, which passes a divergence test while meaning nobody decided anything. Both faults are unreachable for every merchant whose order numbers nobody has rebuilt.

Re-measured 2026-08-27 against akasha. The instrument stands at `monarch/amazon-pairs.ts`, 151 lines, keyed on `ORDER_NUMBER_KEY` — the literal `"amazon-order-number"` at `monarch/amazon-match.ts:13`. It is still the only pairing key: every tracked file naming an order number is an `amazon-*` module under `monarch/`, and `linkedRetailTransactionId` appears in no tracked file at all, so Monarch's own key is not merely unset but unread.
