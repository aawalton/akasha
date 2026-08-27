---
id: 05452563-7ce5-548e-828f-c5597d95b879
page-type-slug: finding
title: "Triage fanout misattributes file"
domain-slug: domain/ops-cli
---

# Claim

`ops tests triage-fanout` produces a correct fail verdict with wrong file/workspace attribution, because it latches attribution onto the nearest preceding file/runner header in the interleaved fan-out output rather than the header of the worker that actually emitted the failure — so it can name two real, unrelated files and workspaces, neither of which is the true owner.

# Evidence

Found by aranya 2026-07-26 00:10Z while triaging a #16247 CI block. Routed to dalla (CI harness domain). Not dispatched.

Observed by #16264 on staging pipeline 26041 (2026-07-26 ~00:13Z): triage verdict "fail, 2 failures" (correct). Triage named file-level owners `src/delete.unit.test.ts`, `src/switch.unit.test.ts`; workspace owners `packages/alanwalton/elaine-points`, `packages/alanwalton/email/resolver`. Actual owner: `packages/alanwalton/daily-tracking-cli/src/cardio-ingest.unit.test.ts`. Both named files are real, in the daily-tracking-cli workspace, and each contains 0 occurrences of "cardio", the failing subject — nothing flags the attribution as wrong. Neither named workspace was the owner. True owner found by grepping the test name out of the fail evidence.

Mechanism: the fan-out runner interleaves concurrent workers' output; attribution latches onto the nearest preceding file/runner header, not the header of the worker that failed. Corroborated independently: a check-unit-tests log read "[run-typed-tests] unit: genuine failure in concurrent phase (exit 123) — ejecting" immediately followed by "0 fail" — same interleaving.

Cost: an agent is sent to debug clean files (two, in an unrelated workspace) for a failure owned by a third file in a different domain, while three agents were already primed to believe an infra failure was theirs. Nothing marks the attribution as a guess.

Fix shape proposed, not decided: attribute from the test name inside the fail evidence, not log position — greps to exactly one owner. If positional attribution stays as fallback, label it a guess. Regression test proposed: interleaved fixture, failure from the second of two concurrent workers, a header from the first immediately preceding — positional attribution passes today's tests since non-interleaved fixtures can't express the bug.

Project #16372, status someday_maybe, domain ops-cli. Carried no objective; captured off the project's retired `notes` attribute on 2026-08-15.
