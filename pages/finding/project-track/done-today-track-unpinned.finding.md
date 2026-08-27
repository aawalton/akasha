---
id: 7c2011a0-9930-5b99-9744-e52547813380
page-type-slug: finding
title: "Done today track unpinned"
domain-slug: domain/global
---

# Claim

The `doneTodayByTrack` arm of `get_status_bar_snapshot` is pinned against counted
literals rather than against `ProjectTrack`, so a divergence between its track
discriminator and the TS constructor on a malformed `parentId` fails no fixture.

The RPC spells the three-arm track discriminator twice, in two adjacent CTEs of one
generated SQL file. Only one of the two is held to the constructor. A row carrying
`"parentId": ""` is the shape the two spellings can part on, and no done-today fixture
seeds one.

# Evidence

Run against the code repo on 2026-08-07 while ingesting
`dirty/knowledge/project-progress-species.md`, which asserted this gap in the retired
two-species vocabulary. Re-verified against the live three-track code.

`get_status_bar_snapshot.sql` carries the identical three-arm `CASE` in two CTEs:
`done_today_rows`, feeding `doneTodayByTrack`, and the `projectCounts` inner select.
Both read `parent_key IS NOT NULL AND parent_key <> ''` for `child`, an `EXISTS`
against `parent_ids` for `parent`, else `singleton`.

In `get-status-bar-snapshot.database.test.ts`, the test "projects: track is
PARENTHOOD" seeds six shapes — absent key, `null`, `""`, an unrelated uuid, a real
parent, the pointed-at row — asserting each with
`expect(row?.track).toBe(String(ProjectTrack(shape.input)))`. That covers the empty
string against the sole TS constructor.

The done-today test seeds seqs 11, 12 (no parent), 13 (deleted), 14 (non-done), 15
(`parentId` set), then asserts `toEqual({ parent: 0, child: 1, singleton: 2 })`, a sum
over `PROJECT_TRACK_NAMES` equal to `doneTodayCount`, and a reconciliation with
`foldProjectProgress`. `ProjectTrack` is imported in the file but not called here, and
no done-today fixture carries `parentId: ""`.

Drop `<> ''` from `done_today_rows` alone and a done row with `"parentId": ""` counts
`child` where the constructor says `singleton`. The literal is unmoved, no fixture
seeding that shape. The sum still equals `doneTodayCount`, the row landing in some
track either way. The fold reconciliation still holds, summing `child + singleton`
into one column — which absorbs exactly this misclassification.

The SQL's comment records that `_compose_parent_key` copies `attributes->>'parentId'`
verbatim and that `->>` yields an empty string for `"parentId": ""`. Both the
constructor and the `projectCounts` arm guard against it deliberately.

Both CTEs carry the guard today. The file is marked GENERATED, so the edit that could
drop it is made upstream, where the two spellings are not adjacent.
