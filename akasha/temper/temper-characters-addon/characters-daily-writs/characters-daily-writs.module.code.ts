import { getEsoDayStringFromSec } from "@akasha/temper-dungeons/eso-reset"
import { ADDON_NAME } from "@akasha/temper-player-completion-state/completion-addon-constants"
import {
  DAILY_WRIT_COUNT,
  type DailyWritJournalScan,
  deriveWritCrafted,
  nextDailyWritReconcile,
} from "@akasha/temper-player-completion-state/completion-daily-writs-state"
import type { SavedCharacterEntry } from "@akasha/temper-player-completion-state/completion-saved-variables"
import {
  isDailyCraftingQuest,
  isDailyCraftingWritQuest,
  isWritCraftType,
} from "../characters-daily-writs-detection/characters-daily-writs-detection.module.code.ts"

export function recordDailyWritCompletion(charEntry: SavedCharacterEntry): undefined {
  const today = getEsoDayStringFromSec(GetTimeStamp())
  const dw = charEntry.dailyWrits

  if (dw === undefined || dw.date !== today) {
    charEntry.dailyWrits = { date: today, completed: 1 }
  } else {
    if (dw.completed < DAILY_WRIT_COUNT) {
      dw.completed = dw.completed + 1
    }
  }
}

export function scanDailyWritJournal(): DailyWritJournalScan {
  const present: number[] = []
  const crafted: number[] = []

  for (let i = 1; i <= GetNumJournalQuests(); i++) {
    if (!isDailyCraftingWritQuest(i)) continue

    let craftType = 0
    let craftConditionCount = 0
    let craftMetCount = 0
    const numConditions = GetJournalQuestNumConditions(i, 1)
    for (let j = 1; j <= numConditions; j++) {
      const [, , condCraftType] = GetQuestConditionItemInfo(i, 1, j)
      if (!isWritCraftType(condCraftType)) continue
      if (craftType === 0) craftType = condCraftType
      const [, current, max] = GetJournalQuestConditionInfo(i, 1, j)
      craftConditionCount += 1
      if (current >= max) craftMetCount += 1
    }
    if (!isWritCraftType(craftType)) continue

    present.push(craftType)
    if (deriveWritCrafted(craftConditionCount, craftMetCount)) crafted.push(craftType)
  }

  return { present, crafted }
}

export function probeDailyWrits(this: void): undefined {
  d(`[${ADDON_NAME}] === daily-writ journal probe ===`)
  const numQuests = GetNumJournalQuests()
  let matched = 0
  for (let i = 1; i <= numQuests; i++) {
    if (!isDailyCraftingQuest(i)) continue
    matched += 1

    const [questName, , activeStepText] = GetJournalQuestInfo(i)
    const name = zo_strformat("<<1>>", questName)
    const numSteps = GetJournalQuestNumSteps(i)
    const isEnding = IsJournalQuestStepEnding(i, 1)
    const isComplete = GetJournalQuestIsComplete(i)
    d(
      `[${ADDON_NAME}] quest#${i} "${name}" repeat=${GetJournalQuestRepeatType(i)} type=${GetJournalQuestType(i)} numSteps=${numSteps} ending(step1)=${isEnding ? "y" : "n"} questComplete=${isComplete ? "y" : "n"}`
    )
    d(`[${ADDON_NAME}]   activeStep="${activeStepText}"`)
    const numConditions = GetJournalQuestNumConditions(i, 1)
    for (let j = 1; j <= numConditions; j++) {
      const [condText, current, max, , condComplete] = GetJournalQuestConditionInfo(i, 1, j)
      const [, , condCraftType] = GetQuestConditionItemInfo(i, 1, j)
      d(
        `[${ADDON_NAME}]   cond#${j} "${condText}" ${current}/${max} complete=${condComplete ? "y" : "n"} craftType=${condCraftType}`
      )
    }
  }
  if (matched === 0) d(`[${ADDON_NAME}] no daily crafting writs in journal`)
}

export function reconcileDailyWritStates(charEntry: SavedCharacterEntry): DailyWritJournalScan {
  const today = getEsoDayStringFromSec(GetTimeStamp())
  const scan = scanDailyWritJournal()
  charEntry.dailyWritStates = nextDailyWritReconcile(charEntry.dailyWritStates, today, scan)
  return scan
}
