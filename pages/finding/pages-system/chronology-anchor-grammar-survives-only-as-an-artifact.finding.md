---
id: 5f3b9e8d-c5a0-51a6-be03-f19f20642a35
slug: chronology-anchor-grammar-survives-only-as-an-artifact
page-type-slug: finding
title: "The chronology anchor grammar survives only as an artifact"
domain-slug: domain/pages-system
---

# Claim

`story-chapter.chronologyAnchors` carried a hand-authored JSON Schema in the `schema` key of its definition on soft-deleted page-type row `019db5f4-063c-710f-a432-4c822d31915a`, and neither file-backed reader asks for `schema`.

# Evidence

Measured 2026-08-20 over `DATABASE_ADHOC_URL`, a database this tree cannot reach, so nothing below can be re-measured from here.

No property document can carry `schema`, so writing one would read green over nothing. The 17 terms now stand as four option lists, and the grammar those cannot express is preserved verbatim at `code:packages/alanwalton/awen/core/src/chronology-anchor.schema.json`.

The schema is 1,095 bytes, md5 of its jsonb text `ceadea64c8bc9b475515be38302917d7`; the artifact parses equal to that text.

Four vocabularies, 17 terms. `kind`: absolute, relative-offset, duration, simultaneity, season-marker, time-of-day. `tier`: exact-date, sub-day, day-offset, coarse-offset, season-festival, unanchored. `epi`: asserted, claimed. `direction`: before, after, simultaneous.

What an option list cannot hold, and why the artifact exists: an anchor requires `kind`, `tier`, `lexeme`, `reference`, `epi` and `src`; `by` is admitted only where `epi` is claimed and refused otherwise; `reference` matches `chapter-start`, `prior-scene`, `absolute` or `named-event:` followed by a kebab token; `src` cites `ch` with optional `vol` and `beat`; both objects close to further keys.

There is no instance data. `story-chapter` holds 0 pages, 0 of 9,117 pages carry a `chronologyAnchors` key, and no `page_versions` row names it among its keys.

The instrument was made to fail first. A control on `title` returned 0 because `title` is a column rather than an attribute, the same shape of error as `slug`; controls on real keys then returned 4,606 for `persona` and 3,813 for `status`, and an impossible key returned 0.

One schema hash across all 21 versions from 2026-07-16 to 2026-08-19, so no richer draft exists in history. `story-chapter-backup` extended the type rather than varying it, and it, the property-definition row and every view naming the key are already hard-deleted.
