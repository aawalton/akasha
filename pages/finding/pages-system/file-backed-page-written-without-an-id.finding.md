---
id: c80482e3-34f4-59f0-a4dd-dd886730bec5
slug: file-backed-page-written-without-an-id
page-type-slug: finding
title: "A file-backed page is written without an id"
domain-slug: domain/pages-system
---

# Claim

Nothing gives a page an id when it is written to a file, so a page created after its type moves off the database carries no name anything can point at.

# Evidence

Measured 2026-08-19, moving the persona page type off its rows under `personas-backed-by-files`.

A database-backed page gets its id from the `uuidv7()` default on `pages.id`. `tools/lib/page-write.ts` is the whole of the file-backed write path — `writePage`, `patchPage`, `patchState`, `removePage` — and none of them names `id`. `bodyFor` writes exactly the keys it is handed.

The persona files carried no id until they were backfilled from the rows this week, and a hard delete before that would have destroyed the one name each persona keeps: the object-store keys `persona-voices/<pageId>.reference.wav` and `.centroid.json`, `cover`, and every relation naming a persona by uuid all resolve from it.

`domains/personas/claude.md` shows the shape of the gap standing today. She is the default persona, she has a file and has never had a row, and so she has no id — not because anything failed, but because the only thing that ever handed one out was the database.

Not measured: how many file-backed page types carry an id at all, or whether every page type needs one. Only `persona` and `claude-account` were opened.
