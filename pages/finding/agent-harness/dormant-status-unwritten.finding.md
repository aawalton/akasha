---
id: 095ce2f6-230c-5cf2-a886-22ba7ef5669d
slug: dormant-status-unwritten
page-type-slug: finding
title: "Dormant status unwritten"
domain-slug: domain/agent-harness
---

# Claim

Nothing in the estate writes `status=dormant` on an agent row, so the wake-watcher's revive branch — the only branch that revives anything — is unreachable in ordinary operation: no row holds the status, and the daemon has revived nobody.

# Evidence

Three readings on 2026-08-03, taken while verifying project #17617.

THE POPULATION. `ops seat list --include-stopped` tallies 195 `stopped`, 5 `running`, 2 blank. Zero `dormant` — and that flag widens to `active/paused/running/stopped/dormant`, so the status was in scope.

THE DAEMON'S RECORD. `journalctl --user -u wake-watcher.service --since "7 days ago"` returns 218,856 lines and **zero** matching `revived|reviving dormant`. What it logs repeatedly is the other arm: `stale-live crash for '<name>' … NOT reviving (never-auto-restart)`.

WHY THAT FOLLOWS. `wake-watcher-tick.ts` classifies via `isAgentDormant`, which is `status === "dormant"` and nothing else (`db-agent-list.ts:56`). `decideWakeMatch` reaches its revive arm only through `holdsNoLiveProcess = isDormant || isProcessDead`, and the shell refuses the `isProcessDead` half outright. `dormant` is the sole status a revive passes through.

NO WRITER. A search over `.ts` and `.sql` finds readers, type members and prose only: `DORMANT_STATUS` (`db-agent-list.ts:49`) is consumed by `dead-agent-oracle.ts`, `agent-name-bind.ts` and `project/reap-claims.ts`, assigned by none. `stop` writes `stopped`, `retire` writes `retired`. The two `dormancyPolicy: { kind: "idle-after" }` specs have no enforcer — `standing-persona-spec.ts:69` records the timer-driven entry mechanism as removed.

STILL LOAD-BEARING ELSEWHERE, which is why the gap is quiet rather than dead code: `decideHeartbeatPatch` heals `dormant → running` on any beat, and the #14431 lying-dormant veto guards a ghost fork.

MEASURED AGAINST A MANUFACTURED CASE. Exercising the branch needed the status written by hand. It then behaved as designed: four ticks untouched with no inbound, then `reviving dormant 'amy-handler'` and `revived … (io advanced past revive — verified)`. The machinery is sound; its input never arrives.
