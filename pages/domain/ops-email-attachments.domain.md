---
id: 8220076a-e7db-5bdd-8f39-ff8a59682edb
page-type-slug: domain
title: "Ops email attachments"
slug: ops-email-attachments
domain-parent-slug: domain/ops-email
required-reading-slugs:
  - domain/ops-namespace
  - domain/email
---

# Definition

- **Ops email attachments** — the two commands naming what one message carries and fetching a named part's bytes.

# Design

Bytes come back base64url-encoded inside the JSON on stdout, and no command here writes a file.

An attachment id is meaningful only beside the message id it was listed from.
