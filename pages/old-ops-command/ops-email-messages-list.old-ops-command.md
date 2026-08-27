---
id: 1b5c5f44-7670-5987-9b70-d7bf0f78cb26
page-type-slug: old-ops-command
title: "Ops email messages list"
slug: ops-email-messages-list
domain-parent-slug: domain/ops-email-messages
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/email/messages/list.ts
path: email messages list
---

# Definition

- **Ops email messages list** — one header-level summary per Gmail message a search matches, the search being optional.

# Help

List Gmail messages matching an optional search query. Emits a JSON array of message summaries (id, threadId, from, to, subject, date, snippet) to stdout.
