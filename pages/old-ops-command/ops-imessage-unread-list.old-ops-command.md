---
id: 6b53f9f1-d990-5d90-a1a3-e9038e3af194
page-type-slug: old-ops-command
title: "Ops imessage unread-list"
slug: ops-imessage-unread-list
domain-parent-slug: domain/ops-imessage
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/imessage/unread-list.ts
path: imessage unread-list
---

# Definition

- **Ops imessage unread-list** — the unread inbound messages themselves.

# Help

List the unread inbound iMessages in the macbook's Messages database: received, is_read=0, not from Alan, real texts within the rolling 30-day window addressed to Alan's number.

Default stdout (one line per unread message, oldest-first):
  <iso-local-minute>\t<sender>\t<text>
sender = AddressBook contact name when resolvable, else the raw handle (short codes like a 2FA sender stay as the code); named group chats prefix the sender with the chat's display name.

With no flags every unread message stands in the output, so the row count is the unread count.
