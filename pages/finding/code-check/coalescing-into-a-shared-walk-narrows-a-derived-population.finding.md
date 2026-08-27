---
id: 96f067b4-9676-5a43-a65b-0a1b5e6802fe
page-type-slug: finding
title: "Coalescing into a shared walk narrows a derived population"
domain-slug: domain/global
---

# Claim

Folding a rule into `check-syntax-bundle` silently narrows its population to the bundle's, and nothing reports the loss. The bundle walks a fixed file set; a rule whose population is derived — `check-no-hardcoded-surface` reads every module a component can reach, not the 861 `.tsx` files — keeps its name, findings and clean line after the fold while judging a smaller corpus. The coalescing is a saving applied rule by rule, so the next seat has every reason to reach for it and nothing that objects.

# Evidence

MEASURED BY TWO CHILDREN OF TREE #18484 INDEPENDENTLY, neither able to act on it.

#18551 coalesced `check-component-layout` and `check-popover-viewport-safety` into `check-syntax-bundle` as three `SYNTAX_SCANNER_ENTRIES` members, correctly: the bundle's 14,065-file population already held every file those two enumerated, its `.tsx` subset being the same 861. That fold is sound and removed about 13.1s of median step time from every pipeline.

`check-no-hardcoded-surface` was the third rule in that plan and #18551 WITHDREW it mid-project, backing its edits out. Its reason: a sibling (#18550) was concurrently moving that rule's population from `.tsx` files to `.tsx` plus every TS module reachable by import — 861 to 2,846 — and a reachability population cannot be reproduced by the bundle's path-prefix `preFileSkip`. An entry written that day would have pinned the rule at 861 while the standalone runner widened, and nothing would have said so.

#18550 reached the same conclusion from the other side and put it more sharply: folding it in LATER would silently narrow the rule back to exactly where that project found it.

WHY NO INSTRUMENT CATCHES IT. The folded rule still reports, still names file, line and column, still prints its clean line among the bundle's 29 scanners. What changes is the denominator, and the bundle prints one population for the whole bundle rather than one per scanner — so the rule's own reach stops being a number anybody reads. A rule that has stopped looking at two thirds of its corpus is indistinguishable from one looking at all of it and finding nothing.

THE GENERAL SHAPE, which is why this is filed rather than left on either project: a rule may be coalesced into a shared walk only where that walk's population is a SUPERSET of the rule's own, and that is a claim to measure rather than assume. #18551 measured it for the two it folded — zero files on either side — which is what made those right and this one wrong.
