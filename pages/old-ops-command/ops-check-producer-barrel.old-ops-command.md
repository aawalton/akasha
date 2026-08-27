---
id: ffe01fe7-0185-5e24-800a-8fc651e50124
page-type-slug: old-ops-command
title: "Ops check-producer-barrel"
slug: ops-check-producer-barrel
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/check-producer-barrel.ts
path: check-producer-barrel
---

# Definition

- **Ops check-producer-barrel** — verifying or regenerating the barrel of the files that emit graph nodes and edges.

# Help

Regenerate (--fix) or verify the @infra/checks producer barrel against discovered `*.{node,edge}.producer.ts` files.

Walks `packages/**` for producer files, computes the expected `packages/infra/checks/src/producers.generated.ts` barrel via the pure `generateBarrel` codegen, and compares the whole file against it. The comparison rules in both directions: a producer on disk the barrel does not name, a producer the barrel names that is no longer on disk, and any other way the file has drifted from what the codegen emits all fail alike. `--fix` rewrites the barrel from the codegen whenever it differs.

Exit codes:
  0  clean (or --fix succeeded)
  1  barrel out of date (run with --fix)
  2  tool / input error
