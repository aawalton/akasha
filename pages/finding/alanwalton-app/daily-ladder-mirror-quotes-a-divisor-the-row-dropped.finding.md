---
id: f5585d5e-f8dc-5eff-b2f9-63532620789b
page-type-slug: finding
title: "Daily ladder mirror quotes a divisor the row dropped"
domain-slug: domain/alanwalton-app
---

# Claim

`daily-tier.ts` names the live `faithLevel` and `learnLevel` page-type formulas as its source of truth, quotes them as dividing by 10,000, and bakes that divisor into the shared `FAITH_LEARN_DAILY_LADDER` constant as absolute thresholds. The live formulas carry no divisor at all. So the one constant serving both the Faith and Learn worktree previews compares raw points against thresholds the authoritative row abandoned, and the mirror announces itself as verbatim.

# Evidence

Read 2026-08-08 while emptying `dirty/code/packages-alanwalton-personas-docs-domain-model.md`, whose `greenDayPoints` bullet sent me here. Roots: `~/code` and the live database through `ops`.

`packages/alanwalton/personas/core/src/daily-tier.ts` states: "SOURCE OF TRUTH: the `faithLevel` and `learnLevel` formulas on the live `daily-tracking` page-type row ... Both formulas are, verbatim, the unified normalized ladder (`points / 10000` against {0.25, 0.5, 1, 2})". It declares `FAITH_LEARN_DAILY_LADDER` as thresholds 2500 red, 5000 yellow, 10000 green, 20000 blue.

`ops schema show daily-tracking` lists six value-level formula definitions. `ops page show 019edbf2-742e-77cd-a761-ae5d9759194e --properties config` returns for `faithLevel`:

    (faithPoints >= 2) && 4 || (faithPoints >= 1) && 3 || (faithPoints >= 0.5) && 2 || (faithPoints >= 0.25) && 1 || 0

`learnLevel`, `funLevel`, `healthLevel`, `loveLevel` and `wealthLevel` are identical but for the input name. No `/ 10000` in any of the six. The multipliers still match, so what diverged is the normalization, not the ladder shape; the persona-side `level` formula (`019eb800-dd11-7e78-8f20-8f0b61deed81`) still scales explicitly.

What I could NOT measure, so the harm is unquantified: whether `faithPoints` is already normalized upstream. `ops page list --type daily-tracking --limit 2 --properties faithPoints,faithLevel --json` returned rows with empty `properties` whose `omitted` lists do not name `faithPoints`. I am not claiming the previews render wrong, only that the mirror contradicts the row it names.

Searched `~/memory/findings/` first, as its own step: `rg -il "daily-tier|FAITH_LEARN_DAILY_LADDER|faithLevel|stoplight|daily ladder" findings/`. Opened the two nearest rather than judging by name. `readouts/orphan-stoplights-formula-still-live.md` is about the emoji `stoplights` formula reading `faithLevel` as input; `readouts/stoplight-ladder-version-skew-undetected.md` is about a VSCode bundle lagging the pod.
