---
id: fbe9d406-827c-5483-ab5e-4547ff717eb6
slug: last-read-ignores-completion
page-type-slug: finding
title: "Last read ignores completion"
domain-slug: domain/collections
---

# Claim

`selectLastRead` is the one reader in Nova's selector that ignores `completedAt`, and it returns
`null` for the story shape the reading catalog is fullest of. `isFullyRead` makes `completedAt` the
completion authority and `selectUnreadChapters` filters on it; `selectLastRead` reads grades and the
word bookmark only. A story with thousands of completed chapters, no grades and no bookmark has no
resolvable last-read. Nothing reports it: `null` is also the honest answer for a story never opened.

# Evidence

Read live on 2026-08-07 in `packages/collections/litrpg/src/nova/select-internals.ts`.

`isFullyRead` (line 68) is `c.completedAt != null`, and its own comment calls `completedAt`
presence THE completion signal. `selectUnreadChapters` (line 139) filters on `!isFullyRead(c)`.

`selectLastRead` (line 254) consults neither. It takes `graded` first, and where no chapter is
graded it falls to `resumeFloor`, which derives a chapter number from `story.progress` — the word
bookmark — and never from `completedAt`.

The case the original observation left untraced resolves against the code. `resumeFloor` passes
`bookmarkWords` only when `story.progress !== undefined`, so with no bookmark `resolveResumeChapter`
takes `bookmark = inputs.bookmarkWords ?? 0`, hits `if (bookmark <= 0) return first?.chapterNumber`,
and yields **1**. Back in `selectLastRead`, `graded` is empty and `floor` is 1, so
`before = chapters.filter((c) => c.chapterNumber < 1)` is empty and the function returns **null**.

That chapters carrying `completedAt` are numerous is measured next door:
`pages/finding/collections/completion-markers-unfilled.finding.md` counted `story-chapter` at 10,448 rows on
2026-08-07, of which 7,182 carry `completedAt`.

NOT measured here, and not to be read off that neighbour: whether the `grade` column is empty. That
finding's table covers `progress`, `status` and `completedAt` only. The claim that grades are absent
across the reading catalog comes from `dirty/skills/litrpg-books/findings.md`, an untrusted source I
was emptying, and I did not re-run it against production.

The asymmetry does not rest on either count. `selectLastRead` ignoring the authority
`selectUnreadChapters` respects is in the source, and the `null` follows from the code alone for any
story with no grade and no bookmark, however many such stories there are.
