---
id: 7786caed-1b51-593a-a529-83341cf5a2e2
page-type-slug: finding
title: "A subagent overwrites its parent seat's hook-liveness stamp, so the gate reports a collision as a miss"
domain-slug: domain/agent-harness
---

# Claim

A subagent's tool calls overwrite its parent seat's hook-liveness stamp, so the `hook-liveness` gate reports that the hook did not fire for a call whenever a delegate fires between that call's own firing and the gate reading the slot. The warning is a collision rather than evidence about the hook.

# Evidence

`tools/hooks/hold-seat.ts` stamps through `recordFiring(hookAgentId(fields), …)`, and `hookAgentId` in `tools/lib/read-log.ts` answers `seatId() ?? session_id`, carrying no subagent mark. The sibling `recordingAgentId` does carry one and is not what the stamp uses. `tools/lib/hook-stamp.ts` writes one file per agent and overwrites it whole on every firing, and `tools/gates/hook-liveness.ts` reads that slot through `seatOf(subject.agent)`, which strips any subagent mark. Parent and every delegate therefore share one slot.

Measured on 2026-08-18. A subagent was given one command, `bun ~/instructions/tools/dag.ts --domain mcp` followed by a read of the parent seat's stamp file. The stamp it printed was its own firing: `{"at":1787063459478,"tool":"Bash","target":"instructions/tools/dag.ts","verb":""}`, standing in the parent seat's bucket for a command the parent never ran.

The gate passes only where the last firing names the caller's own script or ops command, so a delegate's firing arriving in that window turns a live hook into a reported absence. The one warning seen this day came during a landing while a background delegate was renaming files, and every call made without a delegate running has passed.

The consequence runs both ways. A warning from this gate is not evidence the hook stopped, and the instrument that would report a hook genuinely ceasing to fire is built on a slot anything sharing the seat can overwrite. Nothing else reports that.
