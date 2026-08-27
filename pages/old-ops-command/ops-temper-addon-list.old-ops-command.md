---
id: 4d37b817-d9e8-5d3e-bc4d-e352a090c98f
page-type-slug: old-ops-command
title: "Ops temper addon list"
slug: ops-temper-addon-list
domain-parent-slug: domain/ops-temper-addon
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/addon/list.ts
path: temper addon list
---

# Definition

- **Ops temper addon list** — every Temper addon source directory found in the repo, with its path and closure size.

# Help

List every discovered ESO addon source dir.

Walks both layouts — flat (`packages/temper/addons/<dirname>/`) and nested (`packages/temper/<domain>/addon/`) — and prints each addon's canonical name, repo-relative source dir, and workspace-closure size. Use `--json` for machine output.
