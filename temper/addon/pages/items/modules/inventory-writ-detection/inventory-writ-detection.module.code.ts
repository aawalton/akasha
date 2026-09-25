import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"

export function scanActiveWrits(): LuaMap<number, number> {
  const writs = new LuaMap<number, number>()

  for (let i = 1; i <= 25; i++) {
    const repeatType = GetJournalQuestRepeatType(i)
    const questType = GetJournalQuestType(i)
    const isEnding = IsJournalQuestStepEnding(i, 1)

    if (isEnding) continue

    const isDaily = repeatType === QUEST_REPEAT_DAILY
    const isCrafting = questType === QUEST_TYPE_CRAFTING || questType === QUEST_TYPE_HOLIDAY_EVENT

    if (!isDaily || !isCrafting) {
      if (repeatType === QUEST_REPEAT_NOT_REPEATABLE && questType === QUEST_TYPE_CRAFTING) {
        const [masterItemId] = GetQuestConditionMasterWritInfo(i, 1, 1)
        if (masterItemId !== undefined) continue
      } else {
        continue
      }
    }

    let craftType = 0
    for (let j = 1; j <= 5; j++) {
      if (craftType === 0) {
        const [, , condCraftType] = GetQuestConditionItemInfo(i, 1, j)
        craftType = condCraftType
      }
    }

    if (craftType !== 0) {
      writs.set(craftType, i)
    }
  }

  return writs
}

type MasterWritConditionInfo = {
  readonly masterItemId: number | undefined
  readonly craftingType: number | undefined
}

function classifyMasterWritQuest(
  this: void,
  isEndingStep: boolean,
  conditions: readonly MasterWritConditionInfo[]
): number | undefined {
  if (isEndingStep) return undefined
  for (let i = 0; i < conditions.length; i++) {
    const cond = conditions[i]
    if (cond === undefined) continue
    if (cond.craftingType === undefined || cond.craftingType === 0) continue
    return cond.craftingType
  }
  return undefined
}

export function scanActiveMasterWrits(): LuaMap<number, number> {
  const writs = new LuaMap<number, number>()

  for (let i = 1; i <= 25; i++) {
    const isEndingStep = IsJournalQuestStepEnding(i, 1)

    const conditions: MasterWritConditionInfo[] = []
    const numConditions = GetJournalQuestNumConditions(i, 1)
    for (let c = 1; c <= numConditions; c++) {
      const [masterItemId, , craftingType] = GetQuestConditionMasterWritInfo(i, 1, c)
      conditions.push({ masterItemId, craftingType })
    }

    const craftType = classifyMasterWritQuest(isEndingStep, conditions)
    if (craftType !== undefined) {
      writs.set(craftType, i)
    }
  }

  return writs
}
