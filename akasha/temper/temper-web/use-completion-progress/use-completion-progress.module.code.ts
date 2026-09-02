import type { BadgeToggleGroupItem } from "@akasha/design-badges/badge-toggle-group"
import type {
  AccountSummaryData,
  CharacterSummaryData,
  CompanionSummaryData,
} from "@akasha/temper-player-completion/completion-card-registry"
import {
  useAccountCompletion,
  useAccountCompletionByUser,
  useCompletionCharacters,
  useCompletionCharactersByUser,
  useCompletionCompanions,
  useCompletionCompanionsByUser,
} from "@akasha/temper-player-completion-ui/use-completion"
import type { AccountProgressData } from "../account-progress/account-progress.module.code.ts"
import { useAccountProgress } from "../account-progress/account-progress.module.code.ts"
import type { CharacterProgressData } from "../character-progress/character-progress.module.code.ts"
import { useCharacterProgress } from "../character-progress/character-progress.module.code.ts"
import type { CompanionProgressData } from "../companion-progress/companion-progress.module.code.ts"
import { useCompanionProgress } from "../companion-progress/companion-progress.module.code.ts"
import { useCompletionCatalogs } from "../use-completion-catalogs/use-completion-catalogs.module.code.ts"

interface CompletionProgressData {
  accountProgress: AccountProgressData
  characterProgress: CharacterProgressData
  companionProgressData: CompanionProgressData
  accountSummary: AccountSummaryData
  characterSummary: CharacterSummaryData
  companionSummary: CompanionSummaryData
  characterItems: readonly BadgeToggleGroupItem[]
  account: ReturnType<typeof useAccountCompletion>["account"]
  rows: ReturnType<typeof useCompletionCharacters>["characters"]
  companionRows: ReturnType<typeof useCompletionCompanions>["companions"]
  isLoading: boolean
}

export function useCompletionProgress(viewUserId: string | undefined): CompletionProgressData {
  const ownCharacters = useCompletionCharacters()
  const ownCompanions = useCompletionCompanions()
  const ownAccount = useAccountCompletion()
  const viewCharacters = useCompletionCharactersByUser(viewUserId ?? "")
  const viewCompanions = useCompletionCompanionsByUser(viewUserId ?? "")
  const viewAccount = useAccountCompletionByUser(viewUserId ?? "")
  const { catalogs, isLoading: catalogsLoading } = useCompletionCatalogs()

  const { characters: rows } = viewUserId != null ? viewCharacters : ownCharacters
  const { companions: companionRows } = viewUserId != null ? viewCompanions : ownCompanions
  const { account: accountCompletion } = viewUserId != null ? viewAccount : ownAccount
  const isLoading =
    catalogsLoading ||
    (viewUserId != null ? viewCharacters : ownCharacters).isLoading ||
    (viewUserId != null ? viewCompanions : ownCompanions).isLoading ||
    (viewUserId != null ? viewAccount : ownAccount).isLoading

  const {
    companionProgressData,
    companionSummary,
    companionQuestProgress,
    companionRapportProgress,
  } = useCompanionProgress({ rows, companionRows })

  const { characterProgress, characterSummary, characterItems, loreProgress } =
    useCharacterProgress({
      rows,
      accountCompletion,
      companionQuestProgress,
      companionRapportProgress,
      catalogs,
    })

  const { accountProgress, accountSummary } = useAccountProgress({
    rows,
    accountCompletion,
    characterProgress,
    loreProgress,
    catalogs,
  })

  return {
    accountProgress,
    characterProgress,
    companionProgressData,
    accountSummary,
    characterSummary,
    companionSummary,
    characterItems,
    account: accountCompletion,
    rows,
    companionRows,
    isLoading,
  }
}
