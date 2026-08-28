---
page-type-slug: finding
title: "A project with an unknown key is skipped in silence"
domain-slug: domain/checks-system
---

# Claim

A project whose `tsconfig.json` carries a key the check does not know is skipped whole, and nothing in the output says a project was passed over.

55 of 261 projects are skipped this way, covering 2,372 tracked TypeScript files — about a fifth of the repository. The skip may well be right. The silence is not.

# Evidence

Measured against `main` on 2026-08-28.

`foreignKeyIn` returns the first key of a `tsconfig.json` outside a fixed set of ten TypeScript keys, and the check body then reads `if (owner !== null && owner.foreign !== null) continue`. The project is passed over: no roots, no program, no diagnostic, and no note.

55 of the 261 projects claiming files carry such a key. In every case here it is `tstl`, the TypeScriptToLua setting. 2,372 of 11,247 tracked `.ts`/`.tsx` files fall under them — 2,244 under `temper/`, 128 under `lua-compiler/`.

Skipping them may be correct. A project compiled to Lua by another compiler is not obviously answerable to this one, and judging it under settings it never ships under would report faults nobody can act on. That is a decision worth making deliberately.

What cannot be right is that the audit's total silently excludes them. A reader is given one number over "the tree" and no way to learn that a fifth of it was never looked at. The same output means "clean" and "not judged".

This is a fifth way to a green typecheck over something unexamined, beside: a file its project excludes reaching `rootsFor` as no roots at all; the root build's `references` list omitting whole directories; a project judged by its own weaker options; and a check that cannot be woken.

Not measured: what any of the 55 would report if judged, or whether `tstl` should be added to the known keys rather than treated as foreign. Both are decisions rather than measurements.
