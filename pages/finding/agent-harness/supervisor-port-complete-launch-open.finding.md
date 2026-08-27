---
id: de4f000a-61d9-54df-bc76-74f55fd6caba
slug: supervisor-port-complete-launch-open
page-type-slug: finding
title: "Supervisor port complete launch open"
domain-slug: domain/agent-harness
---

# Claim

In agent-harness, the supervisor tree ported into `tools/lib/` is complete, and every supervisor process in the fleet (measured 2026-08-15: thirty-one live) already runs `~/instructions/tools/run-supervisor.ts` with none on the code-repo loop, though the daemon-launch-path objective remains open — three systemd units (`filler-drain`, `memory-reaper`, `wake-watcher`) still name a code path in `ExecStart`, unlike the fifteen that already launch through an `ops` command.

# Evidence

Project #18904 (initiative: harness-in-instructions; status implementation), agent-harness. Objectives: (1) done — every supervisor source file stands in the instructions repo or names what it needs that this repo cannot have; (2) open — supervisor daemons launch through an `ops` command naming no repository path, three units still name a code path against fifteen that already do; (3) done — no harness path calls into `code/` for a database row; (4) done — turn-end record, its censuses and the ask-alan path stand in the instructions repo.

Supersedes #18836; continues #18892; #18745's file list folded in — Alan, 2026-08-12. Turn-end norm stays prose, not a Rule.

Port-fidelity criterion (each ported file's test answers as the code-repo original's, by digest) dropped by Alan 2026-08-15 rather than hold #19156 (removes supervisor from `code/`): once that deploys, the oracle is unmeasurable.

Ported supervisor tree in `tools/lib/` is complete and green; every fleet supervisor runs `~/instructions/tools/run-supervisor.ts`, measured 2026-08-15 at thirty-one live, none on the code-repo loop. #19170 closed the launch path; #19156 carries the `code/` removal. Entry point crosses twice into `packages/agents/shared`: `setAgentName` (`db-agent-rename.ts`, closes with #18891) and `watchSessionFile` (`lib-watch.ts`, settled to stay).

Agent-action/tab-title subscriptions replaced by polling scripts on the existing heartbeat; `supervisor-rebind-subscription.ts` deleted outright. Oracles deleted, not re-frozen — Alan, 2026-08-13, "Agreed, delete" — since #14973 backstops every subscription with a socket-independent heartbeat; cost is latency only.

Objective 2: instructions half done, code half is #18939. Units still naming a code path in `ExecStart`: `filler-drain`, `memory-reaper`, `wake-watcher`; each needs a `--help` guard.

Objective 3 met: `agent restate`, `agent outbound-wake`/`held-wake`, `ops irreversible list` moved and verified; rest stay, judged by whether a command decides or fetches.
