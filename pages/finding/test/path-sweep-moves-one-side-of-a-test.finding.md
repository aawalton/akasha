---
page-type-slug: finding
id: bfea992a-7dcc-5bb9-9636-7f4a91c867d4
title: "A path sweep over test files rewrites one side of a relation and silently changes what is asserted"
domain-slug: domain/test
---

# Claim

A path sweep is safe over source and unsafe over tests, structurally rather than for want of care.

Source states one side of a relation: a resolver answers where a thing stands. One right answer, so rewriting the literal either fixes it or breaks it visibly.

A test states both sides — an input and an expectation — and their relation is what is under test. Rewrite one side and the test still runs, still passes or fails, and no longer asserts what it was written to assert.

# Evidence

During the page relocation of 2026-08-21, a declaration sweep moved page types from their old globs to `pages/<slug>/`. Astra measured that 23 of the 25 resulting test failures were of this shape rather than genuine faults in the code under test.

Two cases were diagnosed in detail, and both were initially reported as live production faults by readers of the red tests, including by me:

`page-sidecars.test.ts` called `sidecarCarriedTo` with `sidecarPath` left at `domains/personas/astra.portrait.attachment.txt` while `from` had been swept to `pages/persona/astra.md`. The function's contract is that the sidecar stands beside `from`, so the swept call violated its own precondition and rendered as `pages/persona/astratra.portrait.attachment.txt`. Astra audited all 15,692 tracked sidecars across the instructions, memory and stories repositories for a page standing beside each, and found zero orphans: the bulk mover always passed the old path as both arguments, which is coherent, so no live call had ever been made in the broken shape.

`default-unique.test.ts` had its expected claimant strings swept to `pages/persona/…` and `pages/role/…` while its fixture helpers at lines 34-35 still wrote the fixture documents to `domains/personas` and `domains/roles`. Since `defaultClaims` resolves ownership through the real repository's page types rather than the fixture's, a fixture file at the old path was claimed by nothing, the searched population stayed at zero, and no second claimant could ever be seen. The four failures were repaired by moving the two write paths, not by touching the assertions.

A negative signal worth recording beside these: five test-removal delegates working across the same afternoon hit `read-before-write` refusals repeatedly as sweep batches landed under them, and each re-read and retried rather than papering over. Had any of them suppressed the refusal, it would have been landing removals into files whose inputs had been swept out from under their expectations.
