---
id: 5b3bdfba-cf72-5b8d-92a2-e2c40adcebb8
page-type-slug: finding
title: "Clean close reads as crash"
domain-slug: domain/agent-harness
---

# Claim

A seat that closes cleanly but loses its terminal status write is recorded as having crashed.

The reconcilers restore every field that write would have set, changing only the stop reason, which they stamp `crash-reaped`. Nothing downstream separates that value from a real crash: the test for a non-crash stop reason admits `deliberate` and `reaped` and not `crash-reaped`, so the clean close reaches the crash path and raises an alert.

The row itself is not the cost. It heals.

# Evidence

Read directly at the time of filing: `isNonCrashStopReason` at `tools/lib/supervisor-child-reconcile-decide.ts:22-24` returns true for `deliberate` and `reaped` alone; `tools/lib/supervisor-row-reconcile.ts:27` sets the healed stop reason to `crash-reaped`. So the healed value falls outside the non-crash set by construction, and `decideChildReconcile` beneath it treats the seat as a dropped child.

Reported by a delegate rather than measured here, and carried as its evidence: the heal at `supervisor-row-reconcile.ts:157-170` writes the same field set as the death-write at `supervisor-lifecycle-death-write.ts:23-34`, differing only in stop reason; `reconcileDroppedChildren` at `supervisor-child-reconcile.ts:141-148` then records the exit as a crash. Across all agent rows, the alert latch stands at 2 of 2252 for `deliberate` and 39 of 64 for `crash-reaped`. Two independent proportions agree: 2.06 percent of 3346 real closes reached the terminal-status-write ceiling, and 2.07 percent of 1356 agent rows over seven days carry `crash-reaped`.

Three healers were found to be running: a sixty-second systemd sweep, a reconcile at supervisor startup, and a shared liveness decider that reaps only on a `dead` verdict. The sweep runs at `--scope non-worker`, so project-bound worker rows are outside its cadence.

What was not measured: nothing here establishes what an alert costs whoever receives it, so the claim covers the record rather than the harm. The two proportions agreeing is consistent with the ceiling being what loses the write, and is not a demonstration of it — no single close was followed from ceiling to stamp. The alert-latch counts were not re-derived here. Nothing was measured about how often a seat crashes for real, so the share of these alerts that are false is unestablished.
