---
id: 30605010-c18c-566f-b532-08e60ab808dd
page-type-slug: finding
title: "Stop signals supervisor twice"
domain-slug: domain/agent-harness
---

# Claim

`ops seat stop` sends a tmux-launched seat's supervisor two SIGTERMs microseconds apart, out of one invocation. The pid scan that finds the supervisor also matches the pty-proxy wrapping it, so both are signalled separately, and the proxy then forwards a further SIGTERM to the supervisor beside it.

Until 2026-08-16 a second signal made the supervisor exit at once, losing its clean-exit stamp and its terminal status. That arm now fires for SIGINT alone.

# Evidence

Measured here at the time of filing. `tools/lib/supervisor-terminal.ts:75-85` handles both signals in one function whose first arm exited on any second signal and now tests for SIGINT. Two supervisor logs under `/var/home/walton/code/.claude/supervisors/` carry the pair three milliseconds apart — `01a00bce-061e` at 18:31:03.554Z and .557Z, `01a00bcd-fc4b` at 18:32:46.829Z and .831Z — each followed within a millisecond by `exit-handler-entry` and by none of the tags a completed shutdown writes. `ops seat exits --since 2026-08-16T17:20:00Z` answered `recorded=0` over a window holding at least four such deaths. `tools/lib/pty-proxy.ts:93-103` forwards SIGTERM by calling `proc.kill()` on its supervisor child, which defaults to SIGTERM.

Reported by a delegate rather than measured here, and carried as its evidence: `tools/turn-end-decide.ts:198` runs `ops seat stop` whenever the plan carries `stop-seat`, which `tools/lib/turn-end-decide.ts:99` emits under `nothing-dispatched`; `tools/commands/seat/stop.ts:215-226` takes its targets from `probeLiveAgentPids()` and signals each singly; the match is `/bun.*supervisor\.ts/` at `packages/shared/utils-system/src/supervisor-cmdline.ts`. Five live seats returned three pids each, the first a proxy whose command line begins `bun run .../lib/pty-proxy.ts -- bun run .../run-supervisor.ts`. Six returned two, their proxies carrying no `AGENT_ID`. A Stop hook caught mid-run stood in its own session and process group, so nothing signalled on that side reaches a supervisor.

What was not measured. No signal was traced from sender to receiver; the pairing rests on the two arriving together and on the path being able to produce them. The death at 18:32:46.831Z has no turn-end record in either hook log, so what stopped that seat is unestablished. Nothing here measures how often `stop-seat` is decided, nor whether the seats it stops hold unfinished work.
