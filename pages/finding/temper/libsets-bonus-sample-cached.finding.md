---
id: f3e5547c-3a60-5efb-b5b8-549865e6bd12
slug: libsets-bonus-sample-cached
page-type-slug: finding
title: "Libsets bonus sample cached"
domain-slug: domain/temper
---

# Claim

In LibSets, `searchui/list-build.ts:158-164` samples one representative item's bonus count and text and writes it back onto the shared, global `lib.setInfo` record, where a second, unrelated consumer (`shared-prefilter.ts:211`) reads it back without knowing the value was computed under whatever item-id filter happened to be active when it was first cached.

# Evidence

Project #15987 (domain `temper`, status `someday_maybe`). Carried no objective — captured but never defined; this is its capture, moved off the row's retired `notes` attribute on 2026-08-15.

Origin: LibSets tooltip audit (nimue, 2026-07-25), under #15872's aggregate sweep. Observed at HEAD `9e1c5fe17a1e003bf18a5b6048c07cb65f4f304e`. Species: SAMPLE-AS-WHOLE compounded with a producer emitting a set-level verdict a second consumer cannot see the provenance of. Errs flattering. Confidence medium-high. Evidence grade: source-reasoned — whether ESO bonus descriptions actually vary within a set was not established; the structural defect stands regardless.

The defect: `searchui/list-build.ts:158-164` computes `setData.numBonuses`/`bonuses` from one representative `itemLink` and writes them back onto the live global `lib.setInfo` record (`:261 -> PreFilterMasterList -> :277-278`). The refresh guard at `:161` only recomputes when undefined, so the first sample wins for the session.

Sharp edge: when an itemId-relevant filter is active, the representative is `itemIds[0]` from `GetItemIdsForSetIdRespectingFilters` (`:106-110`) — filter-dependent. That value is read by `shared-prefilter.ts:211`, which trusts the cache and never recomputes.

Also: bonus-text search (`:307`) matches one item's bonus strings and presents the hit as a set property.

Members reachable: no — per-item variants are not retained.

Proposed fix (not carried out): do not write a sampled value onto the shared record; compute per-item at point of use, or key any cache by the filter state it was computed under.

Territory (2026-07-25T08:49, nimue): do not dispatch while #15986 is live — the four LibSets rows (#15986/#15987/#15988/#15989) overlap on files and share a worktree. #15987 collides with #15986 if its fix reaches `list-build.ts`. Proposed order: #15986, #15989, #15988, #15987 — a prediction from citations, to be reconfirmed against #15986's landed diff.
