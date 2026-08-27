---
id: b310fa42-6d56-5783-b3fd-7af1ea66e836
page-type-slug: finding
title: "Ported arms are recordings"
domain-slug: domain/agent-harness
---

# Claim

Roughly a third of the ported supervisor's suites hold their standing side as a recording frozen from
the code repository's implementation, so between now and that copy's removal a divergence in either
tree turns nothing red.

# Evidence

The `port-supervisor-file` task's stage 4 originally assumed a standing suite to carry. Several
supervisor files have none — the config-shaped ones carry none at all — and four seats independently
derived the same answer rather than inventing expectations: drive the code repository's own
implementation over a vector set and freeze what it answered. I landed that as a stage 4 bullet on
2026-08-12 (commit b9aede1ae) because each seat was re-deriving it.

It is the stronger arm on the axis that mattered — it measures what that tree DOES rather than what
somebody chose to assert about it — and every seat using it said plainly that it is a RECORDING which
will not turn red if that tree changes. Around 29 test files under `tools/tests/` now name a recording
or a frozen capture.

The consequence is not a defect in any port. It is that equivalence is established at a moment rather
than maintained. Until #18836 removes the code copies, both implementations stand and either may move
without anything reporting it; after removal the recording is the only record, which is fine, because
there is no longer a second thing to agree with. The exposed window is exactly the gap between the
last port landing and the removal completing, and that window is where a re-point is also being made
to every launcher and unit.

One narrower fragility of the same method, flagged by the seat that landed
`tools/tests/supervisor-ask-rule.test.ts` and kept deliberately: one vector degrades on an
engine-raised TypeError, so its recorded notice pins JavaScriptCore's wording and a Bun upgrade could
turn it red with neither implementation having moved. It is the only vector covering a read that throws
something the caller did not author. Projecting that notice onto its shape rather than its bytes would
keep the branch and drop the engine coupling.
