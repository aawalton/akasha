---
id: d59f6407-505d-5805-9e8d-69a009263bdd
page-type-slug: finding
title: "Location coverage goal"
domain-slug: domain/atlas-app
---

# Claim

Alan wants passive location-history tracking matched against target geometry so he can answer coverage questions such as what percent of Provo, UT sidewalks he has walked, and named it as the one item of the alanNotes location batch he wanted dispatched immediately rather than left someday_maybe.

# Evidence

From Alan's alanNotes batch ('"where have I been" tracking?'), intent settled in intake interview 2026-07-16. Alan: 'this one is big… I've been excited for this for a long time' — he wanted this dispatched now (it was the one non-someday_maybe item of the batch at intake, though the row's own status is later recorded as someday_maybe).

END GOAL: line up passive location history against target geometry so Alan can answer coverage questions like 'what percent of sidewalks in Provo, UT have I walked?'

Phase map (children minted as each dispatches):
1. Passive capture — background location tracking owned by the Atlas iOS native shell (Alan's explicit choice over Timeline backfill / third-party trackers), traces stored server-side as Alan-owned data.
2. Target corpora — import target geometry (e.g. OSM sidewalk/footway segments for Provo, UT) as queryable data.
3. Coverage computation — match traces to target segments, compute percent-covered honestly (GPS error, repeated passes).
4. Coverage surfaces — map overlay + stats in the Atlas web app.

Ground notes: native-shell (packages/alanwalton/atlas/native-shell) is currently a deliberately plugin-free thin WKWebView — phase 1 re-introduces a native seam (background location plugin, Always permission, UIBackgroundModes, macbook/Xcode/TestFlight loop; the sibling audio shell's apply-ios-seam.sh is the precedent pattern). Raw GPS traces are high-volume time-series — storage design must weigh the pages table vs a fitter store (content-storage-tier doctrine).

The server-side foundation for phase 1 is worked out in detail in project #15551 (dedicated location_traces table, access boundary, ingestion endpoint, plugin choice).

This was project #15549 (domain atlas-app, status someday_maybe). The row was captured and never defined — it carried no objective. The text above is its capture, moved off the row's retired `notes` attribute on 2026-08-15.
