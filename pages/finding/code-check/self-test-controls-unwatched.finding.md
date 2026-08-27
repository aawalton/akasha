---
id: 1c6c00cf-1875-54af-9bd3-4a05162d9807
page-type-slug: finding
title: "Self test controls unwatched"
domain-slug: domain/global
---

# Claim

Three checks carry their own negative control as a private function, and nothing outside them watches that it is still there. `check-guard-reach` held them as a population; it was deleted by ruling, and each function is now the only evidence that its own detector can detect anything.

# Evidence

`check-agent-name-chokepoint.ts:26`, `check-messages-write-chokepoint.ts:27` and `check-porcelain-status-boundary.ts:49` each declare a private `selfTestFailure()`, called once before the check trusts its own scan — at lines 117, 148 and 99. Those three files are the only ones under `packages/infra/checks/src` carrying the name.

It is a real control rather than a smoke test. In `check-agent-name-chokepoint` it runs the detector over three known-bad sources it supplies — a `patchPageById` bypass, the slug as a double-quoted literal, and the same single-quoted, which was the spelling an earlier pre-filter dropped — and returns a reason if any fails to fire. The check then refuses: "A clean scan from a detector that cannot render its other verdict says nothing."

**None of the three has a test file of any kind beside it.** No unit test, no CLI test. The only thing asserting each detector is not blind sits inside the file it certifies, called by that file alone.

Until now `check-guard-reach` enrolled the three as a declared population and validated them repo-wide, so hollowing one was catchable from outside. It was deleted whole under Alan's ruling on the five annotation families, commit `7de93fdc27`, which also took the `@guard` tags its population derived from. The deletion was correct and these functions were deliberately kept.

What went with it is the watching. Nothing now enumerates which checks own a control, so an edit deleting one — or leaving it declared while weakening the bad inputs it feeds — takes a check from proven-sighted to unproven with no signal. That is the failure these controls exist to close: one that looked at nothing exits beside one that found nothing.

Not an argument for restoring `check-guard-reach`, whose population was the tags rather than these functions. It is a gap left by a correct removal, invisible from the branch that opened it.
