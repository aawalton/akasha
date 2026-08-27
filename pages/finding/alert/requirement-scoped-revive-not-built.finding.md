---
id: 18270b63-184a-51f8-8bde-ceff710becbf
slug: requirement-scoped-revive-not-built
page-type-slug: finding
title: "Requirement scoped revive not built"
domain-slug: page-type/alert
---

# Claim

In alert, under initiative alerts-reach-someone-who-acts, no routine yet starts a seat for a message whose stated requirement no live seat satisfies — the design is ruled (trigger off the existing 30-second `agent-row-reaper.timer` heartbeat, via `ops seat acquire`, as a routine separate from `ops seat reap`), but none of the three objectives is built, following measured mail loss in the 2026-08-12 outage this project targets.

# Evidence

Project #18977 (parent #18963), alert, initiative alerts-reach-someone-who-acts, status understand. Objectives: (1) mail whose requirement no seat satisfies starts a reader, on the existing 30s heartbeat, not a new daemon; (2) a seat already satisfying a requirement is reused, one start per requirement per cycle; (3) an unsatisfiable requirement is reported, not retried in silence.

`domains/message-to.md` keys mail to what it states (domain+role, project+role, person, or agent id), never a persona — this project itself first addressed by persona, the defect it corrects. An agent id needs no requirement: revive or nothing.

Measured: infra-alert bridge resolved a seat name gone since 2026-08-12 14:27Z, spun in boot 37h/minute delivering nothing; 6 alerts stacked, 2 more fired/cleared inside the window reaching nobody. Hand restore failed: the seat spawned finished and stopped 16 min later, bridge kept ticking into an empty mailbox.

Ruling (Alan): delivery starts a seat not running. Can't trigger in the bridge — its pod lacks `systemd-run`, `XDG_RUNTIME_DIR`, `~/.claude`, `claude`, `tools/` (measured on #18972; `devops-monitor` shares the pod). Sits on `agent-row-reaper.timer` (fires 30s, sources `~/.secrets.env`, `~/.bun/bin` on PATH), separate from `ops seat reap`, in the instructions repo per `domains/global.md`, modeled on `memory-reaper-daemon.ts`/`tools/lib/`. `ops seat acquire`: fresh spawn or warm revive, reclaims a dead/stopped holder, won't clobber a live one.

Trap: a seat spells its attributes unless principal is Alan, so bare `aranya` resolves to `aranya-infra-definer` — how the outage started. `resolvePersonaSeat` (built on #18972) resolves a persona, the wrong unit; found `getPages` caps at 1000 rows (misreads a live recipient dead), `getPage` throws on multiple matches.

Scope: any pending message unsatisfied, not alerts alone. A refusal on an unread mailbox was tried and reversed — the bridge can't start a seat; the pending row is the carrier.
