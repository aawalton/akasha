---
id: 5f731eb8-106f-544a-8492-0b61adcea4de
slug: visited-bar-unstated
page-type-slug: finding
title: "Visited bar unstated"
domain-slug: domain/atlas-app
---

# Claim

The one field recording where Alan has been carries no stated bar. `Visited` is written from a review he wrote and from nothing else, so the standard in force — that he stood in the place — holds only as long as nobody adds a cheaper writer, and a trace table now exists to add one from.

# Evidence

Read 2026-08-07 across `~/code`, `~/instructions` and `~/memory`.

One writer set the field. `packages/alanwalton/atlas/web/scripts/src/unify-places.ts:236` set `loc.visited = true` inside `attachReview`, so it was set where Alan wrote a review of the place — an act that presupposes having been there; that importer stood in the code repository and stands in no tree here. The field itself stands at `pages/page-property-definition/location-visited.page-property-definition.md` as boolean key `visited`, carried by 70 of 1,210 location pages, and its Definition — "whether the person has been" — says what the field records, never what earns it. The bar holds because there is one path to the field, not because anything says what the bar is.

A cheaper path is now available. `location-trace` takes background GPS fixes, written by `alanwalton/atlas-web/app/routes/api.locations.ingest.ts` through `alanwalton/location-traces-access/src/insert.ts`, and captured on a 10-metre distance filter — `DISTANCE_FILTER_M = 10` at `alanwalton/atlas-web/app/lib/location-capture.client.ts:22`. Marking a location visited where a trace passed near it is the obvious build over a trace table, and at 10 metres a bus route through a street would set the field on everything along it. The field admits no degree and never goes back.

Nothing states the standard. `pages/domain/atlas-app.domain.md` carries a Definition and nothing else. `rg -uuu -in "stood in|physical presence|visit(ed)? (bar|standard)|been there" findings/` returns five hits, none about atlas. `pages/finding/atlas-app/neither-decay-nor-use-observable.finding.md` says `Visited` "is a boolean that never goes back" — what the field does, never what earns it. The one statement of the standard anywhere is the epigraph on Atlas's own persona, at `alan/persona/atlas.persona.know.attachment.txt:1` and again at `alan/persona/atlas.persona.purpose.attachment.txt:1`: *"A place isn't real to me until I've stood in it."*

Found while ingesting `dirty/skills/atlas-app/rulings.md`, whose sentence "The record's standard is contact — a place is real when he has stood in it" is the only copy in that tree. Kept under quarantine at `dirty/maybe-keep/skills/atlas-app/`, and filed here so it survives the sweep of that copy.

NOT MEASURED: whether anyone intends to derive visits from traces. The point is that nothing would refuse it.
