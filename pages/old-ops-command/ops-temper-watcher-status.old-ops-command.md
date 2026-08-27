---
id: eda9e39f-89a6-58f0-a7f4-79924bfd41bf
page-type-slug: old-ops-command
title: "Ops temper watcher status"
slug: ops-temper-watcher-status
domain-parent-slug: domain/ops-temper-watcher
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/watcher/status.ts
path: temper watcher status
---

# Definition

- **Ops temper watcher status** — whether the watcher's systemd user unit is up, with the pid, uptime and log path beside it.

# Help

Report the running/stopped status of the watcher's systemd user unit (`temper-watcher.service`). Running/pid/uptime are sourced from systemd; `started_at` is read best-effort from the daemon.json the `run` command writes.

Default stdout (single line):
  running pid=<n> uptime=<s>s log=<path>\n   or   stopped\n

--json stdout (stable shape):
  { status: 'running' | 'stopped', pid, started_at, uptime_s, log_path }
