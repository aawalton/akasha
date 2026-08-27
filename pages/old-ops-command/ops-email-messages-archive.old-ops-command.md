---
id: a0bddf31-7810-517c-a159-2793ef357930
page-type-slug: old-ops-command
title: "Ops email messages archive"
slug: ops-email-messages-archive
domain-parent-slug: domain/ops-email-messages
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/email/messages/archive.ts
path: email messages archive
---

# Definition

- **Ops email messages archive** — one Gmail message with its INBOX label removed.

# Help

Archive a Gmail message by removing its INBOX label. Emits the message's post-mutation labels (id, threadId, labelIds) as JSON to stdout.
