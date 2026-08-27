---
id: 1d29c9c6-ef99-5aa1-9d50-666b77144733
page-type-slug: ops-command
title: "Ops graph lockfile-deps"
slug: ops-graph-lockfile-deps
domain-parent-slug: domain/ops-graph
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/graph/lockfile-deps.ts
path: graph lockfile-deps
---

# Definition

- **Ops graph lockfile-deps** — every resolution of one npm name in bun.lock, with the workspaces and packages pulling each.

# Help

List every resolution of an npm package name in `bun.lock` — direct and transitive — together with the workspaces and parent packages that pull each version. Answers two supply-chain questions in one shot: `is X@Y in our tree?` (filter by exact version) and `who pulls X?` (omit version, see every resolution and its dependents). Backed by the `lockfile-package` graph producer family; no node_modules read required.

Default stdout is a human-readable per-version block listing the workspaces with `lockfile-resolves` edges into the version, the parent lockfile-packages with `lockfile-depends` edges, and the integrity hash. Use `--json` for the structured payload (versions array, each with `integrity`, `directConsumers`, `parentPackages`).
