---
id: 3006dff6-c245-5e7f-8fae-027f4e6cfc29
page-type-slug: ops-command
title: "Ops temper auto-quest trace"
slug: ops-temper-auto-quest-trace
domain-parent-slug: domain/ops-temper-auto-quest
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/auto-quest/trace.ts
path: temper auto-quest trace
---

# Definition

- **Ops temper auto-quest trace** — the quest addon's captured ring of menu, action and completion records, merged into one stream.

# Help

Read TemperQuests.lua, Zod-parse the on-disk SavedVariables, and emit
the auto-quest debug trace the TemperQuests addon captured while
`/temperautoquestdebug` was enabled (a bounded FIFO ring of menu / action /
complete-dialog records). Replaces copy/pasting the chat log.

SavedVariables flush to disk only on `/reloadui` or `/quit`, so the
workflow is: enable, reproduce the stall, `/reloadui`, then read.

ZO_SavedVars stores account-wide tables under Default → @<account> →
$AccountWide; this command walks every account's $AccountWide.autoQuestDebugTrace
and merges them into a single chronological stream.

Default stdout: one human-readable block per entry (menu entries expand
each option on its own indented line). --json stdout: a single-line JSON
array of the full AutoQuestTraceEntry[] shape (stable field names).

Empty case: prints '(no auto-quest trace captured)' to stdout.
