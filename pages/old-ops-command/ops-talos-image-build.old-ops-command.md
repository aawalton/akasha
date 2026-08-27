---
id: a0e8451d-8343-54ba-81e8-c051a1a7a9ff
page-type-slug: old-ops-command
title: "Ops talos image-build"
slug: ops-talos-image-build
domain-parent-slug: domain/ops-talos
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/talos/image-build.ts
path: talos image-build
---

# Definition

- **Ops talos image-build** — registering one node's schematic with the Image Factory for its id and installer.

# Help

POST the node's Image Factory schematic to factory.talos.dev to compute a deterministic schematic id, then optionally download the installer ISO.

Without `--download`, prints the schematic id and the installer URL to stdout. With `--download <path>`, fetches the ISO to that path.

The schematic id is content-addressed: identical extension lists produce identical ids, so repeated calls are idempotent.
