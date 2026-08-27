---
id: 565243f3-8511-5c00-93df-097750814bec
page-type-slug: ops-command
title: "Ops package move"
slug: ops-package-move
domain-parent-slug: domain/ops-package
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/package/move.ts
path: package move
---

# Definition

- **Ops package move** — one workspace package moved or renamed, with every reference to it rewritten and committed.

# Help

Move and/or rename one workspace package atomically: git-mv the directory, rewrite the package's `name`, dependency keys across the monorepo, tsconfig references, imports, config files (biome.json, .sops.yaml, K8s manifests), workflow paths and bun-filter names, and docs references. Regenerates the lockfile, then stages everything standing in the branch's worktree, formats what will land, and commits it. Nothing it wrote is checked inline. On failure, leaves the worktree dirty for inspection.

Either `--from` or `--to` (or both) must change the path; or `--name` must change the package name. A no-op invocation (same path, same name) exits 1.

Default stdout:
  <oldName> <oldPath> -> <newName> <newPath>\n
  <commit_sha>\n

--json stdout (stable shape):
  { ok, oldName, newName, oldPath, newPath, sha }
