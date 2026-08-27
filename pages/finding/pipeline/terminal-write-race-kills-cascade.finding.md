---
id: 298f5dcf-205e-55ee-9120-9040289e51c4
slug: terminal-write-race-kills-cascade
page-type-slug: finding
title: "Terminal write race kills cascade"
domain-slug: page-type/pipeline
---

# Claim

A pipeline's terminal write and its non-terminal children's terminal write happen in two separate processes at two separate times, and the process that kills the second writer treats the first writer's completion as its own kill trigger, so the cascade worker can be destroyed by the exact condition that generates its task.

# Evidence

Elimination-first fix for the cancel/supersede cascade defect. Alan chose option A on 2026-07-25: take the two small fixes now (landed as #16242) and file this separately.

Mechanism: reconcile.ts:97-100 builds desiredSeqs from loadAllNonTerminalPipelinesPg; :146-151 kills every mapped seq not in that set — "the pipeline row is terminal" means both "cascade work exists" and "this worker is unwanted."

Observed once for real: pipeline 25909 was canceled at 16:45:55.561Z, its worker was SIGTERMed ~1.30s in, the transaction rolled back with zero writes, and a CI pod launched 51.7s later.

Proposal: when a pipeline or workflow row's status is patched to a terminal value, cascade to its non-terminal descendants in the same transaction, at the plpgsql write boundary, so the deferred killable second write ceases to exist. Author the cascade in @shared/pages-proc, lowered into the public.pages write boundary; declare "no non-terminal child under a terminal parent" as a coherenceRules entry on workflow and step; delete the worker's dead cascade arms at decide-workflow.ts:94-113 and decide-step.ts:140-145; the invariant must satisfy `bun ops spec check` (@infra/ci-orchestrator is a FizzBee Mandatory Coverage Domain).

Covers the canceled and superseded paths (6 of 7 known orphan parents are superseded, via trigger_pipeline's CAS) and any future terminalizer. Cost is relocated not added: the transaction does what the worker's cycle already does (0.5-2.6s measured, 98-step tree).

Also needed: a repair for existing residue — 7 terminal pipelines holding 53 orphaned workflows and 374 orphaned steps, oldest 2026-06-26 (check whether #16242 already healed it).

Verification must be directly runnable per Alan's #16272 ruling: construct a terminal parent write with non-terminal children, assert the boundary refuses/cascades atomically; not watching production for absent orphans.

Provenance: RCA of the 2026-07-25 halt containment breach; root cause and code verified at source by aine. Was #16281.
