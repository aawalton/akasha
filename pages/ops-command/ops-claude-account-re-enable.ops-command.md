---
id: bf9309b1-6d8e-5994-8f98-b5e4355cdc36
page-type-slug: ops-command
title: "Ops claude account re-enable"
slug: ops-claude-account-re-enable
domain-parent-slug: domain/ops-claude-account
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/claude-account/re-enable.ts
path: claude-account re-enable
---

# Definition

- **Ops claude account re-enable** — one account put back into use after its subscription was found inactive.

# Help

Clear the subscription-disabled mark from one claude-account's page so the next
`getBestCredential` call across every proxy returns the account to the eligible pool.

Triggered by an organization administrator re-enabling Claude Code access (or by an
operator clearing a false-positive 403 + permission_error match). Removes the
`subscription-disabled-reason` key from the page's frontmatter and commits the page.
That key is the whole record of the disablement, and git holds what it said.

Unknown account → exit 1 with stderr `account not found: <name>`.
Already-enabled account → succeed (idempotent), leaving the page unchanged.
