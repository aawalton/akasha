---
id: f3243811-1fc0-5a4c-8eb9-1149d216ec07
slug: fleet-cwd-ignores-the-instructions-root-override
page-type-slug: finding
title: "Fleet cwd ignores the instructions root override"
domain-slug: domain/agent-harness
---

# Claim

The instructions-root override is documented as the testing seam and is read by thirteen of the fourteen sites that resolve that root; the fourteenth decides the fleet's working directory and consults nothing, so no test can move the tree and the seats standing in it together.

# Evidence

Measured 2026-08-04 across `/home/walton/code`.

Thirteen sites resolve the instructions root and each reads `INSTRUCTIONS_ROOT` first: `lib/instructions-repo.ts:60`, `supervisor-spawn-settings.ts:65`, `shared/task-corpus.ts:65`, `shared/domain-corpus.ts:69`, `shared/persona-corpus.ts:56`, `shared/role-corpus.ts:54`, `checks/src/lib/estate-trees.ts:86`, `check-doctrine-path-citations.ts:116`, `check-emitted-path-citations.ts:227`, `deletion-residue.ts:147`, `check-no-prose-flag-teaching.ts:301`, and the two shell hooks `block-instructions-direct-write.sh:79` and `block-instructions-direct-commit.sh:59`, which both spell it `realpath -m "${INSTRUCTIONS_ROOT:-$HOME/instructions}"`.

`packages/agents/supervisor/src/supervisor-interactive.ts:76` is the fourteenth and does not: `const cwd = ${HOME_DIR}/instructions`, with no override consulted. Its own comment states the line is fleet-wide, because headless seats inherit it through `process.cwd()`.

THE SCOPE IS TESTS AND NOT PRODUCTION, which is what an earlier reading of this got wrong. Every site that SETS the variable is a test, with one exception: `tool-door.ts:45` returns `{ ...process.env, INSTRUCTIONS_ROOT: root }`, forcing into a spawned child the root it has already resolved itself. Nothing configures the override on a live path, so the divergence cannot occur outside a test that sets it deliberately.

What remains true is the smaller defect. `block-instructions-direct-write.sh:72` states the variable's purpose — "INSTRUCTIONS_ROOT and MEMORY_ROOT override their protected roots, for testing" — and a seam that relocates thirteen of fourteen consumers cannot isolate the fourteenth. A test exercising anything that depends on both the corpus location and the working directory has no way to move them together.

Found while censusing crossings for the agent-harness seam, and corrected the same day after measuring who sets the variable rather than who reads it.
