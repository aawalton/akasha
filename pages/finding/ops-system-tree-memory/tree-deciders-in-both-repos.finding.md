---
id: 937d994e-2407-594d-9665-8e1ba13bb27c
page-type-slug: finding
title: "Tree deciders in both repos"
domain-slug: domain/global
---

# Claim

The per-tree memory deciders stand in both repositories, and `ops system tree-memory` reads the code repository's copy while its own help claims it reads the one the reaper executes. Nothing compares the two, so if the daemon now runs from the instructions copy the verb's central claim is already false and reads exactly as it did when it was true.

# Evidence

Measured 2026-08-13, running `move-command-bodies` over the `system` namespace.

Five of the six capabilities `ops system tree-memory` reaches for stand in both repositories:

    MAX_TREE_RSS_GB             memory-reaper-legs.ts:76   per-tree.ts:3
    assessTreeKills             memory-reaper-legs.ts:189  per-tree.ts:164
    resolvePositiveEnvOverride  memory-reaper-read.ts:49   shared.ts:52
    readSupervisorPids          memory-reaper-read.ts:63   shared.ts:75
    readUserPidSnapshots        memory-reaper-read.ts:86   shared.ts:99

Left column `tools/lib/`, right `packages/shared/utils/system/src/memory-monitor/`. `selectSelfTreeRoot` stands in the code repo only, which makes the instructions set incomplete for this verb and is why the moved body reaches `@shared/utils-system/memory-monitor` for all six rather than mixing the two.

The help says the tree sum and the `BREACH` verdict "come from `assessTreeKills` itself — the same pure decider the reaper executes", because "a reading that computed its own answer could disagree with the killer about the same tree". `tools/lib/memory-reaper-tick.ts`, `memory-reaper-plan.ts` and `memory-reaper-kill.ts` all stand here, which suggests the tick that kills now runs from this copy. Which copy the live daemon loads was not established.

If it does, the verb and the killer are two implementations of one decider, and the disagreement the help rules out is what is now possible. Both ceilings read `24`, so today they agree and the first drift will be silent.

`tools/lib/host-memory-pressure.ts` is the precedent and states the rule the other way: a reading moved here, the gate left over there, because "a body here with no reader is a second definition waiting to drift from the one being used". The per-tree set has readers on both sides.

The move preserved the pre-move reach rather than re-pointing it, so this is unchanged by the move and was found by it.

Not measured: whether the two `assessTreeKills` bodies are identical line for line.
