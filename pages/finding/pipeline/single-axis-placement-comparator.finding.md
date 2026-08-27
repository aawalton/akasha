---
id: 8a325bbe-0fbe-55c9-89e9-347b74c1f2cb
slug: single-axis-placement-comparator
page-type-slug: finding
title: "Single axis placement comparator"
domain-slug: page-type/pipeline
---

# Claim

The pipeline placement comparator in `select-next-placement.ts:281` ranks candidate nodes on remaining CPU alone (memory breaks ties only, which never occur on exact millicores), so it is single-axis rather than merely CPU-biased, and it systematically prefers memory-starved nodes because a memory-exhausted node has idle CPU by construction.

# Evidence

Project #16217, domain `pipeline`, `someday_maybe`, captured but never defined (no objective; text moved from retired `notes` on 2026-08-15).

Observed live (2026-07-25 ~15:2xZ), ci-pod-dispatcher: pipelineSeq=25894 (branch project-16164) bound to node-04 (rem 1047Mi/8730m) though node-05 had 12142Mi (12x more) and node-06 had 39927Mi. Pipeline's heaviest step needed 4096Mi.

Mechanism, `select-next-placement.ts:281`: `if (best === undefined || r.cpu > bestCpu || (r.cpu === bestCpu && r.mem > bestMem))`. Memory only breaks exact-millicore ties, which never occur, so the comparator is effectively "max remaining CPU." A memory-exhausted node has idle CPU by construction (its steps can't schedule), so this comparator preferentially selects the most memory-starved node — anti-correlated with the scarce axis, not merely blind to it.

Blast radius, measured over 95 min: 3,014 defers vs 1 bind; 2,763 of those defers were on node-04, while node-06 sat with ~40Gi free.

Complementary to athena/aranya's claimant-aware reserved-node release (adds node-06 to candidates; this fixes which candidate is chosen).

2026-07-25T15:57Z self-correction (dalla): original reasoning ("CI is memory-bound") is false generally — node-05 later measured CPU-saturated (99%) with memory idle (32%), opposite of the node-04 bind. What survives, stronger: the defect is single-axis ranking, not wrong-axis — the comparator can't express "CPU headroom, no memory" or its converse. Remedy: not memory-first (fails symmetrically), but a normalized headroom score, min(remaining_cpu/capacity_cpu, remaining_mem/capacity_mem); fit distribution needs measuring first. Confirms #16203's CPU-bound contention (node-05 99% CPU, 6 running CI pods).

2026-07-25T16:32Z further note (capture cut off): "boundMaxFree IS CLOSED — EXACT TO THE MEGABYTE. IT IS 'allocatable MINUS STANDING RESIDENTS', AND THE SET IS 'NEVER DRAINS', NOT 'NON-CI'."
