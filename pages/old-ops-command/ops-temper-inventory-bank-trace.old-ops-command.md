---
id: f1efe65e-abad-5868-aef9-bdfc6ec963df
page-type-slug: old-ops-command
title: "Ops temper inventory bank-trace"
slug: ops-temper-inventory-bank-trace
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/bank-trace.ts
path: temper inventory bank-trace
---

# Definition

- **Ops temper inventory bank-trace** — the addon's last banking-session timing capture, phase by phase, and the remainder it cannot place.

# Help

Print the addon's most recent banking-session perf trace from
TemperInventory.lua SavedVariables — per-phase ms brackets
(scanBankBags / refreshPanel / withdraw / deposit), open-handler and
open→close totals, move counts, net-worth recompute walk stats
(count / total / max ms), and the move-settling window brackets
(evaluateRules / actions-changed / bank-panel-refresh / slot-update /
full-update / scan-craft-bag, the TemperCrafting slot-handler delta, and
the unattributed remainder that reconciles the bracketed totals to
open→close), plus the wave-3 paced-dispatch counters (planned / issued /
confirmed / retries / span).

Reads from:
  TemperInventory_SavedVariables
    → Default → @<account> → $AccountWide → diagnostics → lastBankTrace

SavedVariables flush to disk only on /reloadui or /quit, so the workflow is:
interact with the banker, /reloadui, then run this command.
