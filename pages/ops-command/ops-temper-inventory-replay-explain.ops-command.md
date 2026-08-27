---
id: 1ac4922c-be16-5c1a-aeab-d74324f276fc
page-type-slug: ops-command
title: "Ops temper inventory replay-explain"
slug: ops-temper-inventory-replay-explain
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/replay-explain.ts
path: temper inventory replay-explain
---

# Definition

- **Ops temper inventory replay-explain** — the addon's last stored rule walk, printed in the format `explain` prints its own.

# Help

Pretty-print the addon's most recent explain trace from TemperInventory.lua
in the same TSV walk format the live `explain` command emits.

Reads from:
  TemperInventory_SavedVariables
    → Default → @<account> → $AccountWide → diagnostics → lastExplain

First line of output is `[addon @ <timestamp>]` so on-disk addon traces
can be literally diffed against the live walk emitted by `explain`.

When `--itemlink` is provided and the stored trace was authored for a
different item link, the command exits non-zero and stderr names the stored
trace (so the operator knows what's actually in the slot).
