---
id: ae76d517-b23d-5059-9289-f373286caa59
page-type-slug: finding
title: "A page type's files glob claims the sidecar files its own properties produce"
domain-slug: domain/page-types-system
---

# Claim

A page type whose `files:` glob ends `*.md` matches the attachment sidecars its own properties produce, so those files stand as pages of that type. The persona glob returns 433 files of which 392 are sidecars; the music-song glob returns 4,422 of which 2,766 are. Twelve page types are affected and the count across them is 4,202. Each such file is given a slug by stripping `.md` from its name, so a persona attachment stands as the page `abby.conduct.attachment`.

# Evidence

Ran the system's own matcher rather than reasoning about glob semantics: `scanIn` from `tools/lib/page-types.ts:35`, which is a bare `new Bun.Glob(glob).scanSync()` with no filter, and `slugOf` beside it, which strips `.md` from the basename. The 4,202 total across twelve page types is a delegate's count that I did not re-run; the two globs quoted above I ran myself. I did not check whether any consumer downstream filters these out after the scan, so the effect on a particular query is unmeasured.
