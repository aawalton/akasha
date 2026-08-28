---
id: e6c5efd7-a080-471e-934a-6fb90b5e3e23
slug: a-findings-own-key-disagrees-with-the-name-check
page-type-slug: finding
title: "A finding's own key disagrees with the name check"
domain-slug: domain/pages-system
---

# Claim

`finding.page-type.md:22` says a finding is keyed by domain and file stem. `page-name-unique` keys every page by page type and file stem, dropping the domain folder. The two disagree, and 13 finding pages fail a check their own page type says they satisfy.

# Evidence

Measured 2026-08-28 at commit `48aa105e06`.

`pages/page-type/finding.page-type.md:22`, under Design, states "A finding is keyed only by domain and file stem." A finding's domain is the folder it sits in, so by that line `finding/agent-harness/definition-names-two-concerns` and `finding/code-quality/definition-names-two-concerns` are two keys and not one.

`checks-system/check/page-name-unique/page-name-unique.check.code.attachment.ts:29` computes the name as `nameOf(named.type, named.stem)`, and `graph/page-index/page-index.ts:17-19` defines that as `${type}/${stem}`. No path segment above the file enters it; `page/name/name.ts:10-18` derives the stem from the basename alone.

`ops checks audit page-name-unique` reports 13 finding pages in 6 groups, every one a pair or triple in different domain folders: `definition-names-two-concerns` (agent-harness, code-quality), `turn-end-rule-unwired` (agent-harness, seat-turn-end), `ephemeral-worktree-manufactures-violations` (code-check, code-harness), `instrument-out-of-reach` (define-project, review-documents), `refusal-exits-unclassified` (ops-awen-publish-turn, person-access, person-authority-feature-approval), `definition-misses-stage-five` (prepare-interview, review-initiative).

This is not confined to findings: across all 309 colliding groups in the corpus, no two colliding pages of any page type share a folder.

Nothing has forced the question, `page-name-unique.check.md:7` carrying `check-on-patch: false`.
