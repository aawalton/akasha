---
id: d2049969-3d40-525b-a788-0cc4fd4a60cb
page-type-slug: finding
title: "A correction cannot outlive the code that caused it"
domain-slug: domain/deploy
---

# Claim

A data correction verified live is not durable while the code that produced the fault is still deployed. Where the old writer only ever raises a value, the contaminated figure is always the higher one, so every downward correction is guaranteed to be reverted by the next run rather than merely at risk of it. The revert records nothing, because raising the value is the guard succeeding.

# Evidence

On 2026-08-11 project #18614 rebuilt Amy's running total from her real history to 64.5417 and verified it live. The verification was honestly made and true when made. The daily cron then ran, and her total came back as 14,109.609444444446. Ione moved in the same run.

The fix for the underlying fault — `withDerivedActiveCalories` in `packages/alanwalton/daily-tracking/src/health-total-points.ts` stamping Alan's own active calories onto every Health persona's rows — was on its branch and not on `origin/main`, so production still ran the old pass. It recomputed her Health rows as her real 38.9167 plus 14,070.04 of Alan's calories, compared 14,109 against the stored 64.5417, found the new figure higher, and wrote it.

`decideTotalPointsWrite` in the personas core package is the guard, and it behaved correctly at every step. `domains/persona-points.md` says a persona's running total only ever rises unless a backfill rewrites it downward, so a raise is the mechanism working and there is nothing for it to report.

The two failure modes come apart here and only one of them is visible. A correction that is WRONG is caught by verification. A correction that is CORRECT but not durable passes verification, because at the moment of the check it is true. Nothing distinguishes them from inside the run that made the write.

The ruling that no Health persona is written before the deploy already stood, on the ground that such a write was forbidden. That reason was right and was not the strong one: the strong reason is that a correct write cannot survive. A deploy was being treated as a precondition for correctness when it is also a precondition for durability, and the two separate exactly inside this window.

`domains/land.md` covers a change becoming part of a repo and says nothing about the interval between landing on a branch and the deployed code changing. Nothing found binds the ordering of a data correction against the deploy that removes its cause.
