---
id: edf6f040-a252-5ebe-aa13-393ab3938a2e
page-type-slug: finding
title: "Story chapter length has typed twin"
domain-slug: domain/pages-system
---

# Claim

The `story-chapter` page type declares two properties for one quantity. `length` is derived from the chapter's own text by the live `@alanwalton/story-length` worker and is what readers, resume position and completion turn on. `wordCount` is hand-typed into chapter frontmatter and read by nothing that consumes it as a length. 9,460 of the 10,448 live rows carry both, and 449 of those disagree. Nothing reports the disagreement, because nothing reads the smaller number.

# Evidence

Measured live on 2026-08-07 against production, not taken from a report.

Both definitions stand on the `story-chapter` page type today — `wordCount`
(`019fb2d7-7dff-71d2-9286-6c71788a9d21`) and `length`
(`019db533-f3a3-70af-8937-229b9973ac94`), read out of that type's
`propertyDefinitions` by `ops db psql`.

The population, over non-deleted rows: 10,448 total, 9,460 carrying `wordCount`, 449 of
those carrying a `length` that differs from it, 0 carrying `wordCount` without `length`.
One instance: `blind-ground` (`019ec86a-0e01-71b5-98be-61aa081218a9`) holds
`wordCount: 4805` beside `length: 5401`, 596 apart on one chapter's single text.

`length` is machine-derived. `packages/alanwalton/story-length/src/derive.ts` states its
own job in its header: the derived `length` (= word count) of a chapter from its text.

`wordCount` is hand-typed. The authored chapters left the code repo for the books repo in
commit `8f5703e6de`, and the frontmatter carries the key by hand there —
`~/books/cornerstone/chapters/001-blind-ground.md:8` reads `wordCount: 4805`.

Nothing on `story-chapter` reads it as a length. `rg --multiline 'wordCount'` across the
code repo, excluding `node_modules` and `dist`, returns the `authored-book` type's own
derived `wordCount`, local variables in the tower and stories CLIs, and
`packages/collections/litrpg/src/scripts/backfill-chapter-length.script.ts` lines 47–63,
which copies `wordCount` into `length` where `length` is unset. That script is the only
consumer, and it reads the hand-typed number as authority.

Raised by an archivist seat emptying `dirty/skills/collections/findings.md`, whose entry
dated 2026-07-30 recorded one disagreeing row. That file is queued for removal, so this
outlives the sweep. Two of its pointers have gone stale: the chapter path, and the
contract it blames, now quarantined at `dirty/code/packages-stories-authored-claude.md`
line 66. No live instruction mentions the key.
