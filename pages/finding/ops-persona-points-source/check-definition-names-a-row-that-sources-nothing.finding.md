---
id: 914f471c-8ee7-501c-b441-fbb4763db9d2
page-type-slug: finding
title: "The points-source check definition names a row that sources nothing"
domain-slug: domain/global
---

# Claim

`domains/commands/ops-persona-points-source-check.md:19` defines the command as "each persona's row against her document". No row is read at all. The recipe comes from `domains/persona-points-sources/*.md` and the bar from `green-day-points` on `domains/personas/*.md`, the persona page type being file-backed. The line describes a comparison of a row against a document where both sides are now documents, and every row of the persona type is soft-deleted. It is a Definition line, so it is Alan's.

# Evidence

Measured 2026-08-20 by running `ops persona points-source check`.

The run's own first line of output is `pages-access: getFilePages(persona) named no select`, so the persona read answered from files. `personaRows` at `tools/lib/persona-rows.ts:26` asks `getOwnerScopedPages(sb, { pageTypeSlug: "persona" })`, and `page-types/persona.md:6` declares `files: instructions:domains/personas/*.md`. The 41 the report calls "row(s)" are those 41 documents.

`check.ts:156-163` builds every recipe from corpus records carrying `page-type-slug: persona-points-source`, keyed on `domain-parents-slugs`. `check.ts:204` takes `greenDayPoints` off that same file read: `domains/personas/nimue.md:19` states `green-day-points: 4`, and the run reports her bar as 4.

The six recipe keys moved to files with exact count correspondence, confirmed by reading all 40 documents: `kind` 40, `marker` 25, `aggregate` 7, `path-prefix` 4, `weight-field` 1, `point-field` 1.

So a reader taking the Definition at its word would go looking for a row. Nothing in the comparison comes from one, and the rows that would have carried it are retired.
