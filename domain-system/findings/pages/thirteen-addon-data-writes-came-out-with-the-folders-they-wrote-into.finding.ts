import type { Finding } from "../finding.page-type.ts"

export const thirteenAddonDataWritesCameOutWithTheFoldersTheyWroteInto = {
  id: "01a0609d-ecbb-7f6d-ac14-c8ea7b7e0a18",
  pageTypeSlug: "finding",
  slug: "thirteen-addon-data-writes-came-out-with-the-folders-they-wrote-into",
  domainSlug: "domain/temper",
  claim:
    "Thirteen addon-data writes wrote into temper/shared-formula-framework, game-characters-classes and game-items-alchemy, which are deleted. output-dirs.ts throws when an output folder's parent is missing, and that would have stopped all eighteen write groups, so the thirteen writes came out with the folders. Nothing writes those tables now, and the akasha modules producing their text have no importer.",
  evidence:
    "writes/buffs-and-debuffs.ts wrote six: temper-buff-major, temper-buff-minor, temper-buff-other, temper-debuff-major, temper-debuff-minor and temper-debuff-other. That whole file is deleted and writes.ts no longer calls it. writes/sets.ts wrote temper-source-category and keeps its other three. writes/characters.ts wrote classes.generated.ts and keeps its other five. writes/alchemy.ts wrote five, potions-crown, temper-potion-crafted, temper-reagents, temper-potion-dropped and temper-poison-effects, and keeps only potion-restore-metrics, which goes to game-items-rules-core. TEMPER_SHARED_OUTPUT_DIR, TEMPER_CLASSES_OUTPUT_DIR and TEMPER_ALCHEMY_OUTPUT_DIR are gone from output-dirs.ts and from ALL_OUTPUT_DIRS. The thirteen generator functions are akasha modules under akasha/temper/temper-addon-generators and none of the thirteen has an importer. akasha/temper/temper-addon-generators/classes/classes.module.code.ts line 63 still emits an import of ClassId from the old specifier. Each of the thirteen tables now lives only as akasha module code, so a change to a temper page no longer reaches it.",
} as const satisfies Finding
