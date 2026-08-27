---
id: 01057b00-53aa-5b61-bbec-1e2fa89f09ef
page-type-slug: domain
title: "Ops email drafts"
slug: ops-email-drafts
domain-parent-slug: domain/ops-email
required-reading-slugs:
  - domain/ops-namespace
  - domain/email
---

# Definition

- **Ops email drafts** — the two commands that put an unsent message in the mailbox and name the ones already there.

# Design

`create` takes the flags `messages send` takes, and nothing here sends, edits or removes a draft.

`list` returns ids alone, so which draft is which is settled by fetching its message.
