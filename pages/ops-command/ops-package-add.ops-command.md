---
id: 28062d30-43a3-560f-beaf-5e0001d183cf
page-type-slug: ops-command
title: "Ops package add"
slug: ops-package-add
domain-parent-slug: domain/ops-package
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/package/add.ts
path: package add
---

# Definition

- **Ops package add** — a new workspace package scaffolded inside a change branch's worktree and committed.

# Help

Scaffold a new workspace package: create the directory, a minimal `package.json` (name derived from the path, `functionalType` from `--type`, `private: true`), and a `CLAUDE.md` stub; append the path to the root `package.json#workspaces`; and run `bun install` to refresh `bun.lock`. Then stages everything standing in the branch's worktree, formats what will land, and commits it. Nothing it wrote is checked inline. On failure, leaves the worktree dirty for inspection.

The package `name` is always derived from the path (`packages/<scope>/<seg>...` → `@<scope>/<seg>-...`), matching the `check-package-names` gate. A `pure` package gets the minimal three-field manifest; other types additionally declare `version` and `type: "module"`. Source, exports, scripts, and dependencies are left for you to add.

Refuses if the target path already exists or is already a registered workspace.

Default stdout:
  <name> <path> (<functionalType>)\n
  <commit_sha>\n

--json stdout (stable shape):
  { ok, name, path, functionalType, sha }
