---
page-type-slug: question
id: 019fbbaa-5825-73d2-a4e9-924f5a2d8eca
title: "The judge's binding tells the blinded seat its labels are 'an order you did not choose and cannot predict — A is not the earlier, the original, or the baseline', which is exactly the permutation frame two machinery docblocks say never reaches it. You cut the neighbouring paragraph for this at 58194cee and kept this one. Cut it, cut just the labels sentence, or keep it and repair the docblocks?"
slug: the-judge-s-binding-tells-the-blinded-seat-its-labels-are-an
status: answered
source-context: "019fba68-7d7f-7283-960d-10abb0f97555"
asked-by: 019f2330-25c9-770c-894f-fd4ac497997c
options:
  - "Cut the whole paragraph"
  - "Cut only the labels sentence, keep the theory-changes-nothing instruction (my recommendation)"
  - "Keep the paragraph and repair both docblocks to state the silence actually kept"
---
ALAN'S RULING, 2026-08-02: "Cut is fine for the blinded judge question."

The whole paragraph, matching the precedent at 58194cee where he cut its neighbour for the same reason — not just the labels sentence. Read closely the earlier half leaks the same frame: "Three pieces of writing of one shape, arriving together with a description of the thing to look for" tells the seat the outputs are one prompt run several times, which is precisely what case-judge.ts:13 says must never reach it.

APPLIED by athena-lead, commit 0018888d. 715 characters removed from tasks/judge-failure-mode.md.

Verified afterwards: the document now contains no reference to the permutation, the labels, their order, or a theory about provenance. So case-stages.ts:215 — "The judge's own surface says nothing about this and the silence is load-bearing" — is a true claim about the document again, and case-judge.ts:13 stands. NEITHER MACHINERY COMMENT NEEDED REPAIR, which was the third option and is now moot.

Note on blast radius, which was the argument for settling it now: cases-recorded reports 1 run on the record, and that run predates the seating it was meant to exercise (recorded separately on initiatives/corpus/principle.md). So no verdict of consequence was measured through the leak.
