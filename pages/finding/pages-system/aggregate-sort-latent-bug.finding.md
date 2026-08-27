---
id: 9eebbb64-c0a7-5dd9-b4c6-be8dfc824a44
page-type-slug: finding
title: "Aggregate sort latent bug"
domain-slug: domain/pages-system
---

# Claim

In the pages-system domain, sorting a view by an aggregate column is likely broken the same way rollup sort was before #15778 fixed it: aggregate values materialize only at the leaf display cell (via useViewRowAggregates), never onto the view's items (pageRows), so an aggregate used as a sort key resolves to undefined for every row and falls through to the title tiebreak.

# Evidence

Source project: #15848 (status someday_maybe, live-on deploy, domain pages-system). Carried no objective of its own — captured notes only, moved off the project's retired `notes` attribute on 2026-08-15.

Latent defect flagged by worker-15778b while fixing #15778 (a Quality flag-not-fix, out of #15778's own scope). Same shape as the rollup-sort bug #15778 just fixed: aggregate computed values materialize only at the leaf (the display cell), never onto the view items (pageRows). So an aggregate used as a sort key resolves row[aggregateId] = undefined, giving a null key for all rows and falling through to the title tiebreak — the identical failure mode to the characterSortOrder rollup sort bug. Aggregate display works (leaf materialization via useViewRowAggregates); aggregate sort is likely latently broken.

Proposed cure (mirroring #15778's landed fix): materialize aggregate values onto pageRows the same way rollups now are. #15778 added computeFillRollupsForPage (pages-core) plus useViewRowRollups (ui view-engine), merged onto pageRows, mirroring the existing computeFillAggregatesForPage/useViewRowAggregates leaf fold. The aggregate equivalent already exists for display — the gap is merging it onto items before usePageView, as #15778 did for rollups. Judged likely small, with the same drift guard #15778 used (the computeAggregate/relatedPages the pipeline sort uses).

Verification proposed: a throwaway repro view sorting by an aggregate key (mirroring /nav/vt-sort-repro), checked via MCP.

Priority noted as medium: real but unreported, unlike #15778 which Alan hit directly. Framed as completing a Rule-of-Three: rollup sort (fixed in #15778) and aggregate sort (this project) both needed the item-level materialization the retired pages_for_view RPC provided, dropped by #14313.
