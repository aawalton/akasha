---
id: 0f27a1d9-837a-5d98-ab80-5c81cb3b2fa8
slug: reaper-victim-by-size-only
page-type-slug: finding
title: "Reaper victim by size only"
domain-slug: domain/agent-fleet
---

# Claim

The memory reaper picks its host-global victim by resident size alone, and size runs opposite to how cheaply a seat can be rebuilt — so relief lands first on the seats that cost most to lose. `assessGlobalKill` ranks supervisor trees by `treeRssKb` and takes the largest; nothing there reads the seat's role, its age, or what it could be revived from. A seat's tree is large because it holds coordination context.

# Evidence

Read against `~/code` at `d01942409a` on 2026-08-07.

`packages/shared/utils/system/src/memory-monitor/host-global.ts` is 155 lines. Its docblock at lines 77–78 states the selection outright: "1. If any supervisor tree is non-empty, the largest one (by treeRssKb). 2. Otherwise the single largest pid by VmRSS." The implementation matches — lines 115–117 walk the trees keeping whichever has the greater `treeRssKb`, lines 119–128 return that root with the reason string "killing largest supervisor tree root=… (tree VmRSS … GB)", and lines 133–152 are the single-pid fallback on the same comparison over `vmRssKb`.

I searched that file for any other axis and found none: no seat name, no role, no process age, no revive source and no cost term enters the comparison. The one qualification its docblock makes, at lines 80–83, is about returning a target rather than blindly killing the largest pid so a long-lived dev-server is not taken — a different concern from which agent tree to prefer.

The two recovery shapes point opposite ways and neither is consulted. A resident seat revives from a transcript on local disk. A headless worker has no local transcript but can be re-dispatched from branch state. Which is worth protecting has not been decided, so what ships is size alone.

This is a gap in what the decider weighs rather than a fault in what it computes — every kill it makes is the kill it says it will make. No gate reports it, and a green run is what keeps it invisible: the cost shows only in which seat is gone afterwards.

The observation was recorded in `dirty/knowledge/fleet-memory-reaper.md`, which is under quarantine and queued for removal, so it would have gone with the sweep. I cut that section while ingesting the source and filed this in its place.
