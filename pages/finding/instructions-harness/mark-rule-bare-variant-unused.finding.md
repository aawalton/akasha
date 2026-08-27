---
id: 260dd993-4c5a-5441-b6b5-e4f665af1166
page-type-slug: finding
title: "Mark rule bare variant unused"
domain-slug: domain/global
---

# Claim

`MarkRule`'s `bare` variant now has no user, and a schema author reaching for it reintroduces the constraint Alan just called wrong.

# Evidence

`tools/document/types.ts:175` declares `MarkRule = { every: Mark } | { bare: true }`. As of `dfef747f`, `bare` is instantiated nowhere: a grep for it across `tools/` returns the type declaration and nothing else. Its sole user was the description slot in `tools/document/schemas/ranked.ts`, which forbade every mark and so refused a code span — a rule's description could not quote the command, path or flag its own act named. Alan ruled that constraint wrong and it was lifted to `marks: null` in the same commit. 1002 tests pass over the change.

The enforcing arm still stands, at `tools/document/content.ts:78`, as the `else` of the `every` branch in `checkContent`.

Why this is worth a row. The construct is not merely dead — it is attractively named and sits beside the one option that is used, so a schema author choosing between two declared variants has no way to learn from the file that one of them was tried and rejected. `types.ts` argues this exact defect class twice in its own comments, over a fence and a table that were declarable and never declared: what a part naming one bought was the appearance of measuring it.

Not established: whether any slot in the corpus genuinely wants unmarked text and has been working around the absence of a rule for it, and whether removing the variant is preferable to leaving it with a comment recording that its only use was reversed. That is a judgement for whoever holds the document machinery, not one this row settles.
