---
id: 60ba4acc-e609-522c-bd7e-9ec10dd07f85
page-type-slug: finding
title: "Uncaptured read reads as unread"
domain-slug: domain/litrpg-books
---

# Claim

Nothing in Nova's rig can tell an uncaptured read from an unread chapter. `grade` is the selector's
own marker for "not reached yet", so a chapter read and never graded is indistinguishable from one
never opened — and every surface reads healthy regardless. `now-reading` answers off reading-state,
the faucet meters Royal Road words rather than the capture act, and the in-progress pool ranks on
`grade` alone, falling to a title tiebreak with none set and reporting that with no hedge.

# Evidence

Run live on 2026-08-07, and read in the source rather than inferred.

`ops litrpg now-reading --json` returns:

    {"inProgress":true,"story":{"id":"019ea38d-…","title":"Alexa Thyme (Formerly ALEXiThymiA)",
     "grade":null},"lastRead":null,"nextChapter":{"title":"Chapter 1: The Principal's Office (1)",
     "chapterNumber":1}}

The story at the HEAD of the love-ordered in-progress pool carries `grade: null`, so nothing in that
pool outscored it. `inProgress: true` is reported with no field distinguishing a taste pick from a
cold-catalog one.

In `packages/collections/litrpg/src/nova/select-internals.ts`: `loveScore` (line 195) is
`gradeValue(story.grade) * 100 + likedChapters`; `storyIsLiked` (line 184) reads `grade` and nothing
else; `selectInProgressPool` (line 232) sorts by `loveScore` descending, then by `title`, then by
`id`. With every score equal the title tiebreak decides the pick.

The faucet is a different quantity by construction: the package is `packages/alanwalton/nova-words-read`,
metering the Royal Road word bookmark. Its sibling `packages/alanwalton/ceri-points/src/aggregate.ts`
counts rows carrying a non-empty `rating` — the shared act — and its header states that an all-unrated
row set sums to 0. One reads high and one reads zero on the same underlying fact.

Related but distinct, and already filed: `pages/finding/literature/done-cannot-say-stalled.finding.md` is the same
SHAPE in Zadi's rig, on `done` and the GBWW plan. This adds Nova's rig, the selector degradation, and
the collapse of ungraded into unread. `pages/finding/collections/last-read-ignores-completion.finding.md` is the
neighbouring code asymmetry in `selectLastRead`.

NOT measured here: the column counts. The source being emptied
(`dirty/skills/litrpg-books/findings.md`) recorded zero `grade`, `reaction` and `insights` across
10,132 chapters, and I did not re-run that against production — the head-of-pool `grade: null` above
is what I verified.
