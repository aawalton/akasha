import type { Finding } from "../finding.page-type.ts"

export const twoCatalogGeneratorsWriteIntoAPackageAblationTakesAway = {
  id: "01a0634e-58c3-74e1-b427-ca26c51aa8c9",
  pageTypeSlug: "finding",
  slug: "two-catalog-generators-write-into-a-package-ablation-takes-away",
  domainSlug: "domain/temper",
  claim:
    "Two catalog tier generators in akasha name an output path inside `temper/game-completion`, so once that package is ablated a capture refresh writes a file into a folder git no longer holds, recreating the ablated package rather than renewing the akasha twin.",
  evidence:
    'Measured 2026-09-02 while ablating `temper/game-completion`. `akasha/temper/temper-catalog-generators/lore-library-catalog-tier/lore-library-catalog-tier.module.code.ts` line 132 gives `outputPath: "temper/game-completion/src/generated/lore-library-data.generated.ts"`, and `akasha/temper/temper-catalog-generators/recipe-catalog-tier/recipe-catalog-tier.module.code.ts` line 98 gives the recipe file beside it. Their own workspace package declares that a generator renders source text and the caller writes it, so the path is the caller\'s instruction. Both are reached by `ops temper catalog generate lore-library` and `ops temper catalog generate recipe`, named in the header each renders.\n\nRepointing either at its akasha twin is worse than leaving it. Line 122 of the lore generator emits `export const loreLibraryData`, line 88 of the recipe generator emits `export const recipeData`; the twins answer `LORE_LIBRARY_DATA` and `RECIPE_DATA`. The legacy files are 438,494 and 243,084 bytes as one table each, while `akasha/temper/temper-completion` divides them across 37 `lore-collections` modules and 38 `recipe-entries` modules, every one under the akasha byte ceiling of 15,000. A single output path aimed at `lore-library-data.module.code.ts` would replace a 37-module division with one file 29 times the ceiling, under the wrong export name.\n\nThe eight importers were repointed and the values proved equal leaf by leaf, 21,890 leaves over the two tables with no difference, so nothing reads the legacy tables now. What is lost is only the refresh route: the akasha twins carry the last capture and no command renews them.',
} as const satisfies Finding
