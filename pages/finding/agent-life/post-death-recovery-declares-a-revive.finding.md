---
id: a7082f98-f1eb-5490-b7e8-eb7873da96f5
page-type-slug: finding
title: "Post death recovery declares a revive"
domain-slug: domain/global
---

# Claim

A supervisor recovered after its death resumes under the one driver the vocabulary documents as not-a-defect, so a post-death relaunch and a deliberate `ops seat revive` leave identical records and identical operator output. `ops seat restart` on a dead supervisor calls `recoverViaRelaunch` in resume mode with an empty prompt, the boot decider reads that argv and declares `awaiting-inbound`, and the verb prints `revived`. Nothing at either end says a death preceded it.

# Evidence

Read 2026-08-07 against `~/code`, while ingesting `dirty/skills/agent-harness/findings/seat-liveness-halting-and-stalls.md`, whose block 12 argued a two-member enumeration of undriven `--resume` paths. That enumeration is superseded — `packages/agents/supervisor/src/supervisor-args.ts:382-386` now refuses to emit the flag without a named driver — but this consequence survived the repair rather than being removed by it.

`packages/agents/cli/src/agent/restart.ts:158-171`, `recoverRestart`, is what runs when the supervisor is found dead. It calls `recoverViaRelaunch({ mode: { kind: "resume" } })` and ends `emit(agentId, "revived", json)`.

`packages/agents/cli/src/agent/restart-recovery.ts:288-296` is the launch: `launchDetachedSupervisor({ ..., prompt: "", resumeSessionId })`. Its docblock at `:239-241` calls resume mode "the `revive` shape".

`packages/agents/supervisor/src/supervisor-args.ts:107-128`, `decideBootResume`, reads that argv: an empty prompt with `resume` true returns `driver: opts.headless ? "awaiting-inbound" : "operator-attended"`, `delivery: "nothing-to-deliver"`. So the `agent.resumed` row for a post-death recovery matches one from `ops seat revive` on both axes.

What makes that the not-a-defect member is stated at `packages/agents/shared/agent-resume-driver.ts:18-25`: "`awaiting-inbound` is a member and is not a defect: `ops seat revive` resumes with an empty prompt so the seat comes back waiting on its mailbox, which is exactly what was asked for."

The two cases differ in what a reader should conclude. A revive was asked to come back idle. A recovery ran because a seat with work in hand died, and its operator has just been told `revived`.

Not measured: how often the recovery path fires, and whether any recovered seat has in fact sat idle with work in hand. The row carries no marker for the recovery, so that is not recoverable after the fact.
