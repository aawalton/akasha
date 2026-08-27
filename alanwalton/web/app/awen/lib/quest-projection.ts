import type { ClientQuest } from "./client-session"

export function deriveQuestPanel(quests: readonly ClientQuest[]): readonly ClientQuest[] {
  return quests.filter((q) => q.status !== "complete")
}
