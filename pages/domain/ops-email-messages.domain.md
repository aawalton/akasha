---
id: f7530be9-5a03-5d97-8f57-591e03519e78
page-type-slug: domain
title: "Ops email messages"
slug: ops-email-messages
domain-parent-slug: domain/ops-email
required-reading-slugs:
  - domain/ops-namespace
  - domain/email
---

# Definition

- **Ops email messages** — the commands reading a mailbox's messages, changing which labels they carry, and sending one.

# Design

`archive` is `modify-labels` with `INBOX` removed, and `trash` is Gmail's own trash call rather than a label change.

`list` fetches each message it names a second time for its headers, so it costs one round trip per result.
