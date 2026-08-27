---
id: dee4e0b8-40a3-5f65-84b5-26b2f6b29658
page-type-slug: finding
title: "Voice model download backgrounding"
domain-slug: ios-app/alanwalton-ios
---

# Claim

The alanwalton-ios voice-model's one-time download is an in-process fetch that app suspension can pause or kill, currently mitigated only by bounded retry-with-resume plus a "keep the app open (first time only)" affordance rather than by a true background-transfer-capable session.

# Evidence

Project #15747 (domain: alanwalton-ios), status someday_maybe, live-on: deploy. Carried no `# Objective`; the notes below are the observation.

Flagged follow-up from #15739/#15740 (out of scope there — FluidAudio-external): the voice-model download is an in-process fetch, so app suspension pauses/kills it; current mitigation is bounded retry-with-resume (#15740) plus an honest "keep the app open (first time only)" affordance.

What this row proposed: replace/wrap with a true background-transfer-capable session so the one-time model download survives backgrounding — removing the keep-open requirement entirely. Named as a large change: requires changes outside the FluidAudio SPM surface (download the 75-file model set directly via background URLSession into FluidAudio's expected cache layout, or upstream a progressHandler/session injection). Judged not urgent: first-download is one-time per device and the existing affordance is honest. The project's own framing was to dispatch on judgment when the audio family is quiet.

Re-homed standalone under astra on 2026-07-18T19:03:50.704Z: #15700's umbrella had closed with the default-audio arc delivered; this optional enhancement tracked independently thereafter.
