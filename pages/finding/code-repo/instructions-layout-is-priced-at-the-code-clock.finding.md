---
id: 5960aa7d-386b-58c4-8831-646a80cb7a90
page-type-slug: finding
title: "Instructions layout is priced at the code clock"
domain-slug: repo/code-repo
---

# Claim

Four code-repo sites name the instructions corpus's directory layout literally, so moving those directories requires a code change and two deploys — which is the dependency `code-repo`'s One-Way Dependency rule forbids, running against the corpus's own shape.

# Evidence

Measured 2026-08-05 while nesting five domain kinds under `domains/` (project #17934, 101 documents moved).

The code-repo sites, each holding a directory name as a string constant: `packages/agents/shared/role-corpus.ts` (`ROLE_DIR`), `persona-corpus.ts` (`PERSONA_DIR`), `task-corpus.ts` (`TASK_DIR`), and `packages/shared/cli/src/aw/init/corpus-surface.ts` (`AXIS_DIR`, which emits the bash gate every shell evaluates at startup through `aw init bash`).

The three corpora throw on a dead read by design, each saying so in its own module doc: an empty read is treated as an instrument that returned nothing rather than an estate with no roles. So a layout the code does not expect does not degrade — every seat name is refused and the fleet stops seating anybody. That is what forces the two clocks to be reconciled rather than merely kept roughly in step.

What the reconciliation cost, as landed: five landings rather than one. The instructions repo was widened to accept both layouts, the code repo was deployed tolerant of both, the documents moved, the instructions repo was narrowed, and the code repo was deployed narrowed. Two full code-repo deploys (branch pipeline 27167 at 117/117 then main 27170; branch 27175 at 118/118 then main 27179). A module, `packages/agents/shared/corpus-dir.ts`, was created and deleted within the sequence for no purpose but to hold the tolerant window open between the two clocks.

The instructions repo holds the same rule in more places — `tools/lib/seat-resolve.ts`, `tools/lib/identity-vocabulary.ts`, `tools/lib/compose-seat-name.ts`, `tools/lib/seat-name.ts` and five schema `claims:` globs — but those are on the fast clock and cost nothing here.

Not measured: whether a cheaper mechanism exists, or what one would cost. Nothing was measured about how often this layout changes; this is the only move of it observed.
