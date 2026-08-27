---
id: ed9c179b-4131-531f-b7f2-422c3e205671
page-type-slug: old-ops-command
title: "Ops claude account sync-aliases"
slug: ops-claude-account-sync-aliases
domain-parent-slug: domain/ops-claude-account
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/claude-account/sync-aliases.ts
path: claude-account sync-aliases
---

# Definition

- **Ops claude account sync-aliases** — the local alias snapshot rewritten from the account pages.

# Help

Rebuild the local account-alias snapshot from the `alias-index:` each account page
states. The shell-init alias generator (`aw init bash`) reads this file to emit the `cN`
family without reading the pages itself. Run it to repair drift, or on a fresh
workstation to materialize the snapshot (provisioning calls it for exactly this).
