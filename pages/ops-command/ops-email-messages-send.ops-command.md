---
id: 7fe10451-d3db-5c69-8c71-ebc3c3d27ddd
page-type-slug: ops-command
title: "Ops email messages send"
slug: ops-email-messages-send
domain-parent-slug: domain/ops-email-messages
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/email/messages/send.ts
path: email messages send
irreversible: true
---

# Definition

- **Ops email messages send** — a composed message sent from the authenticated mailbox, into a thread where one is named.

# Help

Send a Gmail message. Emits the send result (id, threadId) as JSON to stdout. For a threaded reply, pass --thread plus --reply-to-message so the In-Reply-To/References headers are derived from the replied-to message.
