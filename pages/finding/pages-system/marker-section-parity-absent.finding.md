---
id: 05dfd165-ca53-55de-b170-0a17ca8f3822
slug: marker-section-parity-absent
page-type-slug: finding
title: "Marker section parity absent"
domain-slug: domain/pages-system
---

# Claim

The `markerSectionWhenEq` coherence rule kind is evaluated by two independent implementations — the pure TS `evaluateCoherenceRules` and the deployed plpgsql `_enforce_page_coherence` — and no test compares them. Every other guard kind has a `*-coherence-guard.database.test.ts` file replaying a shared fixture matrix through both; this one has none, so the two can disagree on whether a row is coherent, and on the violation detail they raise, with nothing reporting it.

# Evidence

Read on 2026-08-07 against `~/code` at main.

`COHERENCE_RULE_ARMS` in `packages/shared/pages/core/src/schema/coherence-rules.ts` declares four kinds carrying a guard arm: `valueIn`, `requires`, `numericEqualityWhenPresent` and `markerSectionWhenEq`. `moveValueToListWhenValueIn` is compose-only and has no guard branch to be in parity with.

Three parity files stand, each replaying one fixture matrix through both evaluators:

- `packages/alanwalton/daily-tracking/src/faucet-coherence-guard.database.test.ts` — `valueIn` and `requires`.
- `packages/alanwalton/projects/cli/src/lib/handoff-coherence-guard.database.test.ts` — `requires` alone; its single `describe` names "the ask-stated requires rule", and `PROJECT_HANDOFF_COHERENCE_RULES` holds one rule, of that kind.
- `packages/alanwalton/daily-tracking/src/collection-coherence-guard.database.test.ts` — `numericEqualityWhenPresent`, named in its `describe` at line 127.

Grepping `markerSectionWhenEq` repo-wide, excluding `node_modules` and `dist`, returns nine hits and no parity test among them: `coherence-rules.ts:41` the schema literal, `:89` the arms entry, `:167` a comment, `:258` the TS guard branch; `coherence-rules.unit.test.ts:104` and `:114`, a unit test of the TS side alone which cannot see the SQL; `_compose_completion_progress.equiv.database.test.ts:44`, a comment in a test of another kind; `_enforce_page_coherence.ts:15` a comment and `:159` the deployed SQL branch.

Both branches exist and neither is compared to the other. The kind is live — `readMarkerSection` is exported from `@shared/pages-core` and read by the `move-to` gate as well as by the rule — and `_enforce_page_coherence.ts` states in its own header that the violation details "are a CONTRACT shared byte-for-byte with the pure TS evaluator" and that "the equivalence database test pins the two", which for this kind is not so.

Found while ingesting `dirty/knowledge/page-coherence-rules.md`, whose `## The drift seam` asserted every guard kind was covered. That document is being removed.
