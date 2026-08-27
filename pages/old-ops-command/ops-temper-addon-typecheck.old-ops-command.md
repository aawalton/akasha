---
id: e227056e-ff2f-4b0b-930e-2f1e2873c21f
page-type-slug: old-ops-command
title: "Ops temper addon typecheck"
slug: ops-temper-addon-typecheck
domain-parent-slug: domain/ops-temper-addon
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/addon/typecheck.ts
path: temper addon typecheck
irreversible: false
---

# Definition

- **Ops temper addon typecheck** — every Temper addon held against its own `tsconfig.json` by the TypeScript compiler.

# Design

The compiler runs once per addon, over that addon's own `tsconfig.json`, rather than once over the workspace.

The whole run is bounded rather than each addon.

The run stops at the first addon that does not typecheck, so a clean answer covers the whole roster and a failing one covers no addon after it.

# Help

Read the addon roster out of a checkout and run the TypeScript compiler over each addon's own `tsconfig.json` with nothing emitted, in canonical-name order, stopping at the first addon that does not typecheck.

An addon's `tsconfig.json` is the only statement of what that addon compiles and which ESO globals it may name, so the compiler is run once per addon rather than once over the workspace. This is tooling the workstation runs, not anything a deploy carries.

The checkout is taken as an argument rather than derived from this file's own location, so the roster read and the compiler run are both in the tree named. The addon resolver itself is loaded from the main checkout either way.

The whole run is bounded rather than each addon, so a compiler that stops making progress fails with the addon it was on rather than hanging.
