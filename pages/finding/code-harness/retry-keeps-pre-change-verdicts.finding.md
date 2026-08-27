---
id: 2d069f3b-32e9-5a7a-8a3d-041299a81689
slug: retry-keeps-pre-change-verdicts
page-type-slug: finding
title: "Retry keeps pre change verdicts"
domain-slug: domain/global
---

# Claim

`ops pipeline retry` re-dispatches only the failed workflow, so surviving steps keep the verdicts they earned before it. A pipeline reporting PASS after a change to shared state may have tested none of it, and nothing says which steps predate the change.

# Evidence

Measured 2026-08-02 by the manager of #17440, reading its own green run rather than accepting it.

Pipeline 26943 on `project-17440` returned `VERDICT: PASS ... [over 130 of 130 CI steps]` at 15:45Z. The live `status` picker row was reordered at 15:41:08Z. The verdict therefore appears to straddle that change and does not.

The timeline as observed: `check-status-vocabulary-drift` ran 15:30:37Z to 15:30:38Z and passed, reporting "the same 25 values as PROJECT_STATUS_VALUES, in the same order". The reorder landed at 15:41:08Z. `check-typesafety-bundle-shared` — cured after an unrelated exit 124 — re-ran at 15:44:26Z and was the only step re-dispatched, `workflowsReset=1, stepsReset=1`.

So 129 of the 130 steps carry verdicts earned before the reorder, the drift check among them. The green is real about the tree and silent about the change, and its denominator says 130 either way.

The reading this defeats is the obvious one. A reader establishing whether an accepted window has cost anything looks for a green pipeline dated after the window opened, finds this one, and concludes the window is harmless — having read 129 pre-window steps and one post-window step that does not test it.

Nothing announces the split. The verdict carries a step count and a terminal status, and both are identical whether every step ran at the reported time or one did. A retry after an infra failure is also the ordinary, correct cure, so the case arises on the path a careful operator already takes rather than on a mistaken one.

The general shape: a partial re-dispatch keeps a pipeline's identity and timestamp while replacing part of its evidence, so the run's age is a property of each step rather than of the pipeline, and only the pipeline's age is reported.
