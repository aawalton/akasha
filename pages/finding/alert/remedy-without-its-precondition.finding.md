---
id: ea809d73-2c02-56f9-a681-f6df2128276b
page-type-slug: finding
title: "Remedy without its precondition"
domain-slug: page-type/alert
---

# Claim

`WorkerSupervisorCpuPressureHigh` names a remedy without naming the check that says whether the remedy is needed.

It tells its reader to re-hold CI, because starvation pushes the merge-queue coordinator's config load past its cap so no batch forms. That consequence has its own counter, `consecutiveConfigLoadTimeout`, which the alert never names. At the 2026-08-09 14:13 firing it read 0, nothing was queued, and the last batch had deployed.

# Evidence

Measured 2026-08-09 from 14:14 UTC, one minute after the alert fired, read-only.

The alert body gives the reading — "stalled waiting on CPU for 2.02% of the last 300s, at or above the documented CI re-hold threshold of 2%" — then the mechanism, that starvation "pushes its config load past its cap so no batch reaches pipeline creation and the queue lands nothing (#16278)", then "Documented response is to re-hold CI."

`ops merge-queue show` at that moment reported `consecutiveConfigLoadTimeout` 0, `consecutiveTickBudgetExhausted` 0, `entries.queued` 0, `entries.batched` 0, `lastFormedBatchSeq` 10900 and `activeBatch.status` `main_deployed`. The named mechanism was not occurring, nothing was waiting to be starved, and the most recent batch had reached main.

The counter is the direct reading of the consequence the alert reasons its way to; the pressure figure is a proxy for it. The alert quotes the proxy, names the threshold, cites the incident and prescribes the response, but never names the counter — so a reader following it as written re-holds CI without asking whether the queue is landing.

The episode then ran its course untouched. It resolved at 15:53:33, and inside that window the coordinator formed and deployed batch 10901 at 14:16:52, three and a half minutes after the firing, and batch 10902 at 15:43:52 — both reaching `main_deployed`, on pipelines 27454 and 27456. The documented response was not applied and nothing was lost by not applying it. Re-holding would have stopped both.

The reading was also marginal and flapping: 2.02% against a 2% threshold, with the same alert having resolved nine minutes before this firing.

Not established: whether the documented response is wrong in the case it was written for. It may be exactly right where `consecutiveConfigLoadTimeout` is climbing. The observation is that the alert gives a reader no way to tell the two cases apart, while the estate already computes the difference.
