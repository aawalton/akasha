---
id: 73dddf63-c25f-57f5-8a81-0343a35553d9
page-type-slug: finding
title: "Repofiles injection forbidden confirmed"
domain-slug: page-type/pipeline
---

# Claim

Whether injecting repoFiles into the merge-queue coordinator's graph build is inputsHash-safe was investigated and answered: injection stays forbidden because the row's premise about an ~80x speedup does not survive contact with the code, so this is closed as correctly-forbidden-in-effect rather than a defect to fix.

# Evidence

Project #16238, domain `pipeline`, tags `ci merge-queue performance incident-followup`, owner `dalla`, status `someday_maybe`.

REMEDY C3 for the #16203 outage class, split from #16225 by dalla's ruling: investigate, do NOT adopt; address the inputsHash prohibition head-on. If real, closes as "correctly forbidden" — a success, not a failure.

OBSERVATION: same three calls (createEngine, registerWatchProducers, engine.build) on two paths differing in one option — main-pipeline-creator (pipeline-configs.ts:283-288, repoFiles injected, p50 0.4-0.5s, n=32) vs merge-queue coordinator (build-workspace-graph.ts:30-34, repoFiles not injected, p50 ~42s). ~80x gap; graph build is ~88% of config load, ~75-85% of the whole dispatch tick (#16225).

WHY ONLY CANDIDATE FIXING FIRST ATTEMPTS: every other remedy is a cache, useless on a cold key — every batch has a new staging tip, so attempt 1 is always a miss. C1 (write-back cache) fixes only attempts 2..N (~42 min of 2540s measured).

PROHIBITION under test: build-workspace-graph.ts:23-24 forbids injection because repoFiles changes graph file nodes feeding the per-workflow inputsHash — a changed hash breaks parity with the pipeline path, a silent correctness failure. Test plan: measure both ways on the same treeSha via the existing parity test at pipeline-configs-inputs-hash-parity.cli.test.ts.

CONFOUNDS to exclude first: repoDir kind (clone vs git-archive/emptyDir), process (warm vs cold), node (node-05 co-tenancy vs MPC's node).

MEASUREMENT HAZARD (from #16225): at-cap runs are SIGKILLed with no stdout; timing must come from the child's stderr at the phase boundary or the slow population is right-censored.

VERDICT, 2026-07-25T18:56:36Z (worker-16225, #16225's define-front): do NOT inject — premise fails on contact with the code. Closed correctly-forbidden-in-effect.

Siblings: #16225, #16224, #16220, #16203. #16269 spun out of this row's define-front (unrelated latent bug, finding on domain `main-pipeline`).
