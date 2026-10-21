import { noteBuffOnset } from "akasha/temper/addon/pages/characters/modules/characters-active-buffs/characters-active-buffs.module.code.ts"
import { refreshAdvancedStatsReading } from "akasha/temper/addon/pages/characters/modules/characters-advanced-stats/characters-advanced-stats.module.code.ts"
import { registerElderDragonPairing } from "akasha/temper/addon/pages/characters/modules/characters-elder-dragon-pairing/characters-elder-dragon-pairing.module.code.ts"
import { noteFeteChanged } from "akasha/temper/addon/pages/characters/modules/characters-escalating-fete/characters-escalating-fete.module.code.ts"
import { capturePassiveTrace } from "akasha/temper/addon/pages/characters/modules/characters-passive-trace/characters-passive-trace.module.code.ts"
import { captureAndSaveCharacterStats } from "akasha/temper/addon/pages/characters/modules/characters-player-stats/characters-player-stats.module.code.ts"
import {
  captureReportedStats,
  keepPairedReading,
} from "akasha/temper/addon/pages/characters/modules/characters-reported-stats/characters-reported-stats.module.code.ts"
import {
  updateAccountSkillLineProgress,
  updateSkillLineProgress,
} from "akasha/temper/addon/pages/characters/modules/characters-skill-lines/characters-skill-lines.module.code.ts"
import { scheduleTaskAutoCompletionCheck } from "akasha/temper/addon/pages/characters/modules/characters-task-auto-complete/characters-task-auto-complete.module.code.ts"
import {
  saveSkillMorphProgress,
  updateAccountSkillMorphProgress,
  updateSkillMorphProgress,
} from "akasha/temper/capture/characters-skills-morphs-addon/modules/skill-morph-tracking/skill-morph-tracking.module.code.ts"
import { ADDON_NAME } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-addon-constants/completion-addon-constants.module.code.ts"
import "akasha/temper/eso/type/eso-enums-02/eso-enums-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"

const BUILD_CAPTURE_UPDATE = ADDON_NAME + "_BuildCaptureDelay"

function scheduleBuildCapture(): undefined {
  EVENT_MANAGER.UnregisterForUpdate(BUILD_CAPTURE_UPDATE)
  EVENT_MANAGER.RegisterForUpdate(BUILD_CAPTURE_UPDATE, 500, function (this: void): undefined {
    EVENT_MANAGER.UnregisterForUpdate(BUILD_CAPTURE_UPDATE)
    captureAndSaveCharacterStats()
    captureReportedStats()
    capturePassiveTrace()
    refreshAdvancedStatsReading()
  })
}

function onSkillLineChanged(this: void, skillType: number, skillLineIndex: number): undefined {
  updateSkillLineProgress(skillType, skillLineIndex)
  updateSkillMorphProgress(skillType, skillLineIndex)
  updateAccountSkillLineProgress(skillType, skillLineIndex)
  updateAccountSkillMorphProgress(skillType, skillLineIndex)
}

function onSkillsRebuilt(this: void): undefined {
  scheduleBuildCapture()
  saveSkillMorphProgress()
  scheduleTaskAutoCompletionCheck()
}

function onBuildTouched(this: void): undefined {
  scheduleBuildCapture()
}

function onPlayerEffectChanged(
  this: void,
  _event: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  _unitTag: string,
  _beginTime: number,
  _endTime: number,
  stackCount: number,
  _iconName: string,
  _buffType: string,
  _effectType: number,
  _abilityType: number,
  _statusEffectType: number,
  _unitName: string,
  _unitId: number,
  abilityId: number
): undefined {
  noteFeteChanged(changeType, stackCount, abilityId)
  noteBuffOnset(changeType, abilityId)
  if (changeType === EFFECT_RESULT_GAINED || changeType === EFFECT_RESULT_FADED) {
    scheduleBuildCapture()
  }
}

export function registerBuildEvents(): undefined {
  registerElderDragonPairing(keepPairedReading)

  const equipEventName = ADDON_NAME + "_EquipmentChanged"
  EVENT_MANAGER.RegisterForEvent(equipEventName, EVENT_INVENTORY_SINGLE_SLOT_UPDATE, onBuildTouched)
  EVENT_MANAGER.AddFilterForEvent(
    equipEventName,
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    REGISTER_FILTER_BAG_ID,
    BAG_WORN
  )

  const effectEventName = ADDON_NAME + "_PlayerEffectChanged"
  EVENT_MANAGER.RegisterForEvent(effectEventName, EVENT_EFFECT_CHANGED, onPlayerEffectChanged)
  EVENT_MANAGER.AddFilterForEvent(
    effectEventName,
    EVENT_EFFECT_CHANGED,
    REGISTER_FILTER_UNIT_TAG,
    "player"
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_HotbarsUpdated",
    EVENT_ACTION_SLOTS_ALL_HOTBARS_UPDATED,
    function (this: void): undefined {
      scheduleBuildCapture()
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_BuildOnActivated",
    EVENT_PLAYER_ACTIVATED,
    onBuildTouched
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_WeaponPairChanged",
    EVENT_ACTIVE_WEAPON_PAIR_CHANGED,
    onBuildTouched
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_ChampionPurchase",
    EVENT_CHAMPION_PURCHASE_RESULT,
    onBuildTouched
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_AttributeUpdated",
    EVENT_ATTRIBUTE_UPGRADE_UPDATED,
    onBuildTouched
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_SkillBuildSelection",
    EVENT_SKILL_BUILD_SELECTION_UPDATED,
    onSkillsRebuilt
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_SkillsFullUpdate",
    EVENT_SKILLS_FULL_UPDATE,
    onSkillsRebuilt
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_SkillXPUpdate",
    EVENT_SKILL_XP_UPDATE,
    function (this: void, _event: number, skillType: number, skillLineIndex: number): undefined {
      onSkillLineChanged(skillType, skillLineIndex)
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_AbilityRankUpdate",
    EVENT_ABILITY_PROGRESSION_RANK_UPDATE,
    function (this: void, _event: number, progressionIndex: number): undefined {
      const [skillType, skillLineIndex] =
        GetSkillAbilityIndicesFromProgressionIndex(progressionIndex)
      updateSkillMorphProgress(skillType, skillLineIndex)
      updateAccountSkillMorphProgress(skillType, skillLineIndex)
      scheduleTaskAutoCompletionCheck()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_SkillLineAdded",
    EVENT_SKILL_LINE_ADDED,
    function (this: void, _event: number, skillType: number, skillLineIndex: number): undefined {
      onSkillLineChanged(skillType, skillLineIndex)
    }
  )
}
