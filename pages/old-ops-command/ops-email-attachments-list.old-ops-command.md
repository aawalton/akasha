---
id: bdd7461a-5191-56b6-bb5f-be736c63f0c3
page-type-slug: old-ops-command
title: "Ops email attachments list"
slug: ops-email-attachments-list
domain-parent-slug: domain/ops-email-attachments
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/email/attachments/list.ts
path: email attachments list
---

# Definition

- **Ops email attachments list** — the filename, type, size and id of each attachment one Gmail message carries.

# Help

List the attachments on a Gmail message. Emits a JSON array of attachment refs (filename, mimeType, attachmentId, size) to stdout — fetch the bytes with `email attachments get`.
