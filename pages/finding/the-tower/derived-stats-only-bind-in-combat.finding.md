---
id: e309dac2-5113-5367-b2a4-c5c644d134fd
page-type-slug: finding
title: "Derived stats only bind in combat"
domain-slug: domain/global
---

# Claim

The Tower's player-facing HP, Focus and Stamina maxima are authored numbers that nothing derives.
`derive(sheet)` in `@alanwalton/tower-engine` computes `hpMax`, `stamMax` and `focusMax` from the
eight attributes, and exactly one module imports it — the engine's own `resolve-action.ts`. The
pools the player sees live in the session `hud`, validated only as `z.number()`, so a hud can carry
maxima that no longer follow from the attributes beside it, and nothing compares the two.

# Evidence

Measured 2026-08-08 in `~/code` at `main`, on tracked files only.

`derive` is exported from `packages/alanwalton/tower/engine/src/derive.ts`:

    hpMax: Math.round(a.VITALITY * 8 + a.MIGHT * 2),
    stamMax: Math.round(a.VITALITY * 4 + a.FINESSE * 2),
    focusMax: Math.round(a.INTELLECT * 4 + a.WILL * 2),

Its call sites, across `packages/alanwalton/tower/` and `packages/alanwalton/awen/src/` excluding
tests, are `resolve-action.ts:11` (`const ad = derive(inp.attacker)`) and `resolve-action.ts:12`
(`const dd = derive(inp.defender)`). `src/index.ts:4` re-exports it. Nothing else calls it.
`rg -uuu -n "derive\(.*sheet" packages/alanwalton/tower/` exits 1 — a clean nothing rather than an
error; the path exists and I read the exit code.

The pools the player sees are declared at
`packages/alanwalton/tower/core/src/revealed-sheet.ts:27-35`, in `HudSchema`:

    hp: z.number(),
    hpMax: z.number(),
    focus: z.number(),
    focusMax: z.number(),
    stamina: z.number(),
    stamMax: z.number(),

Bare numbers with no relation to `AttributesSchema`. That file's own header says the hud lives in
"the live `tower-session` state (`state.json` `hud` + `sheet`)".

The only consumer of those fields on the CLI path is display:
`packages/alanwalton/tower/src/tower/state.ts:61` interpolates
`HP ${hud.hp}/${hud.hpMax}  Focus ${hud.focus}/${hud.focusMax}  Stamina ${hud.stamina}/${hud.stamMax}`
into the rendered state. It reads them; it does not compute them.

So the derived-stat formulas are the authority only inside combat resolution. Outside it the same
three quantities are hand-maintained state, and the divergence would be invisible: both halves
validate, both render, and no check named by `ops enforcement list` compares a hud to a sheet.

This surfaced while emptying `dirty/code/packages-alanwalton-tower-engine-claude.md`, whose
`## The math` heading carried the instruction "never hand-write derived stats". That document is
queued for removal, so the observation would go with it.
