---
id: 40f74755-7694-536b-951e-2a0f3ccd70b8
page-type-slug: finding
title: "Manual faucets have no absent row alarm"
domain-slug: domain/alanwalton-app
---

# Claim

All three `faucetKind = manual` personas are behind on the ledger only they can write, and none has written a row in the ten days since this was first recorded. Grace has never written one, Sophia last wrote 2026-07-04 and Aine 2026-07-25. The kind has no absent-row alarm, because for a manual faucet an absent row is a legal state.

# Evidence

Measured 2026-08-07 against the live database, while emptying `dirty/skills/persona-craft/findings.md`, which recorded the same pattern on 2026-07-28. It reproduces and has worsened.

Over the three persona rows declaring `faucetKind = manual`, left-joined to their `relationship-progress` rows:

    aine    totalPoints 10443   37 rows   last 2026-07-25
    grace   totalPoints 0        0 rows   never
    sophia  totalPoints 79      14 rows   last 2026-07-04

Against the quarantined reading of 2026-07-28 — "grace has written no row at any point; sophia last wrote 24 days ago; aine last wrote 3 days ago" — the dates line up exactly (2026-07-28 less 24 days is 2026-07-04; less 3 is 2026-07-25). So not one of the three has written a row in the ten days since, and the gaps have grown from 24 days to 34 and from 3 to 13.

Why it is the kind's defect rather than three lapses. The engine writes nothing for a manual persona by design, so a manual faucet nobody keeps produces exactly the artifact one on a genuinely idle domain produces: no row. Absence is a legal state, so nothing alarms. These three are hand-managed because their work is judgment-laden and hard to meter — the same property that makes their silence unremarkable. A lead reading the stoplight sees a dark light and cannot tell whether the domain rested or the bookkeeper did.

The entry's control still holds: every engine-driven kind — windowed, delta, external, direct — wrote a row the day it was measured, so the silence is specific to this kind rather than to the fleet.

Grace's own never-written half is one of the three and is recorded on its own. This is the population around it — the claim here is about the kind, which a single case does not reach.

Not established: whether the three domains were in fact idle over these windows. The missing alarm is what makes that unanswerable from outside, which is the point rather than a gap here.
