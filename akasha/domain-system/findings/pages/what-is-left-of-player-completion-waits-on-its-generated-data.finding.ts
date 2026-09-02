import type { Finding } from "../finding.page-type.ts"

export const whatIsLeftOfPlayerCompletionWaitsOnItsGeneratedData = {
  id: "01a0627f-ec6f-7000-a159-7d5aeffbaff1",
  pageTypeSlug: "finding",
  slug: "what-is-left-of-player-completion-waits-on-its-generated-data",
  domainSlug: "domain/temper",
  claim:
    "What is left of `temper/player-completion` is gated on `src/generated` rather than on recreating symbols one at a time. Of the 35 source files still owing exported names, 20 import `./generated/*`, and only 3 of the 13 generated files have an akasha home. Excluding `src/generated` from the census is what hides this: the census asks which names are absent and never asks what the absent files reach.",
  evidence:
    "Measured at commit `43b4da31`, comparing 69 tracked source files against every `.module.code.ts` and `.module.code.tsx` under akasha: 228 source names, 143 landed under the same spelling, 2 under a re-casing, 83 absent across 35 files.\n\nOf the 13 generated files, `temper-activity-category`, `temper-completion-category` and `temper-skill-point` answer as page types. `achievement-data`, `antiquity-data`, `cadwell-data`, `collectibles-data`, `lore-shalidor-data`, `poi-data`, `quest-data`, `trait-research-data`, `tribute-data` and `zone-completion-data` answer nowhere. `achievement-data` alone is reached by five source files.\n\nMatching a source name against all of akasha credits a coincidence: `cadwellData`, `poiData`, `questData` and `traitResearchData` each name a local in `temper-addon-generators`, which reads as the data having migrated. Scoping the match to the completion packages answers 0 false credits.\n\nOnly two names moved to upper snake, so normalizing shifts this count by 2 of 90 rather than by half.\n\nSix of the 83 are fixtures in `character-fixtures.ts` and `roster-fixtures.ts`. A module's fixtures are a page property beside its test rather than exports, so those six never clear this census.",
} as const satisfies Finding
