---
id: 43744cc4-bb9c-55bb-8abb-47be667d574a
page-type-slug: old-ops-command
title: "Ops imessage search"
slug: ops-imessage-search
domain-parent-slug: domain/ops-imessage
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/imessage/search.ts
path: imessage search
---

# Definition

- **Ops imessage search** — messages whose decoded body holds a substring, over-fetched on a byte match then re-filtered.

# Help

Search iMessage history by text substring (decodes attributedBody typedstream blobs — plain `text` is NULL for almost every row).

The SQL-side blob match (instr over the raw bytes) is case-sensitive; the decoded results are then re-filtered case-insensitively, so mixed-case hits of an all-lowercase query can be missed but never falsely included.

Output format matches `ops imessage recent` (oldest-first lines, or --json).
