import type { Finding } from "../finding.page-type.ts"

export const theCompletionTransformsAreBlockedOnTheirGeneratedDataRatherThanOnThemselves = {
  id: "01a0632e-c366-7f71-91fb-d44b17749eed",
  pageTypeSlug: "finding",
  slug: "the-completion-transforms-are-blocked-on-their-generated-data-rather-than-on-themselves",
  domainSlug: "domain/temper",
  claim:
    "Fourteen of the sixteen `transform*Progress` functions owed by `temper/player-completion` cannot be recreated yet. Each reads a generated data module, and not one of those modules is in akasha. The transforms are not the work; the data is. Recreating a transform first gives a module naming an import that resolves nowhere, and the per-package build never reads it, so nothing catches that at write time.",
  evidence:
    "Measured at `d7ef979d6a`. Eleven generated data symbols were counted across all of akasha, 22,812 files parsed: `cadwellData`, `poiData`, `questData`, `collectiblesData`, `tributeData`, `antiquityData`, `traitResearchData`, `zoneCompletionData`, `accountAchievementData`, `characterAchievementData` and `loreShalidorData` each score zero. The control `COMPLETION_CATEGORY_TREE_STATIC` scores one in the same run, so the instrument was finding things. Twelve of the fourteen legacy files carrying the family import from `./generated/`; `completion-transforms.ts` is blocked through `transformTraitResearchProgress` rather than directly. The two that are free are `completion-item-set-progress.ts`, which reads only `temper-characters-equipment`, and the `sum*Scope` family in `completion-overall-score.ts`, which reads only the card registry — both landed. The obstacle is size rather than effort: the 13 generated files hold 2,662,803 bytes and 8 of them are over the 15,000 page ceiling, the largest `collectibles-data.generated.ts` at 1,199,592. So this data cannot land as module code, and the initiative already says the entries work belongs in pages-system rather than under temper. `buildCompletionSummaries` and `computeOverallCompletionScoreFromRows` are blocked the same way, through the twelve transforms they call.",
} as const satisfies Finding
