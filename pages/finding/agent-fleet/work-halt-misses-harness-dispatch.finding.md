---
id: 01cd00a4-2293-5414-978d-99cd50fe32aa
slug: work-halt-misses-harness-dispatch
page-type-slug: finding
title: "Work halt misses harness dispatch"
domain-slug: domain/agent-fleet
---

# Claim

The fleet work halt gates six `ops` verb paths and nothing else, so a seat that fans out through the harness `Agent` tool dispatches new workers while the halt is set, and is never told the halt exists.

# Evidence

Measured 2026-08-07 against `~/code` at `ecf5f9518f`, re-run rather than relayed: a quarantined document first reported this on 2026-07-30.

`HALT_GATED_COMMANDS` at `packages/agents/shared/work-halt.ts` is exactly `project start`, `project claim`, `project check`, `project deploy`, `project integrate` and `agent spawn`. `ops seat halt` states the same six. The guard `enforceWorkNotHalted` is imported once, at `packages/shared/cli/src/ops/cli.ts:15`, and applied at the `ops` dispatcher — so the gated population is `ops` verbs and nothing else.

A harness `Agent` tool call is not an `ops` verb and reaches no part of that path. It is a new worker under the guard's own description: its docblock says the gated paths are those that take on new work or reach shared infrastructure, and a subagent edits the tree, commits to a branch and consumes fleet capacity.

Nothing gates it elsewhere. `settings/agents.json` registers PreToolUse hooks under four matchers — `Write|Edit`, `Bash`, `mcp__playwright__.*`, and `""` for `hold-seat.ts` alone. No `Agent` or `Task` matcher exists, and `hold-seat.ts` names neither the halt nor `agent_work_halted`.

The second half is a property of the design. The halt is state a seat discovers by being refused: `ops seat halt-status` calls it state agents discover rather than a fleet to mirror, and the refusal text says no resume will be announced. A seat that never invokes a gated verb is never told. The set the flag stops and the set it informs are the same, so anything outside it is both unstopped and uninformed.

Not established: how many seats fan out this way, or what share of dispatch the tool carries against `ops seat start`. The original observation was one seat with five subagents, which is a case rather than a rate.
