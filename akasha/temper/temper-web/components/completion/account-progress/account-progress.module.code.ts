import type {
  AccountRecipeUnionProgress,
  AccountScribingUnionProgress,
} from "@akasha/temper-player-completion/completion-account-recipe-scribing-union"
import {
  transformAccountRecipeUnion,
  transformAccountScribingUnion,
} from "@akasha/temper-player-completion/completion-account-recipe-scribing-union"
import type { AccountTraitResearchUnionProgress } from "@akasha/temper-player-completion/completion-account-trait-union"
import { transformAccountTraitResearchUnion } from "@akasha/temper-player-completion/completion-account-trait-union"
import type { AccountQuestUnionProgress } from "@akasha/temper-player-completion/completion-account-union-progress"
import { transformAccountQuestUnion } from "@akasha/temper-player-completion/completion-account-union-progress"
import type {
  AccountPoiUnionProgress,
  AccountZoneCompletionUnionProgress,
} from "@akasha/temper-player-completion/completion-account-zone-poi-union"
import {
  transformAccountPoiUnion,
  transformAccountZoneCompletionUnion,
} from "@akasha/temper-player-completion/completion-account-zone-poi-union"
import type { AccountAchievementOverallProgress } from "@akasha/temper-player-completion/completion-achievement-progress"
import { transformAccountAchievementProgress } from "@akasha/temper-player-completion/completion-achievement-progress"
import { transformAntiquityLoreProgress } from "@akasha/temper-player-completion/completion-antiquity-lore-progress"
import type { AccountSummaryData } from "@akasha/temper-player-completion/completion-card-registry"
import { transformCollectiblesProgress } from "@akasha/temper-player-completion/completion-collectibles-progress"
import type { ItemSetOverallProgress } from "@akasha/temper-player-completion/completion-item-set-progress"
import { transformItemSetProgress } from "@akasha/temper-player-completion/completion-item-set-progress"
import { isAccountMeasured } from "@akasha/temper-player-completion/completion-measured"
import type { SubclassingSkillLineProgressResult } from "@akasha/temper-player-completion/completion-subclassing-progress"
import { transformSubclassingSkillLineProgress } from "@akasha/temper-player-completion/completion-subclassing-progress"
import { buildAccountSummary } from "@akasha/temper-player-completion/completion-summary-account"
import { transformTributeProgress } from "@akasha/temper-player-completion/completion-tribute-progress"
import type {
  AccountAntiquityLoreProgress,
  AccountCollectiblesProgress,
  AccountLoreProgress,
  AccountTributeProgress,
} from "@akasha/temper-player-completion/completion-ui-types"
import type {
  useAccountCompletion,
  useCompletionCharacters,
} from "@akasha/temper-player-completion-ui/use-completion"
import type { SubclassingSkillMorphProgressResult } from "@akasha/temper-skill-morphs/subclassing-morph-progress"
import { transformSubclassingSkillMorphProgress } from "@akasha/temper-skill-morphs/subclassing-morph-progress"
import { useMemo } from "react"
import type { CharacterProgressData } from "../character-progress/character-progress.module.code.ts"
import type { CompletionCatalogs } from "../use-completion-catalogs/use-completion-catalogs.module.code.ts"

export interface AccountProgressData {
  measured: boolean
  accountAchievementProgress: AccountAchievementOverallProgress
  antiquityLoreProgress: AccountAntiquityLoreProgress
  collectiblesProgress: AccountCollectiblesProgress
  recipeUnion: AccountRecipeUnionProgress
  traitResearchUnion: AccountTraitResearchUnionProgress
  itemSetProgress: ItemSetOverallProgress
  loreProgress: AccountLoreProgress
  poiUnion: AccountPoiUnionProgress
  questUnion: AccountQuestUnionProgress
  scribingUnion: AccountScribingUnionProgress
  subclassingSkillLines: SubclassingSkillLineProgressResult
  subclassingSkillMorphs: SubclassingSkillMorphProgressResult
  tributeProgress: AccountTributeProgress
  zoneCompletionUnion: AccountZoneCompletionUnionProgress
  bankUpgrade: { current: number; max: number }
  championPointsEarned: number
  grandMasterStations: Record<number, { name: string; unlocked: number[] }> | undefined
}

interface UseAccountProgressArgs {
  rows: ReturnType<typeof useCompletionCharacters>["characters"]
  accountCompletion: ReturnType<typeof useAccountCompletion>["account"]
  characterProgress: CharacterProgressData
  loreProgress: AccountLoreProgress
  catalogs: CompletionCatalogs
}

export interface UseAccountProgressResult {
  accountProgress: AccountProgressData
  accountSummary: AccountSummaryData
}

