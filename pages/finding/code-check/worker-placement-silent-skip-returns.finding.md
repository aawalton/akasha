---
id: 5d4d0f48-2926-56ff-b5a0-835bd7fb520c
slug: worker-placement-silent-skip-returns
page-type-slug: finding
title: "Worker placement silent skip returns"
domain-slug: domain/global
---

# Claim

`check-worker-shape`'s `[worker-placement]` rule was a completeness guard on `[payload-driven-handler]`'s population rather than a rule about where workers live, so removing the two together was sound. What did not leave with it is the silent skip it existed to abolish: `check-worker-shape.ts:117` still drops an unplaceable worker without a finding, and what it drops feeds the population the check reports over. This costs nothing today and would cost silently the day a sibling-scoped rule is added.

# Evidence

Read from refs, not the worktree, which was being rebuilt at the time: `origin/main` for the intact source and `f29bfbb42d` for what remains. The tree has moved since.

The rule's own comment gives its subject: "a worker that owes the handler walk and whose package the path convention cannot name is REPORTED. It used to `continue`, which dropped the whole package out of the walk silently — no finding, no count, no line."

Four things make it dependent. `candidatePackageRoots` and `workerInputs`, the two things it protects, are read only in the handler-scan block at `check-worker-shape-detect.ts:300-329`. Its counter `placementOffered` increments only after `if (!subjectToComposition) continue` and feeds only its own reading, which is why CI reported it over 19 of 19 while `[composition]` reported 29 of 29. The four surviving rules reach a worker through `isWorker` — a filename test — which never consults placement. And what its absence loses is package *siblings*, which only `[payload-driven-handler]` examined, over 338 files.

The residue, at `check-worker-shape.ts:117` after the removal:

    const root = packageRootOfWorker(rel)
    if (root !== null) workerPackageRoots.add(root)

`workerPackageRoots` builds `inScope`, which becomes the population the check reports over.

Measured at `f29bfbb42d`: 29 worker files, 28 placeable. The one that is not is `packages/alanwalton/web/workers/idle-tick.worker.ts`, which has no `/src/` segment. It is still judged by all four surviving rules, because `isWorker` does not consult placement. What it silently drops is the non-worker files under `packages/alanwalton/web/`, and no remaining rule reads those.

So no violation escapes today. What is gone is the thing that would notice if that changed: add a rule judging package-sibling files and the population shrinks by one package with no finding, no count and no line.

Not measured: whether any check outside `check-worker-shape` derives a package root the same way.
