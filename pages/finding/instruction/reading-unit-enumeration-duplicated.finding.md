---
id: 0cc5b743-14d2-50a7-b1b3-5e578681b67e
slug: reading-unit-enumeration-duplicated
page-type-slug: finding
title: "Reading unit enumeration duplicated"
domain-slug: domain/global
---

# Claim

One enumeration of what a reading pass takes as its unit stands verbatim in two documents, with nothing keeping them in step.

# Evidence

`domains/tasks/archivist/review-instructions.md` and `domains/tasks/alan-harness/guided-close-read.md` each carry the sentence "numbered from the bottom: the frontmatter whole, each paragraph, each item of a list, and each heading with the section beneath it". The two are byte-identical from "numbered" to the closing "it", and each sits under a **List** bullet at the head of the document's walking stage.

That enumeration is the whole of what says which spans of a document count as one unit, so it is a claim rather than a phrasing. Neither document cites the other and neither is marked as the copy, so a reader meeting both has nothing telling them which drifted.

Project #17992 renamed the unit from `slice` to `line` and had to make the same edit in both places to keep them agreeing. The next change to the enumeration faces the same, and the seat making it has no reason to look at the second copy.

Where the claim should bind from is undecided: `review-instructions.md` is an archivist task and `guided-close-read.md` an alan-harness one, so neither obviously sits above the other.
