---
id: eee8bbf1-0c26-5d10-bb33-46c2424e435b
slug: check-docblocks-cite-quarantine
page-type-slug: finding
title: "Check docblocks cite quarantine"
domain-slug: domain/global
---

# Claim

Three live modules under `packages/infra/` cite instruction documents that stand only under quarantine, and all three citations resolve to nothing once the quarantine sweep completes.

# Evidence

Found while emptying `dirty/docs/test-classification.md`, which is one of the documents cited and which this run removed.

- `packages/infra/checks/src/checks/check-unit-test-io-hermeticity.ts:6` — "See Test Classification § 'Unit-test IO hermeticity'". The named section was cut from `dirty/docs/test-classification.md` earlier in this run and the document itself is now gone.
- The same file at :11 — "(Testing Principles)", naming `dirty/docs/testing-principles.md`, which is queued for removal in this same dispatch.
- `packages/infra/tests/run-workspace-tests.sh:58-59` — "See Testing Principles and Test Classification." Both targets are the two documents above.

Neither name resolves anywhere in the live instructions tree. There is no `Test Classification` and no `Testing Principles` among the documents that bind; `grep -rn "test-classification.md\|docs/test-classification" domains/ tools/` returns no hit, and the only live trace of the subject is the member line `check-test-classification` on `domains/lists/unresolved-checks.md`, which carries a check name rather than any content.

The citations are by title rather than by path, so nothing mechanical reports them: the `[mentions]` gate at removal checks paths written as text and found three, all under `dirty/questions/`, and saw none of these three. A reader who follows one is told a document exists that they cannot open.
