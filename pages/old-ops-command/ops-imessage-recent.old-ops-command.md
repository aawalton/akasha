---
id: 01685731-893d-5f28-ab8b-0ea8090ddb4a
page-type-slug: old-ops-command
title: "Ops imessage recent"
slug: ops-imessage-recent
domain-parent-slug: domain/ops-imessage
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/imessage/recent.ts
path: imessage recent
---

# Definition

- **Ops imessage recent** — the newest messages in the macbook's chat database, across all chats or one contact's.

# Help

List the newest iMessages from the macbook's Messages database — across all chats, or one contact's conversation with --contact.

Default stdout (one line per message, oldest-first within the window):
  <iso-local-minute>\t<← or →>\t<chat-or-contact-label>\t<text>
→ = sent by Alan; named group chats prefix the label with the chat's display name.
