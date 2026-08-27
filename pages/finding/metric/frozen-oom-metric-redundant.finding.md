---
id: ad59189a-492f-5ebc-ab95-6e5c90f80a5d
page-type-slug: finding
title: "Frozen oom metric redundant"
domain-slug: domain/metric
---

# Claim

`container_oom_events_total` is a frozen metric (318,231 distinct series over the trailing 30 days, `max_over_time` exactly `{0}` on all of them) still being scraped via the wholesale cadvisor scrape (zero `metric_relabel_configs`) after its replacement — the `kubepods-slice-oom` group reading `node_kubepods_memory_events_local_oom_kill` from a live per-node collector — landed and is armed as half 2 of #16219.

# Evidence

By worker-16219, half 2 of #16219, kept verbatim.

Not code deletion: `container_oom_events_total` appears nowhere in the repo (verified across refs incl. gitignored/binary, full git history). Honest retirement is a scrape-time drop rule at `synth-prometheus-configs.ts:44`, not a source edit. `ContainerOOMKilled` doesn't depend on it (reads kube-state-metrics), so the drop breaks nothing.

Cite the 30-day form, not an instant count: 318,231 distinct series over trailing 30 days, `max_over_time` exactly `{0}` — none of 318k series went nonzero in a month. Instant count is unciteable: read 582 and 398 by two agents 90 min apart, churns with pod lifecycle. Doctrine: the metric was never absent, just never incremented — a frozen counter reads 0 from a live series, passing entitlement; `absent()` proves existence, a freshness check proves it's written — why half 2 carries both.

Caution citing hierarchical series: node-06 carries test-origin contamination at 23:48:44Z (4 `oom_kill`/2 `oom_group_kill`; 2 from #16219's induced control, 2 from worker-16216's replication) — re-baseline first or production kills misattribute. (Collector per-node values matched kernel files.)

Deployment note: a rules-only prometheus change likely won't auto-dispatch (three docs: main doesn't auto-apply prometheus foundation-workflow changes, #14461); it dispatched only because the collector edit touched `synth-exporters-daemonsets.ts`, in `watchNodes`'s seed list — `synth-alerts*.ts` isn't. Check `watchNodes` first; expect `bun ops pipeline redeploy --workflow prometheus --wait`.

Verification: metric returns 0 series live post-deploy; mutation-verify >0 before. `ContainerOOMKilled` still health=ok, series intact; per-node cadvisor counts at/above pre-change.

Principle: Parsimony — cost continuous, value paid once; 318k series/month carrying no information, replacement live, metric's last justification gone.

Project #16373, someday_maybe, metric, no objective; retired `notes`, 2026-08-15.
