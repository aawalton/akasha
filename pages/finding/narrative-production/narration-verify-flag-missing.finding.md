---
id: eeeebd37-6a07-59b9-b1d6-75e284980a4d
page-type-slug: finding
title: "Narration verify flag missing"
domain-slug: domain/narrative-production
---

# Claim

Every drained TWI narration job will fail exit 4 and burn permanently, because the narration enqueuer omits `--verify` while the mandatory post-render whole-chapter lint gate runs regardless, making an all-clean render of a long chapter effectively unreachable by chance.

# Evidence

Filed as project #15965 (domain narrative-production). Proven by a controlled render: chapter `019ea28e-0745-71f0-be76-53a11b784146`, "10.43 - RNG (Pt. 2)", 18,281 words, narrator erin, 2026-07-25, run with the drain's own command.

Mechanically healthy: 90/90 chunks rendered, drift 0.00s over 5.50s tolerance. Failed the mandatory post-render whole-chapter lint: 55 of 90 segments over gate, "not served." Every failed segment was under the WER threshold (0.35) but far over the insertion gate (max 10, observed up to 34) — continuation-echo failures (#15758's gate), not garble/truncation/drops.

Root cause: `packages/stories/narration/src/enqueue-narration.ts:124` builds the render command with no `--verify`. Per `@stories/cli` CLAUDE.md this is structurally unshippable: `--verify` moves the round-trip lint to generation time so an all-clean chapter is constructed rather than hoped for (whole-chapter re-render re-rolls all 55 segments' ~5-10% stochastic failure each render — the #15034 finding); the mandatory chapter-lint gate (#15758) runs regardless, before the store PUT. A non-verify render of a long chapter is a coin flip against ~90 stochastic failures, hard-gated on all-clean — success chance near zero. This is why 3 historical exit-4 rows exist and would have burned all 50 fresh jobs (no auto-requeue, as 180 jobs were burned 07-10..07-17).

Fix scope 1: enqueue `--verify`; consider raising `--max-retries` from 5. Verify roughly doubles STT cost — acceptable vs. guaranteed failure.

Scope 2 (investigate, don't assume scope 1 suffices): observed echo rate ~61%, far above the ~5-10% assumed; even --verify at max-retries 5 gives near-zero whole-chapter odds without the re-anchor escalation rescuing it. Candidate causes, none verified: erin's voice vs zadi's (#15870 A/B shipped with zadi); TWI prose hostile to continuation (bracket-marker collision theory checked and disproven); chapter-length drift. Verify before closing: re-run with --verify, confirm a served render.
