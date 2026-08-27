---
id: 115c6e5b-2e67-564c-9888-31d28c787ed8
slug: declared-statuses-never-written
page-type-slug: finding
title: "Declared statuses never written"
domain-slug: page-property-definition/seat-presence
---

# Claim

The seat status vocabulary declared in code and the one ever written to a row intersect in two values. Three declared values have never been written once, and four readers branch on one of them, so those branches have never executed. Two values that were written are declared nowhere.

# Evidence

`packages/agents/shared/db-agent-list.ts:13` declares `DEFAULT_STATUSES` as `active`, `paused`, `running`, `stopped`, `dormant`.

Measured over `pages` where `page_type_slug = 'agent'` on 2026-08-12, the whole population since 2026-06-12: `stopped` 1792, `retired` 44 (all soft-deleted), `running` 24, `error` 1. So `active`, `paused` and `dormant` have never been written, while `retired` and `error` are declared in no vocabulary. `spawn.ts` writes `status: "spawned"`, which also appears on no row.

Four readers branch on `dormant`: `agent-row-reaper.ts:184`, `alive.ts:162`, `wake-watcher-tick.ts:365` and `supervisor-child-reconcile.ts:386`. Its one writer is `packages/alanwalton/web/app/personas/lib/handler-cold-start.ts:89`, in the web application rather than the agent packages, which comments that the row is born dormant.

`wake-watcher-tick.ts:443` names the dormant leg the one sanctioned recovery-by-inbound, so the only path that resumes an absent seat is gated on a value no row has carried.

Two of the five values were presence and turn combined into one column: `LIVE_STATUSES` is `active`, `paused`, `running`, so `paused` meant present and not working.
