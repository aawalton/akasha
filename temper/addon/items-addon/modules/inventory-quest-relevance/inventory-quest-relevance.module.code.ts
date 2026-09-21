import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"

export function isItemLinkQuestRelevant(itemLink: string): boolean {
  if (itemLink === "") return false
  for (let questIndex = 1; questIndex <= MAX_JOURNAL_QUESTS; questIndex++) {
    if (IsValidQuestIndex(questIndex)) {
      const numSteps = GetJournalQuestNumSteps(questIndex)
      for (let stepIndex = 1; stepIndex <= numSteps; stepIndex++) {
        const numConditions = GetJournalQuestNumConditions(questIndex, stepIndex)
        for (let conditionIndex = 1; conditionIndex <= numConditions; conditionIndex++) {
          if (
            DoesItemLinkFulfillJournalQuestCondition(
              itemLink,
              questIndex,
              stepIndex,
              conditionIndex,
              false
            )
          ) {
            return true
          }
        }
      }
    }
  }
  return false
}
