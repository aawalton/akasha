---
id: 18679d78-caeb-5be4-ab97-74c0906edfd6
page-type-slug: finding
title: "Duplicate row indistinguishable"
domain-slug: domain/global
---

# Claim

A duplicated food row and two genuine servings are the same two rows, and `plantGrams` counts both either way. A live pair stands today — two `Beans` rows, both dated 2026-06-25 at 60 grams — flagged as a suspected duplicate in a quarantined document and never adjudicated, and nothing on the log path could tell the two readings apart.

# Evidence

Measured 2026-08-07 while ingesting `dirty/skills/food/rulings.md`, which named the pair and ruled it "one adjudication by whoever asked, then one delete or one note. Never a project." That document is being removed, so the pair would otherwise lose its only record.

The pair is live. `ops page list --type food --search "Beans" --properties date,plantGrams,preparation --all` returns exactly two rows, both `2026-06-25`, both `60`, both with `preparation` blank. The food type holds 68 rows in total.

What the grams do: `ops food log --help` states "`plantGrams` is the ONE source of Natalie's nutritionPoints Health pillar — the day's total rolls up at 1 pt/gram". `packages/collections/food/src/page-types/seed-food.ts:17-21` says the same and names the intent — "One source → a gram is counted exactly once (Faucet Economy: one source, two projections)". That guarantee is about one SOURCE of grams, not about one row per eating event, so 120 grams reach the pillar for 2026-06-25 whether he ate beans once or twice.

Nothing on the path could separate the cases. `ops food log` is a plain create: `--title` is the only required flag, there is no natural key, no upsert and no duplicate check, and its exit codes name only "bad input (empty image, unknown preparation) or create failure". A second identical call therefore succeeds and is correct behaviour if he ate beans twice.

That is the whole of it: the rows are identical, the correct answer differs, and neither the store nor any verb records which happened. Only the person who logged it knows, and the document that flagged it did not say.

Not established: which reading is right. I did not delete or alter either row — a wrong deletion here silently removes 60 grams he actually ate, and the source's ruling that this needs one adjudication rather than a project still looks right.
