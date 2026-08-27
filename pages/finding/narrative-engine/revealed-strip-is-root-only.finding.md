---
id: af5dea17-9b62-59a7-8c0c-74b7f1d21933
page-type-slug: finding
title: "Revealed strip is root only"
domain-slug: domain/narrative-engine
---

# Claim

The fog-of-war revealed sheet strips only TOP-LEVEL keys, so whatever a coordinator
puts INSIDE a sheet entry reaches the player surface untouched. `RevealedSheetSchema`
is a strict allowlist at the root, but five of its container fields are
`z.array(z.unknown())`, and `z.unknown()` inspects nothing. Its docblock states the
guarantee unbounded, and all 24 tests over the mechanism measure the root, so the
suite is green across the gap.

# Evidence

Measured 2026-08-08 in `~/code`, tracked files only.

`packages/alanwalton/awen/core/src/revealed.ts` — I read the schema declaration, not
the comment above it. `RevealedSheetSchema` is a `z.object({...})` at `:13`, so Zod's
default `.strip()` applies at the root. Five fields are `z.array(z.unknown())`:
`skills` `:19`, `affinities` `:20`, `bonds` `:21`, `inventory` `:23`, `titles` `:24`.
Two more are `z.record(z.string(), z.unknown())` — `attributes` `:18`, `equipment`
`:22`. `z.unknown()` removes nothing, so every key of an entry survives the parse.
`narrowRevealed` `:64` does not close it: it selects whole values by top-level key
and re-parses through the same schema, so a kept container is kept entire.

The docblock overstates: `:8-12` says stripping "guarantees the runtime VALUE — not
just the TS type — carries only player-facing keys", with nothing bounding that to the
root, and `:1-4` calls the file "the FOG-OF-WAR boundary".

`reveal-spec.unit.test.ts` holds 24 `test(` cases. The one measuring the strip is
`:61`, "an unknown top-level key is rejected (strict spine)". The rest cover the
universe key set, spec parsing, resolution precedence, the subtractive narrow and the
write-boundary patch gate. None asserts anything about the CONTENTS of an entry.

What makes this reachable: the canonical `EntitySheet` is `.passthrough()` with
entries as `z.unknown()` (`entity-schema.ts`), which lets a coordinator carry
per-entry provenance and epistemic status — `{ v, src, epi, by }` — with no engine
change. `epi` and `by` are GM-side by intent; `by` names who asserts a claim.

NOT measured: whether any live game writes such entries today. Sheet entries are stored
rows rather than source, so a repo search cannot settle it and I did not read the rows.

Searched: `~/code` tracked files via `git ls-files`, `~/memory/findings/` under `rg
-uuu`. Hits under `awen/core/dist/` and `web/build/` were excluded — `git ls-files`
returns 0 for both, so they are untracked build residue.
