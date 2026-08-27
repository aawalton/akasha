---
id: 58d372ba-7755-57ff-9445-c6aa25ef163a
slug: memory-qos-blind-to-code-pods
page-type-slug: finding
title: "Memory qos blind to code pods"
domain-slug: domain/global
---

# Claim

`check-memory-qos` judges only generated k8s YAML manifests, never the step pods `pod-spec.ts` posts at runtime: an identical memory request/limit mismatch reads as 9-of-9 passing probes against a worktree's YAML but exit 1 (2 of 2, named) against the same pair declared in code at `pod-spec.ts:153-156` — and no other registered check judges step-pod QoS, resource sizing or capacity at all.

# Evidence

Project #18695, domain code-check, initiative code-check, parent #18682, status someday_maybe. No objective was met, and the parent accepts that as the right outcome: all three sit behind a capacity trade that was Alan's to make. `72cb3d0ef9` (comment only) is the only commit riding the tree. Objective order: two, then three, then one — widening lands last, to stop the sizing drifting back.

THE GAP (re-run not read): `pod-spec.ts:153-156` declares requests.memory 512Mi against limits.memory 1Gi. `check-memory-qos` over the worktree: exit 0, "every container declares a memory request equal to its memory limit," over 9 of 9 probes — because generated manifests are gitignored and absent from a worktree. Same check with --repo-root at the seat's plant, where that pair stands in YAML: exit 1, naming the container and line, over 2 of 2. `ops enforcement list --grep qos/memory/pod/resource/sizing/capacity/step-config` finds nothing else judging it (--grep matches mechanism name and file, not description).

THE MEASUREMENT, DONE, NOT TO BE REDONE (#18538, not re-queried here, evidence not confirmed): 51,636 pods, 255 step names, 39.3-day window vs 90d retention. THE FORK, one of each 255 steps: as declared today 179.46 GiB; request=current limit 354.00 GiB (1.97x); request=limit=1.35x measured peak 161.94 GiB (0.90x). CI allocatable over 4 ci-class nodes: 122.79 GiB.

ALAN RULED 2026-08-11: the third option, request=limit=1.35x measured peak (161.94 GiB), on Dalla's recommendation, told the risk that a peak under a 4Gi ceiling doesn't prove 1.35x suffices for a step never made to fit.

REACH DESIGN: no new dependency — `check-step-config-field-consumption.ts:46-48` already globs the orchestrator source; would find 19 `resources: {}` sites with a memory leaf (2 already equal) plus the two `pod-spec.ts` blocks. Landed commit's docblock cites "#18538 objectives three and four," a closed row with only four ticked objectives and no third/fourth — a dead reference.
