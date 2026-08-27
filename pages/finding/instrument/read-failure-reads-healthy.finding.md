---
id: 81fb4e35-a596-5f57-b0fd-a52ea035b7d6
page-type-slug: finding
title: "Read failure reads healthy"
domain-slug: domain/instrument
---

# Claim

A database read failure in the devops-monitor's subscriber-lag slice is reported to the fleet as an affirmative healthy verdict, because the fetcher's catch arm returns an empty array and both classifiers read empty as "no subscribers observed" rather than as unmeasured.

# Evidence

Recorded from project #16354, never defined. Found by the seat working #16239 and deliberately left unfixed there: separate cause, separate blast radius.

The whole fetcher in `packages/agents/devops-monitor/src/snapshot/db-slices-subscriber-lag.ts` is wrapped in try/catch with the catch arm returning `[]`. `wedges/subscriber-lag.ts:10` and `wedges/handler-wedge.ts:26` both then return `wedged:false` with evidence `{reason:'no subscribers observed'}`. `process-verdict.ts` with `CLEAN_LATCH_TICKS=3` de-escalates wedged to recovering to cleared and emits a false all-clear. Same shape as the outage of 2026-06-29 documented at `devops-monitor/docs/discriminators.md:49`, which was fixed for the parked-error case and not for the read-failed case.

It became newly diagnosable with #16239. Before it, 44 of 45 subscribers were dropped by the `seqLag<=0` skip, so empty was the ordinary healthy state and genuinely ambiguous. After it every subscriber is emitted every tick, so empty can only mean the read failed. The classifiers do not read it that way.

A shape was suggested rather than prescribed: make the slice `Snapshot['subscriberLag'] | null`, the catch arm returning null, reusing `handler-wedge.ts:18`, which treats `liveWorkers===null` as unobserved and fails closed.

The blast radius is why it wanted its own verification: the type change touches `snapshot.ts`'s `laggySubscriberNames` gate, `devops-monitor.worker.ts`'s `lastSeenCursorSeqs` update, and about ten unrelated wedge test baselines using `subscriberLag: []` as inert filler. Classifying the null arm as wedged rather than unobserved risks alert storms, so it needs induced-failure verification of its own.

Already fixed by #16239 as a side effect, not to be re-filed: `devops-monitor.worker.ts:214-216` never pruned `lastSeenCursorSeqs`, so a subscriber that dropped out left a stale cursor and got a tick of spurious draining-backlog suppression on re-entry.
