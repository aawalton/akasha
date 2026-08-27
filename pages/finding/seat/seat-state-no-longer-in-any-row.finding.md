---
id: eaeb897d-4888-5208-b267-a713339975e5
slug: seat-state-no-longer-in-any-row
page-type-slug: finding
title: "Everything about a seat stands in its file and nothing in a row, so that Intent entry should leave outright"
domain-slug: page-type/seat
---

# Claim

"Everything about a seat stands in its file, and nothing in a row" is now true and should leave Intent outright. No `seat` row has ever existed, the `agent` rows that held a seat's persona, domain, role and mode were all retired at 14:43 today, and nothing under `tools/` reads or writes an agent page row. The two tmux entries hold today but over a population of three, too thin to resolve on. "A seat outlives every editor showing it" I did not measure.

# Evidence

Measured 2026-08-20T14:46-14:49Z, all RUN.

No seat has ever been a row. `select count(*) from public.pages where page_type_slug='seat'` returns 0, and no `page-type` row has ever carried `slug='seat'`.

The rows that did hold seat state were `agent` rows, which Alan ruled are replaced by seats rather than migrated. At 14:41Z there were 2,448 live; at 14:46Z there are 0 live and 2,497 soft-deleted, the `agent` page-type row having been soft-deleted at 14:43:23Z. Before they went, four read `status: running` and carried `persona`, `domain`, `role`, `mode` and `name` — every one a seat attribute or property named in this document's Design. Their last write was 12:33:55Z and none had been written in the preceding ten minutes, so they were already residue rather than a live record.

The whole `pages` table now holds 136 live rows across six page types: property-definition 69, temper-character 29, temper-task 24, page-type 6, temper-account 4, temper-inventory-chunk 4. No seat state is among them.

Nothing in the instructions repo reaches an agent page row. Grepping all of `tools/` for `getPages`, `pageTypeSlug`, `page_type_slug`, `writeRow`, `patchPage` or `createFilePage` on the same line as `agent` returns zero hits; the 20 `tools/lib` files matching `agent` match event category names and rule kinds. `tools/lib/seat-page.ts` writes files, under `PAGE_TYPE = "seat"`, `SEATS = "seats"`, into the memory repo.

The seat population reads back from files: the page query service answers `seat` with n=3, matching the three files at `memory:seats/*.md` — aine, amy-alan-handler, nimue.

On the tmux pair: `tmux ls` at 14:49:16Z lists exactly aine, amy-alan-handler and nimue, so every seat is a session and every session is a seat, 3 of 3 in both directions. Three is a small population and one reading; it is consistent with both entries and does not establish either.

I did not measure "A seat outlives every editor showing it" and take no position on it.
