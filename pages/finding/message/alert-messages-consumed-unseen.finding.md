---
id: 75035ee4-5c81-5035-9fbc-41ad8b3ca7ff
slug: alert-messages-consumed-unseen
page-type-slug: finding
title: "Alert messages consumed unseen"
domain-slug: page-type/message
---

# Claim

Four of the seven alert messages addressed to seat `aine-query-performance-operator` on 2026-08-15 were consumed without ever reaching the model in that seat, and its mailbox now stands empty, so they are gone rather than pending. The four include the only `fired` message of the day and both `still standing` refreshes behind it. The three that did reach the model were all `cleared`.

# Evidence

`public.messages` holds seven rows with `target_agent_id = 01a006cb-ca3f-7294-bd10-c924ea0f62de`, the id `ops seat whoami` returns for this seat, created between 19:00 and 20:50 UTC on 2026-08-15. All seven are `source=system`, `warrant.kind=announce`.

Three reached the seat's conversation:

- 19:00:15 — `query-plan-drift-regression` cleared, event 24894635
- 19:09:46 — five `query-plan-drift-regression` clears, events 24900083 through 24900091
- 20:49:58 — two `query-plan-drift-regression` clears, events 24912875 and 24912876

Four did not appear in the conversation at all:

- 19:15:47 — `query-plan-drift-regression` fired, event 24900401
- 19:30:49 — `query-plan-drift-regression` still standing, 15 minutes
- 20:00:55 — `query-plan-drift-regression` still standing, 45 minutes
- 20:09:21 — `query-hard-ceiling-exceeded`, event 24908484

`ops seat inbox --peek --json` returns `[]` for this seat, so none of the four is waiting to be drained. Six of the seven rows carry `status=claimed` and the last carries `status=read`, including rows the model demonstrably did read, so status does not part a delivered message from a dropped one.

The event stream behind the gap: `alert.condition.fired` at seq 24900401, 19:15:44 UTC, for `queryid=-4027464913960615857`, summary `Query -4027464913960615857 mean drifted 5.7x its 7 days baseline`, threshold 5x. The matching `alert.condition.cleared` is seq 24912875 at 20:49:51 UTC. The condition stood 94 minutes. `~/.local/state/alert-observer.json` reads `{"seq": 24912876, "open": []}`, so the observer read past the fire, opened it, refreshed it twice on its declared back-off, and closed it — the alert observer behaved as `ops alert observe --help` describes throughout.
