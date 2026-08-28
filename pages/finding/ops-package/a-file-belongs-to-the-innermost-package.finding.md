---
id: b49d231b-7381-5cad-87fc-e2f431cd769f
slug: a-file-belongs-to-the-innermost-package
page-type-slug: finding
title: "Thirty-three packages sit inside another package, and a mover that carries every file beneath a directory flattens them without any check noticing"
domain-slug: domain/ops-package
---

# Claim

A file belongs to the innermost package holding it — the rule `landedOver` already implements for paths. A mover that carries every tracked file under a package's directory drags the inner packages along and leaves their own entries with nothing to move. No check catches it, because every file still lands somewhere.

# Evidence

Measured 2026-08 across `code` and `instructions`. Thirty-three pairs nest.

`packages/temper/game/characters` is a package holding twelve more beneath it; moving the outer one would have dragged all twelve into `temper/game-characters/`, a silent flattening of twenty directories. `packages/infra/k8s` holds three.

`movesForPackage` now takes the inner packages and leaves their files alone, and `relocatedPath` consults the plan before carrying a path along, so a reference from an outer package to an inner one is renamed to where the inner one lands rather than followed into the outer one's new home.

The same verification found a second path fault. The mover refused every path above the source root before it consulted the plan, which made a sibling repository inexpressible. Five code packages already reach into akasha by relative path — the ablation shims, `shared/recurrence` reaching `../../../../../akasha/day/day.ts` — and their `rootDir` is the folder holding both repositories rather than either one. Moving the guard to after the lookup lets a plan say `../akasha` lands at akasha's root while leaving every unnamed path above the root refused exactly as before.

Both were found by resolving each tsconfig path against the source tree now, resolving it again against the set of paths akasha would hold afterwards, and reporting every one that resolved before and would not after. They surfaced as broken destinations rather than as refusals, which is the shape that would otherwise have reached disk. Of the tsconfig paths in all 285 planned entries that name a file git tracks today, 1,049 still name a tracked file after the move and none breaks.
