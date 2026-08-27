---
id: 87d7041a-e28b-5b64-87c4-24f439a8525a
page-type-slug: finding
title: "Self stop consumer stale"
domain-slug: domain/agent-fleet
---

# Claim

The header of `packages/agents/shared/project-binding.ts` names a consumer that no longer exists. Line 6 describes the module's park and terminal status predicates as answering "safe to stop?", "read by a supervisor self-stop monitor and an `ops agent` ..." — and the supervisor self-stop monitor was removed from the fleet. The `ops agent` reader remains.

# Evidence

`packages/agents/supervisor/src/supervisor-monitors-wire.ts` is where the monitor was wired, and at lines 49-55 it now carries the removal in place of the code: "A self-stop monitor used to run here: on sustained idle it stopped a worker whose bound project had gone terminal and release-and-retired one parked at a human gate. It is gone with the other three automatic kills — a seat's life follows from its identity, and ending one is its spawner's act, so a status somebody wrote on a project row is not a decision to end a seat."

`startPerAgentMonitors` in that file returns exactly `heartbeatTimer`, `proxyLivenessMonitor` and `limitResumeMonitor`. `ls packages/agents/supervisor/src/ | grep -i self-stop` returns nothing: `supervisor-self-stop.ts`, `supervisor-self-stop-decide.ts` and `supervisor-self-stop-decline.ts` are all gone.

The predicates themselves are live and correct — `isHumanGateParkStatus` at :413 and `isCustodyParkStatus` at :421, over `HUMAN_GATE_PARK_STATUSES` and `CUSTODY_PARK_STATUSES`. Only the sentence naming who reads them is stale.

Why it is worth repairing rather than leaving: the same header, at lines 83-96, argues at length about what each status set is for, and line 90 says `HUMAN_GATE_PARK_STATUSES` "drives the release-and-stop leg" — a leg that went with the monitor. A reader auditing whether a status set still earns its keep is being shown a consumer that would justify it and does not exist, which is the shape that keeps dead vocabulary alive.

Found ingesting `dirty/knowledge/per-agent-monitors.md`, whose whole self-stop section described the removed monitor as live.
