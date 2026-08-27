---
id: b3f67621-4fc8-5ab1-91d3-bf779130d90c
slug: no-reward-recorded-delivered
page-type-slug: finding
title: "No reward recorded delivered"
domain-slug: domain/global
---

# Claim

No reward recorded as delivered stands on any ESO day sampled. `ops persona reward-crossings --due-only --json` returns `delivered: []` for every persona owing a colour on 2026-08-14, -13, -10 and -06, on 2026-07-25 and on 2026-07-01, while `due` is populated throughout — 9, 9, 5, 13 and 5 personas owing colours on those days. `domains/persona-reward.md` says what is stored is which colours were delivered.

# Evidence

Raised by the 2026-08-14 `review-instructions` reading of `domains/tasks/persona-reward/send-daily-reward.md`, which sampled five ESO days while checking the document's claims and said it had not established why and had sent nothing to find out.

I ran the sample again myself and widened it, counting on each day how many personas owing a colour carry a non-empty `delivered`: 2026-08-14, -13, -10, -06, 2026-07-25 and 2026-07-01 all return zero, against 9, 9, 5, 13 and 5 owing. Today's full read shows `amy` due red, yellow and green and `eppie` due red, yellow, green and blue, both with `delivered: []`. The verb is read-only over any past day by its own help, so the sample cost nothing.

Not measured, and this is the whole of what is missing: I did not open `reward-send`, the effect that writes the marker, or any transcript, so nothing here separates a reward never sent from one sent and never recorded, and nothing here rules out the sample having missed the days deliveries happened on. Filing decides nothing and starts nobody, and nothing was started — how much this matters and when belong to whoever owns this domain.
