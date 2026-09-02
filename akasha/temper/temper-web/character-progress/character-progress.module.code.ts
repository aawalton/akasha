import type { BadgeToggleGroupItem } from "@akasha/design-badges/badge-toggle-group"
import type {
  AchievementTallyCategory,
  CharacterAchievementProgressResult,
} from "@akasha/temper-player-completion/completion-achievement-progress"
import {
  achievementTally,
  transformCharacterAchievementProgress,
} from "@akasha/temper-player-completion/completion-achievement-progress"
import { transformCadwellProgress } from "@akasha/temper-player-completion/completion-cadwell-progress"
import type { CharacterSummaryData } from "@akasha/temper-player-completion/completion-card-registry"
import { transformDailyWritsProgress } from "@akasha/temper-player-completion/completion-daily-writs-progress"
import { transformLoreLibraryProgress } from "@akasha/temper-player-completion/completion-lore-library-progress"
import { transformPoiProgress } from "@akasha/temper-player-completion/completion-poi-progress"
import { transformQuestProgress } from "@akasha/temper-player-completion/completion-quest-progress"
import { transformSkillPointsProgress } from "@akasha/temper-player-completion/completion-skill-points-progress"
import { buildCharacterSummary } from "@akasha/temper-player-completion/completion-summary"
import { transformCompletionCharacters } from "@akasha/temper-player-completion/completion-transforms"
import type {
  AccountLoreProgress,
  CharacterCadwellProgress,
  CharacterCompanionRapportProgress,
  CharacterDailyWritsProgress,
  CharacterLoreLibraryProgress,
  CharacterMountTrainingProgress,
  CharacterPackUpgradesProgress,
  CharacterPoiProgress,
  CharacterQuestProgress,
  CharacterRecipeProgress,
  CharacterScribingProgress,
  CharacterSkillLineProgress,
  CharacterSkillPointsProgress,
  CharacterTraitResearchProgress,
  CharacterZoneCompletionProgress,
  CompletionCharacter,
} from "@akasha/temper-player-completion/completion-ui-types"
import { transformZoneCompletionProgress } from "@akasha/temper-player-completion/completion-zone-progress"
import type {
  useAccountCompletion,
  useCompletionCharacters,
} from "@akasha/temper-player-completion-ui/use-completion"
import type { CharacterSkillMorphProgress } from "@akasha/temper-skill-morphs/morph-progress-types"
import { useMemo } from "react"
import type { CompletionCatalogs } from "../use-completion-catalogs/use-completion-catalogs.module.code.ts"

const CHARACTER_TALLY = "character"

export interface CharacterProgressData {
  rosterSize: number
  measuredCharacterCount: number
  characters: readonly CompletionCharacter[]
  characterAchievementProgress: readonly CharacterAchievementProgressResult[]
  characterAchievementTally: readonly AchievementTallyCategory[]
  cadwellProgress: readonly CharacterCadwellProgress[]
  progress: readonly CharacterSkillLineProgress[]
  morphProgress: readonly CharacterSkillMorphProgress[]
  mountTrainingProgress: readonly CharacterMountTrainingProgress[]
  packUpgradesProgress: readonly CharacterPackUpgradesProgress[]
  recipeProgress: readonly CharacterRecipeProgress[]
  scribingProgress: readonly CharacterScribingProgress[]
  skillPointsProgress: readonly CharacterSkillPointsProgress[]
  traitResearchProgress: readonly CharacterTraitResearchProgress[]
  questProgress: readonly CharacterQuestProgress[]
  companionQuestProgress: readonly CharacterQuestProgress[]
  companionRapportProgress: readonly CharacterCompanionRapportProgress[]
  loreLibraryProgress: readonly CharacterLoreLibraryProgress[]
  dailyWritsProgress: readonly CharacterDailyWritsProgress[]
  poiProgress: readonly CharacterPoiProgress[]
  zoneProgress: readonly CharacterZoneCompletionProgress[]
}

interface UseCharacterProgressArgs {
  rows: ReturnType<typeof useCompletionCharacters>["characters"]
  accountCompletion: ReturnType<typeof useAccountCompletion>["account"]
  companionQuestProgress: readonly CharacterQuestProgress[]
  companionRapportProgress: readonly CharacterCompanionRapportProgress[]
  catalogs: CompletionCatalogs
}

