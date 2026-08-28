---
id: 01a045bf-7cd3-795f-b436-c8158ef2e0e2
page-type-slug: initiative
slug: astra-pages-system-folder
persona-slug: astra
domain-slug: domain/pages-system
parent-slug: astra-pages-system
---

# Intent

- Every file specific to the pages system domain lives under `pages-system/`.
- All users of the pages system call into `pages-system/`.
- Every entry point into the pages system is one Alan approved.
- A command running on the workstation reaches pages with no service between.

# Notes

**The line between clean and unclean is a root `akasha/pages-system/` folder**, and Alan approves each entry point that moves through the door. Living in the folder is not by itself what makes a piece clean, and code outside it is legacy due for wholesale replacement rather than something we have taken on.

**`folder-matches-a-shape` refuses nothing and was never meant to.** It was born with `check-on-patch`, `check-on-worktree` and `check-on-audit` all false, at `f9f61035d`, and has carried them at every one of the seven commits since. Alan's ruling is recorded on `thea-checks-system`: "This is experimental, leave it disabled." So no folder in this repository has ever been judged against a shape by a gate, and the check is not a signal a new package passes — it is one nothing passes or fails.

**1,258 of 2,885 judged folders fail it**, 43.6%, the repository root among them. The earlier figure of 569 on this page was stale by more than double. Heaviest are temper at 507, tools at 144, shared at 130.

**It cannot be turned on by halves.** `folder-matches-a-shape.check.code.attachment.ts:129` destructures `({ root })` alone and never reads the changed paths, then walks every folder on disk rather than the patched tree the gate assembled. So switching `check-on-patch` on returns all 1,258 failures against every patch whatever it touched. Scoping it to the paths a change names is the precondition, and a folder's verdict turns on imports reaching it from files the change never touched, so that may not be answerable against a change set at all.

**The unfinished half of a documented stand-down is two of its thirteen.** At `ad5e04f09`, 2026-08-26, thirteen check pages had `check-on-patch: false` and `check-on-worktree: false` added, 26 insertions and no deletions, so these were live gates switched off rather than gates never turned on. The thirteen are named in the commit: `category-rule-acts`, `export-declared-here`, `file-length`, `import-reach`, `inbound-import-resolves`, `links-resolve`, `page-holds-to-its-type`, `page-name-unique`, `page-named-as-stated`, `read-before-write`, `read-what-is-required`, `relation-resolves`, `typecheck`. `import-reach` has since been deleted; `links-resolve` was restored at `9ab5aa7956` and `page-holds-to-its-type` at `c0316d111b`, and **of those thirteen only `page-name-unique` and `read-what-is-required` remain off**, the merge they were stood down for being over. That is a count inside this stand-down and not a count of every check that is off: `folder-matches-a-shape` and `require-import-extension` are off for reasons of their own.

**The stand-down was correct while it lasted.** Its own message: every check judges the tree as it should end up, and no subset of a repository's packages can move, because the ones staying are reached by relative path from the ones going — so the tree is broken from the first act until the last, and a gate refusing the first refuses all of them. It also says "this commit is the whole switch and reverting it is the whole restoration", and carves `folder-shape` out by name as the experimental check staying out of scope.

**`page-holds-to-its-type` guards the write path again**, and it refuses the whole write rather than the section — so a page landed over its shape while the gate was off cannot be edited at all until it is cut back under. `page-name-unique` is blocked by 878 pages in 309 colliding groups. The question the two remaining raise is not whether they should gate, which is settled, but what has to be true before the switch goes back.

- **What originates off the workstation is `astra-pages-system-service`'s**, opened 2026-08-27 to hold the other half of the same split.
