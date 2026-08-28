---
page-type-slug: finding
title: "A duplicate reading key displaces the first"
domain-slug: domain/required-reading
---

# Claim

A page declaring a required-reading key another page already declares silently replaces it, and the displaced declaration reads exactly like one that was never written.

`tools/required-reading.ts` builds four indexes in one pass — by file extension, by file-purpose ending, by body-section heading, and by the repository and path a page names — and each is a plain map assignment. The pages are walked in sorted path order, so which of two claimants survives is decided by its filename.

Two pairs collide today, both `readout-widget` pages naming the same Swift file, so one page of each pair earns no required-reading warrant at all. Nothing reports the collision: a declaration that is displaced is indistinguishable from one nobody made, which is what makes it expensive to find.

# Evidence

Read and measured 2026-08-27 in akasha at `f5dee0dc3`. `tools/required-reading.ts:105-125` builds `kinds`, `endings`, `headings` and `named`, each with `.set` and no check for a key already held.

Every tracked `.md` page was scanned for the four keys. `file-extension`, `file-purpose-ending` and `heading` had no duplicate value. `widget-path` had two:

- `akasha:ios-widget/ring/CategorizeRing.swift`, claimed by `readouts/widget/alanwalton-categorize.readout-widget.md` and `readouts/widget/smilingjenny-categorize.readout-widget.md`
- `akasha:ios-widget/ring/SurplusRing.swift`, claimed by `readouts/widget/alanwalton-surplus.readout-widget.md` and `readouts/widget/smilingjenny-surplus.readout-widget.md`

Not measured: whether the displaced page's warrant matters in practice, or whether the two rings should have been two pages at all. The scan read scalar frontmatter lines only, so a key declared as a list would not have been seen.
