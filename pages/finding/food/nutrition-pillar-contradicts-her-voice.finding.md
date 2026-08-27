---
id: 6172e758-3efa-5158-af32-db609dd62e11
page-type-slug: finding
title: "Nutrition pillar contradicts her voice"
domain-slug: domain/global
---

# Claim

Natalie's nutrition pillar scores plant grams alone, so it awards zero for the three things her own file names as food and scores highest for the dish it calls a punishment.

# Evidence

Four surfaces, two on the perimeter and two in quarantine, and they split down the middle.

The perimeter side. `personas/natalie.md` line 19 has her say "Butter's a food, and salt is, and so's sugar", and calls steamed fish with greens "a punishment with a kind word stuck on it". `domains/food.md`, which carries `persona-champion-slug: natalie`, defines food as "what Alan eats and how it is cooked, held as something to want rather than to manage".

The quarantine side. `dirty/docs/aelwyn-coaching-mechanics.md` line 90 gives the Nutrition pillar as "strict whole plants only, mixed dishes decomposed to the plant grams", with the Whose-faucet column naming Natalie. `dirty/code/packages-collections-food-claude.md` line 46 makes `food.plantGrams` the one source of her `nutritionPoints`, summed at one point per gram.

So butter, salt and sugar carry no plant grams and score nothing, while a wet handful of greens is close to pure plant grams and scores near its full weight.

`dirty/docs/persona-roster.md` line 43 does not split with the rest of quarantine — it gives Natalie as "Food — makes eating well a joy Alan craves rather than a chore he manages", agreeing with both perimeter surfaces. The disagreement is with the coaching mechanics and the points machinery specifically, not with `dirty/` as a body.

Quarantine binds nobody, so nothing here is a defect on the perimeter today. What is worth recording is that the mechanics are what gets built, and as written they would have the persona who reports the score reading Alan a number that contradicts what she says at the table.

The reviewer of `personas/natalie.md` raised this and declined to settle it. I verified all four citations at their stated lines rather than taking the report's word, and add the `domains/food.md` limb, which the report did not cite.
