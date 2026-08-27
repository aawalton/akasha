---
id: f4b66acd-aa01-50ed-b6c3-ced7222f856e
page-type-slug: domain
title: "Ops email"
slug: ops-email
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - domain/email
---

# Definition

- **Ops email** — the commands reaching one Gmail mailbox over its API, and the consent that opens it.

# Design

Three environment variables open the mailbox, and `auth login` mints the third.

Every flag and field naming a label here takes the label's id, and no command maps a name to one.

`seed` reaches no mailbox; it creates the page types the email watcher stores its state in.
