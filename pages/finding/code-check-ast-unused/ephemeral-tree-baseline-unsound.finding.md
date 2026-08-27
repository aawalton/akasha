---
id: b5de1fa7-cc36-56b0-9336-0b70a3ba2930
page-type-slug: finding
title: "Ephemeral tree baseline unsound"
domain-slug: domain/global
---

# Claim

`ops worktree ephemeral` produces a tree in which `check-ast-unused` reports 1947 violations that the source checkout of the same commit reports none of, so a baseline taken there is wrong in the direction that hides real work.

# Evidence

Read on 2026-08-16, both readings against `origin/main` at `3e5f18d67362cd22737ffaeee52b3f52dd44a967`, with the same instructions tree at `/var/home/walton/instructions` and the same denominator, `1348 of 1348 analysis inputs`.

In the ephemeral tree: `1947 violation(s) found`. Run twice, once plain and once after `bun ops k8s synth --write` inside the tree, in case the missing generated manifests were the cause. Both runs reported 1947, so the synth is not what parts them.

In `/var/home/walton/code`, on `main`, clean, at that same commit: `OK — 13336 module(s) analyzed across 374 workspace(s), 12281 entry file(s), zero unused exports`.

The names it reports are React components — `EquipmentIcon`, `ShoppingPageContent`, `InventoryPageContent`, `SkillMorphsProgressPanelCard` — which reads as a whole class of entry that the ephemeral tree does not resolve. What that class is was not established.

The help text for the command states "Canonical use is a pre-existing-failure baseline: run a check against `origin/main` and see what it says there, without touching your own worktree." For this check that use does not hold, and it fails silently: 1947 named violations with file and line read exactly like a finding about main.

The direction matters. A seat taking this baseline before its own work concludes main is already carrying 1947 unused exports, and then reads its own six, or sixty, as noise inside that. The command that exists to separate a pre-existing failure from a new one is the tool that merges them.

Nothing here says the ephemeral tree is wrong for other checks. `check-code-comments` was not compared across the two.
