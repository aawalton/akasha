---
id: 80d3b285-6fb8-50a0-acf0-c1077464cad3
page-type-slug: finding
title: "Restart notice operator message unreachable"
domain-slug: domain/global
---

# Claim

The operator-message branch of the restart notice has no producer. `planRestartNotice` chooses between three notice bodies and one of them relays an operator's `interruptMessage` carried on a restart action, but every production site writing a restart action passes no message, and `ops seat restart` exposes no flag an operator could supply one with. The branch is unreachable from both carriers that could reach it — the code corpus and the CLI surface.

# Evidence

Read against `~/code` on 2026-08-07.

`rg -n 'setRequestedAction\(' -g '*.ts'`, excluding `dist` and tests, returns the definition at `packages/agents/shared/db-agent-actions.ts:100` and six production call sites. Two carry a message and neither is a restart: `compact.ts:102` writes `{ action: "compact_self", interruptMessage: messageText }` and `reset.ts:228` writes `{ action: "reset_self", interruptMessage: promptText }`. The other four pass no message at all — `restart.ts:187` (`targetClass.action`), `restart.ts:205` (`restart_preserve`), `rc-degraded-tick.ts:263` (`restart_preserve_on_idle`) and `proxy-swap.ts:54` (`proxy_swap`).

`ops seat restart --help` lists exactly two flags, `--agent-id` and `--json`. There is no message flag, so an operator has no verb-level way to put a message on the path either.

What makes it worth recording rather than shrugging at is the justification standing on it. The supervisor package doc left the lost-message recovery clause off this path by calling verbatim relay "a contract a caller may rely on". No caller relies on it. A behavioural limit defended by a consumer contract with no consumer reads to a later agent as a decision somebody made rather than a bound nobody re-examined.

Whether the path ever carried traffic is not established here and cannot be read off live rows: `clearRequestedAction` nulls `interruptMessage` on consume. The claim is about producers in the code corpus and the CLI surface, the two carriers that can answer it.

Found ingesting `dirty/skills/agent-harness/findings/seat-liveness-halting-and-stalls.md`, which is queued for removal. Nothing in `~/memory/findings/` carried it: `rg -iln 'interruptMessage|planRestartNotice'` returns no finding holding this claim.
