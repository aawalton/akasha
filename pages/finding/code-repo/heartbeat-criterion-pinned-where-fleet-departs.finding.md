---
id: 8528f934-af0a-5180-a7aa-642f34c5fd26
page-type-slug: finding
title: "Heartbeat criterion pinned where fleet departs"
domain-slug: repo/code-repo
---

# Claim

A live CI test pins the CI pod dispatcher's heartbeat to 60 s on the stated ground that every conforming worker uses a 60 s wall-clock heartbeat. Eighteen of the twenty workers declaring that constant do not. The test passes, because it asserts only its own site's value and never the criterion it cites.

# Evidence

At `~/code` on `main`, `13135651993c19af09ce41b6295264191071d3c1`, `packages/infra/ci/orchestrator/src/ci-pod-dispatcher.worker.unit.test.ts:310` reads:

a test named "PERIODIC_HEARTBEAT_INTERVAL_MS is 60_000 (canonical worker shape)", whose only assertion is `expect(PERIODIC_HEARTBEAT_INTERVAL_MS).toBe(60_000)` and whose comment reads "Criterion 4 of parent project #10198 intent.md: every conforming worker uses a 60 s wall-clock heartbeat. Pin the constant so a future edit that drifts the cadence fails CI."

Twenty files declare `PERIODIC_HEARTBEAT_INTERVAL_MS`, none importing it from anywhere, at four different durations:

- an hour, seventeen sites — fifteen as `3_600_000`, two as `60 * 60 * 1000`.
- fifteen minutes, one — `alanwalton-daily-tracking.worker.ts:79`, at `900_000`.
- sixty seconds, two — `ci-pod-dispatcher/worker-composition.ts:45` and `packages/infra/ci/worker/src/main.ts:103`.

So the criterion is false of nine tenths of the fleet, and the test defending it sits at one of the two sites meeting it.

What sharpens this past a stale comment is that the pinned site is the one whose value is genuinely owned, and owned on other grounds. The docblock above `worker-composition.ts:45` derives 60 s from a pod-capacity transition emitting no page write and no events row, and records that `RESERVATION_TTL_MS` at `pure/reservation-ledger.ts:127` is derived from it by name at five times its value — slowing the interval to an hour "gives a reservation ZERO heartbeat observations inside its 5-minute TTL" and reopens the C1 over-admission window project #14406 closed. That is why the number must not move, and it is not what the test says.

A reader taking the test's ground fleet-wide would move seventeen workers onto a criterion nothing else honours; one reading it as satisfied concludes the fleet is uniform. Nothing reports either, the assertion covering only the local literal.

Found ingesting a quarantined question document.
