---
id: 53005642-76dd-56a0-b233-b175a971b504
page-type-slug: finding
title: "Workflow load drops unimportable"
domain-slug: domain/global
---

# Claim

`loadWorkflows` in `@infra/workflow-dsl` drops every workflow file it cannot import, warns on the console, and returns the survivors as though they were the enumeration. A check building a cohort from it states a denominator over what loaded rather than over what exists, so its coverage rounds up to complete in exactly the runs where a workflow file was broken.

# Evidence

`packages/infra/workflow-dsl/src/discovery.ts` lines 128 to 133: the loop's `catch` calls `console.warn` with `Failed to import ${s.relativePath}, skipping:` and falls through, so the member leaves the returned array. `discoverWorkflows` is the two-line wrapper over `scanWorkflows` and this, and it returns `DiscoveredWorkflow[]` with no term for what was attempted.

The scanned set is not lost — `scanWorkflows` returns it and `loadWorkflows` takes it as its argument — so the shortfall is derivable at the seam and is discarded there rather than being unavailable.

Found on 2026-08-07 while converting `check-ci-naming-conventions.cli` and `check-ci-workflow-graph.cli` under project #18127, both of which now declare a cohort of `workflows` built from `discoverWorkflows`. Five further checks call it: `check-checksum-substitution-reachability`, `check-ci-workflow-graph`, `check-run-check-routing`, `check-foundation-synth-watch`, `check-image-tools`.

Not repaired under #18127. The honest fix changes what `loadWorkflows` returns, and `discoverWorkflows` or `loadWorkflows` is named 73 times across roughly 30 non-test source files, including the CI orchestrator, the merge-queue coordinator, the CI worker's sweep reactors, the pages access layer and the graph producers. That is a change to live CI machinery, and #18127 is a 93-file change that has to land whole.
