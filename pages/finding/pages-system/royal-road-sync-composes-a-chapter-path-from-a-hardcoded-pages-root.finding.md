---
id: ce4c3d7b-7d1b-5c38-8cfc-cba1f110f235
page-type-slug: finding
title: "Royal road sync composes a chapter path from a hardcoded pages root"
slug: royal-road-sync-composes-a-chapter-path-from-a-hardcoded-pages-root
domain-slug: domain/pages-system
---

# Claim

`services/royal-road-sync.ts` decides where a `story-chapter-royal-road` page stands by string concatenation from a hard-coded `pages/<type>` root, never consulting what the page type declares. `CHAPTER_DIR` at `:12`, the filename at `:214` and the whole path at `:216`. It is a fourth site of the fault `three-more-callers-build-a-page-path-from-the-slug-alone` names, and is not among the three that finding lists.

# Evidence

Read 2026-08-28 at `375daccb9e`.

`services/royal-road-sync.ts`:

- `:12` composes the root as `pages/` followed by the page type slug.
- `:214` composes the filename as the slug, the page type slug and `.md`.
- `:216` sets `relPath` to the directory, the story home and the filename joined.

Nothing in that chain consults the page type page or its declared `files:`, so a `story-chapter-royal-road` page type that stated a different place would be ignored silently and the pages would go on landing where this file decides.

Its imports at `:1-6` are `node:fs`, `page/frontmatter.ts`, `repo/roots/roots.ts`, `tools/lib/gated-landing.ts` and `tools/lib/royal-road.ts` — no pages API among them.

The write itself is not ungated: `landBodies` at `:244` takes a `GatedAct` built at `:238-243`. It is the path derivation alone that stands outside the pages system.

The cost is already recorded in the file. A comment at `:209-213` notes fifteen chapters that landed with the page type missing from the filename.

Two neighbouring findings on this service are about a different defect, a stale directory, and both cite line numbers that no longer hold: `pages/finding/royal-road/royal-road-sync-reads-a-missing-directory.finding.md` and `pages/finding/royal-road/royal-road-sync-would-still-fail-if-only-its-directory-were-repointed.finding.md`.

Not measured: whether any other service composes a page path the same way.
