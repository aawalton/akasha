import "akasha/temper/addon/pages/characters/modules/characters-public-api/characters-public-api.module.code.ts"

import { collectAchievements } from "akasha/temper/addon/pages/characters/modules/characters-achievements/characters-achievements.module.code.ts"
import { collectAllianceRank } from "akasha/temper/addon/pages/characters/modules/characters-alliance-rank/characters-alliance-rank.module.code.ts"
import { collectAntiquityLore } from "akasha/temper/addon/pages/characters/modules/characters-antiquity-lore/characters-antiquity-lore.module.code.ts"
import { collectBagSize } from "akasha/temper/addon/pages/characters/modules/characters-bag-size/characters-bag-size.module.code.ts"
import { collectCadwell } from "akasha/temper/addon/pages/characters/modules/characters-cadwell/characters-cadwell.module.code.ts"
import { collectCollectibles } from "akasha/temper/addon/pages/characters/modules/characters-collectibles/characters-collectibles.module.code.ts"
import { registerCommands } from "akasha/temper/addon/pages/characters/modules/characters-command/characters-command.module.code.ts"
import { currentCharacterEntry } from "akasha/temper/addon/pages/characters/modules/characters-current-entry/characters-current-entry.module.code.ts"
import {
  probeDailyWrits,
  reconcileDailyWritStates,
} from "akasha/temper/addon/pages/characters/modules/characters-daily-writs/characters-daily-writs.module.code.ts"
import { registerBuildEvents } from "akasha/temper/addon/pages/characters/modules/characters-events-build/characters-events-build.module.code.ts"
import { registerCompletionKnowledgeEvents } from "akasha/temper/addon/pages/characters/modules/characters-events-knowledge/characters-events-knowledge.module.code.ts"
import { registerCompletionWorldEvents } from "akasha/temper/addon/pages/characters/modules/characters-events-world/characters-events-world.module.code.ts"
import { registerHirelingMailSubscriber } from "akasha/temper/addon/pages/characters/modules/characters-hireling-mail-subscriber/characters-hireling-mail-subscriber.module.code.ts"
import { collectItemSets } from "akasha/temper/addon/pages/characters/modules/characters-item-sets/characters-item-sets.module.code.ts"
import { saveCharacterList } from "akasha/temper/addon/pages/characters/modules/characters-list/characters-list.module.code.ts"
import { collectLoreLibrary } from "akasha/temper/addon/pages/characters/modules/characters-lore-library/characters-lore-library.module.code.ts"
import { runMigrations } from "akasha/temper/addon/pages/characters/modules/characters-migrations/characters-migrations.module.code.ts"
import { collectMountTraining } from "akasha/temper/addon/pages/characters/modules/characters-mount-training/characters-mount-training.module.code.ts"
import { captureAndSaveCharacterStats } from "akasha/temper/addon/pages/characters/modules/characters-player-stats/characters-player-stats.module.code.ts"
import { collectPointsOfInterest } from "akasha/temper/addon/pages/characters/modules/characters-points-of-interest/characters-points-of-interest.module.code.ts"
import { collectQuests } from "akasha/temper/addon/pages/characters/modules/characters-quests/characters-quests.module.code.ts"
import { collectRecipes } from "akasha/temper/addon/pages/characters/modules/characters-recipes/characters-recipes.module.code.ts"
import { collectScribing } from "akasha/temper/addon/pages/characters/modules/characters-scribing/characters-scribing.module.code.ts"
import {
  saveAccountSkillLineProgress,
  saveSkillLineProgress,
} from "akasha/temper/addon/pages/characters/modules/characters-skill-lines/characters-skill-lines.module.code.ts"
import { updateSkillPoints } from "akasha/temper/addon/pages/characters/modules/characters-skill-points/characters-skill-points.module.code.ts"
import {
  cleanStaleCompletions,
  scheduleTaskAutoCompletionCheck,
} from "akasha/temper/addon/pages/characters/modules/characters-task-auto-complete/characters-task-auto-complete.module.code.ts"
import { initializeTaskHud } from "akasha/temper/addon/pages/characters/modules/characters-task-hud/characters-task-hud.module.code.ts"
import { collectTraitResearch } from "akasha/temper/addon/pages/characters/modules/characters-trait-research/characters-trait-research.module.code.ts"
import { collectTributeCardUpgrades } from "akasha/temper/addon/pages/characters/modules/characters-tribute-card-upgrades/characters-tribute-card-upgrades.module.code.ts"
import { toggleWindow } from "akasha/temper/addon/pages/characters/modules/characters-window/characters-window.module.code.ts"
import { collectZoneCompletion } from "akasha/temper/addon/pages/characters/modules/characters-zone-completion/characters-zone-completion.module.code.ts"
import {
  saveAccountSkillMorphProgress,
  saveSkillMorphProgress,
} from "akasha/temper/capture/characters-skills-morphs-addon/modules/skill-morph-tracking/skill-morph-tracking.module.code.ts"
import { registerAddonInit } from "akasha/temper/modules/addon-init/addon-init.module.code.ts"
import {
  finishPerfTrace,
  startPerfTrace,
} from "akasha/temper/modules/perf-trace/perf-trace.module.code.ts"
import { initializeSkillPointFinder } from "akasha/temper/player/character/skill/skill-point-finder/modules/skill-point-finder-init/skill-point-finder-init.module.code.ts"
import { ADDON_NAME } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-addon-constants/completion-addon-constants.module.code.ts"
import { collectMotifKnowledge } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-motif-knowledge/completion-motif-knowledge.module.code.ts"
import {
  getSavedVariables,
  initializeSavedVariables,
  pruneDeletedCharacters,
} from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-hud-global/temper-hud-global.type-declaration.d.ts"

