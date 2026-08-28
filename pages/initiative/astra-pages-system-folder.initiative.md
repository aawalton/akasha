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

**Seven of fifteen checks refuse nothing today**: `folder-matches-a-shape`, `import-resolves`, `links-resolve`, `page-holds-to-its-type`, `page-name-unique`, `read-what-is-required` and `require-import-extension`. Only the first is invisible on every route; the other six report on audit.

- 17 files fail `import-reach`.
- `story-chapter-royal-road` is written by `services/royal-road-sync.ts` as a raw path rather than through the pages API.
- **What originates off the workstation is `astra-pages-system-service`'s**, opened 2026-08-27 to hold the other half of the same split.
