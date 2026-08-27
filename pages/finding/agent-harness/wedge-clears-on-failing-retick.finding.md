---
id: 15e29f68-b63a-5954-8a69-b2757d2b0b92
slug: wedge-clears-on-failing-retick
page-type-slug: finding
title: "Wedge clears on failing retick"
domain-slug: domain/agent-harness
---

# Claim

The fleet's handler-wedge detector clears a subscriber that is failing the same tick
forever, because the metric proving a long operation is alive is emitted identically by
a deadline-exceeded re-tick.

# Evidence

Measured 2026-08-04 during the CI cutover.

`main-pipeline-creator` held cursor_seq 22019801 from 16:30 to 18:19 (~110 min),
pendingCount 3 (exact), pendingAgeSeconds ~6000, raising
`TickDeadlineExceededError: tick deadline exceeded after 480000ms` on every attempt.
Zero cursor movement across the span.

The alerts reported `wedged` at 18:06:16, `recovering` at 18:09:29, then `cleared` at
18:10:33 — while cursor_seq was still 22019801 and pendingCount still 3.

The clear path is in `packages/agents/devops-monitor/src/wedges/handler-wedge.ts`. A
row with status != 'error' must have a PROVABLY frozen cursor to reach the `wedged`
return, and this one did. Busy-suppression sits after that check and `continue`s past
it.

`isBusySubscriber` (`subscriber-busy.ts`) ORs two liveness sources. The second,
`iterationActivity`, reads `worker.loop_duration_ms`, which its own docstring states is
emitted "at the END of EACH tick ATTEMPT, INCLUDING a FAILED / deadline-exceeded
re-tick". It was added by #15369 to close a false positive: merge-queue-coordinator's
legitimate 11.5-minute `buildStagingBranch` logged no completed tick.

So the evidence added to prove a long operation is alive is emitted identically by a
tick failing forever. The two cases are indistinguishable in what the instrument
collects. Status also flapped error -> active between retries, so the status='error'
arm caught it only intermittently.

Consequence: main carried no verification pipeline from 2026-08-03 12:41 (pipeline
26981) to 2026-08-04 18:19, about 29.6 hours, and the wedge alerts said `cleared`
inside that window.

NOT MEASURED. How often this clear path fires estate-wide; whether any other subscriber
has ridden it; whether "cursor frozen across N consecutive ticks" would separate the
two cases without reopening #15369.
