---
id: 954e3206-2b4d-5c4b-b4e3-36f883ae82b9
page-type-slug: old-ops-command
title: "Ops email attachments get"
slug: ops-email-attachments-get
domain-parent-slug: domain/ops-email-attachments
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/email/attachments/get.ts
path: email attachments get
---

# Definition

- **Ops email attachments get** — one attachment's bytes by id, base64url-encoded, with their size beside them.

# Help

Fetch one attachment's bytes by id. Emits { data, size } as JSON to stdout, where `data` is base64url-encoded. Use `email attachments list` to discover attachment ids.
