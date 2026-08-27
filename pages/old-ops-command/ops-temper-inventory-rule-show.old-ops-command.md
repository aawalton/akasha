---
id: dc771d9c-486e-5d7c-afc9-517a72d5a27b
page-type-slug: old-ops-command
title: "Ops temper inventory rule show"
slug: ops-temper-inventory-rule-show
domain-parent-slug: domain/ops-temper-inventory-rule
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/rule/show.ts
path: temper inventory rule show
---

# Definition

- **Ops temper inventory rule show** — one item-category rule's whole shape, found among the written rules or the derived ones.

# Help

Print the full shape of a single category rule by id.

Looks up the id in the user-rule list first, then in derived controlled
rules (so investigators can `show` either). JSON is the default — one
rule deserves the full shape; pass `--tsv` for the row form. The `--json`
flag is accepted but is a no-op since JSON is already the default.

Exit 2 if the id is not found, with the missing id in the error message.
