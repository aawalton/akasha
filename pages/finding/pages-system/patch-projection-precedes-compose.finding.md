---
id: 521bc7de-739e-5aaf-bb01-e3c9201b3236
slug: patch-projection-precedes-compose
page-type-slug: finding
title: "Patch projection precedes compose"
domain-slug: domain/pages-system
---

# Claim

Every single-row page-patch proc returns a projection taken from the row as it stood BEFORE its compose step, so a caller selecting a compose-governed key reads a value the same transaction has already overwritten. `projectPage` is built from the `patchUpdate` snapshot, while `composeCompletionProgress` and `enforcePageCoherence` both write the row between them. Nothing in the return marks which keys a compose rule governs, so the mistake is invisible at the call site and a second read looks redundant.

# Evidence

Read 2026-08-07 off the `~/code` checkout.

In each of the four patch procs under `packages/shared/pages/proc/src/`, `const updated = await ctx.patchUpdate(…)` is followed by `await ctx.composeCompletionProgress(…)` and `await ctx.enforcePageCoherence(…)`, and only then by `ctx.projectPage(updated, …)`. The four line quadruples, in that order:

- `page-patch-by-id.ts` — 118, 151, 155, 193
- `page-patch-by-seq.ts` — 71, 99, 103, 135
- `page-patch-by-id-if-status.ts` — 70, 98, 102, 134
- `page-patch.ts` — 121, 168, 172, 210

Both intervening calls write the row. `pages/finding/pages-system/compose-and-coherence-headers-miscount.finding.md` records compose's own header at `_compose_completion_progress.ts:32-38` requiring the guard to observe the composed row, which is why compose runs where it does.

The population of callers that select a compose-governed key is not measured here, and cannot be found by looking: a stale read is silent wherever the pre-compose and post-compose values happen to agree.

Found emptying `dirty/skills/pages-system/findings.md`, which recorded the same shape from a different instance. That instance is gone — `page-patch-by-seq-if-unclaimed.ts` and `observe-settled-claim.database.test.ts` were deleted when claiming a row moved to writing the seat, and migration 5578 (`5d598992a2`) dropped the proc — but the shape it named survives unchanged in the four procs above.
