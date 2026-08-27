---
id: 45de9276-bff7-53d0-bf3b-2d2ba33c4050
page-type-slug: finding
title: "Contract oracle aid misses the restated route"
domain-slug: domain/global
---

# Claim

Contract Oracle on `domains/file-kinds/tests.md` gives as its reason that an oracle built from the implementation's own steps "agrees with it by construction". That describes an expectation which CALLS the code. It does not describe one that RESTATES the code's predicates by hand — that is a real assertion when written, and reds if the implementation changes. It fails later and differently: at maintenance, where the cheapest repair is editing the restatement to match.

# Evidence

Carried out of `dirty/skills/agent-harness/rulings/measurement.md`, a quarantined source queued for removal, where it was ruled 2026-07-28. It replaces `findings/code-quality/restated-expectation-decays-at-maintenance.md`, which I filed earlier today and withdrew: its evidence asserted that nothing under `domains/` binds how a test's expected value is derived, which was false when written. Contract Oracle binds it. What survives is narrower and is about that rule's aid rather than its act.

The specimen. A property test asserted a census's accounting. Its first version took the denominator from the raw input. The landed fix took it from the implementation's own predicates, restated by hand rather than called:

    const placed = turnEnds.filter((t) => t.spawnedAtMs !== null)

The comment beside it defended the choice on the ground that a denominator computed by CALLING the code under test would agree by construction and assert nothing. True, and not the hazard here. Restating differs from calling: change the implementation's placement predicate and this test reds, so it is a real assertion rather than a tautology.

The failure arrives at maintenance. When the test reds, the cheapest repair is editing the restated filter to match the new implementation, and that repair is indistinguishable from a correct fix at review — same file, same shape, one predicate updated, green. The test then asserts as much as before, and nobody can tell. An expectation taken from the INPUT has no filter to adjust; if the partition breaks, the only route to green is fixing the code.

The operable test is therefore not whether the expected value agrees with the implementation today, but whether a maintainer facing a red could MAKE it agree without touching the code.

Beside it: the comment was written by someone guarding against this very class, and named a real distinction. A guard citing a genuine principle while defending the wrong flank is harder to catch than one with no reasoning at all.
