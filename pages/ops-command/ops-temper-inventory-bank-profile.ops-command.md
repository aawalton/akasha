---
id: 372b2f66-2fdb-5739-b92a-f1b7cbee802b
page-type-slug: ops-command
title: "Ops temper inventory bank-profile"
slug: ops-temper-inventory-bank-profile
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/bank-profile.ts
path: temper inventory bank-profile
---

# Definition

- **Ops temper inventory bank-profile** — the addon's last banking-session script-profiler capture, rolled up by source and by closure.

# Help

Print the addon's most recent banking-session ESO-script-profiler capture
from TemperInventory.lua SavedVariables — per-source rollups (base-game
EsoUI/ vs each AddOns/<Name> vs C functions), the top closures by inclusive
ms and by self ms, total Lua ms (root-record sum), GC ms, and frame/record
counts. Attributes the bank-trace unattributed remainder down to individual
Lua closures across every addon and the base game.

Reads from:
  TemperInventory_SavedVariables
    → Default → @<account> → $AccountWide → diagnostics → lastBankProfile

profilerAvailable=false ⇒ the script profiler did not arm in this client;
the capture is empty and cannot decide the engine-C++-vs-Lua question.

SavedVariables flush to disk only on /reloadui or /quit, so the workflow is:
interact with the banker, /reloadui, then run this command.
