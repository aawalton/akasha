---
id: 24028c99-073c-53e9-b39d-6e65d40652a0
page-type-slug: finding
title: "Orphaned four signal idle"
domain-slug: domain/agent-fleet
---

# Claim

The four-signal idle predicate `isIdle` in `packages/agents/supervisor/src/supervisor-idle-decide.ts` has no consumer, and three comments across two files still advertise one. The consumer was the supervisor self-stop monitor, which was removed. `supervisor-idle-observe.ts` names the deferred-restart monitor twice in one sentence — once as the terminal consumer of `isIdle`, once as the preserving consumer of `isIdleForPreservingRestart`.

# Evidence

`grep -rn "\bisIdle\b" packages/agents --include=*.ts`, excluding `dist` and tests, returns five lines and not one is a call:

- `supervisor-idle-decide.ts:2` and `:38` — the header and the definition.
- `supervisor-idle-decide.ts:87` — "The terminal consumer (`isIdle`) does …".
- `supervisor-idle-observe.ts:10` — "the deferred-restart monitor — the terminal / non-preserving consumer — uses the four-signal `isIdle`; the deferred-restart monitor (`supervisor-deferred-restart.ts`) — the session-PRESERVING consumer — uses the three-signal `isIdleForPreservingRestart`".
- `supervisor-idle-observe.ts:161` — "classify it with `isIdle` (terminal consumers) or …".
- `supervisor-filler-drain-decide.ts:30` names it only to say the drain daemon supplies its own boolean instead.

The sentence at `supervisor-idle-observe.ts:8-14` is the clearest artifact: it names `supervisor-deferred-restart.ts` as both the terminal and the preserving consumer, which is what a find-and-replace of the removed monitor's name leaves behind. The re-export block immediately beneath it exports `isIdleForPreservingRestart`, `isIdleForPreservingRestartPastCliff` and `preservingRestartBusyReason`, and does not export `isIdle` — so the observe module already does not offer the predicate its own header says a consumer uses.

The removal is not in doubt. `supervisor-monitors-wire.ts:49-55` carries it in place of the code, and `supervisor-self-stop.ts`, `supervisor-self-stop-decide.ts` and `supervisor-self-stop-decline.ts` are gone from `packages/agents/supervisor/src/`.

What turns on it: a reader deciding whether the dispatch-child signal still earns its cost is pointed at a consumer that would justify it and does not exist. The signal costs a directory scan of the agents spawn-state tree on every observation, and only the three-signal predicate — which ignores it — is actually read.

Found ingesting `dirty/knowledge/per-agent-monitors.md`.
