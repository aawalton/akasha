---
id: 6be85d59-a690-5da0-8aa3-01a6bb9c724e
page-type-slug: finding
title: "Every clause of author-persona-scene step 7 now names something that no longer exists"
domain-slug: domain/arousal
---

# Claim

Step 7 of `author-persona-scene` instructs an agent to create a `story-chapter` row, and every clause of that instruction now names something that no longer exists: the page type holds no rows, the property names it passes are the row world's, the story it files under is gone, and the subscriber it relies on to derive the word count can never fire.

# Evidence

`domains/tasks/scenewright/author-persona-scene.md:66` instructs: create a `story-chapter` row under the `anthology` authored-story, carrying `story`, `chapterNumber`, `text`, `maturityRating` and `source`, omitting the word count because "the `story-length` subscriber derives `length` from `text` on the create event".

Measured 2026-08-20, each independently.

`story-chapter` carries 0 live and 0 soft-deleted pages, off `public.pages` joined on its page-type id `019db5f4-063c-710f-a432-4c822d31915a`. Its document declares `files: none`, so it is absent from the roster the query service serves at `/page-types`.

The chapters stand under four concrete types, counted through the read path: `story-chapter-royal-road` 17,709, `story-chapter-wandering-inn` 828, `story-chapter-played` 123, `story-chapter-written` 11 — 18,671, every one a file, none with a row.

The property names are the row world's. The files spell `partOf`, holding a story slug rather than a relation id, where the instruction says `story`; `position` for `chapterNumber`; `ownLength` for `length`; and the prose is the markdown body, not a `text` property. A key census over 934 chapter files found no `maturityRating` and no `source`.

Neither `authored-story` nor `anthology` is a live page-type row, and neither is on the roster.

`story-length` cannot fire: it subscribes to page events keyed on that page-type id, and a file raises no page event. The last event under the id is 2026-08-18 00:19:18+00 while the newest event in the table is 2026-08-20 14:19:23+00, so the table is live and this type's events stopped two days ago. Its systemd unit reports `inactive` and no process matches it. Twelve `event_subscriptions` rows still stand on the id.

A chapter created as step 7 describes lands nowhere, and would carry no word count.
