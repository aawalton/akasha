import type { ClientQuest } from "../client-session/client-session.module.code.ts"

export function deriveQuestPanel(quests: readonly ClientQuest[]): readonly ClientQuest[] {
  return quests.filter((q) => q.status !== "complete")
}
