---
id: 3720ac19-88cf-5b9b-90d2-49e21cbb0db5
page-type-slug: finding
title: "Deficit hours drawn nowhere"
domain-slug: domain/global
---

# Claim

The comment over `capacityCircle` says a deficit day draws a full black ring "and still shows its hours". The tile draws no hours: a deficit circle arrives with no arc and a black tier, which is exactly the pair `StoplightRing` withholds a figure for. The reading is still computed, still formatted and still serialized — it is drawn nowhere. An agent reading that comment reads the widget as broken against it, and the cheap act is to change the widget back.

# Evidence

Read 2026-08-13 while reviewing `domains/readout-upkeep-stoplights.md` line by line, against the code as it stands.

**What the comment says.** `packages/shared/status-bar-access/src/upkeep-stoplights.ts`, over `capacityCircle`: "The negative day draws a FULL BLACK RING and still shows its hours."

**What the payload carries.** `capacityCircle` hands a negative day to `wholeUnitCircle`, which returns `tier: "black"`, the hours through `formatReading`, `nextTier: null` and `progress: null`.

**What the tile draws.** `packages/alanwalton/native-shell/ios-widget/StoplightRing.swift` computes `arc` as nil unless `nextTier`, `progress` and `progress > 0` all hold, then `isAtEnd = arc == nil && (tier == .black || tier == .blue)`, and wraps the figure in `if !isAtEnd`. A deficit meets both halves, so the ring is drawn and the number is not.

**Both halves were deliberate.** The Swift comment states them as such — a black circle climbing toward red keeps its figure because it has a part-drawn arc, and only a bottomed-out or blue circle is an end — citing Alan's ruling that the figure appears when he has made progress.

**What moved.** The suppression rule arrived after the comment: the Swift file cites #18577 narrowed by #18615, and the `READING_MAX_CHARS` note in `stoplight-circle.ts` still reasons about a `-12.5` deficit drawing as `-13` inside the ring, which is the picture that rule ended.

**Why it is filed rather than fixed.** Which party should move is Alan's: the corpus agrees with the widget — `domains/stoplight-ring.md` carries "A reading below black or above blue keeps its stroke and draws no figure" — but a deficit is also the reading he may most want a number for.

**What is not in question.** `domains/readout-upkeep-stoplights.md` says only "A capacity day in deficit is full black", which is true and was re-run against the decider's unit suite (88 pass) during the same reading.
