---
id: 80762ead-bb0c-5dfd-add9-351b7e493306
slug: wedge-class-counts-stale
page-type-slug: finding
title: "Wedge class counts stale"
domain-slug: domain/agent-fleet
---

# Claim

Three docstrings under `packages/agents/devops-monitor/src/` state how many wedge classes and classifiers the worker runs, and all three are wrong against the one declaration they derive from. `WEDGE_CLASS_VALUES` holds thirteen classes and thirteen classifiers are imported and called; the worker's own header says twelve patterns and eleven pure classifiers, and `snapshot.ts` says six. Nothing derives any of the three, so each undercount reads as a complete enumeration.

# Evidence

Read in `~/code` on `main` at `383bf60d35c15cd5d10cd07f39ac33ffb38e2bfa`.

`src/wedges/index.ts:15-29` declares `WEDGE_CLASS_VALUES` with thirteen members: `queue-pause`, `subscriber-lag`, `handler-wedge`, `stale-supervisor-sha`, `supervisor-crashloop`, `supersede-cycle`, `dispatcher-liveness`, `main-pipeline-overrun`, `dispatch-stall`, `child-crashloop`, `landed-no-main-pipeline`, `served-artifact-divergence`, `deploy-staleness`. `WedgeClass` derives from it at `:31`, and that file's header says in terms that this array is the single source every consumer enumerating the classes reads.

`src/devops-monitor.worker.ts` imports thirteen `classify*` functions at `:49-61` and calls all thirteen per tick — `classifyServedArtifactDivergence` at `:199` (effectful), `classifyLandedNoMainPipeline` at `:208`, `classifyDeployStaleness` at `:215`, ten more in the array at `:219-228`. So thirteen classes, thirteen classifiers, one effectful and twelve pure.

Against that:

- `devops-monitor.worker.ts:4` — "continuously detects twelve CI wedge patterns". Thirteen.
- `devops-monitor.worker.ts:21` — "run eleven pure classifiers over the snapshot plus one EFFECTFUL served-artifact classifier". Twelve are pure, and eleven-plus-one totals twelve where thirteen run.
- `snapshot.ts:4` — "Reads every input the six wedge classifiers need", the sentence then enumerating slices as though six were the whole set.

No check reads a count out of a comment, so all three passed every gate while drifting — the failure the array's own header describes, a layer out, where the compiler cannot reach it.

The line carrying the first count also routes the reader to "this package's CLAUDE.md" for the catalogue. `7205e28efd` removed every head document under `packages/agents/` into quarantine, so the pointer that would let a reader check the count resolves nowhere.

Found ingesting `dirty/questions/code-repo-head-documents-agents.md`, which named these counts as the origin of errors in the quarantined head document. That document is gone; these outlive it.
