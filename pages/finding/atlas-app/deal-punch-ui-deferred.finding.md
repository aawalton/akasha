---
id: 931c1d80-b25e-5ef4-a362-d2918c5821bb
page-type-slug: finding
title: "Deal punch UI deferred"
domain-slug: domain/atlas-app
---

# Claim

A tap-to-punch UI for marking deal uses on Atlas location-deal rows needs a UI-direction interview with Alan before implementation, and was deferred by him to be explored separately once the Starving Student Card data intake (#14610) it depends on completes.

# Evidence

Project #14613 (domain: atlas-app, status: someday_maybe, live-on: deploy). Carried no objective; this is its capture text, moved off the row's retired `notes` attribute on 2026-08-15.

Follow-on to seq 14610 (Starving Student Card data intake), deferred by Alan on 2026-07-05: "I do want to do this, but lets separate it and do UI exploration separately after the data intake is complete." Explore UI for marking deal uses on location-deal rows — the card's punch circles (useLimit 1/2/3 or no-limit, usesUsed) suggest a tap-to-punch interaction on the deal detail/listing surface, likely a pages-ui extension or an atlas-specific surface. Requires a UI-direction interview with Alan before implementation (user-intent: interaction design is his preference). Blocked on #14610 completing.

Filed as a finding because this project is not being actively worked.
