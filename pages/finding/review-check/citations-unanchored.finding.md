---
id: 0e155a7f-0f56-5431-929f-6d552b1df5ea
page-type-slug: finding
title: "Citations unanchored"
domain-slug: domain/global
---

# Claim

`review-check` cites three surfaces whole where its sibling walk anchors its citations to the named section. The gate passes either way, so nothing reports which convention the corpus wants.

# Evidence

`domains/tasks/code-harness/review-check.md` carries three links with no `#anchor`: `](../../instrument.md)`, `](../../check.md)`, `](../../code-check.md)`.

`domains/tasks/archivist/review-instructions.md` anchors its citations to the section named.

`links-resolve` passes either way, so no instrument distinguishes them and neither form is a defect by anything standing.

What the difference costs a reader: an anchored citation lands on the claim being invoked, an unanchored one lands on a whole surface and leaves them to find it. What it buys: an unanchored citation does not go stale when a section is renamed.

Raised by the `review-instructions` reading of `domains/tasks/code-harness/review-check.md` on 2026-08-06, which landed six commits — among them `c007a1d8`, where `route` named a way of doing something everywhere else in the corpus and a kind of check here; `b1163b96`, where naming `step-cost`'s cap and not its default let a 20-run window be reported as 200; and `b939aeff`, where a baseline the stage said nobody wrote down is enumerated by a verb the stage does not name.

Its other two forks stand already: `pages/finding/code-harness/pipeline-bands-unpublished.finding.md` and `pages/finding/review-check/review-reads-findings-and-files-none.finding.md`.
