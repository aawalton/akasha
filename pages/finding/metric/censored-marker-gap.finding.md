---
id: 2ab4fdb4-5616-5aa1-994b-f60965788de8
slug: censored-marker-gap
page-type-slug: finding
title: "Censored marker gap"
domain-slug: domain/metric
---

# Claim

Since #16225's fix moved config-load timing off the censored channel (timings now emit on stderr plus a parent/coordinator `finally`), a child killed before it writes the timing boundary line still yields no sample for that saturation event, so the series stays silent across that whole subset — absence there is not evidence of a fast or absent event, only of an unrecorded one.

# Evidence

Project #16350 (domain: metric, someday_maybe). No initiative named.

Commit `cfa67d0` (worker-16225, landing on #16225) fixed config-load timing censoring at the source: timings moved to the stderr channel plus a parent/coordinator `finally` emit. `graph-phase-timing.cli.test.ts` proves a child killed AFTER writing the boundary line IS now recovered, via real `awaitSpawnWithTimeout` (400ms cap) and real `parseGraphPhaseMs`.

What remains, by design of that fix: a child killed BEFORE the boundary line yields nothing, so the series stays silent for that subset of saturation events. Worker-16288's framing: "absent is not false."

Same shape as two other rows: #16239 (a caught-up subscriber vanishes from its own display) and #16248 (a heartbeat that never fired is indistinguishable from an idle system).

Candidate shape, NOT decided: emit a censored-marker sample on the timeout path. Two open questions worker-16288 raised and declined to build inline (correctly, per the project): (1) what VALUE a censored sample should carry — sentinel, cap-value, and null each break something downstream; (2) whether it corrupts the percentile reads the #16225 fix just corrected — injecting cap-valued samples is exactly how `WORKTREE_CONFIG_LOAD_CAP_MS` got its right-censored p95, so the honest answer may be that the marker belongs in a SEPARATE series.

Verification note recorded: a CLI test with a stand-in child killed BEFORE the boundary, asserting the censored marker is emitted with the intended value, mutation-verifiable by deleting the emit. "Watch for a real saturation event" is an owner watch (dalla), not automated, per Alan's ruling that verification criteria must be directly runnable.

Provenance: found by worker-16288 while verifying the #16278 fix; recorded rather than built; re-scoped by dalla against worker-16225's already-landed fix. The two workers could not see each other's work.