export function useAccountProgress({
  rows,
  accountCompletion,
  characterProgress,
  loreProgress,
  catalogs,
}: UseAccountProgressArgs): UseAccountProgressResult {
  const {
    poiProgress,
    questProgress,
    recipeProgress,
    scribingProgress,
    traitResearchProgress,
    zoneProgress,
  } = characterProgress

  const itemSetProgress = useMemo(
    () => transformItemSetProgress(accountCompletion),
    [accountCompletion]
  )
  const accountAchievementProgress = useMemo(
    () =>
      transformAccountAchievementProgress(accountCompletion, rows, catalogs.achievementCategories),
    [accountCompletion, rows, catalogs.achievementCategories]
  )
  const antiquityLoreProgress = useMemo(
    () => transformAntiquityLoreProgress(accountCompletion, catalogs.antiquityCategories),
    [accountCompletion, catalogs.antiquityCategories]
  )
  const collectiblesProgress = useMemo(
    () => transformCollectiblesProgress(accountCompletion, catalogs.collectibleCategories),
    [accountCompletion, catalogs.collectibleCategories]
  )
  const questUnion = useMemo(() => transformAccountQuestUnion(questProgress), [questProgress])
  const poiUnion = useMemo(
    () => transformAccountPoiUnion(poiProgress, catalogs.poiZones),
    [poiProgress, catalogs.poiZones]
  )
  const zoneCompletionUnion = useMemo(
    () => transformAccountZoneCompletionUnion(zoneProgress),
    [zoneProgress]
  )
  const recipeUnion = useMemo(() => transformAccountRecipeUnion(recipeProgress), [recipeProgress])
  const scribingUnion = useMemo(
    () => transformAccountScribingUnion(scribingProgress),
    [scribingProgress]
  )
  const traitResearchUnion = useMemo(
    () =>
      transformAccountTraitResearchUnion(
        traitResearchProgress,
        catalogs.craftTypes,
        catalogs.researchLines
      ),
    [traitResearchProgress, catalogs.craftTypes, catalogs.researchLines]
  )
  const subclassingSkillLines = useMemo(
    () => transformSubclassingSkillLineProgress(accountCompletion),
    [accountCompletion]
  )
  const subclassingSkillMorphs = useMemo(
    () =>
      transformSubclassingSkillMorphProgress({
        subclassingSkillLineProgress: accountCompletion?.subclassingSkillLineProgress,
      }),
    [accountCompletion]
  )
  const tributeProgress = useMemo(
    () => transformTributeProgress(accountCompletion, catalogs.tributePatrons),
    [accountCompletion, catalogs.tributePatrons]
  )
  const accountSummary = useMemo(
    () =>
      buildAccountSummary(
        accountAchievementProgress,
        accountCompletion?.championPointsEarned ?? 0,
        antiquityLoreProgress,
        collectiblesProgress,
        itemSetProgress,
        loreProgress,
        poiUnion,
        questUnion,
        recipeUnion,
        scribingUnion,
        traitResearchUnion,
        tributeProgress,
        zoneCompletionUnion,
        accountCompletion?.bankUpgrade ?? { current: 0, max: 0 },
        accountCompletion?.grandMasterStations,
        subclassingSkillLines,
        subclassingSkillMorphs
      ),
    [
      accountAchievementProgress,
      accountCompletion?.championPointsEarned,
      antiquityLoreProgress,
      collectiblesProgress,
      itemSetProgress,
      loreProgress,
      poiUnion,
      questUnion,
      recipeUnion,
      scribingUnion,
      subclassingSkillLines,
      subclassingSkillMorphs,
      traitResearchUnion,
      tributeProgress,
      zoneCompletionUnion,
      accountCompletion?.bankUpgrade,
      accountCompletion?.grandMasterStations,
    ]
  )

  const bankUpgrade = useMemo(
    () => accountCompletion?.bankUpgrade ?? { current: 0, max: 0 },
    [accountCompletion]
  )
  const championPointsEarned = accountCompletion?.championPointsEarned ?? 0
  const grandMasterStations = accountCompletion?.grandMasterStations
  const measured = isAccountMeasured(accountCompletion)

  const accountProgress: AccountProgressData = {
    measured,
    accountAchievementProgress,
    antiquityLoreProgress,
    collectiblesProgress,
    recipeUnion,
    traitResearchUnion,
    itemSetProgress,
    loreProgress,
    poiUnion,
    questUnion,
    scribingUnion,
    subclassingSkillLines,
    subclassingSkillMorphs,
    tributeProgress,
    zoneCompletionUnion,
    bankUpgrade,
    championPointsEarned,
    grandMasterStations,
  }

  return { accountProgress, accountSummary }
}
