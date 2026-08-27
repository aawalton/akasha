---
id: cef1bc4f-5d4e-57d7-ba6c-986e5cd1a0e8
page-type-slug: old-ops-command
title: "Ops check-addon-sandbox-safety"
slug: ops-check-addon-sandbox-safety
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/check-addon-sandbox-safety.ts
path: check-addon-sandbox-safety
---

# Definition

- **Ops check-addon-sandbox-safety** — scanning built addon Lua for the Lua stdlib symbols ESO's sandbox strips.

# Help

Static post-emit scan of `packages/temper/addons/dist/**/*.lua` for Lua stdlib symbols ESO's sandbox strips.

Reads the manifest-derived allow-list (`eso-sandbox.manifest.ts`) and flags any reference to a stripped namespace, stripped namespace member, or stripped bare global. An absent or empty dist/ is a refusal coded 2, not a pass — a scan of nothing certifies nothing. Run `bun --cwd packages/temper/addons build:addons:only` first.

Exit codes:
  0  clean
  1  one or more banned symbols found
  2  no verdict — nothing to examine, the call was malformed, or the tool failed
