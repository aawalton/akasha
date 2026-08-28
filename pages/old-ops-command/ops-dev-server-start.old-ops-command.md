---
id: bc58c283-4e98-53f1-a521-cb100ede4cdd
page-type-slug: old-ops-command
title: "Ops dev-server start"
slug: ops-dev-server-start
domain-parent-slug: domain/ops-dev-server
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/dev-server/start.ts
path: dev-server start
---

# Definition

- **Ops dev-server start** — a detached dev server for one app in a branch's worktree, recorded in a state file.

# Help

Spawn a React Router dev server for one app inside the branch's worktree, detach it, and write a state file so subsequent `stop`/`status`/`logs` calls can find it. Idempotent against already-stopped servers (stale state file gets overwritten); refuses to overwrite a running server (use `restart` instead).

Auto-bootstraps the app's `.env.local` from `deploy/secrets.sops.yaml` when the file is missing — fresh `git worktree add` worktrees do not have one. Emits a single `auto-bootstrapped <path> (<n> vars)` line on stderr when the write happens; existing `.env.local` files are left untouched. Use `ops dev-server bootstrap --force` to rewrite an existing file.

Default stdout (single line):
  pid=<n> port=<p> log=<path>\n

--json stdout (stable shape):
  { ok: true, pid, port, log_path }
