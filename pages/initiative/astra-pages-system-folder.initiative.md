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

- 569 folders across the repo fail `folder-matches-a-shape` and 17 files fail `import-reach`, so neither reads as a clean signal for a new package.
- `story-chapter-royal-road` is written by `services/royal-road-sync.ts` as a raw path rather than through the pages API.
- **What originates off the workstation is `astra-pages-system-service`'s**, opened 2026-08-27 to hold the other half of the same split.
