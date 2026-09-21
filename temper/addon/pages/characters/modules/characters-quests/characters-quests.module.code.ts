import { mergeIdList } from "akasha/temper/addon/pages/characters/modules/characters-collector-merge/characters-collector-merge.module.code.ts"
import { currentCharacterEntry } from "akasha/temper/addon/pages/characters/modules/characters-current-entry/characters-current-entry.module.code.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"

function scanCompletedQuests(this: void): number[] {
  const completedIds: number[] = []
  let questId = GetNextCompletedQuestId(undefined)

  while (questId !== undefined) {
    completedIds.push(questId)
    questId = GetNextCompletedQuestId(questId)
  }

  return completedIds
}

function storedQuestIds(): readonly number[] | undefined {
  const charEntry = currentCharacterEntry()
  const stored = charEntry?.quests
  if (stored === undefined) return undefined
  return Array.isArray(stored) ? stored : Object.values(stored)
}

export function collectQuests(this: void): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  charEntry.quests = mergeIdList(storedQuestIds(), scanCompletedQuests())
}

export function updateQuest(this: void, questId: number): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return

  charEntry.quests = mergeIdList(storedQuestIds(), [questId])
}
