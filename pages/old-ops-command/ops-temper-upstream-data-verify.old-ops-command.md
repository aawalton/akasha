---
id: 6e498baf-fadf-579c-84e5-dc4de4dc837b
page-type-slug: old-ops-command
title: "Ops temper upstream-data verify"
slug: ops-temper-upstream-data-verify
domain-parent-slug: domain/ops-temper-upstream-data
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/upstream-data/verify.ts
path: temper upstream-data verify
---

# Definition

- **Ops temper upstream-data verify** — whether one library's carried data still agrees with upstream, leaf for leaf.

# Design

This writes nothing, so it rules against any checkout.

A verdict answers for the carried copy and the live install together, so an install that moved on reports the copy as stale.

# Help

Run the upstream library's own Lua under a sandboxed VM, walk the tables it defines down to
their leaves, walk the ported TypeScript modules the same way and rule on whether the two
agree. A leaf that differs is printed with the path that reaches it.

This reads the ported files and writes nothing, so it is safe against any checkout. It
compares against the upstream Lua as it stands in the live ESO AddOns directory, so a
verdict is about the port and the install together: an install that moved on reports the
port as stale, which is the port being stale.
