---
id: 01a046d3-c5b3-7235-ad5b-f42ecb0b9b15
page-type-slug: finding
slug: a-created-page-lands-outside-the-glob-that-claims-it
title: "Creating a seat or subagent page files it where no page type claims it, because the write path honours the stated place only when reading"
domain-slug: domain/page-writes-system
---

# Claim

`whereFor` finds an existing page by the page type's stated `files:` glob and composes a *new* page's path from the slug alone, ignoring that glob. For the two page types whose glob is directory-constrained — `seat` and `subagent` — the two disagree, so creating one files it at a path its own page type can never match.

The page would then be claimed by no page type. Every check, index and query keyed on the page type would pass over it, and the write itself would report success.

# Evidence

Run against the live tree, `whereFor(roots, pageType, name).relPath`:

    seat       abby                 agent/seat/abby.seat.md
    seat       brand-new-seat       pages/seat/brand-new-seat.seat.md
    subagent   brand-new-sub        pages/subagent/brand-new-sub.subagent.md
    finding    brand-new-finding    pages/finding/brand-new-finding.finding.md

The first line is the find path working correctly. The second and third are the defect: `pages/seat/` and `pages/subagent/` do not exist on disk, and the globs are `akasha:agent/seat/**/*.seat.md` (`pages/page-type/seat.page-type.md:6`) and `akasha:agent/subagent/**/*.subagent.md` (`pages/page-type/subagent.page-type.md:6`). Neither composed path can match either glob. The fourth line shows why nothing has noticed: for the 313 page types whose glob is location-free, the composed path is correct, so the fallback looks right everywhere anyone has looked. Only 2 of the 315 page types that name files can hit this, and both are page types nobody creates by hand.

The disagreement is two lines apart in one function, at `tools/lib/page-write-where.ts:64-66`:

    const filed = scanIn(root, placesIn(type, repo), repo)
    const held = filed.find(stands) ?? filed.find(statesSlug)
    const relPath = held ?? `${placeDirOf(type.slug)}/${newPageNameFor(type, name)}`

`placesIn(type, repo)` reads the stated place. `placeDirOf(type.slug)` at `page/page-types.ts:211-213` returns `${PAGES_ROOT}/${slug}` and never consults it. So the glob is authoritative for reading and ignored for writing.

There are 13 tracked `.seat.md` files and all 13 stand under `agent/seat/`, so nothing has been created through this path yet — or if it has, the result was moved by hand.

Reachability: four callers pass a page type through rather than naming one — `tools/lib/log-append.ts:33`, `tools/lib/page-compare.ts:50`, `tools/lib/page-rows-resolve.ts:43`, `tools/lib/sweep-pipeline-pages/effects.ts:68`. The rest name a fixed slug (`step`, `equipment-item`) and cannot reach it. **Not established: whether any of those four is ever invoked with `seat` or `subagent`.** I traced the call sites, not the values that flow into them, so whether this fires today is open. What is settled is that the function returns a wrong path when asked, which the run above shows directly.

Not established: which of the two is wrong. Either the fallback should compose from the stated place, or `seat` and `subagent` should stand under `pages/` like everything else. The first is a fix to the write path; the second is a move of 13 files plus whatever names their location — `tools/lib/agent-page-place.ts:9` and `:11` hardcode `agent/seat` and `agent/subagent`, so the two places are already stated twice.

Not established: what a caller does with a `Where` pointing at a path that will not be claimed. `whereFor` only computes a location; whether the subsequent write refuses, warns, or files the page has not been traced.
