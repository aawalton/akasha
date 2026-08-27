---
id: ff2ea6e5-689c-5c22-9ae2-446afbcb69f3
slug: deleted-rule-cited-by-title-unrefused
page-type-slug: finding
title: "Deleted rule cited by title unrefused"
domain-slug: domain/global
---

# Claim

Two citations in akasha name `Boundary Parsing`, a rule the dirty/quarantine sweep deleted from the instructions estate; the count stood at 334 across 289 files when this was filed. Nothing refuses them: a citation naming a rule by its title was invisible to `check-instructions-citations`, which judged only prose addressing the estate BY PATH, and that check is now gone rather than repaired, so the class is unmeasured as well as unrefused.

# Evidence

Measured by dalla on 2026-08-11 against `main`, in the course of closing tree #18484. It stood on that tree as an obligation held by the manager, was released rather than discharged, and this finding is where it was released to.

**The count.** `rg -c 'Boundary Parsing'` over the code repo excluding `node_modules` and `dist`: 334 hits in 289 files. No document declares the rule: `rg -n '^## Boundary Parsing' --glob '*.md'` over this repository returns nothing, so every one of those citations points at a rule that is gone. #18451 counted 332 repo-wide and declined the fleet-wide repair as outside its scope, which was correct of it. The figures agree; the small difference is the tree living between the two readings.

Re-measured 2026-08-27 in akasha, the code repository having been absorbed into it: `Boundary Parsing` stands in two tracked files outside `pages/finding/` — `shared/pages-core/src/schema/nav-config.unit.test.ts` and `alanwalton/awen-core/src/sheet-template.unit.test.ts`. No document declares the rule. The fall from 334 is the consolidation taking the files, not a repair.

**Why no gate catches it.** `check-instructions-citations` reports "No prose in this repo addresses the instructions estate or its mount point by path" over 14,881 of 14,881 files, at exit 0. That is true and it is not the question. Its carriers are `repo-source-comments` and `repo-markdown-prose` keyed on PATH spellings — a comment citing a rule by its TITLE is outside its population by construction. `links-resolve`, now a check at `checks-system/check/links-resolve/links-resolve.check.md` with an audit beside it at `tools/audits/links-resolve.ts`, passes over them, because these citations are not links.

**Why it is not a sweep.** The adjacent unsettled half — bare `<folder>/<name>.md` citations, 196 across 117 files, twelve documents already gone — has a derived-only predicate measuring 68% false, and the only precise one is a hand list of estate folder names that `Derived Reach` (`pages/domain/old-check.domain.md:111`) refuses. Expect no better here. Several sites need the missing document WRITTEN before a citation can point anywhere, so this must not be dispatched as a find-and-replace.

**What is not established.** Whether `Boundary Parsing` is the only deleted rule cited this way. It is the one eleven children happened to meet. Nothing here bounds how many other titles the same sweep took out from under live citations, and a repair scoped to this one title would report a clean finish over an unmeasured remainder — which is this initiative's own defect.
