---
id: 8aeed22a-9e7a-5608-8c6f-b0393ce3c113
page-type-slug: finding
title: "Ssc punches no events"
domain-slug: domain/atlas-app
---

# Claim

Punch state for the SSC deals collection is stored only as a static usesUsed/struckOut counter transcribed by hand from card photos, with no per-punch event (no timestamp, location or amount) and no dollar value recorded on any deal.

# Evidence

From Alan's alanNotes batch ('notify/punch by text message'), intent settled in intake interview 2026-07-16. Two directions were wanted:
1. OUTBOUND: when at a participating SSC location with a not-exhausted offer (usesUsed < useLimit, not struckOut), send a text message listing the offer(s).
2. INBOUND: user replies to the text to punch a redemption; the reply can optionally include a receipt picture to capture actual savings info.
3. Plus: good-effort ballpark savings estimates for punches already used (the 19 existing punches have no amount — retroactive estimation from offerText/offerType).

Data-shape context (live as of capture): 417 location-deal rows / 243 location branches / 1 collection, owned by smilingjenny. Punch state is a static counter (usesUsed int + struckOut bool) transcribed from card photos — NO per-punch event (no timestamp/location/amount) and NO dollar value on any deal. This gap means punches becoming events with an optional amount would also serve the SSC stats work (money saved / progress, see project #15547). Card facts on the collection row: barcode 4585229 0546, SSCDeals.com app.

This was project #15546 (domain atlas-app, status someday_maybe). The row was captured and never defined — it carried no objective. The text above is its capture, moved off the row's retired `notes` attribute on 2026-08-15.
