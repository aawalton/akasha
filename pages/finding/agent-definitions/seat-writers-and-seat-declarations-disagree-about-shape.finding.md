---
id: 44105c0f-59b2-4923-83bd-6a8835011646
page-type-slug: finding
slug: seat-writers-and-seat-declarations-disagree-about-shape
title: "Seat writers and seat declarations disagree about the shape of an uncommitted value"
domain-slug: domain/agent-definitions
---

# Claim

Nothing judges an uncommitted value, so nobody has noticed that on `seat` the code writing those values and the property definitions declaring them describe different shapes. Judged against the declarations, 167 of 1,136 uncommitted values across the repository would refuse, and 142 of them stand on 13 `seat` pages. The declarations are the store's word about the shape, so the writers are what should move — but `seat` is not the pages system's page type, and this is for whoever holds it.

# Evidence

Measured 2026-08-28 at `9c56bde6`, by compiling each page's property set and running the repository's own `judgeFrontmatter` over the keys its `.uncommitted.yaml` sidecar holds.

167 refusals by class: 86 keys the page type declares nowhere, 39 keys declared `computed: true`, 37 values outside `text`, 2 outside `uuid`, 2 outside `instant`, 1 outside `json`.

Two structural causes carry almost all of it. `tools/lib/seat-record.ts` writes a `{value, at}` envelope where `pages/page-property-definition/seat-model.page-property-definition.md:7` declares `type: text`, so every value it writes is a map where a scalar is declared. `tools/lib/seat-turn-pending.ts:5` writes a nested map under `turn-pending` where the declarations covering it are flat, which is where most of the 86 undeclared keys come from.

Four `seat` properties carry both `uncommitted: true` and `computed: true`. A computed key is one the store works out and a page may not state; an uncommitted key is one a program writes beside the page. Held together they say the value is both written and not writable, and the judge takes the second, which is where the 39 come from.

The raw judge returns 180, not 167. The 13 excluded are `principal` choice-group refusals: a choice states that one of a named set of keys must stand, and a sidecar holding some of a page's keys cannot answer that. Required-key refusals are excluded for the same reason.

Not measured: whether any value a program reads back would break if the writers moved to the declared shapes, and whether the same disagreement stands on the other page types with uncommitted keys, where the remaining 25 refusals sit.
