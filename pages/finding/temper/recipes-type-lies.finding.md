---
id: 9de11d00-3c1b-5067-8f86-1e298d100e1e
slug: recipes-type-lies
page-type-slug: finding
title: "Recipes type lies"
domain-slug: domain/temper
---

# Claim

The `CharacterCompletion.recipes` type declaration (`packages/temper/game/completion/src/completion-types.ts:303`) permits an array shape that 100% of live temper-character rows never actually store, which is what let seven parsed-Lua readers silently mishandle the real record-of-records shape while still type-checking; the class of bare `z.array` declarations on Lua-provenance schemas has not been exhaustively audited beyond the sites already fixed.

# Evidence

Filed as project #15979 (domain temper), surfaced by #15962 after fixing seven `Array.isArray`-on-parsed-Lua readers one at a time. #15962 closed known instances; this row closes the class at the types rung.

Item 1 — the type is lying: `completion-types.ts:303` declares `recipes?: Record<number, RecipeList> | SparseRecipes`. Live data measured against the DB: 20 of 20 temper-character rows store the record-of-records form, zero store arrays — the type admits a shape nothing stores, so a mishandling reader type-checks fine and returns zero silently. The neighbour four lines down does it correctly: `quests?: readonly number[] | Record<string, number>`. Widening `recipes` the same way turns future misreads into compile errors. Blast radius measured before deferring: 32 non-test sites reference `.recipes`, not a one-line change, hence its own row.

Item 2 — the class is not exhausted: #15962 enumerated `Array.isArray`/`instanceof Array` (881 repo-wide, ~170 in temper, 7 with parsed-Lua provenance) but did not audit bare `z.array` on Lua-provenance schemas exhaustively — only sites adjacent to ones being fixed. `parse-temper-inventory-config.ts:143` found that way, worst of the seven (passthrough root schema, no `tolerant()`, one populated field throws the entire parse). Scope: audit every parsed-Lua schema for bare `z.array` vs `luaArrayOrEmpty`; an ast-grep check could make this a standing gate.

Scoping nuance for any future audit: `Array.isArray` in addon-side code (TSTL-compiled) is NOT this defect — TSTL lowers it to `__TS__ArrayIsArray`, behaving differently; the defect is host-side TypeScript only.

Also recorded: `TemperInventory.lua` has two writers by line-ending census — 138,093 CRLF lines from ESO's serializer (parses to record) and 1,762 LF lines in five islands from the watcher splice (parses to array) — a field can flip shape across a logout.

Reference: rule in `player/build-validation/CLAUDE.md`; remedy `luaArrayOrEmpty` in `validation/lua-array.ts`.
