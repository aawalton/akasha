---
id: 5f08b44d-5e21-5ee5-8b9d-251d6d8c87dc
page-type-slug: finding
title: "A cross-repo reach is invisible to an importer sweep"
domain-slug: domain/agent-harness
---

# Claim

Three readings are needed to tell a dead module from a live one across the two repositories, and no one of them is sufficient. Each reads like thorough grounding from inside. Only one of the three still refuses anything, and it is blind to the case that costs most.

# Evidence

Project #19350 on 2026-08-17 was defined to delete eleven files from `packages/agents/cli/src/agent/`. Two were dead. The wrong answer was reached twice, by two agents, through two different blind spots.

I swept the code repository for importers of the eight source files and found only tests. True, and the wrong question: four are loaded by path from the instructions repository through `codeModule(...)` — `spawn-guard`, `skill-token-guard`, `relaunch-name` and `restart-recovery`, named at `spawn-seat.ts`, `recover-seat.ts`, `agent/reset.ts` and `agent/restart.ts` under `tools/`. `ops seat start`, `reset` and `restart` all walk that path. A path string is not an import, so no import graph in the code repository can see it.

Corrected, I narrowed the subset and erred again a level down. I cleared `decide-revive-placement.ts` because the instructions repository imports its own local module of that name, which is the test that correctly cleared `decide-spawn-name` on the sibling project. That answers whether the instructions repository holds its own copy of the decision, never whether the code repository still reaches the seam. `restart-recovery.ts:7` imports it, and `restart-recovery.ts` is live by the paragraph above.

The reach reading caught the first case and could not catch the second: its entry set is what the instructions repository names, and nothing names that path. Only the typecheck saw it.

That reach reading no longer refuses. #19390 retired `check-ast-unused` at `8392949e28`, on the grounds that its entry set came from a repository the change under test did not touch, so an instructions commit turned unrelated branches red. It stands as `ops audit ast-unused` and a finding exits 0.

So an importer sweep misses the runtime load. The reach reading sees it and reports rather than refusing. The typecheck refuses, catches the transitive case, and is blind to the runtime one for the same reason the sweep is.
