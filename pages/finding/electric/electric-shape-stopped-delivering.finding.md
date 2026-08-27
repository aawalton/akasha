---
id: 2a42495e-8270-51b6-b10d-4702a58c875b
slug: electric-shape-stopped-delivering
page-type-slug: finding
title: "Electric shape stopped delivering"
domain-slug: domain/global
---

# Claim

Electric's shape for the project board stopped delivering row updates on 2026-08-11 while its
replication slot stayed current, so every browser opening that board saw statuses a day old
and no reload could correct it.

# Evidence

Measured 2026-08-12 16:00-16:15 UTC. Projects 18713, 18767 and 18789 read `done` in
`public.pages` continuously from 14:13, 14:22 and 14:25, and their documents in the memory
repository agreed. The `Active` view filters `done` out, and all three stood on it. Alan saw
them in a fresh incognito window, so no client-side replica was involved.

The shape the auth proxy authors for `page_type_slug = 'project'`, handle
`66136664-1786405802744386`, carried as its last entry for each row the value before the one
that finished it: 18713 `awaiting_lead_verification` at 2026-08-11 08:31, 18767
`awaiting_lead_verification` at 2026-08-11 18:12, 18789 `awaiting_lead_verification` at
2026-08-11 19:43. A shape opened fresh against the same Electric with the same definition
carried `done` for all three, so the origin was current and the existing shape was not.

Electric was one pod, 40 hours old with no restarts; `electric_slot_default` was active and
caught up to `pg_current_wal_lsn`; `/v1/health` reported active. Shape storage held 31 shapes
over 546 MB. `DELETE /v1/shape` answered `405 DELETE not allowed`, so one shape could not be
rebuilt on its own: the storage was cleared whole and the pod restarted, after which the
rebuilt shape carried `done` for all three.

What froze that shape is not established, and clearing the storage removed what would have
said. The shape was created 2026-08-11 00:30, after `experimental_compaction` began riding
every proxy-authored shape on 2026-08-10, which makes compaction the first thing to suspect
and not a finding. A recurrence is the signal.
