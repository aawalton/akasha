import type { AutomationSettings } from "@akasha/temper-build-support/automation-settings"
import { useCharacterList } from "@akasha/temper-characters-character-ui/use-characters"
import { useCompanionList } from "@akasha/temper-companions-ui/use-companions"
import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import type {
  CharacterBuildInput,
  RuleMatcherContext,
} from "@akasha/temper-items-rules-core/rule-matcher-context-types"
import {
  buildDerivedContext,
  mergeInventoryContext,
} from "@akasha/temper-items-rules-matcher/rule-matcher-context"
import {
  useCompletionCharacters,
  useCompletionCompanions,
} from "@akasha/temper-player-completion-ui/use-completion"
import { useMemo } from "react"

export function useRuleMatcherContext(
  inventory: InventoryDatabase | null,
  automationSettings?: AutomationSettings
): RuleMatcherContext | null {
  const { characters: completionCharacters } = useCompletionCharacters()
  const { builds: characterBuilds } = useCharacterList()
  const { companions: completionCompanions } = useCompletionCompanions()
  const { builds: companionBuilds } = useCompanionList()

  const hasCharactersOrCompanions =
    completionCharacters.length > 0 || completionCompanions.length > 0

  const buildDerived = useMemo(() => {
    if (!hasCharactersOrCompanions) return null
    const characterBuildInputs: CharacterBuildInput[] = characterBuilds.map((b) => ({
      id: b.id,
      buildHash: b.buildHash,
      esoCharacterId: b.esoCharacterId,
    }))
    return buildDerivedContext(
      completionCharacters,
      characterBuildInputs,
      completionCompanions,
      companionBuilds,
      automationSettings
    )
  }, [
    hasCharactersOrCompanions,
    completionCharacters,
    characterBuilds,
    completionCompanions,
    companionBuilds,
    automationSettings,
  ])

  return useMemo(() => {
    if (!buildDerived) return null
    return mergeInventoryContext(buildDerived, inventory)
  }, [buildDerived, inventory])
}
