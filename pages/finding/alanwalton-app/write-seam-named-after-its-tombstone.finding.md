---
id: afe66902-bf2f-5b0d-b0c5-53071bffb8a1
page-type-slug: finding
title: "Write seam named after its tombstone"
domain-slug: domain/alanwalton-app
---

# Claim

The header docblock of `packages/alanwalton/daily-tracking/src/write-daily-points.ts` names `writeActiveCalories` as a live write seam at lines 20-21, while the same file tombstones that function at line 95 as removed in #18149. One file answers the same question two ways, 75 lines apart.

# Evidence

Measured 2026-08-08 in /var/home/walton/code, tracked files only.

Lines 20-21, in the file's opening docblock, present tense: "Their write seams are `writeActiveCalories` / `writeStrengthVolume`, not `cardioPoints` / `strengthPoints` writers."

Lines 94-101, a block comment sitting where that function used to be: "THE CARDIO PILLAR HAS NO WRITE SEAM, and its absence here is deliberate rather than an omission. `writeActiveCalories` stood at this spot until #18149 and stored one summed scalar per day ... Adding a writer back would undo the whole of that."

The function is gone. `rg -uuu -l "writeActiveCalories"` over the repo returns three paths and `git ls-files` keeps only this one; the other two are `dist/` and `web/build/` residue. The seams exported here are `writeFaithPoints`, `writeLearnPoints`, `writeStrengthVolume`, `writeSleepPoints`, `writeNutritionPoints`, `writeTaskPoints` and `writeBreathingPoints` - seven, none of them cardio. The removal is `359379e00a`, "18149: the circle reads the samples, and every writer of the old daily scalar is retired".

The cost is that the docblock is where a reader starts. Someone adding a pillar writer reads lines 20-21, goes looking for `writeActiveCalories` to copy, and finds the tombstone arguing against what the header just told them exists.

Distinct from `pages/finding/alanwalton-app/cardio-rate-stated-twice.finding.md`, which I opened before filing. That one is about the RATE and cites this file's lines 18 and 96. This is about the SEAM two lines below: not what rate is stated, but that the named function does not exist. Two of that finding's other cited sites, `cardio-set.ts:13` and `cardio-ingest.ts:16`, were deleted by the same commit; I did not edit it.

Found while ingesting `dirty/code/packages-alanwalton-daily-tracking-cli-docs-design.md`, whose "Health-points verbs" bullet recommends the retired writer and was cut for it.
