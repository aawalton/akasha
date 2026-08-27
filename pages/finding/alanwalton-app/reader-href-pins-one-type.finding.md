---
id: a4b54741-2b54-5aa3-9c45-f8bfd8ba6203
page-type-slug: finding
title: "Reader href pins one type"
domain-slug: domain/alanwalton-app
---

# Claim

`page-detail-loader.server.ts` reads a chapter's parent story row by bare id with no page-type filter, then builds the back-to-story href with the page-type segment hardcoded to `reading-story`. So the link 404s for every authored story and works for every Royal Road and Wandering Inn one, and the population that exercises it most is the population where it works.

# Evidence

Read 2026-08-07 against `~/code`, in `packages/alanwalton/web/app/routes/page-detail-loader.server.ts`.

:355-358 reads the parent story row by bare id with no page-type filter, so it fetches a parent typed `story` or `authored-story` just as happily as one typed `reading-story`. :360-365 then builds the href with the segment fixed: `buildPageHref({ pageTypeSlug: PageTypeSlug("reading-story"), ... })`.

`reading-story` is a leaf type with no descendants, pinned by `packages/shared/pages/access/src/get-descendant-page-type-slugs.database.test.ts`. So visiting that href re-enters this same loader, misses the exact match at :97-102 because the row is not typed `reading-story`, computes a one-element subtree so the `subtree.length > 1` fallback at :113 is skipped, and reaches `throw new Response("Not Found", { status: 404 })` at :127-128.

THE CONTRAST IS THE USEFUL PART, and it sits in the same file. `resolveReaderNeighbors` (`packages/alanwalton/web/app/lib/reader-neighbors.ts`), imported at :24 and called at :377, groups by the page's own type-correct relation rather than a hardcoded slug, so the prev/next chapter pager works for authored chapters. One hardcoded page-type literal in an href builder is the whole defect, beside a correct type-derived sibling.

WHY IT SURVIVES. The failure is type-conditional. Chapters parented by `reading-story` are the bulk of the corpus and their link works, so the green signal comes from the population the bug does not touch.

Searched `~/memory/findings/` first: `rg -l -i "page-detail-loader|buildPageHref|reading-story|back to story" findings/` returns five documents and none carries this. The nearest, `alanwalton-app/capacitor-detail-resolution-narrower.md`, is about the same file at :97-124 and a different defect — the Capacitor shell not widening to the inheritance subtree.

Recorded emptying `dirty/skills/pages-system/findings.md`, which held this dated 2026-07-27 and is queued for removal.
