---
id: 01c30f58-b527-5bd3-9269-0a273f2d6b62
slug: ssc-stats-surface-open
page-type-slug: finding
title: "Ssc stats surface open"
domain-slug: domain/atlas-app
---

# Claim

SSC stats intent is settled to exactly two shapes — coverage and value — but which surface shows them (Atlas app page vs pushed report) is undecided, and the underlying data lacks per-punch events, dollar values on deals, and any record of the card's purchase price.

# Evidence

Folds two alanNotes items ('how much money saved by SSC?' + 'progress stats for SSC'), intent settled in intake interview 2026-07-16. Alan wants exactly two stat shapes — coverage and value; explicitly NOT punches-over-time momentum or per-deal exhaustion views:
1. COVERAGE: deals punched vs the 417 on the card, by section.
2. VALUE: dollars saved — receipt-captured amounts where present, good-effort ballpark estimates otherwise (per project #15546's retroactive estimation) — vs what the card cost.

Open at dispatch: which surface (Atlas app page vs pushed report) — not settled in intake. Data-shape gaps shared with #15546: no per-punch events, no dollar values on deals; card purchase price not currently recorded anywhere (collection description carries barcode/URLs only) — will need capturing. Deals are owned by smilingjenny; RLS means the stats surface must read as an owner identity.

This was project #15547 (domain atlas-app, status someday_maybe). The row was captured and never defined — it carried no objective. The text above is its capture, moved off the row's retired `notes` attribute on 2026-08-15.
