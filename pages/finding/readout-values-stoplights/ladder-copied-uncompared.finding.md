---
id: 9ca2d847-a692-516d-baaa-3c63342dc156
slug: ladder-copied-uncompared
page-type-slug: finding
title: "Ladder copied uncompared"
domain-slug: domain/global
---

# Claim

The green-day units ladder stands in two places that nothing compares. It is declared in the instructions repository at `tools/lib/readout-definitions.ts` and projected onto the `readout-values-stoplights` row, which is what `public.get_value_stoplights` reads; and it stands again as `GREEN_DAY_UNITS_LADDER` in `packages/shared/status-bar-access/src/daily-stoplights.ts`, which is what the `stoplights` faucet and the per-persona circles read. The two agree today, and no check holds either against the other.

# Evidence

Both copies carry the same four rungs, read on 2026-08-12: red at 0.25, yellow at 0.5, green at 1, blue at 2. The projected row spells them `at` and the TypeScript spells them `threshold`, so a comparison has to translate rather than match text.

The copy survives the port on purpose. #18908 moved the six value circles into SQL and deleted the TypeScript fold that drew them, but `GREEN_DAY_UNITS_LADDER` could not go with it: the `stoplights` faucet in `packages/alanwalton/daily-tracking/src/stoplight-mean-points.ts` folds the same persona rows to a different reading — the same colour-floored sum with one persona held out, solved to a fixpoint — so it is not the readout and cannot be answered by `get_value_stoplights`. `resolvePersonaStoplightTiers` in `persona-stoplights.ts` reads it for the same kind of reason.

What makes the pair notable rather than ordinary is that this repository already answers this shape with an instrument. `prompt-shape-mirror`, `resume-notices`, `seat-name-corpus-mirror` and `status-vocabulary` each hold a declaration here against a constant in the code repository, and each is a check that fails when the two part. Searching `tools/` for either name returns only the declaration at `tools/lib/readout-definitions.ts:120` — there is no mirror for this one.

A drift would be silent in the direction that matters. The declaration is live on the commit and the constant reaches production over a branch, CI and a deploy, so a rung edited here is the projected ladder immediately while the faucet keeps scoring against the old one until a deploy carries it. Both readings would still render, and the disagreement would show only as a persona's points not matching the lights beside them.
