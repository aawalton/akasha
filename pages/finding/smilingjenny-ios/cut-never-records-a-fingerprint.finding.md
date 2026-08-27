---
id: b442f244-0794-550b-896e-8f6380cc5e54
slug: cut-never-records-a-fingerprint
page-type-slug: finding
title: "Cut never records a fingerprint"
domain-slug: ios-app/smilingjenny-ios
---

# Claim

No cut of Jenny's shell can ever record that it happened, however many times she ships.

Her cut provenance is not merely missing, it is unreachable: the fingerprint write is gated on a field that her app is correct to leave unset. So nothing on this workstation can say what build her phone carries, and the instrument that would say reports the opposite of what happened.

# Evidence

Met 2026-08-14, delivering #19005. Her shell went to TestFlight as build 9, VALID and tester-visible, the gate having read the shipped commit out of both her app binary and her widget extension. `ops mobile cut-status --app smilingjenny` still reports "No TestFlight cut on record for smilingjenny — an intentional cut is OWED", unchanged by the cut that had just succeeded.

The fingerprint write is gated on `mainSha`, which is only set where `app.wwwStageScript !== null`. Hers is null by design: she is a thin web view and needs no www build stage. So the condition that records a cut is one her app can never satisfy, and every future cut of hers will report the same way.

Alan's own shell records normally — `last cut = build 186, mainSha 0b57c1d32d89` — so the instrument works and only this app falls outside it.

It predates #19005 and was unaffected by it: this was the first cut of her shell ever taken, so it is also the first occasion on which the gap could show. Cut provenance rather than stamping, and the two are separate mechanisms that happened to be met on the same run.

What it costs: a seat asking what is on her phone is told nothing carries this era, which reads as "she has no build" rather than as "this instrument cannot see hers". A wrong answer, not a missing one.
