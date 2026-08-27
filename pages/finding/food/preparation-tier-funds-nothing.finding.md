---
id: dd966858-c9f4-5924-a6e8-b1286a6cbc6b
slug: preparation-tier-funds-nothing
page-type-slug: finding
title: "Preparation tier funds nothing"
domain-slug: domain/global
---

# Claim

`packages/collections/food/src/page-types/seed-food.ts:9` states that the `preparation` field "is the EFFORT tier that funds Natalie's bond". Nothing consumes it. No module outside the food package reads `food.preparation`, her `faucetKind` is `direct` — which `parseFaucetRecipeInner` returns `null` for, so the engine computes no recipe for her at all — and her only pillar, `nutritionPoints`, is computed from `plantGrams` alone. A standing finding quotes this clause as authority for what the field is for.

# Evidence

Measured 2026-08-08 against `~/code` and the live database, while emptying `dirty/code/packages-collections-food-claude.md`, whose own text says the opposite and is right: "Optional logged metadata; it drives no faucet".

The clause. `packages/collections/food/src/page-types/seed-food.ts` lines 8-10: "`preparation` is the EFFORT tier that funds Natalie's bond (a `select` over `ate` / `assembled` / `cooked`)".

Nothing reads the field. `rg -uuu -n '"preparation"|\.preparation|preparation:' packages/ --glob '!**/dist/**' --glob '!**/build/**'`, with the food package's own `src` filtered out, returns only workflow-DSL vocabulary — CI stages named `preparation` in `*.workflow.ts`, and the `kind?: "preparation" | "foundation" | ...` union in `workflow-dsl/src/dsl/types.ts`. Positive control in the identical scope and form on `plantGrams` returned six real consumers.

The substrate agrees, which a repo search cannot answer. `ops page list --type persona --search Natalie --all --properties title,faucetKind,faucetRecipe` returns `Natalie / direct / (empty)`, and `faucet-engine.ts:133` executes `if (kind === "direct" || kind === "seed" || kind === "manual") return null` — no recipe is built for her, so there is none for `preparation` to feed.

Her bond runs entirely through the other path. `persona-day-points.ts:86` holds `nutritionPoints: "Natalie"`, and `persona-day-points.unit.test.ts:81` asserts `pillarsOwnedBy("natalie")` equals `["nutritionPoints"]` — one pillar. `rollupNutritionForDay` assigns the day's `loadDayPlantGrams` result, and `sumPlantGrams` totals `plantGrams` alone.

What this adds. `pages/finding/food/cooked-tier-never-recorded.finding.md` quotes these exact lines as corroboration that the field exists, and tested only whether `cooked` is ever recorded. The false half is therefore standing as cited authority in the corpus.

Not established: whether `preparation` once funded her bond and was disconnected. I did not walk the history.
