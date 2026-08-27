---
id: 418285f1-3a6f-504c-a26c-6189d85c163c
slug: remedy-blocked-by-what-the-check-passes
page-type-slug: finding
title: "Remedy blocked by what the check passes"
domain-slug: page-type/refusal
---

# Claim

`refusals/domain-unowned.md` cannot name a remedy from what it is passed: the repair may sit at any document along the ownership chain, the check hands it `{path}` alone, and `ownerOf` returns null rather than where the descent stopped — so the missing act here is blocked by code rather than unsettled by judgment.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/domain-unowned.md` dispatched from `review-documents`. The reading raised it and declined to add a hole; the printers were checked here.

`tools/checks/domain-edges.ts:216` prints the body with `path` and nothing else. `tools/lib/domain.ts` `ownerOf` returns `null` where the walk ends without a persona, and does not report the document it stopped at. Naming the repair site needs a second hole and a change to that function.

This is a counter-example to reading the remedy question as a split between gate bodies and check bodies. Two siblings printed by the same check — `refusals/persona-champion-unreciprocated.md` and `refusals/championed-domain-unnamed-back.md` — each close with a remedy. So a check body can carry one, and what stops this one is what it was handed.

A second instance, and a sharper one, from `refusals/hook-extra-in-payload.md`: there the check declines the knowledge on purpose. `tools/checks/hooks-delivered.ts` holds nothing about the payload generator — "nothing here knows the generator's directory, its naming, or that it content-addresses" — because a check spelling that glob would pass over an empty one the day it moved. So the question is not only what a printer happens to hand over, but whether a refusal may name what its check has deliberately refused to hold.

Not measured: how many other check-printed refusals are handed too little to name their remedy, or what the second hole would cost at `ownerOf`'s other call sites.
