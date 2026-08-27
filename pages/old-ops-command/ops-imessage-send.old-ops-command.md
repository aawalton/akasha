---
id: 95af7bff-ad03-50e5-850e-cb9c0d4b3b78
page-type-slug: old-ops-command
title: "Ops imessage send"
slug: ops-imessage-send
domain-parent-slug: domain/ops-imessage
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/imessage/send.ts
path: imessage send
irreversible: true
---

# Definition

- **Ops imessage send** — one message put through the macbook's Messages app, as text, an image, or both.

# Help

Send an iMessage via the macbook's Messages app. --to accepts a phone number, an email, or an AddressBook name (which must resolve to exactly one contact; the contact's first phone — or first email — is used).

Send text with --text, a picture-text attachment with --image, or both (caption + image). At least one of --text/--image is required.

On success prints `sent\t<handle>`.
