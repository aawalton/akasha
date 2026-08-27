---
id: 9fa2bca9-caa9-5ce6-b5b2-896219b059df
page-type-slug: old-ops-command
title: "Ops check-addon-sandbox-load"
slug: ops-check-addon-sandbox-load
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/check-addon-sandbox-load.ts
path: check-addon-sandbox-load
---

# Definition

- **Ops check-addon-sandbox-load** — loading each built addon Lua bundle in a sandboxed Lua 5.1 VM with an ESO-shaped global table.

# Help

Runtime post-emit load of each emitted `.lua` bundle inside a sandboxed Lua 5.1 VM with ESO-shaped `_G`.

Catches the runtime-only failure class the static scanner misses — `_G['debug']` indirection, circular require, top-level recursion depth overflow, undefined ESO API calls, the #7179 sourceMapTraceback regression. Each bundle gets its own sandbox VM via `@temper/shared-build-deploy-lua-runner`. An absent or empty dist/ is a refusal coded 2, not a pass — loading nothing verifies nothing. Run `bun --cwd temper/addons build:addons:only` first.

Exit codes:
  0  all bundles loaded clean
  1  one or more bundles failed runtime load
  2  no verdict — nothing to examine, the call was malformed, or the tool failed
