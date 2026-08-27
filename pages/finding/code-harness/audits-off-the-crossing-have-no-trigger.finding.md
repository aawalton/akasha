---
id: 6dee5b61-b87c-50cc-b364-0738cd734450
slug: audits-off-the-crossing-have-no-trigger
page-type-slug: finding
title: "Audits off the crossing have no trigger"
domain-slug: domain/global
---

# Claim

An audit converted off the crossing into an on-demand `ops` verb has no trigger, so the measurement can stop being taken without anything reporting that it stopped.

# Evidence

Filed 2026-08-05 on Alan's instruction, alongside his ruling that acceptance is the right trade for now: the check cleanup is the focus and regular audits are a separate programme. He named the candidate enhancement himself — audits running on a schedule rather than in CI.

The population that raises it. `pages/finding/code-check/live-row-checks-unclearable.finding.md` records seven registered checks whose comparison reaches live production rows: four unrepaired in the checks package, three registered from `collections/music`, `collections/litrpg` and `alanwalton/daily-tracking`. Two of the four take BOTH sides of their comparison from live rows, so no candidate change can move either side.

Under `domains/audit.md` these are audits — they run over standing state and return a verdict on whether it may remain. Under `Change Closure` on `domains/check.md` they are condemned as checks, measuring what no candidate change could invalidate. So they move.

Cost is not what condemns them. On branch pipeline 27064 three of the seven dispatched, 5.7s between them. What condemns them is that they can red a candidate for a production write nobody's commit made, which `check-status-vocabulary-drift` did to the whole fleet before it was removed.

Where they go exists already: the estate's convention for a measurement over standing state is an on-demand `ops` verb — `project census`, `graph drift`, `ali coverage`, `agent blocked-census`. Audits are deliberately not automatic.

What that costs. Today these measurements are genuinely taken, on every crossing that wakes them. As verbs they are taken when somebody remembers to ask. `domains/instructions-harness.md` states the risk for its own tree: a suite nothing invokes and a suite that passed leave the same trace.

NOT MEASURED: how often any existing audit verb is actually invoked. I did not read invocation history, so whether the estate's standing audit verbs run at all is unknown to me, and it is the first thing to establish before designing a schedule.
