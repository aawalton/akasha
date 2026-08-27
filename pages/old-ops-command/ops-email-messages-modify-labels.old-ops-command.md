---
id: c9869b14-1304-5434-badf-facfe04c9984
page-type-slug: old-ops-command
title: "Ops email messages modify-labels"
slug: ops-email-messages-modify-labels
domain-parent-slug: domain/ops-email-messages
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/email/messages/modify-labels.ts
path: email messages modify-labels
---

# Definition

- **Ops email messages modify-labels** — one Gmail message with label ids added, removed, or both.

# Help

Add and/or remove label ids on a Gmail message via users.messages.modify. At least one of --add or --remove is required. Emits the message's post-mutation labels (id, threadId, labelIds) as JSON to stdout.
