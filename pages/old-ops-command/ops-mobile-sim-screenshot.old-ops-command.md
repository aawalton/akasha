---
id: f1beac71-be18-5e6c-bc6c-3d9a6615fa43
page-type-slug: old-ops-command
title: "Ops mobile sim screenshot"
slug: ops-mobile-sim-screenshot
domain-parent-slug: domain/ops-mobile-sim
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/mobile/sim/screenshot.ts
path: mobile sim screenshot
---

# Definition

- **Ops mobile sim screenshot** — the sim's screen written to a PNG on this workstation, with the path printed.

# Help

Capture the sim screen as a PNG and print the local file path (an agent can then Read it). Reuses the active session. Defaults to a timestamped file in the temp dir; override with --out.
