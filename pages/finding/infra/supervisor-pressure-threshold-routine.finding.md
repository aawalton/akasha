---
id: 7720a045-3b02-5360-91d8-61fc2afd46e8
slug: supervisor-pressure-threshold-routine
page-type-slug: finding
title: "Supervisor pressure threshold routine"
domain-slug: domain/global
---

# Claim

`WorkerSupervisorCpuPressureHigh` fires on a real condition and prescribes the wrong act. At 11.68% on 2026-08-10 the harm it names did occur — a config load reached the 150s cap — and the coordinator's own bound absorbed it untouched, clearing both counters within minutes. At 2% it fires on ordinary load: 25 episodes in fourteen days, open a fifth of the time, while the queue landed 4474 entries. It asks for a fleet-stopping re-hold, by hand, for something already contained in code.

# Evidence

Read live 2026-08-10 from Prometheus at 10.110.82.72:9090, `ops merge-queue show` and `public.metrics`.

Over 2026-07-27 to 2026-08-10 at 300s step the alert's expression stood at or above 2 in 196 of 4030 samples; grouped by the bridge's 90-minute resolve dwell that is 25 episodes and 66.5 open hours of 336. Through those the queue kept landing.

The 19:18Z episode was different in degree and is what fixes the claim. `worker-supervisor` read 11.68% full `avg300`, above every value in the preceding fortnight, with node-06 at 0.521 on the node-level `some` rate. The capped `load_configs` series climbed inside batch 10945 through 77.1s and 136.7s to 150.3s. The queue then showed `consecutiveConfigLoadTimeout` 1 and `consecutiveTickBudgetExhausted` 2 with batch 10948 not advancing — and minutes later both read 0 with 10948 at `ci_running`, the counters cleared by a dispatch reaching `ok`. Nothing was re-held and nothing was lost.

What drives it is CI churn on the shared node rather than any property of the supervisor: `pages/finding/infra/coordinator-shares-node-with-its-own-ci-pods.finding.md` carries that measurement.

CORRECTION, 2026-08-10. Earlier versions of this finding said the 2% line parted slower config loads from faster ones but not safe from dangerous, resting on `operation=load_graph` — a sub-bucket inside the capped child that cannot reach the cap. Against the capped `load_configs` series the cap has been reached 73 times, twice on 2026-07-18 and 71 times across 16 batches on 2026-07-25, and once more tonight. That comparison is withdrawn.

Not measured. One episode watched live is not a rate: how often 11.68% recurs, and whether the bound absorbs it every time, is unestablished. I did not count envelopes actually delivered, only the episodes the dwell would produce.
