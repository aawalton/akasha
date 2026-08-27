---
id: ccfb760e-8e20-5892-a2f1-a5520f500ba7
page-type-slug: finding
title: "Rule population sweep never fired on schedule"
domain-slug: domain/global
---

# Claim

The nightly `rule-population-sweep` CronJob has never fired on its own schedule, so the only record dalla has received from it came from a Job a person triggered by hand.

# Evidence

Read while verifying project #18359 on 2026-08-10. `kubectl get cronjob -n ci` shows `rule-population-sweep` unsuspended on schedule `53 9 * * *`, age 44m, and its `LAST SCHEDULE` column empty — the first scheduled firing had not yet come round.

The one record on dalla's side, at 2026-08-10T21:27:22Z from sender `rule-population-sweep`, was filed by a one-off Job the delivering seat created from the CronJob template and then deleted. So what stands proven is that the pod's own path files a record; what stands unproven is that the schedule fires it, and that a reading finding an empty rule reaches her — every record so far has been a clean one.

Two things settle it, and only elapsed time brings them: one scheduled firing landing a record on dalla's side, and an empty-population reading reaching her rather than only the clean shape.
