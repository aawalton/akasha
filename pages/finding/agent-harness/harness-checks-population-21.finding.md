---
id: 6c89e35e-e8e9-59f4-9fcc-a8a747cdcd7b
page-type-slug: finding
title: "Harness checks population 21"
domain-slug: domain/agent-harness
---

# Claim

Agent-harness's harness-in-instructions initiative has 21 CI checks in scope for moving their harness rule out of the code repository, not the nine first assumed, and 18 of the 21 already separate that rule into a `../lib/` module — the other 3 need only a file move, not a refactor, to match.

# Evidence

Project #18537 (status `awaiting_lead_definition`, `live-on: deploy`, domain `agent-harness`, initiative `harness-in-instructions`). Never formally defined ("NOT YET DEFINED"); this is grounding only, readings taken 2026-08-10.

Purpose: the initiative's second objective — CI-enforced agent-harness rules (seats, agents, personas, wake behaviour, the instructions corpus) are agent-harness content; changing one should cost a commit, not a project/worktree/CI/deploy.

Population is 21, not the nine the initiative carried: a reading over all 231 files under `packages/infra/checks/src/checks/` found 20, plus a 21st the reading missed, `check-tmpfs-scratch` (enforces `Scratch Location` off `domains/agent-harness.md`).

18 of 21 already hold their deciding rule in `../lib/`; the rule is tangled into the file walk for none of the 21. The other 3 declare the rule as a pure function in the script file: `analyzeBoundedTick` (`check-supervisor-daemon-bounded-tick.ts:138`), `analyzeClaudeUnitPath` (`check-supervisor-daemon-claude-path.ts:65`), `crossesBoundary` (`check-instructions-citations.ts:166`) — verified by hand, alongside `reconcileTmpfsScratch` (`lib/tmpfs-scratch-coverage.ts:154`). Age doesn't predict the odd ones out: 2 of the 3 are the oldest (both 2026-06-30), the 3rd is the newest (2026-08-07).

First pick: `check-tmpfs-scratch`, chosen on dalla's reading over the filer's instinct (liveness family first) — dalla holds `code-check` with #18484's children moving beneath it (#18404 at hand-back, #18502/#18525/#18529 defined, awaiting seats). Second pick, deferred: the multi-reader vocabulary, once those three land.

Also found by #18836, recorded here rather than picked: `@agents/instruction-document` (14 importers), `doctrine-path-citations` (4), `source-position-citations` (1) — measured 2026-08-12 at `846efe4cde`.

Blocked on nothing at the first pick: #18404/#18405 sit at `awaiting_manager_verification`, but `check-tmpfs-scratch` is outside what either touches.
