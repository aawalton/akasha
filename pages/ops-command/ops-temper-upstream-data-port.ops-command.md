---
id: 9eb69591-a127-5194-b59b-e6c026b01655
page-type-slug: ops-command
title: "Ops temper upstream-data port"
slug: ops-temper-upstream-data-port
domain-parent-slug: domain/ops-temper-upstream-data
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/upstream-data/port.ts
path: temper upstream-data port
irreversible: false
---

# Definition

- **Ops temper upstream-data port** — one upstream ESO library's data, written out as the TypeScript modules its package holds.

# Design

The checkout this writes into is named rather than assumed.

Every file this emits is rewritten whole, so a second run against one install leaves the tree as it found it.

Each emitted file carries a header naming this invocation.

# Help

Run the upstream library's own Lua under a sandboxed VM, walk the tables it defines and
write them out as the TypeScript data modules the code repository's package carries.

The porter stands here; the tree it writes into is the code repository's. Nothing it emits
is tracked by this repository, so what reads a repository at a commit sees the producer
rather than its output.

The upstream Lua is read from the live ESO AddOns directory on this workstation, which is
what pins the version: the header each emitted file carries names the version it was
ported from, and a port against a newer install rewrites it.

Every emitted file is rewritten whole, so a run is repeatable and a second run against the
same upstream leaves the tree unchanged.
