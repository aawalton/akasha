---
id: d2795539-c79d-582c-8aa4-bf0be7961ecd
page-type-slug: finding
title: "Seat name composition is ipc bound"
domain-slug: domain/agent-fleet
---

# Claim

Composing a seat name from the code repo costs one subprocess per name, so a test that composes over the whole corpus runs against the per-test timeout rather than inside it.

# Evidence

Observed on 2026-08-05 while verifying #17927. `packages/agents/shared/project-binding.unit.test.ts` — "every dispatch seat the corpus can state composes a name that binds to its seq (live corpus)" — fails on a loaded workstation, three runs out of three, timing out at the 5000ms default. Given `--timeout 120000` the whole 36-case file passes in 9.1s. Branch CI passed the same file twice, at `b058acc4` and `2fafb68a`.

So it is not flaky in the usual sense: it is deterministic at each end. What separates the two ends is machine load, which means the green is a margin rather than a property, and the margin is thinnest exactly when the fleet is busiest.

The cost is structural rather than incidental. `packages/agents/shared/compose-seat-name.ts` composes nothing: it spawns this process's own interpreter to reach `tools/seat.ts --name` in the instructions repository, which is the whole point of the arrangement — the composer sits beside the store the attributes live in, so a persona gaining a default cannot move one answer and not the other. Every composition from the code repo is therefore IPC-bound, and a case that iterates the corpus pays it per case.

The arrangement is right and this is its price surfacing in the one place that pays it in bulk. What is unresolved is which way to settle it: declare a timeout that admits what a subprocess-per-case test costs, compose once and assert over the set, or narrow the population the case walks.

Left standing by #17924, which passed #17927 on its three objectives and did not treat this as a fourth.
