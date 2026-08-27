---
id: a906c5de-f38d-5a81-a91b-1ba5730d6860
page-type-slug: finding
title: "Parked seat has no cure trigger"
domain-slug: domain/global
---

# Claim

A seat parked on a red it did not cause has no trigger when that red clears, so it waits on a person to notice for it.

# Evidence

The build tasks bind a seat meeting a red it did not cause to escalate rather than repair it — `tasks/projects/build-singleton-deploy.md:51` and the same disposition on four sibling surfaces. That rule is right and it is what produces the parked population: the seat stops, hands the diagnosis up, and holds.

Nothing then tells it the red is gone. Measured on 2026-08-05:

- `4193ce7c21` landed at 08:34:52, dropping a symlink declaration without updating the drift guard that pinned it. The guard reds any merge-queue entry whose staging CI runs the full workspace set.
- `8cfb56d10e` landed at 09:17:54 carrying the same repair as part of an unrelated change. The red was cured 43 minutes after it appeared, by nobody who knew they were curing it.
- Three rows — #17875, #17879 and #17895 — were parked at `deployment` on that red. Two of their seats escalated to the lead between 15:19 and 15:30, more than six hours after the cure, each reporting the red as standing and each having reproduced it correctly at the time it parked.
- One seat's closing line was "Wake me when the drift-guard is green on main." Nothing was going to. The wake came from the lead by hand, after she had cut a row against the red, built the repair and earned a green branch verdict at 119 of 119 steps — finding out only when `ops project deploy` refused with a sync conflict on the file she had touched.

The failure is silent in both directions. A parked seat's reproduction is true when it takes it and decays without notice, so what it reports is a reading rather than a state, and nothing marks the difference. And a seat curing a red as a side effect of other work leaves no trace naming what it cured, so the population waiting on it cannot be reached from the commit that fixed it.

What exists nearby and does not cover this: the merge queue's sync conflict catches a redundant change at the deploy, which is where the lead learned. That is the last gate rather than a trigger, and everything spent before it is already spent.
