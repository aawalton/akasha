---
id: 9871ec86-2ca3-5864-bd6e-c3f844015a4a
slug: no-gate-reads-the-task-pin
page-type-slug: finding
title: "No gate reads the task pin"
domain-slug: domain/global
---

# Claim

No gate consults the task a seat is pinned to, so nothing at the door can tell a change produced by a task's pass from one typed straight in. `tools/hooks/hold-contract.ts:118` already reads `pinsOf(agent).task`, so the capability stands built and unused, and `ops enforcement list` registers no mechanism at all over principles or rungs.

# Evidence

Measured 2026-08-05 by a delegated pass of `define-principle-or-rule`, and the three mechanical claims re-run here before filing.

`grep -rln "pinsOf" tools/gates/` returns nothing across all 13 gates. `tools/hooks/hold-contract.ts:55` imports `pinsOf` and `:118` calls `pinsOf(agent).task`, so reading the pin at a door is a solved problem sitting one directory away from the gates.

`ops enforcement list --grep principle` returns 0 mechanisms across 4 sources; `--grep rung` returns 0. `--grep rule` returns 6, all code-repo colour, Prometheus and ast-grep mechanisms unrelated to standing instructions.

The behaviour this would make visible: five new rungs landed on four surfaces in the 18 hours after `tasks/lead/define-principle-or-rule.md` was first written on 2026-08-04 11:49 — `709380dd`, `fbf639f3`, `63a58994` and `0168515c`. Not one commit message cites a pass of the task.

That silence is not evidence of a breach, and the distinction is the point. Three of the four are this seat's and DID come from delegated passes; their messages are the door's bare defaults — "edit domains/role.md", "edit domains/memory.md", "write domains/instrument.md". So a compliant landing and a non-compliant one leave the same trace, and no instrument over this corpus can separate them. Alan reports having watched several agents skip the pass; nothing in the tree records either the skips or the runs.

The door already parses the document it is writing, so a `## ` heading appearing under `# Principles` or `# Rules` is available to it at the moment of the change, and the seat's pinned task is available beside it.

Not measured: what `fbf639f3` did internally, that one not being this seat's; whether a delegate's pass is legible to the gate at all, since the delegate holds no pin of its own and the seat that dispatched it is the one that writes.