export interface UseCharacterProgressResult {
  characterProgress: CharacterProgressData
  characterSummary: CharacterSummaryData
  characterItems: readonly BadgeToggleGroupItem[]
  loreProgress: AccountLoreProgress
}

export function useCharacterProgress({
  rows,
  accountCompletion,
  companionQuestProgress,
  companionRapportProgress,
  catalogs,
}: UseCharacterProgressArgs): UseCharacterProgressResult {
  const accountCollectibles = accountCompletion?.collectibles
  const {
    characters,
    progress,
    morphProgress,
    mountTrainingProgress,
    packUpgradesProgress,
    recipeProgress,
    scribingProgress,
    traitResearchProgress,
    loreProgress,
    rosterSize,
    measuredCharacterCount,
  } = useMemo(
    () =>
      transformCompletionCharacters(
        rows,
        catalogs.craftTypes,
        catalogs.researchLines,
        accountCollectibles
      ),
    [rows, catalogs.craftTypes, catalogs.researchLines, accountCollectibles]
  )
  const characterAchievementProgress = useMemo(
    () => transformCharacterAchievementProgress(rows, catalogs.achievementCategories),
    [rows, catalogs.achievementCategories]
  )
  const characterAchievementTally = useMemo(
    () => achievementTally(catalogs.achievementCategories, CHARACTER_TALLY),
    [catalogs.achievementCategories]
  )
  const cadwellProgress = useMemo(
    () => transformCadwellProgress(rows, catalogs.cadwellLevels),
    [rows, catalogs.cadwellLevels]
  )
  const loreLibraryProgress = useMemo(() => transformLoreLibraryProgress(rows), [rows])
  const questProgress = useMemo(
    () => transformQuestProgress(rows, catalogs.questZones),
    [rows, catalogs.questZones]
  )
  const skillPointsProgress = useMemo(() => transformSkillPointsProgress(rows), [rows])
  const poiProgress = useMemo(
    () => transformPoiProgress(rows, catalogs.poiZones),
    [rows, catalogs.poiZones]
  )
  const zoneProgress = useMemo(
    () => transformZoneCompletionProgress(rows, catalogs.zoneCompletionZones),
    [rows, catalogs.zoneCompletionZones]
  )
  const dailyWritsProgress = useMemo(() => transformDailyWritsProgress(rows), [rows])
  const characterSummary = useMemo(
    () =>
      buildCharacterSummary({
        characters,
        characterAchievementProgress,
        cadwellProgress,
        progress,
        morphProgress,
        mountTrainingProgress,
        packUpgradesProgress,
        recipeProgress,
        scribingProgress,
        skillPointsProgress,
        traitResearchProgress,
        questProgress,
        poiProgress,
        zoneProgress,
        companionQuestProgress,
        companionRapportProgress,
        loreLibraryProgress,
        dailyWritsProgress,
      }),
    [
      characters,
      characterAchievementProgress,
      cadwellProgress,
      progress,
      morphProgress,
      mountTrainingProgress,
      packUpgradesProgress,
      recipeProgress,
      scribingProgress,
      skillPointsProgress,
      traitResearchProgress,
      questProgress,
      poiProgress,
      zoneProgress,
      companionQuestProgress,
      companionRapportProgress,
      loreLibraryProgress,
      dailyWritsProgress,
    ]
  )
  const characterItems: BadgeToggleGroupItem[] = useMemo(
    () =>
      characters
        .map((c) => ({ value: c.id, label: c.name }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [characters]
  )

  const characterProgress: CharacterProgressData = {
    rosterSize,
    measuredCharacterCount,
    characters,
    characterAchievementProgress,
    characterAchievementTally,
    cadwellProgress,
    progress,
    morphProgress,
    mountTrainingProgress,
    packUpgradesProgress,
    recipeProgress,
    scribingProgress,
    skillPointsProgress,
    traitResearchProgress,
    questProgress,
    companionQuestProgress,
    companionRapportProgress,
    dailyWritsProgress,
    loreLibraryProgress,
    poiProgress,
    zoneProgress,
  }

  return { characterProgress, characterSummary, characterItems, loreProgress }
}
