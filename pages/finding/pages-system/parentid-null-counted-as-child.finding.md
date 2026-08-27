---
id: 305a695f-254e-56a4-a0af-27ec66715bc7
page-type-slug: finding
title: "Parentid null counted as child"
domain-slug: domain/pages-system
---

# Claim

92 live `project` rows carry `parentId` as an explicit JSON `null`, so `attributes ? 'parentId'` — which tests that the KEY exists, not that it has a value — counts 92 parentless projects as children. A census keyed that way reads 3,965 children where the `parent_key` column reads 3,873, and the 92 in the gap all join to nothing because their `parentId` is nothing.

# Evidence

Measured 2026-08-07 against live via `ops db psql`, over `public.pages WHERE page_type_slug='project' AND deleted_at IS NULL`:

    project rows                                     13978
    parent_key IS NOT NULL                            3873
    attributes ? 'parentId'                           3965
    ? 'parentId' AND parent_key IS NULL                 92
    of those, jsonb_typeof(attributes->'parentId')='null'  92

So the whole 92-row gap is explicit JSON null, with no other cause mixed in, and the `?` test is a strict superset of `parent_key` with zero rows the other way.

`parent_key` is the instrument that answers the question. It is a real column, `text` holding a UUID string, so a comparison against `id` needs `::text`.

This is not theoretical. A quarantined document recorded that a manager's capacity correction reached its reader classifying two live parent trees — #16056 and #16492 — as children, on exactly this test. It measured 82 rows on 2026-07-27; the population is 92 today, so it is growing.

Searched `~/memory/findings/` with `rg -uuu -ni "presence read as value|existence test|key-presence|parentId"`. Two neighbours, neither this claim: `project/parent-relation-spelled-seven-ways.md` covers the seven spellings and the read/write type collision on the same field, and `project-track/done-today-track-unpinned.md` covers `parentId: ""` parting two spellings. Both are about the value under the key; this is about the key without one. `rg -uuu -ni` over `domains/` returns nothing.
