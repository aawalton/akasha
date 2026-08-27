---
id: 729f38e3-ab14-57d0-9b32-db2c119cd69e
page-type-slug: ops-command
title: "Ops email messages trash"
slug: ops-email-messages-trash
domain-parent-slug: domain/ops-email-messages
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/email/messages/trash.ts
path: email messages trash
---

# Definition

- **Ops email messages trash** — one Gmail message moved to Trash, which removing that label brings back.

# Help

Move a Gmail message to Trash (recoverable — not a permanent delete). Emits the message's post-mutation labels (id, threadId, labelIds) as JSON to stdout.
