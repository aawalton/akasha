---
id: b778c279-d417-57df-81b4-4b71679c6b70
page-type-slug: finding
title: "Liveness rule move waits 18892"
domain-slug: domain/agent-harness
---

# Claim

Project #18897, split off #18836's criterion two on 2026-08-12 to move the liveness rule's seven code importers onto the instructions-repo command, is blocked on #18892 landing because its synchronous callers may not need the async conversion recorded as their blocker once #18892 ports the supervisor and reaching the instructions repo no longer needs a subprocess, so the caller set should be re-measured after #18892 lands rather than inherited from today's count.

# Evidence

Project #18897, domain agent-harness, initiative harness-in-instructions, status awaiting_worker_seat, live-on deploy, depends-on #18892.

Three objectives stood open: (1) no module outside the agent packages imports the liveness rule from code — the seven importers of `agent-liveness` (3), `agent-liveness-observation` (2), `dead-agent-oracle` (2) call the command instead; (2) the rule answers the same verdicts, by digest over fixed evidence through both deciders; (3) the dominant invariant survives: `dead` never returns about a live agent, and a wrapper-derived `dead` beside a live process still scopes to `supervision-layer`.

WHAT THIS ROW IS: #18836's criterion two minus its liveness cluster, split off 2026-08-12 since its blocker isn't #18836's to clear; all three importer sets sit on `agent-liveness-decide.ts`. `tools/agent-liveness.ts` stands live in the instructions repo, reading no `/proc`, spawn-state file or database — `Replace Before Removing` is met; only the re-point is left.

WHY IT WAITS ON #18892: `agent-liveness-decide` is called synchronously from `agent-io-wedge.ts`, `agent-wedge-roster.ts`, `dead-agent-oracle.ts`, and the supervisor's reconcile/tick paths. An awaited rule forces a synchronous caller async, changing its own callers — but the await exists only because reaching the instructions repo today needs a subprocess; once a caller moves there a plain import serves, so the async work may be unnecessary. #18892 ports the supervisor, where reconcile/tick live. Re-measure the caller set after #18892 lands rather than inherit today's; likely left: three in `packages/agents/shared`.

WHAT NOT TO WEAKEN: `agent-liveness-decide.ts`'s header carries the invariant that a `dead` verdict must be right, and the repair kept viable: wrapper and process die separately; a wrapper-derived `dead` beside a live process scopes to `supervision-layer`, not deleted (deletion once stranded the orphan and stopped the reaper). Read the header before moving anything.
