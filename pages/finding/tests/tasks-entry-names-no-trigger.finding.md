---
id: 5072979d-4649-57a3-a693-de1699a56edf
slug: tasks-entry-names-no-trigger
page-type-slug: finding
title: "Tasks entry names no trigger"
domain-slug: domain/global
---

# Claim

The Tasks entry on `domains/file-kinds/tests.md` spends its guidance restating what the task is instead of naming when to dispatch it. Its gloss of `review-tests` is a near-copy of that task's own Definition, where every sibling entry in the corpus spends the line on a dispatch condition. A reader scanning the section to find which contract applies gets the task's name twice and no trigger.

# Evidence

Raised by the dispatched reviewer of `domains/file-kinds/tests.md` on 2026-08-07 and relayed here unjudged. It named this as the one line on the document outside Every Changed Line's reservation — a Tasks section is not among the five that rule covers, so someone could land a repair here without Alan.

Its reason for not landing one: writing the guidance means deciding when `review-tests` should be dispatched, and the Add step of `review-instructions` reserves anything resting on judgment for the principal.

`tools/document/schemas/domain.ts` states what the section is scanned for — "which contract applies" — and bounds the entry at `MD`, which is the ground the reviewer read the copy against.

Not measured: whether every sibling entry in fact names a dispatch condition. That count is the reviewer's; I did not survey the Tasks sections.
