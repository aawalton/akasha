---
id: 86b5cd9b-d45b-5d0e-8555-7903f43629cc
slug: wedge-detector-verdict-contradicts-payload
page-type-slug: finding
title: "Wedge detector verdict contradicts payload"
domain-slug: domain/global
---

# Claim

The merge-queue wedge detector on `merge-queue-coordinator.queue-entries.singleton` can emit a verdict that contradicts the evidence in its own payload — including reporting `state=cleared` with a higher lag than the `state=wedged` verdict that preceded it — and can report recovery or all-clear while the merge queue is landing nothing.

# Evidence

Observed live 2026-07-25 while diagnosing a real 78-minute merge-queue outage. Three consecutive alerts, each carrying its own evidence: 20:24:12 state=wedged, maxSeqLag 12814, pendingAgeSeconds 2347; 20:32:03 state=recovering, maxSeqLag 376; 20:33:10 state=cleared, maxSeqLag 19564 — higher than the wedged reading before it. The verdict is not derived from the evidence reported in the same payload.

All three verdicts were also wrong about the subsystem: across the whole wedged->recovering->cleared sequence the merge queue landed nothing. Ground truth: batches 10484-10492 all superseded, nine consecutive failures, last successful land 10483 at 19:13:44, mainSha unchanged at 1855369e throughout.

Hypothesis, not established: the detector measures subscriber cursor lag — a property of one event consumer — and reports it as a verdict about the subsystem. A subscriber can catch up, or have nothing to process, while the subsystem is failing at its actual job; the detector never reads whether batches reach main_deployed.

Compounding gap: every alert carried routed_to "fallback" and owner_handle null, so nobody was paged, including the one alert (wedged at 20:24) that fired correctly. The merge queue is dalla's.

Candidates, not decided: (a) derive the verdict from same-pass evidence so it cannot disagree with itself; (b) add a health signal reading time-since-last-main_deployed-batch and consecutive-supersede count (nine consecutive supersedes would have fired at 19:40, not never); (c) fix owner routing to dalla; (d) ask whether cursor lag should ever produce a subsystem-scoped verdict. (a) and (c) preferred as immediate; (b) is what would have caught the outage.

Related, same evening, same class of instrument reporting success while measuring nothing: #16290, #16291, #16292.

Project #16293, status someday_maybe, domain events-system. Captured but never formally defined with an objective; moved off the row's retired `notes` attribute 2026-08-15.
