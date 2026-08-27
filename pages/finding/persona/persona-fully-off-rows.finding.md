---
id: e5ce1abb-cf2d-5cf0-b8cf-9c716bfe2900
page-type-slug: finding
title: "Two of persona's three Intent entries are now true and should leave outright"
domain-slug: page-type/persona
---

# Claim

Two of the three Intent entries are now true and should leave outright: "Everything about a persona stands in her files, and nothing in a row", and "Everything else authored about a persona stands in a large property beside her". Zero live persona rows since 14:30 today, 41 files reading back through the query path, and every key the rows carried now has a file home at matching counts. The third, on minting a second live row, I could not establish without a write against Alan's own records.

# Evidence

Measured 2026-08-20T14:41-14:49Z, RUN unless noted.

Rows: `persona` has 54 rows and 0 live. Forty were soft-deleted at 2026-08-20 14:30:10Z in one act, the other 14 singly since June; the `persona` page-type row went in that same act. The `pages` table now holds 136 live rows across six types, none of them persona.

Files: 41 `.md` pages at `instructions:domains/personas/*.md`, all stating an `id:`. The query service answers `persona` n=41, so the population reads back rather than merely sitting on disk.

Every key the retired rows carried has a file home at matching counts. The rows carried ten keys. `value` 40 and `greenDayPoints` 40 answer to `value-slug` 40 and `green-day-points` 40 on the files. The six points-source keys moved to `instructions:domains/persona-points-sources/*.md`, 40 documents whose `kind` 40, `marker` 25, `aggregate` 7, `path-prefix` 4, `weight-field` 1 and `point-field` 1 match `pointsSourceKind` 40, `pointsSource` 25, `pointsSourceAggregate` 7, `pointsPathPrefix` 4, `pointsSourceWeightField` 1 and `pointsSourcePointField` 1 exactly. `cover` 40 is answered by 38 pages at `domains/persona-cover-images/*.md`. `totalPoints` 39 alone has no file, and `properties/persona-total-points.md` states as its own Intent that nothing writes a persona's total.

For the second entry, the authored material stands in large sidecars beside each persona: 40 each of `.purpose`, `.portrait`, `.keep-contract`; 39 each of `.want`, `.perceive`, `.know`, `.glance`, `.feel`, `.do`; 38 `.conduct` — all `.large.md` — plus 39 `.reward-concepts.jsonl` answering n=3860.

On the third entry: `pages_page_type_slug_slug_idx` is not unique, and the only slug-shaped unique index is `pages_unique_key_uniq_idx` on `(page_type_slug, unique_key)` where `deleted_at is null`. Whether a row can still be minted turns on the write path's treatment of a retired page type, and settling it needs an insert I did not make.

`ops persona points-source check` still reads a persona row for five of those keys. I could not run it: it exits 70 on `@shared/instructions-corpus` failing to load.