const FIRST_READ_DELAY_MS = 3000

function readEverythingOnce(this: void): undefined {
  saveSkillLineProgress()
  saveSkillMorphProgress()
  saveAccountSkillLineProgress()
  saveAccountSkillMorphProgress()
  collectAchievements()
  collectLoreLibrary()
  collectRecipes()
  collectScribing()
  updateSkillPoints()
  collectQuests()
  collectItemSets()
  collectTraitResearch()
  collectAntiquityLore()
  collectCadwell()
  collectCollectibles()
  collectTributeCardUpgrades()
  collectZoneCompletion()
  collectPointsOfInterest()
  collectMountTraining()
  collectBagSize()
  collectAllianceRank()
  collectMotifKnowledge()

  const charEntry = currentCharacterEntry()
  if (charEntry !== undefined) reconcileDailyWritStates(charEntry)

  const savedVars = getSavedVariables()
  savedVars.account.championPointsEarned = GetPlayerChampionPointsEarned()
  savedVars.account.bankUpgrade = {
    current: GetCurrentBankUpgrade(),
    max: GetMaxBankUpgrade(),
  }
  scheduleTaskAutoCompletionCheck()
}

function initialize(): undefined {
  const perfStart = startPerfTrace()
  initializeSavedVariables()
  pruneDeletedCharacters()
  registerCommands()

  runMigrations()

  globalThis.TemperHud?.registerCommand({
    name: "characters",
    description: "Toggle the completion tracker window",
    addon: ADDON_NAME,
    handler: toggleWindow,
  })
  SLASH_COMMANDS["/temperwritprobe"] = probeDailyWrits
  globalThis.TemperHud?.registerCommand({
    name: "/temperwritprobe",
    description: "Probe daily writs",
    addon: ADDON_NAME,
  })

  cleanStaleCompletions()

  initializeTaskHud()

  EVENT_MANAGER.RegisterForEvent(
    `${ADDON_NAME}_PlayerActivated`,
    EVENT_PLAYER_ACTIVATED,
    function (this: void): undefined {
      captureAndSaveCharacterStats()
      saveCharacterList()
      zo_callLater(readEverythingOnce, FIRST_READ_DELAY_MS)
    }
  )

  registerBuildEvents()
  registerCompletionKnowledgeEvents()
  registerCompletionWorldEvents()
  registerHirelingMailSubscriber()

  getSavedVariables().perf = finishPerfTrace(ADDON_NAME, perfStart)

  initializeSkillPointFinder()
}

registerAddonInit(ADDON_NAME, initialize)
