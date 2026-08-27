---
id: 4ddcb533-ad98-5258-93f6-80571a5754c5
page-type-slug: finding
title: "Pages zero hot updates"
domain-slug: domain/database
---

# Claim

`public.pages`, the estate's hottest table, has zero HOT updates across all 194,189 updates recorded, because it is an EAV table whose domain data lives in indexed attributes (9 of its 25 indexes index attributes), so nearly every meaningful update touches an indexed column and makes HOT impossible by construction, independent of free space; the default fillfactor of 100 (no reserved same-page room) is a contributing but secondary factor.

# Evidence

Project #15918, domain `database`, status `someday_maybe`, `live-on: deploy`.

Found by aranya triaging #15895; root leg measured by astra. Captured separately — a whole-table structural property, not a story-chapter issue.

Measured: `public.pages` `n_tup_ins` 10402 vs `n_tup_upd` 194189 (~19:1). `n_tup_hot_upd`=0 across all 194k. 25 indexes, 9 on attributes. `reloptions` NULL (fillfactor default 100).

Why zero, two candidates, one decisive: (a) architectural, sufficient — HOT needs no indexed column changed; 9 of 25 indexes index attributes, so nearly every update touches one. (b) contributing — fillfactor 100 means even an update avoiding indexed columns often fails to stay on-page; matters once (a) is addressed.

Consequences: (1) write amplification — every update rewrites all 25 index entries. (2) heap scatter — updates relocate rows, so a scan does ~one random heap fetch per row; drives #15895 (story-chapter: 10,229 rows over 4,448 heap pages; an 8,624-row bulk update on 2026-07-14 moved scan cost ~980 buffers in a day). (3) added 2026-07-25T03:51Z (aranya): maintenance headroom — 194k non-HOT updates across 9 attribute indexes makes autovacuum expensive. Its own project: #15895 fixes one read path; this is the generator degrading every page-type path and every write.

Exploration scope, undecided (measure-first): quantify write amplification vs scatter; audit whether all 25 indexes earn their place (the 9 on attributes specifically); consider fillfactor below 100 (secondary until (a) addressed); separating hot mutable attributes from indexed ones is the architectural question with leverage.

Stopgap, palliative only: pg_repack/CLUSTER compacts scatter (4,448 pages toward ~500) without touching the generator. Plain CLUSTER takes ACCESS EXCLUSIVE, a non-starter live; pg_repack (online) is the only form, and scatter re-accumulates anyway. Do not act without measurement — an index or fillfactor change here is a migration, not a psql experiment.
