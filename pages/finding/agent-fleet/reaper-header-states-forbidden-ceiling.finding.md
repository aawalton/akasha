---
id: 9f64cff3-1cd9-5e87-96b5-8d555fbccb4f
slug: reaper-header-states-forbidden-ceiling
page-type-slug: finding
title: "Reaper header states forbidden ceiling"
domain-slug: domain/agent-fleet
---

# Claim

The reaper daemon's header states the per-process kill ceiling as 24 GiB where the constant it imports is 8, which is the one relation that module's own docblock forbids.

# Evidence

Read at `~/code` on 2026-08-07, while verifying a quarantined document's account of the memory floor `ops dev-server start` refuses under.

`packages/agents/supervisor/src/memory-reaper-tick.ts:32` opens its account of the legs: "The three kill layers (per-process > 24 GiB, per-supervisor-tree > 24 GiB, host-global) reuse the pure decisions in `@shared/utils-system/memory-monitor` unchanged."

The per-tree figure is right — `MAX_TREE_RSS_GB = 24` at `memory-monitor/per-tree.ts:3`. The per-process figure is not: `MAX_RSS_GB = 8` at `memory-monitor/per-process.ts:16`.

What makes this more than a stale numeral is that `per-process.ts`'s own docblock forbids exactly the relation the header asserts. It requires the per-process ceiling to "stay strictly below `MAX_TREE_RSS_GB`, or this leg is unreachable by arithmetic — a tree's RSS is the sum over its members, so an equal ceiling guarantees the tree leg crosses first and the only available response to one runaway is killing the agent that hosts it."

So the header describes a configuration in which the layer it is introducing cannot fire, and a reader who trusts it and "fixes" the constant to match would produce that state. The same docblock records how 8 was chosen and why it is not arbitrary: the largest legitimate process is the CI check orchestrator at ~3.3 GiB, the smallest runaway on record is ~9 GiB, and nothing has ever landed between them.

The header says the layers reuse the pure decisions "unchanged", which is true — the wiring is correct and only the prose is wrong. Nothing compares the two.
