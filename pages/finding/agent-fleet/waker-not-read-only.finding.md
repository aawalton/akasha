---
id: 2b6ab6d1-0df3-58dc-a68d-b45acb64bfe6
page-type-slug: finding
title: "Waker not read only"
domain-slug: domain/agent-fleet
---

# Claim

The wake-watcher describes itself as a read-only database client in both of the two places a reader goes to find out what it does — its module header and its systemd unit — while writing four things: an `agent.exit` event, an `agent.respawned` event, a death-latch stamp on the agent row, and a notification page.

# Evidence

Measured at code head `d01942409a`.

`wake-watcher-daemon.ts` says it in its header, lines 14-16: "It is DB-LIGHT (read-only `getAgentByName` + `getAgentInboundMessages` + the revive shell-out), which is fine: the in-cluster Postgres is itself outside the fleet, so querying it does not couple the daemon to fleet-agent liveness." The unit file says the same for its secrets: `wake-watcher.service` line 14, "DB-LIGHT: needs ~/.secrets.env for DATABASE_URL / SUPABASE_* to read agent rows + inbound messages, and for the revive shell-out."

The four writers are imported in that same file, within twenty-five lines of the sentence:

- line 32 — `import { getAgentByName, getAgentInboundMessages, setDeathAlertedAt } from "@agents/shared/db"`, the death-latch writer sitting in the same import as the two readers the header names.
- line 35 — `recordAgentExit`, which reaches `emitAgentExitEventBestEffort` at `agent-exit-record.ts:43`.
- line 36 — `emitAgentRespawnedBestEffort`.
- line 38 — `pushKeeperUnrevivableToAlan`, which mints a page through `notify(USER_ID, ...)` at `keeper-unrevivable-push.ts:56`, described there as "the paved `notify()` chokepoint".

All four are called: `emitAgentRespawnedBestEffort` at line 162, `pushKeeperUnrevivableToAlan` at 269, `recordAgentExit` at 312, `setDeathAlertedAt` at 314.

The sentence was true when written and the writes arrived after it — `setDeathAlertedAt` with the per-death latch, the two events with the durable-record redesign that retired the crash message, the notification page with the keeper's `unverified` case. Each landed without the header being re-read, which is the ordinary way a self-description goes false: nothing fails, and the claim is in prose no check parses.

What it costs is where the sentence sits. A header is what a reader opens to learn what a module may do, and this one answers a question about blast radius — whether the daemon can change state — with the wrong answer, in a file whose import list contradicts it on screen.
