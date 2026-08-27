---
id: 5c496859-93d1-5b20-9b46-ddb7a92d0d92
page-type-slug: finding
title: "Check JSON stale worktree zero"
domain-slug: domain/ops-cli
---

# Claim

`bun ops project check --json` can return `"steps": []` on a successful run whose pipeline record shows real completed steps — pipeline 25693, 101 completed steps — because a worktree made before #15966's fix (`6a277bbf93`, 2026-07-25T09:41:13Z) still runs the pre-fix hardcoded `steps: []` at the old `check.ts:313`; a caller reading `steps.length` from its own worktree gets a false zero, in every worktree made before the fix, independent of any defect in the fixed code.

# Evidence

Project #16041 (domain `ops-cli`, parent #15962), owner ember, created 2026-07-25T10:07:45Z, `someday_maybe`, no objective. Recorded 2026-07-25T10:11:57Z, answering a report of `steps: []` on pipeline 25693.

**Timing settles the report.** Pipeline 25693 created 09:34:17Z; #15966's fix (`6a277bbf93`) landed 09:41:13Z. The `steps: []` seen was the pre-fix hardcoded value at old `check.ts:313`. #15966 replaced it: `check.ts:322` now maps real `stepRows` into `stepsTotal`/`stepsCompleted`.

**Verified on the exact pipeline.** Found by `seq` (a promoted column); 2 workflows, both joined and status-set; 101 steps under them; 0 missing `stepName` or `status`. Current code returns 101, not `[]` — the report was stale, not wrong. One residual `steps: []` on main is legitimate: `check.ts:247`'s `skipped-empty-diff` branch states `stepsTotal: 0`/`stepsCompleted: 0`, a labelled zero.

**Residual hazard for in-flight workers.** `bun ops project check` runs from the caller's worktree, not main. Any worktree made before 09:41:13Z still emits the hardcoded `steps: []`; a landed fix does not reach a worktree made before it landed. Mitigation: read the denominator from `ops pipeline steps --seq N --json`, guarding stale-worktree skew where the code is right and the caller's copy is not.

**Related hazard, filed in full as #16043.** `fetchPipelineStepRows` (source of #15966's denominator) has the docstring "Never throws — an unexpected shape yields `[]`," with three silent-empty exits. None fired here, but an empty return now arrives labelled `stepsTotal: 0`, reading as measured rather than absent.

**Correction from another reviewer:** the guess that #16017's parent was ownerless was wrong — #16011 was owned and intake-stamped, #16017 was still born orphaned. Rule: naming a parent confers nothing; the guard fails loud only when none is named.

Capture broke off at a paragraph boundary; the rest was never filled in. Text above moved off the project's `notes` on 2026-08-15.
