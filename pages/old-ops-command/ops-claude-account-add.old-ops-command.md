---
id: fd8b691b-e67c-51ae-98fd-c46a59825a62
page-type-slug: old-ops-command
title: "Ops claude account add"
slug: ops-claude-account-add
domain-parent-slug: domain/ops-claude-account
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/claude-account/add.ts
path: claude-account add
---

# Definition

- **Ops claude account add** — a new account given its page and the next free c-alias slot.

# Help

Onboard a new Claude account: write its `claude-account` page (identity + the next free
c-alias slot) and rewrite the local account-alias snapshot the shell reads to emit the
`cN` aliases. That snapshot is rebuilt from the `alias-index:` each account page states,
so the new account reaches it the moment its page stands. Token material is NOT written
here — the operator runs `/login` in the bootstrap session afterward and the supervisor's
credential push fills the tokens onto the page.

Backs the `cna` shell function. `aliasIndex` is auto-assigned (max existing + 1) unless
`--alias-index` is given. Refuses an account name a page already stands for.
