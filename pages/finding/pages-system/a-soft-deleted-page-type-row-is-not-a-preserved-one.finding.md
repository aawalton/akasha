---
id: e1d2eb1e-3127-556e-ae08-eb45ab9afc76
page-type-slug: finding
title: "A soft-deleted page-type row is not a preserved one"
domain-slug: domain/pages-system
---

# Claim

Two things defeat the assumption that soft delete keeps the evidence. First, 260 page-type rows are already gone from `pages` outright, not soft-deleted — only 65 rows remain of a corpus briefed at 246. Second, of the 59 rows that ARE soft-deleted, every one retired before 2026-08-20 carries an EMPTY `propertyDefinitions` array, because a later rematerialize blanks the blob once the definition rows are gone. So the row standing is not the blob standing.

# Evidence

Measured 2026-08-20 against `DATABASE_ADHOC_URL`, read-only, with a firing control: an UPDATE is refused with "cannot execute UPDATE in a read-only transaction", and a synthetic slug returns 0 type rows where a real one returns rows.

`public.pages` holds 65 rows with `page_type_slug='page-type'`: 6 live, 59 soft-deleted. The brief cited 246 page-type rows and later 180 live.

Joining `page_versions` to `pages` — aliased explicitly, with a planted control returning 0 for a page that exists — gives 260 distinct `page_id`s whose `page_type_slug` is `page-type` and which no longer exist in `pages` at all. Their versions were last written: 3 on 08-20, 249 on 08-19, the rest earlier. Slugs recoverable from the version patch include `person`, `question`, `readout`, `notification`, `medication`, `option-list`, `heard-track`, `song-listen`, `ki-author`, `ki-book`, and a deliberate `hard-delete-probe`.

`jsonb_array_length(attributes->'propertyDefinitions')` across the 59 soft-deleted rows: every type retired on 2026-08-20 carries a populated array (28 to 77 definitions); every type retired on 2026-08-19 or earlier carries 0. `migration`, `graph-node`, `graph-edge` and `graph-node-attribute` all read 0.

Partial recovery exists and is worth knowing before it is spent. Those hard-deleted version rows still carry blobs: 6,152 of 6,389 hold a `propertyDefinitions` array, 81,650 definitions carry a `config`, and 12,815 carry a `config.options`. 142 of the 260 dead ids are claimed by the `id:` of a `page-types/*.md` file, so a version row can be joined back to a named type through the file rather than through the row.
