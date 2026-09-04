import type { Finding } from "../finding.page-type.ts"

export const thePlayerCompletionTwinIsThereAlreadyAndASameSlugModuleCanHoldAnotherSubject = {
  id: "01a06307-dd2b-70c8-8841-f8811b38843c",
  pageTypeSlug: "finding",
  slug: "the-player-completion-twin-is-there-already-and-a-same-slug-module-can-hold-another-subject",
  domainSlug: "domain/temper",
  claim:
    "`temper/player-completion` is not an unrecreated package. Its twin `akasha/temper/temper-player-completion` is already there with 90 tracked files, and 145 of the legacy package's 228 hand-written symbols are in akasha. What is owed is 81 symbols, not 85 files. A module of the same slug in both trees is no evidence the work crossed: `activity-categories` exists in each and their exports are disjoint.",
  evidence:
    "Measured at `a887c313be` by parsing exported declarations with the TypeScript compiler over the git index rather than the directory. Denominators: 82 tracked legacy source files and 247 exports; all of akasha 22,764 files and 36,575 exports. Of the 228 unique hand-written symbols, 145 are somewhere in akasha and 83 are not; widening from `akasha/temper` to all of akasha recovered `resolveAccountAchievements` and `resolveCharacterAchievements`, leaving 81. They fall across 34 legacy files, the heaviest `completion-progress-index` at 10 and `completion-overall-score` at 9, and no akasha module carries either slug. The `activity-categories` collision is the trap: legacy exports `ACHIEVEMENT_CATEGORY_ACTIVITY`, `COLLECTIBLE_CATEGORY_TO_ACTIVITY` and `achievementNameToActivity`, while the akasha module of that slug exports `ACTIVITY_CATEGORIES` and `ActivityCategoryId` — a taxonomy where the legacy file held game lookup tables. Re-running with case and underscores normalised moved one symbol, and it is a false positive: `COMPLETION_CATEGORY_TREE` matched `completionCategoryTree`, the module's own page const. Every akasha module carries a page const named for its slug and there are 4,840, so a legacy screaming-snake name whose words match a module slug reads as a rename under normalisation.",
} as const satisfies Finding
