import type { Finding } from "../finding.page-type.ts"

export const twoCompletionTablesAreThirtyTimesTheAkashaFileCeiling = {
  id: "01a0607a-9cc1-79ea-b9bc-f4177edc5825",
  pageTypeSlug: "finding",
  slug: "two-completion-tables-are-thirty-times-the-akasha-file-ceiling",
  domainSlug: "domain/temper",
  claim:
    "temper/game-completion holds two generated tables no akasha file can hold: lore-library-data.generated.ts at 438,494 bytes and recipe-data.generated.ts at 243,084, against a ceiling of 15,000. Splitting them by their own structure takes some sixty modules of pure data. Both are written out from the akasha pages table, so recreating them as modules copies akasha pages back into akasha code. temper-completion landed without them.",
  evidence:
    "temper-completion landed three modules: completion-progress, completion-record and completion-writer-schema. The two tables were left in temper/game-completion/src/generated/. lore-library-data.generated.ts declares loreLibraryData over 3 categories, 211 collections and 6590 books; recipe-data.generated.ts declares recipeData over 30 recipe lists and 4027 recipes. Splitting recipeData by its 30 lists gives about 8 KB a module; splitting loreLibraryData by its 3 categories leaves the first far past the ceiling, so that split would have to run to all 211 collections. The banners name the generators: ops temper catalog generate lore-library and ops temper catalog generate recipe, whose output paths are set at tools/lib/temper-catalog-generate/tiers/lore-library.ts line 130 and tiers/recipe.ts line 99. Eight files outside game-completion import the two tables, one of them temper/player-completion-addon/src/ui/task-progress-resolver-world.ts, which compiles to Lua, so whatever replaces them must be reachable from an addon.",
} as const satisfies Finding
