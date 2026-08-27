---
id: 48dbd9e5-f397-5fd1-8ce5-247006e583aa
page-type-slug: finding
title: "Name claim caller seat escape"
domain-slug: domain/agent-fleet
---

# Claim

A seat binding another agent onto a name its own seat holds passes the name-claim guard, because the guard asks whether the prior holder is the caller's seat rather than whether it is the agent being bound.

# Evidence

Observed on 2026-08-05 while verifying #17927. From inside the seat holding `agent-harness-manager-17924`, `ops seat restate --agent-id <a different, stopped seat> --name agent-harness-manager-17924` answered `renamed` and exited 0. The name moved to the other row and the live holder was left nameless. Restoring it took a second re-statement.

`decideAgentNameBind` refuses a prior holder that is not proven dead, and its refusal text names this exact outcome — "taking one from a seat that is still running leaves it live, claimed and nameless". The refusal is never reached here: `agent-name-bind.ts` sets `priorHolderIsCallerSeat` from `isPriorHolderCallerSeat`, which reads the prior holder's spawn pid and asks `isAncestorOfSelf`, and `decideAgentNameBind` returns `allow` on that flag before it tests liveness. Nothing in the branch compares the prior holder against `bindingAgentId`, so "the prior holder is the seat I am running inside" is taken to mean "this is a self-rename".

The escape predates the seat cluster. `agent-name-bind.ts` was last written by #17784 and #17927 did not touch it.

The fleet's own path does not reach it: `tools/lib/seat-rename.ts` passes each seat's own id, from inside that seat, so a prior holder that is a different seat is never an ancestor and the refusal fires as designed. What reaches it is an operator or a manager stating attributes for a seat other than its own — which `ops seat restate --agent-id` exists to allow.

A nameless live seat is invisible to every name-keyed send, sweep and dispatch route, and nothing reports the state: the verb answers `renamed` and exits 0.
