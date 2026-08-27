---
id: 6b622d1d-0be8-5386-b245-f35b258c2820
slug: select-options-never-reach-a-file-sourced-shape
page-type-slug: finding
title: "A select's options never reach a file-sourced shape"
domain-slug: domain/pages-system
---

# Claim

`definedOn` in `file-shape.ts` asks for `["key","type","defined-on-slug","title","id","returnType"]` and sets `config` only when `type === "formula"`. It never asks for `values`. So a property document that DOES state its option list still yields a definition with no `config.options`. Retiring a page-type row therefore drops every select's option list even where the owed property document was written — and a definition-count comparison reads as an improvement while the options disappear.

# Evidence

Measured 2026-08-20 against the live service and `DATABASE_ADHOC_URL`.

151 of 2,159 property documents already state a `values:` list, and the query service returns it: `page-property-definition` narrowed to `book-kind` comes back with `"values":["written","read"]`. So the data is authored and readable — only `definedOn` (`packages/shared/pages/access/src/file-shape.ts:52-77`) does not ask for it.

Across the 26 page types soft-deleted on 2026-08-20, 64 definitions on 29 types carry `config.options`, and 49 carry `config.targetPageTypeId`.

Option lists on retired types with NO property document, so the row is the only copy:

- `story-chapter.grade` and `.rating` — F, D-, D, D+, C-, C, C+, B-, B, B+, A-, A, A+, S-, S, S+
- `story-chapter.status` / `collection-template.status` — Not Started, In Progress, Following, Paused, Completed, Not Applicable, Archived
- `story-chapter.rank` — S-Rank, A-Rank, B-Rank, C-Rank, D-Rank, Not Ranked
- `story-chapter.maturityRating` — PG, PG-13, R
- `story-chapter.genre` — Animation, Action & Adventure, Sci-Fi & Fantasy, Fantasy
- `topic.sensitivity` — not_applicable, low, medium, high, critical
- `topic.status` — someday_maybe, someday_planned, planned, up_next, in_progress, done, not_doing
- `temper-completed-task.category` — spiritual, physical, social, intellectual, creative, domestic, professional
- `persona.family` — welsh, norse, greek, hebrew, celtic, canon, mortal, original

`story-chapter` had 0 rows but its file population is large, so these lists govern files that outlive the row.

Property document exists but states no `values:`, so the list dies anyway: `temper-task.scope`/`.priority`/`.category` (still live), `temper-completed-task.scope`, `value.color`, `persona.voiceLane`, `daily-tracking.version`.

Note the row spellings use underscores where the migrated files use hyphens — `relationship-topic` files read `someday-maybe` against the row's `someday_maybe` — so a list restored verbatim from a row will not match the files.
