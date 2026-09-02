import {
  saveAccountSkillMorphProgress,
  saveSkillMorphProgress,
} from "@akasha/temper-characters-skills-morphs-addon/skill-morph-tracking"
import { ADDON_NAME } from "@akasha/temper-player-completion-state/completion-addon-constants"
import { collectMotifKnowledge } from "@akasha/temper-player-completion-state/completion-motif-knowledge"
import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { collectAchievements } from "../characters-achievements/characters-achievements.module.code.ts"
import { collectAllianceRank } from "../characters-alliance-rank/characters-alliance-rank.module.code.ts"
import { refreshAllAntiquityLore } from "../characters-antiquity-lore/characters-antiquity-lore.module.code.ts"
import { collectBagSize } from "../characters-bag-size/characters-bag-size.module.code.ts"
import { collectCadwell } from "../characters-cadwell/characters-cadwell.module.code.ts"
import { refreshAllCollectibles } from "../characters-collectibles/characters-collectibles.module.code.ts"
import { getCharactersConfig } from "../characters-config/characters-config.module.code.ts"
import { currentCharacterEntry } from "../characters-current-entry/characters-current-entry.module.code.ts"
import { refreshAllItemSets } from "../characters-item-sets/characters-item-sets.module.code.ts"
import { saveCharacterList } from "../characters-list/characters-list.module.code.ts"
import { collectLoreLibrary } from "../characters-lore-library/characters-lore-library.module.code.ts"
import { collectMountTraining } from "../characters-mount-training/characters-mount-training.module.code.ts"
import { captureAndSaveCharacterStats } from "../characters-player-stats/characters-player-stats.module.code.ts"
import { collectPointsOfInterest } from "../characters-points-of-interest/characters-points-of-interest.module.code.ts"
import { collectQuests } from "../characters-quests/characters-quests.module.code.ts"
import { refreshAllRecipes } from "../characters-recipes/characters-recipes.module.code.ts"
import { collectScribing } from "../characters-scribing/characters-scribing.module.code.ts"
import {
  saveAccountSkillLineProgress,
  saveSkillLineProgress,
} from "../characters-skill-lines/characters-skill-lines.module.code.ts"
import { updateSkillPoints } from "../characters-skill-points/characters-skill-points.module.code.ts"
import { getCompletionKey } from "../characters-task-auto-complete/characters-task-auto-complete.module.code.ts"
import { refreshTaskHud } from "../characters-task-hud/characters-task-hud.module.code.ts"
import { refreshAllTraitResearch } from "../characters-trait-research/characters-trait-research.module.code.ts"
import { refreshAllTributeCardUpgrades } from "../characters-tribute-card-upgrades/characters-tribute-card-upgrades.module.code.ts"
import { collectZoneCompletion } from "../characters-zone-completion/characters-zone-completion.module.code.ts"

const SLASH_COMMAND_LISTINGS = [
  { name: "/temperrefresh", description: "Refresh all completion data" },
  { name: "/temperreset", description: "Reset all saved data" },
  { name: "/tempertaskreset", description: "Clear a task's completion" },
]

export function refreshAllData(): undefined {
  const savedVars = getSavedVariables()

  captureAndSaveCharacterStats()
  saveCharacterList()

  const charEntry = currentCharacterEntry()
  if (charEntry !== undefined) {
    charEntry.skillLineProgress = undefined
    charEntry.achievements = undefined
    charEntry.scribing = undefined
    charEntry.quests = undefined
  }
  savedVars.account.subclassingSkillLineProgress = undefined

  saveSkillLineProgress()
  saveSkillMorphProgress()
  saveAccountSkillLineProgress()
  saveAccountSkillMorphProgress()
  collectAchievements()
  collectLoreLibrary()
  refreshAllRecipes()
  collectScribing()
  updateSkillPoints()
  refreshAllTraitResearch()
  refreshAllItemSets()
  refreshAllAntiquityLore()
  refreshAllCollectibles()
  refreshAllTributeCardUpgrades()
  collectQuests()
  collectCadwell()
  collectZoneCompletion()
  collectPointsOfInterest()
  collectMountTraining()
  collectBagSize()
  collectAllianceRank()
  collectMotifKnowledge()
  savedVars.account.championPointsEarned = GetPlayerChampionPointsEarned()

  globalThis.TemperCompanions_RefreshAllData?.()
}

export function onTemperRefreshCommand(this: void): undefined {
  d("[Temper] Refreshing all data...")
  refreshAllData()
  d("[Temper] All data refreshed")
}

export function onTemperResetCommand(this: void): undefined {
  d("[Temper] Resetting all saved variables...")

  const savedVars = getSavedVariables()
  savedVars.navigation = { selectedTab: "character", selectedSubTab: "character-character" }
  savedVars.characters = {}
  savedVars.account = { achievements: {} }

  globalThis.TemperCompanions_ResetAllData?.()

  refreshAllData()
  d("[Temper] All data refreshed")
  d("[Temper] Reset complete")
}

export function resetTaskCompletion(id: string): number {
  const sv = getSavedVariables()
  let cleared = 0
  for (const [taskId, task] of Object.entries(getCharactersConfig().tasks)) {
    if (taskId !== id && task.completionCardId !== id) continue
    const key = getCompletionKey(taskId, task)
    if (sv.completions[key] !== undefined) {
      delete sv.completions[key]
      cleared++
    }
    if (sv.taskProgressSnapshots[key] !== undefined) {
      delete sv.taskProgressSnapshots[key]
    }
  }
  return cleared
}

export function onTemperTaskResetCommand(this: void, args: string): undefined {
  const id = args.trim()
  if (id === "") {
    d("[Temper] Usage: /tempertaskreset <taskId | completionCardId>")
    return
  }
  const cleared = resetTaskCompletion(id)
  if (cleared === 0) {
    d(`[Temper] No completions cleared — no task matched "${id}" or none were complete.`)
    return
  }
  d(`[Temper] Cleared ${cleared} completion(s) matching "${id}".`)
  refreshTaskHud()
}

export function registerCommands(): undefined {
  SLASH_COMMANDS["/temperrefresh"] = onTemperRefreshCommand
  SLASH_COMMANDS["/temperreset"] = onTemperResetCommand
  SLASH_COMMANDS["/tempertaskreset"] = onTemperTaskResetCommand

  for (const listing of SLASH_COMMAND_LISTINGS) {
    globalThis.TemperHud?.registerCommand({
      name: listing.name,
      description: listing.description,
      addon: ADDON_NAME,
    })
  }
}
