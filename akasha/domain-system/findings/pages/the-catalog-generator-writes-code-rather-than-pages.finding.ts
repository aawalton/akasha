import type { Finding } from "../finding.page-type.ts"

export const theCatalogGeneratorWritesCodeRatherThanPages = {
  id: "01a0603b-29f5-7b7f-b509-dbb1596cd1c4",
  pageTypeSlug: "finding",
  slug: "the-catalog-generator-writes-code-rather-than-pages",
  domainSlug: "domain/temper",
  claim:
    "None of the eleven tier modules under `tools/lib/temper-catalog-generate/tiers/` is made dead by the temper pages having been recreated in akasha. A tier reads a SavedVariables file the game addon left and writes a generated TypeScript data file under `temper/player-completion/src/generated/` or `temper/game-completion/src/generated/`. No tier writes anything under `pages/`.",
  evidence:
    "Every one of the eleven tiers states an `outputPath` ending in `.generated.ts`: achievement, antiquity, cadwell, collectibles, poi, quest, trait-research, tribute and zone-completion write into `temper/player-completion/src/generated/`, while lore-library and recipe write into `temper/game-completion/src/generated/`. Both directories hold those files today. The generated data is imported by more than twenty files in `temper/player-completion/src`, among them `completion-achievement-progress.ts`, `completion-quest-progress.ts`, `completion-cadwell-progress.ts`, `completion-collectibles-progress.ts`, `completion-poi-progress.ts` and `completion-antiquity-lore-progress.ts`. The harness in `tools/lib/temper-catalog-generate/harness.ts` reads the addon's Lua account-wide table, requires an `apiVersion` from it, hands the table to the tier, formats what the tier emits and writes the one output file. A separate concern the same reasoning does touch: three files under `temper/player-completion/src/generated/` — `temper-activity-category.generated.ts`, `temper-completion-category.generated.ts` and `temper-skill-point.generated.ts` — are named for page kinds and no tier in this folder writes them, so whatever writes those is worth finding before anything here is deleted. Deleting a tier on the reasoning that its output now lives in akasha as pages would take out the only route by which captured game data reaches the completion code.",
} as const satisfies Finding
