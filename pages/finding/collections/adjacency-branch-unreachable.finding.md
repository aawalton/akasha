---
id: beb92c75-ff9f-5518-99bd-741015bae355
slug: adjacency-branch-unreachable
page-type-slug: finding
title: "Adjacency branch unreachable"
domain-slug: domain/collections
---

# Claim

The genre-adjacency half of Nova's exploration selector cannot run on live data and never has.
`selectNextStory` enters its scoring branch only where some story or chapter carries a liked `grade`,
and no row in the reading catalog carries a grade at all — measured, not inferred — so
`loved.length === 0` on every call and the verb returns the alphabetically first eligible story.
Adjacency and its tiebreaks are exercised by unit tests alone, and no readout says which branch
decided a pick.

# Evidence

Measured live on 2026-08-07 against production through `ops db psql`, the read-only role:

    select page_type_slug, count(*) total,
           count(*) filter (where attributes ? 'grade'
                              and attributes->>'grade' is not null
                              and attributes->>'grade' <> '') graded
    from public.pages where deleted_at is null
    and page_type_slug in ('reading-story','story-chapter','story')
    group by 1;

    reading-story    146   0
    story              3   0
    story-chapter  10448   0

Zero graded rows over a population of 10,597. In
`packages/collections/litrpg/src/nova/select.ts`, `selectNextStory` builds `loved` from
`storyIsLiked`, which in `select-internals.ts` reads `story.grade` and the chapters' `grade` and
nothing else. With `loved.length === 0` the function returns from a title-then-id sort and never
reaches the `lovedGenreUnion`, the `genreJaccard` scoring, the `sharedWithUnion` overlap or the
four-key sort below them. The docblock states the fallback as intended; what it does not state, and
what no readout carries, is that the fallback is the only path production has ever taken.

What this adds to `pages/finding/litrpg-books/uncaptured-read-reads-as-unread.finding.md`, filed the same day.
That finding covers the IN-PROGRESS pool — `loveScore` collapsing to a title tiebreak — and says
outright that it did NOT measure the column counts. This measures them, and it covers the other
pool: the EXPLORATION selector, whose dead branch is the larger body of code.
