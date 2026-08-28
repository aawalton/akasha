---
id: ac457a3c-4dac-529b-ab11-3f473cd276ad
page-type-slug: finding
slug: sync-help-names-a-host-the-code-never-reaches
title: "The Great Courses sync help names a host the code never reaches"
domain-slug: domain/collection-system
---

# Claim

`services/great-courses-sync.ts` tells its reader it reads `https://www.thegreatcoursesplus.com/allprograms`. The catalogue it actually fetches is on a different host, and the name in the help has the two words the other way round. Nothing breaks: the help is prose and the fetch uses its own constant. It is wrong where somebody checking what the service touches, or reproducing the fetch by hand, would read it and believe it.

# Evidence

Read on 2026-08-28 against `abe6a84f2` on `main`.

`services/great-courses-sync.ts:13` states `Reads https://www.thegreatcoursesplus.com/allprograms`. The fetch is built in `tools/lib/great-courses/catalogue.ts`, whose own constant names `plus.thegreatcourses.com` — the subdomain and the brand the other way about, not a redirect of the spelling in the help. The help string is never read by the code that fetches, so the two have drifted with nothing to catch it.

Found while repairing the service's page access at `5d762fac6` and deliberately not fixed there: the wrong constant is unrelated to that failure, and folding an unreviewed prose change into a hotfix would have put it in front of nobody.

This is Ubiquitous Naming on `pages/domain/global.domain.md:74-82` in its plainest form — one host, two spellings, and the layer that is only read by people carrying the one that is not true.
