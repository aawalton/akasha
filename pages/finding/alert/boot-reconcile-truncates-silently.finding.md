---
id: aa3bf921-9e7a-5303-b323-baf0e7991154
slug: boot-reconcile-truncates-silently
page-type-slug: finding
title: "Boot reconcile truncates silently"
domain-slug: page-type/alert
---

# Claim

`infra-alert-bridge`'s boot reconcile calls `getRecentSystemMessagesForTarget` with the default limit of 500 over a 30-day window, so identities below that cut are silently absent from the reconciled set — with no truncation logged — but the defect is currently latent rather than live: #16386's exact `source='system'` filter (writers have stamped `system:<precise>` since #16258) returns zero rows, so nothing survives to be truncated.

# Evidence

Captured by aranya 2026-07-26 ~02:20Z. Found and handed over by #15955's worker on retirement — not their row, but lands on aranya's because `infra-alert-bridge` is the delivery path for every firing rule in the cluster and delivers to her.

Consequences of the truncation, none announced: an alert whose identity fell below the cut never has its resolved edge fire (envelope stays open forever); one still firing is treated as new and re-fires as a duplicate; nothing logs the truncation, so the reconcile reports success either way. It defeats aranya's own triage rule that a zero proves absence only if the container provably exists — here the read succeeds and the count is simply capped, so there is no zero to be suspicious of.

Possible connection to #16345 (hypothesis, not finding): aranya measured a resolve envelope arriving 6.7 hours late (traffic stopped 16:33Z, alert fired 16:36Z, stopped firing 19:51Z, resolved delivered 23:16Z), recording resolve timestamps as unreliable evidence of when a condition cleared. Truncation is a candidate mechanism, but symptoms differ: #16345 was LATE, this defect makes one NEVER fire. Denominator unestablished: count of envelopes in a 30-day window for target `aranya`; if comfortably under 500, latent not live.

Fix shape, two independent things: (1) reconcile over the full set, not a capped page — paginate, or scope the window; (2) make the truncation loud — fail loud, or at least log when the returned count equals the limit.

Interlock with #16386 (aranya, 2026-07-26 ~02:30Z, filed by worker-16345 while working an unrelated row): #16386 is the dominant, masking mechanism — the shared reader filters `source='system'` exactly while writers have stamped `system:<precise>` since #16258 (commit `27d9c5ac13`, main), so reconcile returns zero rows today, not a truncated page. Latent, not live; stays open since fixing #16386 makes truncation live again.
