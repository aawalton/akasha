---
id: 39837f03-3dc0-5260-a381-f36f2d73f237
page-type-slug: ops-command
title: "Ops temper inventory master-writ-probe"
slug: ops-temper-inventory-master-writ-probe
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/master-writ-probe.ts
path: temper inventory master-writ-probe
---

# Definition

- **Ops temper inventory master-writ-probe** — the addon's last master-writ journal capture, every step and condition with its raw quest fields.

# Help

Print the addon's most recent /tempermwprobe master-writ journal capture
from TemperInventory.lua SavedVariables — every master-writ quest, with
every step and condition, and the raw GetQuestConditionMasterWritInfo
fields (nil-vs-zero preserved).

Reads from:
  TemperInventory_SavedVariables
    → Default → @<account> → $AccountWide → diagnostics → lastMasterWritProbe

SavedVariables flush to disk only on /reloadui or /quit, so the workflow is:
accept the writs, run /tempermwprobe in-game, /reloadui, then run this command.
