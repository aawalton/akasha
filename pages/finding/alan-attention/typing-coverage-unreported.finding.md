---
id: aead3578-3c9e-5b1f-8113-20e9c4487623
slug: typing-coverage-unreported
page-type-slug: finding
title: "Typing coverage unreported"
domain-slug: domain/alan-attention
---

# Claim

The typing-minute reading reports no coverage figure, so a seat that cannot record and a seat nobody typed into produce the same absence, and the recorder reaches a seat only when that seat's process starts after the code landed.

# Evidence

Observed by the lead closing #18468, against the deployed system. The recorder lives in `pty-proxy.ts` and is constructed when an interactive seat's proxy process starts, so a seat already running when the code landed carries nothing and never acquires it.

The recorder reached `origin/main` at 14:29 MDT on 10 August. At 16:17, all twelve interactive seats still predated it: the newest started 12:35, and two had been running since 9 August. Across that afternoon `public.metrics` held exactly one `alan_attention.typing_minute` row — from `amy-code-editor-developer-flex-409`, a seat that started at 15:13 and has since exited — while Alan typed to a lead seat continuously for the hour before the reading was taken.

Nothing in the series says which seats were instrumented when. A reader taking distinct typing minutes per day cannot tell a quiet day from a day when no live seat carried the recorder, and the error runs toward reporting spare attention Alan does not have. That is the direction of failure the project was created to avoid, arriving by a different route than the one it guarded.

Interactive seats here are long-lived — the population sampled ran between four and thirty-one hours — so coverage does not converge on its own within a day.

Not measured: how long the fleet takes to turn over in the ordinary course, and whether any share of seats is effectively permanent. Whether the remedy is a recorded coverage figure beside the count, a deliberate cycling of seats, or a seam that does not sit in the seat's own process is a decision nobody has taken.
