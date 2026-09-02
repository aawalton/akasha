import { resolveSkillMorphs } from "@akasha/temper-characters-skills-morphs-addon/skill-morph-task-progress"
import type { AccountCompletion } from "@akasha/temper-completion/completion-record"
import { getEsoDayStringFromSec } from "@akasha/temper-dungeons/eso-reset"
import { applyCompletionOverrides } from "@akasha/temper-player-completion/apply-completion-overrides"
import {
  getSavedVariables,
  type SavedCharacterEntry,
  type TaskData,
} from "@akasha/temper-player-completion-state/completion-saved-variables"
import type { TaskProgress } from "@akasha/temper-player-completion-state/completion-task-progress"
import { getCompletionOverridesForCharacter } from "../characters-config/characters-config.module.code.ts"
import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"
import {
  HIRELING_MAILS_DAILY_TARGET,
  hirelingCountForToday,
} from "../characters-hireling-mail-count/characters-hireling-mail-count.module.code.ts"
import {
  resolveAccountAchievements,
  resolveCharacterAchievements,
} from "../characters-task-progress-resolver-achievements/characters-task-progress-resolver-achievements.module.code.ts"
import {
  resolveDailyWrits,
  resolveRecipes,
  resolveScribing,
} from "../characters-task-progress-resolver-knowledge/characters-task-progress-resolver-knowledge.module.code.ts"
import {
  resolveSkillLines,
  resolveSkillPoints,
} from "../characters-task-progress-resolver-skills/characters-task-progress-resolver-skills.module.code.ts"
import {
  resolveAntiquityLore,
  resolveCadwell,
  resolveCompanionQuests,
  resolveCompanionRapport,
  resolveLoreLibrary,
  resolveMountTraining,
  resolveTraitResearch,
} from "../characters-task-progress-resolver-world/characters-task-progress-resolver-world.module.code.ts"

export function resolveTaskProgressForCharacter(
  charData: SavedCharacterEntry | undefined,
  account: AccountCompletion,
  task: TaskData,
  charId: string
): TaskProgress | undefined {
  const cardId = task.completionCardId
  if (cardId === undefined) return undefined

  const overridden =
    charData === undefined
      ? undefined
      : applyCompletionOverrides(charData, getCompletionOverridesForCharacter(charId))

  if (cardId === "daily-writs") {
    return resolveDailyWrits(overridden)
  }
  if (cardId === "mount-training") {
    return resolveMountTraining(overridden, task.completionItemPath)
  }
  if (cardId === "trait-research") {
    return resolveTraitResearch(overridden, task.completionItemPath)
  }
  if (cardId === "recipes") {
    return resolveRecipes(overridden, task.completionItemPath)
  }
  if (cardId === "scribing-knowledge") {
    return resolveScribing(overridden, task.completionItemPath)
  }
  if (cardId === "character-achievements") {
    return resolveCharacterAchievements(overridden, task.completionItemPath)
  }
  if (cardId === "account-achievements") {
    return resolveAccountAchievements(account, task.completionItemPath)
  }
  if (cardId === "cadwells-almanac") {
    return resolveCadwell(overridden, task.completionItemPath)
  }
  if (cardId === "companion-quests") {
    return resolveCompanionQuests(overridden, task.completionItemPath)
  }
  if (cardId === "companion-rapport-character") {
    return resolveCompanionRapport(overridden, task.completionItemPath)
  }
  if (cardId === "skill-lines") {
    return resolveSkillLines(overridden, task.completionItemPath)
  }
  if (cardId === "skill-morphs") {
    return resolveSkillMorphs(overridden, task.completionItemPath)
  }
  if (cardId === "skill-points") {
    return resolveSkillPoints(overridden, task.completionItemPath)
  }
  if (cardId === "antiquity-lore") {
    return resolveAntiquityLore(account)
  }
  if (cardId === "lore-library-character") {
    return resolveLoreLibrary(overridden, task.completionItemPath)
  }
  if (cardId === "antiquity-leads-motifs" || cardId === "antiquity-leads-legendary") {
    return undefined
  }
  if (cardId === "guild-sales") {
    const today = getEsoDayStringFromSec(GetTimeStamp())
    if (getSavedVariables().guildSalesPostedDate === today) {
      return { current: 1, total: 1 }
    }
    return { current: 0, total: 1 }
  }
  if (cardId === "hireling-mails") {
    const today = getEsoDayStringFromSec(GetTimeStamp())
    return {
      current: hirelingCountForToday(getSavedVariables().hirelingMails, today),
      total: HIRELING_MAILS_DAILY_TARGET,
    }
  }

  return undefined
}

export function resolveTaskProgress(task: TaskData): TaskProgress | undefined {
  return resolveTaskProgressForCharacter(
    currentCharacterEntry(),
    getSavedVariables().account,
    task,
    GetCurrentCharacterId()
  )
}
