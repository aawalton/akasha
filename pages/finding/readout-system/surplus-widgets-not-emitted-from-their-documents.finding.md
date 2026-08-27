---
page-type-slug: finding
id: b5c45e2b-e242-57ae-881f-18c85b9f4110
title: "The surplus widgets' Swift is hand-written and diverges from what their documents emit"
domain-slug: domain/readout-system
---

# Claim

The surplus widgets' Swift is written by hand and no longer matches what their documents emit, so the document is not what the tile is built from.

# Evidence

`ops instructions ios-widget-emit alanwalton-surplus --diff` reports 65 differing lines against the committed `SurplusWidget.swift`, and `smilingjenny-surplus` reports 112. The committed files use the shared `SurplusRing`, `surplusReading` and `surplusCaption` helpers; the emitted form declares a self-contained `SurplusPayload` instead.

This was found closing `amy-surplus-reaches-alan-and-jenny`, whose two quoted intents both hold. It bears on two lines that still stand: `readout-system` states "Every difference between readouts stands in data, not code", and the `ios-widget` page type states "Every widget an app carries stands as a document, and nothing spells the bundle by hand".

One symptom is already repaired: the `feed:` on `alanwalton-surplus` named `/api/habit-stoplights` while the shipping Swift called `/api/surplus`, so the document and the tile disagreed about which route the widget reads with nothing reporting it. Whether the remaining divergence wants the Swift regenerated or the emitter taught the shared-ring form is not settled here.
