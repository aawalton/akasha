---
id: 0fc4c7e2-db18-55c0-a18b-59a04a93b012
slug: compose-and-coherence-headers-miscount
page-type-slug: finding
title: "Compose and coherence headers miscount"
domain-slug: domain/pages-system
---

# Claim

The two rule-driven procs in `packages/shared/pages/proc/src/` carry four header statements that
their own package falsifies: a dormancy condition naming one of the two kinds the proc composes, a
rule-form count of two above a list of three where the schema declares four, a patch-variant count
that disagrees with its sibling header, and an ordering claim that omits the step running between.
Each was true when written and each was falsified by a kind, a variant or a step added elsewhere.

# Evidence

Read 2026-08-07 against `~/code` at main `13135651993c19af09ce41b6295264191071d3c1`.

`_compose_completion_progress.ts:40` says the proc is "DORMANT until a page-type declares a
`numericEqualityWhenPresent` coherence rule — a page-type with no `coherenceRules` (or none of that
kind) is a no-op". It also composes `moveValueToListWhenValueIn` at :158-164, and
`core/src/schema/coherence-rules.ts` marks that kind `compose: true` in `COHERENCE_RULE_ARMS`. A
page-type declaring only it activates the proc the docstring calls a no-op.

`_enforce_page_coherence.ts:7` says the guard "evaluates the two rule forms", then lists three at
:10, :12 and :15 — `valueIn`, `requires`, `markerSectionWhenEq`. `COHERENCE_RULE_ARMS` declares four
carrying `guard: true`, the fourth being `numericEqualityWhenPresent`. Two, three and four for one
set, in one header.

`:37` names "the three generic single-row patch variants" where `_compose_completion_progress.ts:35`
names "the four". The tree has three: `page-patch-by-id.ts`, `page-patch-by-id-if-status.ts`,
`page-patch-by-seq.ts`.

`:37` also places the guard "immediately after `ctx.enforceContentStorage`". Compose runs between
them at every call site — `page-create.ts:166`, `page-patch.ts:168`, `page-patch-by-id.ts:151`,
`page-patch-by-id-if-status.ts:98`, `page-patch-by-seq.ts:99` — and load-bearingly, compose's own
header at :32-38 requiring the guard observe the composed row.

Found ingesting `dirty/questions/code-repo-pages-prose.md`, which held these as one entry and put the
call sites at six. There are five.
