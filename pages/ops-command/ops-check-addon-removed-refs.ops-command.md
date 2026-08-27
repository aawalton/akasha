---
id: a8a5c936-da97-509f-a74f-68fd06783dd1
page-type-slug: ops-command
title: "Ops check-addon-removed-refs"
slug: ops-check-addon-removed-refs
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/check-addon-removed-refs.ts
path: check-addon-removed-refs
---

# Definition

- **Ops check-addon-removed-refs** — scanning built addon Lua for the globals of external addons removed from the Temper runtime.

# Help

Static post-emit scan of `packages/temper/addons/dist/**/*.lua` for references to removed external-addon globals.

Reads the blocklist (`addon-removed-refs.manifest.ts`) — the globals of external addons removed from the Temper runtime — and flags any whole-word reference outside a Lua string literal. Each blocklist entry names its own replacement and the project that removed it, and a refusal quotes the matched entry's, so read the manifest rather than this line for the current set. Forbidding the reference closes the dormant-crash class from #12076 / #12104, which founded the gate. An absent or empty dist/ is a refusal coded 2, not a pass — a scan of nothing certifies nothing. Run `bun --cwd packages/temper/addons build:addons:only` first.

Exit codes:
  0  clean
  1  one or more removed-addon references found
  2  no verdict — nothing to examine, the call was malformed, or the tool failed
