---
id: 78b796eb-ed7b-5675-9568-c66fb7fc4095
slug: per-tree-kill-sums-shared-pages
page-type-slug: finding
title: "Per tree kill sums shared pages"
domain-slug: domain/agent-fleet
---

# Claim

The memory reaper's per-tree kill leg selects its victim on summed `VmRSS`, which is the quantity its own sibling leg was retired for double-counting, and the two statements sit in adjacent files.

# Evidence

Read at `~/code` on 2026-08-07 at `383bf60d`, while emptying a quarantined question document that raised it. Recorded here because that document is queued for removal and the defect outlives it.

`memory-monitor/host-global.ts:68` records the retirement and its ground: "The fictitious uid-1000 sum-of-VmRSS aggregate leg was retired in #14389: `VmRSS` double-counts every shared page once per process, so summing it across" processes overstates what is resident.

`per-tree.ts`, in that same directory, does the sum and kills on it. Its `assessTreeKills` docblock at `:139` states the quantity in the words the sibling was condemned for — "A tree's RSS is a SUM OVER ITS MEMBERS" — and the decision at `:179` is `treeRssKb > input.perTreeThresholdKb`. Live rather than theoretical: `MAX_TREE_RSS_GB = 24` at `:3`, wired at `supervisor/src/memory-reaper-tick.ts:319`.

The leg has been corrected twice and neither correction reaches this. `selectTopmostSupervisors` (#15587) drops the overlapping root the `spawn-headless` wrapper and its child both present; `perProcessKillPids` excludes RSS the narrower leg reclaims on the same tick. Both correct double-counts between processes or between legs. Neither addresses shared pages within a tree, which is where the overstatement is largest: an agent tree is many processes off one `bun` binary, every page of it counted once per process. Nothing measures PSS in the file.

What keeps it quiet is that the legs are read apart. `system/memory-pressure.ts:68` sends a reader to `ops system tree-memory` for the tree quantity and hands over the summed figure without the caveat the sibling file carries. The one surface stating both halves together, `packages/agents/supervisor/docs/fleet-memory-reaper.md`, is no longer in the code repo — that whole `docs/` directory is gone, and it stands quarantined in the instructions repo.
