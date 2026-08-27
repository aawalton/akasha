---
id: a1fb93c5-9800-5ea4-9172-b4c0a5618d3b
page-type-slug: finding
title: "Alert repair has no carrier"
domain-slug: domain/instrument
---

# Claim

A correctly diagnosed false-positive alert can stand indefinitely with every standing surface obeyed: four project-build tasks bind a seat to escalate a red it did not cause rather than repair it, and `domains/finding.md` gives the lead the timing alone. Nothing then measures whether what was filed is ever dispositioned, and no alert carries an acknowledgement affordance, so the gap sits between a seat correctly declining and a lead nobody reminds.

# Evidence

Measured 2026-08-05 over the live instructions tree and the running estate.

The instance. On 2026-08-04 a seat met four `JobFailed` alerts together, measured each against the cluster, established that three reported uncollected job objects while their CronJobs were succeeding, distinguished the fourth as genuine, and filed a finding. The evaluation was performed with no surface requiring it. On 2026-08-05 the three were still firing, `activeAt` 2026-07-26T07:35:13Z. `ops project list` returned 16 live rows, none naming an alert, so no row was cut.

What routes the seat away from repair, read first-hand. `tasks/projects/build-singleton-deploy.md:51` binds "Escalate a red you did not cause rather than repairing it," warranted on "The estate carries standing failures and none of them is this row's"; line 31 binds the same for a failure in what the seat did not touch. The same disposition stands in the other three project-build tasks, so it reaches every developer seat. `domains/finding.md` grants the rest: "Whether the observation is worth acting on, what to do about it and when are hers alone."

So ten days passed with no surface breached.

What has no carrier. A sweep of the code found no acknowledgement primitive on an alert: `agent.record` payloads are `.strict()` over four fields with no status or `handledAt`, and message rows carrying wedge and infra envelopes model the condition clearing rather than the recipient disposing. Only `notification` pages carry `readAt`, and those reach Alan rather than a seat. No instrument measures alert precision.

What already absorbs the volume half. `packages/agents/infra-alert-bridge/src/decide.ts` holds a coarse dedup documented as "Continuously firing (tracked) → silence, no repeat", so the ten days cost a wrong signal standing rather than repeated interruption.

Not established: whether a lead has already judged the standing finding and declined it, which would make the ten days a decision rather than a gap, and which nothing I read records either way.
