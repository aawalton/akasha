---
id: 6b00e483-ca11-58c0-abb2-4269a5bb3b25
slug: page-type-row-still-says-relationship-progress
page-type-slug: finding
title: "The page type row still says relationship-progress"
domain-slug: page-type/persona-day
---

# Claim

The page type is `persona-day` in the instructions repo and `relationship-progress` in the database, so a sweep asking the database which page types it still backs looks for `persona-day`, matches nothing, and reads the type as already moved to files while 1,933 rows stand.

# Evidence

Measured 2026-08-19 against the live database, taking project #19433 end to end.

`page-types/persona-day.md` was renamed from `domains/persona-day.md` on 2026-08-19 in commit `48bf28d1c`, which gave it `slug: persona-day` and `files: memory:persona-days/**/*.md`. The database was not touched: the live `page-type` row is `019f0e73-c738-78cc-9f5f-a7ca14823c90`, `slug` `relationship-progress`, `deleted_at` null, `updated_at` 2026-08-19T16:21:56Z. Selecting `page-type` rows whose slug is `persona-day` returns nothing.

The rows are untouched by the rename too. 1,933 pages carry `page_type_slug` `relationship-progress`, none soft-deleted, 82 dates against 40 personas, latest write 2026-08-19T23:31:44Z. `memory:persona-days/` does not exist and holds no file.

A page type mid-migration is not told apart by whether its page-type row stands. `persona` has moved — its 40 pages are files under `domains/personas/*.md` — and it still holds a live `page-type` row and 40 live page rows, because `migrate-page-type-to-files` keeps both stores until every reader has landed. What tells a finished migration apart is a page-type row absent altogether, as for `persona-wallpaper`, `persona-anchor-image` and `persona-reward-image`, each of which reads 0 pages and 0 page-type rows.

The second spelling is due to go at step 6 of `migrate-page-type-to-files`, which is after the files exist and after every reader has moved. Until then a sweep keyed off the instructions repo's slug under-reports this page type, and the under-report reads exactly like a migration that succeeded.
