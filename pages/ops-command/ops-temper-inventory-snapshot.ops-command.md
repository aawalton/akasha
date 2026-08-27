---
id: 055754b7-3056-52ca-9a0e-dbe5d42df981
page-type-slug: ops-command
title: "Ops temper inventory snapshot"
slug: ops-temper-inventory-snapshot
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/snapshot.ts
path: temper inventory snapshot
---

# Definition

- **Ops temper inventory snapshot** — one stored inventory snapshot rebuilt from its header row and chunk rows into one document.

# Help

Reassemble a stored inventory snapshot into the full InventoryDatabase JSON.

Reads the `temper-inventory-snapshot` header page plus all its
`temper-inventory-chunk` children, then runs `assembleInventory` (sort by
chunk index, concat the `data` strings, JSON.parse) to produce the same
`InventoryDatabase` the React-bound `useInventory` hook reassembles in the
browser.

Either pass a snapshot id as the positional, or use `--latest` to pick
the newest snapshot for the current user (USER_ID env var, defaults to
Alan). The two are mutually exclusive; exactly one must be supplied.
