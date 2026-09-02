import type { Finding } from "../finding.page-type.ts"

export const captureCoreHadTwiceTheConsumersListed = {
  id: "01a0605d-eb98-76fb-a851-e2b4cc5e8667",
  pageTypeSlug: "finding",
  slug: "capture-core-had-twice-the-consumers-listed",
  domainSlug: "workspace-package/temper-capture-shapes",
  claim:
    "The twelve `@temper/game-*-capture-core` packages had twice the consumers anyone had listed. Past `temper/catalog-core` and the twelve capture addons were seven capture-host packages, the `temper/scripts` manifest, and two tier files under `tools/lib/temper-catalog-generate`. Each unlisted consumer repointed by changing the package half of its specifier, so finding the other half late cost nothing. A census taken by grep rather than by memory is what made the deletion safe.",
  evidence:
    "The teardown brief named `temper/catalog-core` and the twelve `temper/game-*-capture-addon` packages. A grep for `@temper/game-[a-z-]*-capture-core` across every tracked file found ten more consumers. Seven capture hosts import the same interfaces to build zod validators: `saved-variables-schema.ts` under game-collections-antiquities, game-collections, game-collections-lore, game-collections-tribute and game-crafting; `poi-catalog-schema.ts` under game-navigation; three catalog-schema files under game-completion. Each of those seven also carried a tsconfig project reference to a capture-core directory, of which `temper/catalog-core/tsconfig.json` carried twelve. `temper/scripts/package.json` declared game-collections-capture-core and game-completion-capture-core as workspace dependencies while importing neither. `tools/lib/temper-catalog-generate/tiers/achievement.ts` and `tiers/collectibles.ts` import `AchievementCatalogEntry` and `CollectiblesCatalogSubCategory`, two names no listed consumer reads, so a recreation keeping only what catalog-core imports would have broken them. The nineteen recreated module bodies are byte for byte identical to the originals, which is why no export could go missing. Every repointed package typechecked clean before the deletion and after.",
} as const satisfies Finding
