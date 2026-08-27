---
id: 360bc830-d5a4-52cf-832a-f32a5aa4fb48
page-type-slug: ops-command
title: "Ops email drafts create"
slug: ops-email-drafts-create
domain-parent-slug: domain/ops-email-drafts
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/email/drafts/create.ts
path: email drafts create
irreversible: true
---

# Definition

- **Ops email drafts create** — one Gmail draft composed from the flags `send` takes and left unsent.

# Help

Create a Gmail draft. Emits the normalized draft (id, messageId, threadId) as JSON to stdout. Takes the same flags as `ops email messages send`.
