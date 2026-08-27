---
id: 3b370131-8d99-5d59-9f62-91f0396aba25
slug: spawn-exit-overstated
page-type-slug: finding
title: "Spawn exit overstated"
domain-slug: barred-meaning/agent-launch
---

# Claim

`ops seat start` tells its caller that a non-zero exit means the supervisor failed to boot, but the only liveness it checks is a 200ms race against the wrapper pid. A zero exit establishes that the wrapper had not exited 200ms in, and nothing about the supervisor finishing boot, credentials resolving, the proxy binding, the prompt reaching Claude, or any first turn — so a dispatcher reading exit 0 as "the seat is working" is reading it the way the help says to.

# Evidence

`ops seat start --help` lists exit 3 as "operational error (supervisor failed to boot, or host RAM/swap headroom insufficient to admit the spawn)". Boot is the word a caller reads.

`launchDetachedSupervisor` in `packages/agents/cli/src/agent/launch-supervisor.ts` is the whole of what stands behind it:

    const earlyExit = await Promise.race([
      proc.exited.then((code) => ({ exited: true as const, code })),
      new Promise<{ exited: false }>((r) => setTimeout(() => r({ exited: false }), 200)),
    ])
    if (earlyExit.exited) throw new OperationalError(...)

Its own comment states the narrower reading — "Brief liveness probe: if the supervisor dies on boot, the wrapper has already exited by the time we check" — so the code knows what it measures and the help does not repeat it. `proc` is the `systemd-run --user --scope` wrapper, which execs into the command, so `proc.pid` is the wrapper's. Nothing after the race waits on anything: `writeSpawnState` records the pid and the verb returns.

What the verb does establish is real but earlier: the name is well formed and held by no live agent, a leading `/skill` in the prompt resolves in the target account's registry (`skill-token-guard.ts`, which validates before any row is minted and fails OPEN when the registry is unreadable), each stated identity slug resolves in the instructions corpus, the host has RAM headroom when checked, and the row and directory are made.

It establishes nothing about credentials being valid — resolution happens inside the detached supervisor, after the verb returned — the supervisor finishing boot, the proxy binding a port, the prompt reaching Claude's arguments or being accepted, or any first turn.

Nothing downstream covers the gap. `skill-token-guard.ts` records that #16260 deleted the boot-confirm sensor that once backstopped husks, "so it is now the only rung that does" — and it catches the deleted-skill class alone.

Read against the code repo working tree of 2026-08-07.
