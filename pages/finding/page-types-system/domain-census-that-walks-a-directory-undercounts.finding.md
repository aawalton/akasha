---
page-type-slug: finding
slug: domain-census-that-walks-a-directory-undercounts
title: "Nineteen domain pages stand outside pages/domain, so a census walking that directory undercounts"
domain-slug: domain/page-types-system
---

# Claim

Nineteen of the 740 domain pages stand outside `pages/domain/`, so a census that walks that directory undercounts the domains by nineteen and reports folders as naming nothing when a page for them stands elsewhere. This is by design rather than a fault: a page type states a glob, and what makes a document a domain is its page type rather than its folder. The right census walks `akasha:**/*.domain.md`.

# Evidence

Counted here 2026-08-28 over the working tree: 740 files match `**/*.domain.md`, 721 under `pages/domain/` and 19 outside it, in three places.

```
readouts/, readouts/readout/, readouts/ring/                  11
ops-cli/<verb>/  (checks, domain, file-structure, global,      7
                  refactor, seat, worktree)
editor-extension/src/features/status-bar/                      1
```

The count itself is already bound, from the other end, by `pages/finding/pages-system/three-more-callers-build-a-page-path-from-the-slug-alone:25`, which measures the same 19 of 740 as evidence that a caller composing `pages/domain/<slug>` cannot check that anything stands there. Confirmed rather than restated here; what stands here is the hazard to a reader counting domains.

THIS IS INTENDED, AND THREE LINES SAY SO. `pages/domain/page-types-system.domain.md:16` — "A page type's pages sit where its glob says, not in a folder named after it." `pages/page-type/page-type.page-type.md:28` — "A page type and its property definitions live where their domain lives." `pages/page-type/domain.page-type.md:33` — "What makes a document a domain is its page type, never the folder it sits in." The `domain` page type states `files: akasha:**/*.domain.md`, naming no directory.

WHAT THIS DOES NOT CHANGE. It does not move the 93-of-96 and 715 figures on the misfiled findings. Those were recomputed against `^slug:` over every `*.md` in the repository, which already reaches all nineteen. So this is a hazard for the next census rather than a correction to the last one — and the six largest retired folder names still match no page of any type when searched that way.
