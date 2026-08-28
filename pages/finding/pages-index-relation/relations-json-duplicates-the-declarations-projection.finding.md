---
id: 42d092f7-01b7-4103-a66d-a54e58033512
page-type-slug: finding
title: "Relations json duplicates the declarations projection"
slug: relations-json-duplicates-the-declarations-projection
domain-slug: domain/pages-index-relation
---

# Claim

`relations.json` holds no index data. It is the page-type-to-relation schema the index is built *by*, derived from the same declaration pages `declarationsOf` already reads into a richer, mark-keyed projection. It knows 391 page types where the registry knows 393: `category-rule` and `email-rule` are absent entirely, and `reachedFrom` renders that absence as "declares no relation".

# Evidence

Measured 2026-08-28 at `7327a56db7`, against the live index at `.git/pages/index/`.

What it holds: 134,475 bytes, 391 page-type keys, 1,499 property entries — `key`, `kind`, `target`, `attachment`. Not a reverse map; the reverse map is `relation/`, 123 directories.

Its producer `relationsOver` at `page/index/relation/relation.ts:91-112` reads only pages of type `page-type` and `page-property-definition` — 2,682 of 59,258 rows.

Four live readers. `build.ts:363` wants the map. `warrant.ts:20` wants only `file`-kind keys, of which there are three: `command-path`, `script`, `widget-path`. `relation-resolves...:167` wants only the key set. The graph producer at `relation.graph-edge-producer...:66` wants the map and already recomputes it from the tree at `:67-71` when it reads empty. `standingHere` at `build.ts:219` has no importer: searching `from ".*index/build` finds `landing.ts:2`, `index-fixture.ts:1`, `refresh.ts:4`, and none takes it.

Duplication: rebuilding the map from `declarationsOf(tree).bySlug` plus the registry's extends chain matched `relationsOver` on 387 of the 391 shared types, in 1.74 ms. `declarationsOf` costs 53.13 ms, carries `fault` for an unreadable declaration, and guards an empty answer with `anyDeclared` at `declarations.ts:64`.

Costs: `loadRelations()` 0.48 ms median over 9. Recomputing from the 2,682 files 53.49 ms median, of which 51.39 ms is the reads and 1.28 ms `relationsOver`.

Drift standing at measurement: 6 of 391 types differed from a recompute, 20 relation entries short. `cluster`, `persona-appearance` and `persona-points-source` each lacked seven, including `domain-parent-slug` and `required-reading-slugs`.

Not measured: whether the four rule-set types differ for a reason beyond the extends chain this used.
