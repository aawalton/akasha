import type { Finding } from "../finding.page-type.ts"

export const everyGeneratedTableInPlayerCompletionAnswersToAGenerator = {
  id: "01a060f1-98f5-7749-a45a-af21e33aaab7",
  pageTypeSlug: "finding",
  slug: "every-generated-table-in-player-completion-answers-to-a-generator",
  domainSlug: "domain/temper",
  claim:
    "`temper/player-completion/src/generated/` holds thirteen files rather than eleven, and a generator answers for every one. Nine come from tiers under `tools/lib/temper-catalog-generate`. Four are rendered by modules in `temper-addon-generators`. None of the thirteen is source, so none is a catalog wave to migrate as pages; the work outside akasha is the nine tiers.",
  evidence:
    "Measured on 2026-09-02, and it answers the question `the-catalog-generator-writes-code-rather-than-pages` left open about the three files named for page kinds. `activity-category` and `temper-completion-category` in `temper-addon-generators` render `temper-activity-category.generated.ts` and `temper-completion-category.generated.ts` from the 12 `temper-activity-category` pages and the 60 `temper-completion-category` pages, called from `tools/lib/temper-addon-data/writes/completion.ts`. `temper-skill-point.generated.ts` is rendered from the 50 `temper-skill-point` pages; its generator was the one import in `writes-skills.ts` reaching outside akasha and now reaches `@akasha/temper-addon-generators/temper-skill-point`. `lore-shalidor-data.generated.ts` is rendered by `temper-addon-generators/lore-shalidor` from `lore-library-data.generated.ts`, which the lore-library tier writes, so it is build output twice over. The remaining nine — achievement, antiquity, cadwell, collectibles, poi, quest, trait-research, tribute and zone-completion — each name an `outputPath` in a tier that reads `TemperCatalog.lua` or `TemperDataMining.lua`. Landing any of the thirteen as akasha pages would add an authority the next generator run overwrites without failing anything.",
} as const satisfies Finding
