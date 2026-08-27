---
id: 3ffec995-c010-5e50-9c64-34123e6d7f37
page-type-slug: finding
title: "Page types empty and undocumented"
domain-slug: domain/global
---

# Claim

25 live page types hold no page at all, counting soft-deleted, and have no page type document — 24 of them for a month or more.

# Evidence

Measured 2026-08-19 by `ops page-type zero-rows --min-age-days 0` against the 123 documents in `page-types/`. A separate count of live pages alone gives 36; the difference is eleven types holding only soft-deleted rows, which `zero-rows` counts as existing.

Eight are one family minted the same day and never written to: `ki-show`, `ki-season`, `ki-episode`, `ki-movie`, `ki-franchise`, `ki-book-series`, `ki-collection-template`, all 49 days old. Three are `scripture-book`, `scripture-chapter` and `scripture-volume` at 118 days. Four read as scaffolding: `fav-verify-one`, `fav-verify-two`, `block-editor-probe` and `story-chapter-backup`. The rest are singletons — `task-template` at 120 days, `temper-build-version`, `video`, `reading-story`, `story-class`, `story-skill`, `story-character-timeline`, `story-chapter-image`, `temper-sale`, `chess-review-session`.

Only `sms-discard` is young, at 8 days. The `zero-rows` command's own help draws exactly that line: months empty is a suspected broken writer, days empty is usually an input that has not occurred yet.

Retiring an empty type is reversible through `ops page-type undelete`, and it converts a silent absence into a loud failure, since a writer hitting a deleted type raises. But an empty type is not the same as an abandoned one, and a whole product family minted together may be a build not yet started. Alan holds that ruling and has not made it.
