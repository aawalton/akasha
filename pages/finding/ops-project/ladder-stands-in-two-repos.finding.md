---
id: 24363777-8163-5fe1-897d-72fd570343d0
slug: ladder-stands-in-two-repos
page-type-slug: finding
title: "Ladder stands in two repos"
domain-slug: domain/global
---

# Claim

The project status ladder now stands twice: `tools/lib/project-ladders.ts` in the instructions repo and `packages/alanwalton/projects/core/src/lib/project-ladders.ts` in the code repo. Both hold the same six tables and nothing keeps them agreeing. `ops project move-to` reads both in one run — the instructions copy for the obligation gate, the code copy for every other gate and for transition legality — so a drift between them makes two gates on one move disagree with no error anywhere.

# Evidence

The instructions copy landed 2026-08-16 in commit c39840e2c, as part of porting the handoff gates out of the code repo. It was needed because nothing here carried rung ORDER: `tools/lib/project-statuses.ts` has holder layers and a terminal flag but no ladder. Putting the tables inside both new gate files would have been two spellings already, so one module was the right local call.

Both files export CHILD_DEPLOY_LADDER, CHILD_COMMIT_LADDER, PARENT_DEPLOY_LADDER, PARENT_COMMIT_LADDER, SINGLETON_DEPLOY_LADDER, SINGLETON_COMMIT_LADDER, `ladderFor` and `rungsSteppedOver`. They agree today; that was checked by replaying the code repo's own unit cases against the ported gates, 121 assertions passing.

Where they are read together, in one invocation of `ops project move-to`:

- `obligationBoundariesTraversedBy`, in `tools/lib/project-obligation-gate.ts`, reads the instructions copy.
- `gatesTraversedBy`, reached through the `handoffGates` shim in `tools/lib/project-move-to-code.ts`, reads the code copy.
- `decideLadderTransition`, `isValidStatus`, `classifyHolderMove` and `ProjectTrack`, reached through the `ladder`, `transitions`, `holder` and `track` shims in the same file, all read the code copy.

So a rung added or moved on one side alone changes which gates a move crosses without changing which boundaries the obligation gate fires at, and neither side raises anything.

This resolves when the rest of what `move-to` shims comes into the instructions repo and the code copy is read by nothing this command reaches. Until then the doubling is real and only agreement by luck keeps it quiet. The narrower alternative — having the obligation gate read the shimmed ladder — was not taken and would keep the count at one.
