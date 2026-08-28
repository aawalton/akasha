---
page-type-slug: finding
slug: most-untracked-declaration-files-cost-nothing
title: "Only 67 of the repository's 24,774 untracked .d.ts files fall under a path the page type cache watches"
domain-slug: domain/page-types-system
---

# Claim

There are 24,774 untracked `.d.ts` files in this repository and only 67 of them fall under a path the page type cache watches, so seeing one in `git status` is not evidence that it costs anything.

# Evidence

Measured 2026-08-28.

`agent/commit-author.d.ts` is untracked and is exactly the same kind of in-place declaration file as the 67 that disable the page type cache, and it is not among them: `agent/` is not in `CODE_AT` at `page/property/type-cache.ts:24-33`.

Repository-wide there are 24,774 untracked `.d.ts` files. 67 of them fall under a watched path, which is 0.27% of the class.

The watched set is assembled at `type-cache.ts:125-133`: `CODE_AT` — `cache`, `checks-system/refusal`, `during-call`, `exclusive`, `page`, `pages-system/page-type`, `repo`, `write-whole` — plus the property folders, plus `.gitignore`, plus the page type folders. Nothing else in the tree is looked at.

The 67 that do bite are recorded at `pages/finding/page-types-system/the-page-type-cache-is-disabled-by-untracked-declaration-files.finding.md`.

Not established: why the in-place `.d.ts` files are emitted at all, or which build writes them.
