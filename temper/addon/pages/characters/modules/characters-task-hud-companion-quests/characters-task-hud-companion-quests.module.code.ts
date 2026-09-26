import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.ts"
import type { TemperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.types.ts"
import { pickFirstActionableCompanionQuest } from "akasha/temper/player/completion/temper-player-completion/modules/completion-companion-quest-actionability/completion-companion-quest-actionability.module.code.ts"

type DefIdPage = Pick<TemperEsoCompanion, "key" | "esoCompanionId">

function defIdsOf(this: void): { [companionId: string]: number } {
  const found: { [companionId: string]: number } = {}
  for (const one of $pagesOfType<DefIdPage>(temperEsoCompanion)) {
    if (one.esoCompanionId !== 0) found[one.key] = one.esoCompanionId
  }
  return found
}

const DEF_IDS: { [companionId: string]: number } = defIdsOf()

function defIdOf(this: void, companionId: string): number | undefined {
  return DEF_IDS[companionId]
}

export interface CompanionQuestEnrichment {
  companionName: string
  questName: string
}

export function pickFirstIncompleteCompanionQuest(
  completedQuestIds: ReadonlySet<number> | undefined,
  rapport: Record<number, number> | undefined
): CompanionQuestEnrichment | undefined {
  const pick = pickFirstActionableCompanionQuest(
    completedQuestIds ?? new Set(),
    rapport ?? {},
    defIdOf
  )
  if (pick === undefined) return undefined
  return { companionName: pick.companionName, questName: pick.questName }
}
