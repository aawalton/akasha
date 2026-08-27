---
id: b794c2ea-3793-525e-9548-e6a22fa7a17f
page-type-slug: old-ops-command
title: "Ops dev-server restart"
slug: ops-dev-server-restart
domain-parent-slug: domain/ops-dev-server
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/dev-server/restart.ts
path: dev-server restart
---

# Definition

- **Ops dev-server restart** — one seq-and-app dev server stopped and started again in a single call.

# Help

Stop the dev server for the given seq+app (if running, with stale-state pruning), then start it. Equivalent to `ops dev-server stop --seq <n> --app <name> && ops dev-server start --seq <n> --app <name>`, but as a single atomic call.

Default stdout (single line, from start):
  pid=<n> port=<p> log=<path>\n

--json stdout (stable shape):
  { ok: true, pid, port, log_path }
