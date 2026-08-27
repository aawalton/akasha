---
id: d972749e-7c0e-5543-a69f-7410e48edaf3
page-type-slug: ops-command
title: "Ops seat refresh-settings"
slug: ops-seat-refresh-settings
domain-parent-slug: domain/ops-seat
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/seat/refresh-settings.ts
path: seat refresh-settings
irreversible: true
---

# Definition

- **Ops seat refresh-settings** — the settings file every running seat is watching, rewritten from the document as it stands now.

# Help

Rewrite in place the settings file each running seat was launched with, from
`settings/agents.json` as it stands now.

Claude Code watches its settings file and reloads hooks and permissions from it
live, so a change lands on a running seat without a restart. What stops that
here is that a spawn writes `/tmp/agent-settings-<digest>.json`, named for a
digest of its own contents: a changed document produces a NEW file for the next
spawn and never touches the one a running seat is watching. This rewrites those.

Each seat's per-spawn keys are read off the file being replaced and carried
over, so a seat keeps the overrides it was launched with.

The digest in the name is left alone and no longer describes the contents. It
is a spawn-time cache key, and a later spawn of the new contents writes its own
file rather than reusing this one.

Default stdout (TSV, one line per file):
  <path>\t<refreshed|unchanged|unreadable>
