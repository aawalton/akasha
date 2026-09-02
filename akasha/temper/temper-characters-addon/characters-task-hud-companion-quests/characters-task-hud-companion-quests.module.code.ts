import { pickFirstActionableCompanionQuest } from "@akasha/temper-player-completion/completion-companion-quest-actionability"

export interface CompanionQuestEnrichment {
  companionName: string
  questName: string
}

export function pickFirstIncompleteCompanionQuest(
  completedQuestIds: ReadonlySet<number> | undefined,
  rapport: Record<number, number> | undefined
): CompanionQuestEnrichment | undefined {
  const pick = pickFirstActionableCompanionQuest(completedQuestIds ?? new Set(), rapport ?? {})
  if (pick === undefined) return undefined
  return { companionName: pick.companionName, questName: pick.questName }
}
