---
id: 9032af0f-6755-5414-9310-abf68f0409bb
page-type-slug: ops-command
title: "Ops check-deriver-barrel"
slug: ops-check-deriver-barrel
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/check-deriver-barrel.ts
path: check-deriver-barrel
---

# Definition

- **Ops check-deriver-barrel** — verifying or regenerating the barrel of the files that write derived fields onto nodes and edges.

# Help

Regenerate (--fix) or verify the @infra/checks deriver barrel against discovered `*.{node,edge}.deriver.ts` files.

Walks `packages/**` for deriver files, computes the expected `packages/infra/checks/src/derivers.generated.ts` barrel via the pure `generateBarrel` codegen, and compares the whole file against it. The comparison rules in both directions: a deriver on disk the barrel does not name, a deriver the barrel names that is no longer on disk, and any other way the file has drifted from what the codegen emits all fail alike. `--fix` rewrites the barrel from the codegen whenever it differs.

Exit codes:
  0  clean (or --fix succeeded)
  1  barrel out of date (run with --fix)
  2  tool / input error
