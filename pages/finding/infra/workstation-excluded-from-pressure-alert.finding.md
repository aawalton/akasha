---
id: 9a2dfd9d-9595-5195-8238-75150d9962f2
page-type-slug: finding
title: "Workstation excluded from pressure alert"
domain-slug: domain/global
---

# Claim

The workstation runs the whole agent fleet and is excluded by label from the alert that would notice. `NodeCpuPressureHigh` selects `tier!="personal"`; the workstation is labelled `tier="personal"` and emits the exact series that rule reads. Its load1 reached 223 on 24 cores on 2026-08-07 and 110 on 2026-08-10, against a fortnight median of 2.9, and nothing fired. The label describes a machine Alan sits at; the machine is now the host every agent runs on.

# Evidence

Read from Prometheus at 10.110.82.72:9090 on 2026-08-10.

`node_load1{instance="workstation"}` over fourteen days at 600s step, 2016 samples against 24 cores: median 2.9, p90 10.4, p99 35.9, max 223.0. Per day the picture is spikes on a quiet floor — 2026-08-07 held 15% of its samples above 24 with a peak of 223.0, and 2026-08-10 3% with a peak of 110.5. Every other day sat at or below 1%.

The host is fully scraped: 363 distinct metric names under `instance="workstation"`, job `personal-hosts`, including `node_pressure_cpu_waiting_seconds_total` — the series `NodeCpuPressureHigh` evaluates. Of the alert rules loaded, three touch host load or pressure, and the only one that could fire here carries `{tier!="personal"}` in its selector.

What shapes the peaks is not bounded. `ops seat in-flight` gates a lead at `< 10` concurrent dispatch workers and returned `{"in_flight":0,"workers":[]}` for `dalla-lead` and `aine-lead`, both carrying visibly live children — fourteen on the first. Every spawn is admitted. The mechanism is filed as `pages/finding/dispatch-project/in-flight-counts-nothing.finding.md`.

CORRECTION, 2026-08-10. An earlier version of this finding read one instantaneous sample — load 82.89, 45 `claude` processes — and framed it as a standing condition the fleet had grown into, saying nothing retained workstation load or PSI. Both are retained, and the series says that reading was an ordinary spike rather than a plateau, smaller than the one three days earlier.

Not measured. I did not establish whether the `tier="personal"` exclusion was a decision about paging Alan for his own machine or an accident of labelling, and the two are indistinguishable from the rule. I did not attribute any peak to particular agents, nor check what the 223 coincided with. I did not test what a spike costs an agent in wall-clock, which is the number that would say whether it matters at all.
