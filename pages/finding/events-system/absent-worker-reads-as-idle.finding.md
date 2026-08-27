---
id: 80ef6b02-11b8-5ef4-99f1-8c581310eff9
page-type-slug: finding
title: "Absent worker reads as idle"
domain-slug: domain/global
---

# Claim

An `event_subscribers` row cannot tell a subscriber whose worker is gone from one idling between passes, so a dead subscriber and a healthy quiet one read identically from the row.

# Evidence

`packages/shared/worker-runtime/src/events-subscriber.ts:316-325` guards the idle-tick
touch with `AND error IS NOT NULL`, so on a pass that matched no events the UPDATE
matches zero rows and `updated_at` does not move. That is the fleet's steady state by
design, to write no WAL. The running loop never writes `status = 'idle'` either — idle
is the column default — so a row created at boot and never advanced again reads
`status = 'idle'`, no error, `updated_at` frozen, whether its worker is mid-idle or was
killed hours ago.

What compensates is outside the row: the devops-monitor derives `pending_age_seconds`
from `public.events` rather than from `updated_at`, and worker liveness rides a Loki
selector `{namespace="workers", app="worker-supervisor"}`. That selector cannot see a
workstation daemon at all, so for anything running off-cluster there is no second
signal and the row is the only carrier.

Observed on 2026-08-13 with `pages-fs-projector`, whose systemd unit was stopped and
removed at 07:23:23 MDT. Its row sat `status = 'idle'`, no error, `updated_at` frozen at
13:23:22.978Z, and read exactly like a healthy subscriber between passes for nearly two
hours until a person read the systemd state instead. The row has since been deleted, so
that particular case is gone and the hole it exposed is not.
