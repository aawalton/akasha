---
id: c2e25a1f-735f-5ab8-b786-3c1402b536b9
slug: occasion-undeclared
page-type-slug: finding
title: "Occasion undeclared"
domain-slug: page-type/old-ops-command
---

# Claim

Nothing a verb declares says the occasion it is for, so one whose worth is episodic — a proof good until the thing it proves changes, a repair good until it is spent — stands in the surface looking exactly like one that is run daily.

# Evidence

`CommandHelp` in `tools/ops/surface.ts` declares eleven fields: description, verdict, reading, irreversible, positionals, flags, mutuallyExclusive, envVars, exits, examples, epilog. `irreversible` is the only one bearing on the act rather than its arguments, and it states a consequence rather than an occasion. There is no field for when a verb is to be run, what invalidates its last answer, or whether anything runs it.

`ops loki kernel-selftest` is the case that raised it. Its worth is a proof: it induces a real OOM kill and asserts the record reaches Loki, which is the only way to establish that the specific oom-kill record class survives the collector, since `ops loki kernel` reports only that some kernel record arrived. That proof expires whenever the promtail scrape config, the ingestion rate limit or the retention config changes — and the rate limit has already been raised once under real back-pressure. Nothing binds the verb to those changes: no caller, no schedule, no CI step names it anywhere in either repository. The only mention outside its own body and document is `tools/lib/verdict-coverage.config.json` recording that it declares a reading.

It is not free to leave standing. One run costs a real OOM kill, moves `kubepods/memory.events` and `/proc/vmstat` `oom_kill` on whichever node the scheduler picked, and with `memory.oom.group` set costs several process kills — its own help block says to warn anyone holding a recorded baseline before running it.

The finding already filed as `spent-repairs-stand` is the same absence seen from the other side: there, a verb written as a one-time repair stays after the repair is over. A decision here would settle both, and they should be read together rather than separately.

Not measured: how many verbs across the surface have no caller and no schedule, which would need a sweep of both repositories plus the systemd units; and whether any occasion is recorded somewhere outside the command surface, such as a runbook.
