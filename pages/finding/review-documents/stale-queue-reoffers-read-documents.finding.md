---
id: 04d6d377-17c6-5ecc-9758-1a636ccdf289
page-type-slug: finding
title: "Stale queue reoffers read documents"
domain-slug: domain/global
---

# Claim

A document read a second time on the day an earlier reading stamped it stays on the list `tools/stale-reviews.ts` prints. The stamp cannot move, `reviewed-at:` already carrying that day, and churn is counted from the commit that wrote the record, so every character the second reading lands counts against it. `domains/agent-harness.md` carried 1653 characters of movement past its 2026-08-11 stamp after a full reading on 2026-08-11, so the next run of `review-documents` dispatches a seat at it again.

# Evidence

Reported by the dispatched `review-instructions` seat that read `domains/agent-harness.md` on 2026-08-11. The tool's own header names the case and says it costs a reading somebody has already done.

Not measured: how many of the 67 subjects this run's list named are in that state, and whether the repeat readings are cheap or expensive against what they turn up.
