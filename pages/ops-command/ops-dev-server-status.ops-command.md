---
id: a5e4384f-db8e-5924-ab9f-774e4f7ebdbb
page-type-slug: ops-command
title: "Ops dev-server status"
slug: ops-dev-server-status
domain-parent-slug: domain/ops-dev-server
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/dev-server/status.ts
path: dev-server status
---

# Definition

- **Ops dev-server status** — the running or stopped reading of every tracked dev server, or of those a seq or app names.

# Help

Report the running/stopped status of one or more dev servers. With `--seq` + `--app`, reports just that one. With neither, lists every state-file-tracked server. A state file pointing at a dead PID reports as `stopped` — no mutations, no pruning.

Default stdout (one line per server, tab-separated):
  <seq>\t<app>\t<port>\t<pid>\t<status>\t<started_at>
When `--seq` + `--app` is given but no state file exists, prints a single line:
  <seq>\t<app>\t-\t-\tstopped\t-\n

--json stdout (stable shape):
  [{ seq, app, port, pid, status, started_at, worktree_path, log_path }]
