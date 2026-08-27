---
id: abcfe266-bc07-5e81-9eda-d284ddee25bd
page-type-slug: ops-command
title: "Ops dev-server stop"
slug: ops-dev-server-stop
domain-parent-slug: domain/ops-dev-server
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/dev-server/stop.ts
path: dev-server stop
---

# Definition

- **Ops dev-server stop** — SIGTERM then SIGKILL for one dev server or all of them, and the state file pruned.

# Help

Stop one or more running dev servers. Send SIGTERM, poll for exit (up to ~5s), then SIGKILL if the process is still alive. Idempotent — already-stopped servers are reported as success and their stale state files are pruned.

Provide either (`--seq` + `--app`) to stop a single server, or `--all` to stop every state-file-tracked server. Mutually exclusive.

Default stdout (one line per stopped server):
  stopped seq=<n> app=<name> pid=<n> (was running|was stopped)\n

--json stdout (stable shape):
  { stopped: [{ seq, app, pid, was_running }] }
