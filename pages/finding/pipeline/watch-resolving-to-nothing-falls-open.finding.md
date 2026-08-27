---
id: e676ac67-fee1-539c-ae2c-a96ed4c5b3ee
slug: watch-resolving-to-nothing-falls-open
page-type-slug: finding
title: "Watch resolving to nothing falls open"
domain-slug: page-type/pipeline
---

# Claim

`domains/pipeline.md:23` states that a workflow whose watched files resolve to nothing fails rather than falling back to the commit. The code does the opposite: it falls open, so such a workflow receives every changed file. Beside it sits an asymmetry — a dangling `watchNodes` id yields no files, while a `watchNodeTypes` population expanding to nothing yields all of them.

# Evidence

Read from `/home/walton/code` on 2026-08-16, out of work on the `main-pipeline-creator` wedge rather than a review of this line.

In `packages/infra/ci/worker/src/pure/`, the seed path returns permissive when `seedIds.size === 0`, which is the fall-open. The domain line says the opposite in plain words, so one of the two is wrong and nothing adjudicates them.

A new test added on branch `project-19261` pins the CODE's behaviour, which means a test now encodes the case the domain says is a failure. That test was written to hold the closure-hoist repair still and not to rule on this, but it will read to a later editor as settled intent.

Two facts that bear on which way it should go. `workflowWatchMatchesFile` carried no test at all before that branch. And `selection.property.test.ts` never exercises the closure, because `toPipelineConfig` in `arbitraries.ts:173` returns no `graph`, so those property tests run the permissive `graph === undefined` path throughout — the fall-open is therefore the only behaviour the suite has ever covered.

NOT ESTABLISHED, and left to whoever owns the pipeline: which of the two is right. Falling open is safe in the sense that it over-selects, and a gate that over-selects wastes compute rather than passing bad code, so the code's behaviour may be the considered one and the domain line the stale one. This is filed as an observation. Changing either is a semantics change to a selection gate.
