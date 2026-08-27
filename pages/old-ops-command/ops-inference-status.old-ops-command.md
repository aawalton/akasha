---
id: 9fdd44c0-6726-54f6-b2df-738ee2b89893
page-type-slug: old-ops-command
title: "Ops inference status"
slug: ops-inference-status
domain-parent-slug: domain/ops-inference
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/inference/status.ts
path: inference status
---

# Definition

- **Ops inference status** — the managed inference resources actually standing on each declared host.

# Help

Query and print the actual managed inference state on each declared host — the launchd jobs, conda envs, code dirs, and stamped content hashes under the `com.alanwalton.inference.` / `inference-` / `~/inference/` ownership prefixes. Read-only.
