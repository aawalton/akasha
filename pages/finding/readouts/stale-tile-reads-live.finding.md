---
id: 3d9e40d6-c95d-5d52-a401-f53eaa611d06
slug: stale-tile-reads-live
page-type-slug: finding
title: "Stale tile reads live"
domain-slug: domain/global
---

# Claim

A readout on Alan's phone cannot tell him a reading is old. `WidgetFeed.currentState` returns a cached body as `.loaded`, the same state a fresh fetch returns, and `LastKnownStore` has no expiry, so a feed that stopped renders exactly as a live one. `domains/readouts.md` intends that a readout with no reading says so, and that Alan is never the instrument that catches a readout being wrong. A tile drawing a frozen number is both of those failing at once.

# Evidence

Read in `~/code`: `packages/alanwalton/native-shell/ios-widget/WidgetFeed.swift`, whose `currentState` is commented "Fetch, else last known, else nothing — the whole failure policy, in one place" and whose two success arms both return `.loaded`; the `FeedState` cases reached there are `.loaded` and `.neverLoaded`, with no case for a reading that is stale.

The hazard is already written down twice in the code, each time as a reason for a local decision rather than as a defect in the policy. `CategorizeWidget.swift` notes that a build older than #18176 "falls back to a `LastKnownStore` body that never expires, and draws a number that has stopped moving", and that a missing `unreviewed` read as zero "draws a full ring and the word `0 left` — a finished job — off a `LastKnownStore` that by design never expires, so it would stand forever". `ClaudeUsagePayload.swift` carries a third note of the same shape.

The cost reaches past the tile and into what can be shipped. The seat on #18240 could not gate these routes in either order without a quiet window: a server-side absent reading is possible for one tile of seven and impossible for the other six, whose payloads have no absent form because zeros are a real reading each must state. The only path to an absent render is a body that fails to decode, and that is what falls back to the cache — the door and the trap are one mechanism. Their reading, unverified by me: a tile able to say it was drawn on Tuesday would have made the window survivable in any order.

Not measured: how long a tile typically holds a cached body before the feed recovers, so the exposure in practice is unknown. Not measured: whether any tile renders a timestamp that would let Alan catch this himself. Not read: the widget's timeline refresh schedule, nor the six payload types the paragraph above reports on.

Raised on 2026-08-09 by the seat on #18240 as a deploy-ordering question; the claim above is my own reading of the files rather than that report.
