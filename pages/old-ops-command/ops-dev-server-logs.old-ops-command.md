---
id: 16ab3a87-c3a0-5a58-9863-ced012db885d
page-type-slug: old-ops-command
title: "Ops dev-server logs"
slug: ops-dev-server-logs
domain-parent-slug: domain/ops-dev-server
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/dev-server/logs.ts
path: dev-server logs
---

# Definition

- **Ops dev-server logs** — the tail of one dev server's captured output, optionally followed as it is appended.

# Help

Tail the captured stdout+stderr log of a dev server. Default emits the last `--tail` lines and exits; with `--follow`, streams new lines until SIGINT (like `tail -f`).

Default stdout: raw log lines, in chronological order.
