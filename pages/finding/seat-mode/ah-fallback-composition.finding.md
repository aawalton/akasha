---
id: f9e481e0-fd39-5585-bf98-2fbf31fa15e5
page-type-slug: finding
title: "Ah fallback composition"
domain-slug: page-property-definition/seat-mode
---

# Claim

Project #17284 (domain: seat-mode) found no reverse of `ar` exists today among 52 read verbs (no `detach`/`background`/`park`/`suspend`; `ops seat resume` and `revive` are false friends), so an `ah {name}` fallback needs no new supervisor/launcher capability except making the existing deferred-restart turn-boundary gate reachable from `takeover`, so a live subagent turn is never killed mid-turn.

# Evidence

Project #17284 (domain: seat-mode, status: someday_maybe, live-on: deploy); never defined, moved off retired `notes` on 2026-08-15. Child of #17282 ("C2" — the `ah` fallback command); sibling of C1 (#17283, names the attended value), C3/C4 (chosen daemon/viewer architecture, not yet built).

Exploration: full 52-verb list read — no `detach`, `background`, `park` or `suspend` exists. Near-misses are false friends: `ops seat resume` lifts the fleet work-halt flag; `revive` refuses a live holder. `packages/shared/cli/CLAUDE.md`: "exiting the interactive session does not re-spawn the headless agent." This child gives the capability now, on verbs that already exist, while C3/C4 build the chosen architecture; also the declared fallback if the daemon fights the build, hence a child not a scaffold.

Composition needs no new supervisor/launcher capability: `takeover` resolves the target, kills any live holder via `decideKillTarget`'s three rungs (incl. the `/proc` rung finding an untracked pty-proxy), polls until gone, returns `<agentId>\t<sessionId>`; `revive` sees a `stopped` row, passes `decideSpawnGuard`, relaunches detached with `--resume` and empty prompt. `materializeLocalTranscript` is a no-op.

Success criteria:
1. `ah {name}` moves a foreground session to background, keeping context.
2. Never kills a live Agent-tool subagent (dies instantly on SIGTERM, no result) — waits for a clean turn boundary or refuses, saying why. `armDeferredRestart`/`isIdleForPreservingRestart` (`supervisor-deferred-restart.ts:92+`) are precedent, reachable only via the supervisor's handshake, not `takeover`; that reachability is the new capability.
3. Limitation stated where read — Bash jobs survive as orphans nothing collects, unlike subagents.
4. Writes attendance (C1's value); a backgrounded seat isn't invisible to C5's detectors.
5. Observed: subagent in flight, not switched; idle, switched.

Not in scope: daemon/viewer (C3, C4) — this row is the fallback kept meanwhile.
