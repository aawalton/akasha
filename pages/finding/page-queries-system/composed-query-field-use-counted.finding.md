---
page-type-slug: finding
slug: composed-query-field-use-counted
title: "Composed-query field use is very unevenly spread, and limit cannot be counted in the code files"
domain-slug: domain/page-queries-system
---

# Claim

Use of the ten fields `ComposedQuery` declares is very unevenly spread across the corpus — `keys` stands in 50 of the 92 page queries under `pages/` and `descending` in one — and `limit` cannot be counted in the code files at all, because the spelling `limit:` there catches unrelated APIs.

# Evidence

Measured 2026-08-28 in akasha at `f4775605f` on `main`, by ripgrep over `*.ts` and `*.tsx` outside `node_modules` and built `dist/` trees, and over the 92 `*.page-query.md` pages under `pages/`.

Over the 92 files that mention `askComposed`: `"sort-by"` 27 occurrences across 18 files, `descending` 17 across 13.

Over the 92 page queries under `pages/`: `keys` 50, `where` 24, `takes` 12, `limit` 9, `sort-by` 6, `function` 5, `target` 5, `descending` 1, `count-by` 0, `offset` 0.

`limit` is left uncounted in the code files. The pattern `limit:` catches unrelated APIs in the same files, so a count taken with it would not be a count of composed-query limits. What can be said is that of the 50 numeric-literal `limit:` occurrences there, 41 are `limit: 1`.

The two zeroes are the subject of `pages/finding/page-queries-system/two-composed-query-fields-have-no-caller.finding.md`, which this census was measured alongside.
