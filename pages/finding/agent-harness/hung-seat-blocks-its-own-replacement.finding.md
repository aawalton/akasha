---
id: 8440aa52-0c13-513f-8bfe-0dea7fbf9dca
slug: hung-seat-blocks-its-own-replacement
page-type-slug: finding
title: "A hung seat blocks its own replacement"
domain-slug: domain/agent-harness
---

# Claim

A seat can boot far enough to mint its agent row and start its model gateway, then never launch `claude` at all, and it reads `live` the whole time. While it hangs it holds its own name, so the obvious remedy — spawn a replacement — is refused. Stopping it does not release the name either, until the death is separately proven, which takes minutes.

# Evidence

Measured on 2026-08-18 against `readout-system-worker-19373`, agent `01a01244-87ac-7a83-9ed5-a6de00672ff3`, spawned 00:27:56Z.

Its process tree after sixteen minutes:

    299781 Ssl+ ep_poll  bun pty-proxy.ts
    299824 Ssl+ ep_poll  bun run-supervisor.ts --headless
    300582 Sl+  ep_poll  bun tools/lib/model-gateway/main.ts

No `claude` process was ever created. `spawn.log` held six bytes — one OSC 111 escape and nothing after it. No `session-current` file was written.

The seat spawned five seconds later, `readout-system-worker-19349`, same command, same role and domain, reached `claude(307070)` and worked. That contrast is what makes this a seat-specific hang rather than an environment fault.

Ruled out by direct measurement: the gateway was listening (`LISTEN *:40957`, pid 300582), so it did not fail to start; one live claimant of the name, so no collision; 32 GiB of 62 available; the agent row was minted at 00:27:56 with status `running`, so boot reached `createAgent` and past it; no per-account launch limit exists in that path.

So the hang sits between the gateway coming up and `claude` being launched, after the row is minted. Which await is holding is not established here.

`ops seat alive` read `live` throughout, on the basis that the supervisor pid was in `/proc`. Nothing separates a seat still booting from one that will never boot.

`ops seat start` refused the replacement — *setAgentName refused (holder-not-proven-dead)*. Correct in its own terms, since taking a name from a live seat leaves it running, claimed and nameless. The seat it protected had no model in it.

After `ops seat stop` the processes left `/proc` at once while `alive` still read `indeterminate`, so the name stayed held for several minutes after the thing holding it had ended.

Recovery: stop, wait for a proven death, spawn again. The replacement booted normally and took its worktree.
