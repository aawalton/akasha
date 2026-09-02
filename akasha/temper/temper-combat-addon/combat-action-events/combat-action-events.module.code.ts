import { handleAbilityUsed } from "@akasha/temper-combat-addon/combat-action-cast"
import type { CombatEvent } from "@akasha/temper-combat-addon/combat-action-combat-events"
import {
  handleCombatEvent,
  handlePlayerCombatEvent,
} from "@akasha/temper-combat-addon/combat-action-combat-events"
import { registerCruxDiagnostics } from "@akasha/temper-combat-addon/combat-action-crux-record"
import {
  decodeEffectChange,
  handleEffectChanged,
} from "@akasha/temper-combat-addon/combat-action-effect-changes"
import {
  onActionUpdateCooldowns,
  onMountedStateChanged,
  onPlayerActivated,
} from "@akasha/temper-combat-addon/combat-action-event-handlers"
import { powerLashPoll } from "@akasha/temper-combat-addon/combat-action-power-lash"
import { refineTick } from "@akasha/temper-combat-addon/combat-action-refine"
import { getNow } from "@akasha/temper-combat-addon/combat-action-slots"
import { handleReticleTargetChanged } from "@akasha/temper-combat-addon/combat-action-target"
import { ADDON_NAME } from "@akasha/temper-combat-addon/combat-actions-constants"

const POWER_LASH_UPDATE = ADDON_NAME + "_PowerLash"
const REFINE_UPDATE = ADDON_NAME + "_Update"

const PATCH_ICON_KEYWORDS = ["minor_lifesteal", "minor_magickasteal"] as const

function decodeCombatEvent(
  result: number,
  abilityName: string,
  sourceType: number,
  targetType: number,
  hitValue: number,
  targetUnitId: number,
  abilityId: number
): CombatEvent {
  return {
    result,
    abilityId,
    abilityName,
    iconName: GetAbilityIcon(abilityId),
    sourceType,
    targetType,
    hitValue,
    unitId: targetUnitId,
  }
}

function registerEffectChanged(): undefined {
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME,
    EVENT_EFFECT_CHANGED,
    function (
      this: void,
      _eventCode: number,
      changeType: number,
      _effectSlot: number,
      effectName: string,
      unitTag: string,
      beginTime: number,
      endTime: number,
      stackCount: number,
      iconName: string,
      _buffType: string,
      effectType: number,
      _abilityType: number,
      _statusEffectType: number,
      _unitName: string,
      unitId: number,
      abilityId: number,
      _sourceType: number
    ): undefined {
      handleEffectChanged(
        decodeEffectChange(
          changeType,
          effectName,
          unitTag,
          beginTime,
          endTime,
          stackCount,
          iconName,
          effectType,
          unitId,
          abilityId
        ),
        getNow()
      )
    }
  )
  EVENT_MANAGER.AddFilterForEvent(
    ADDON_NAME,
    EVENT_EFFECT_CHANGED,
    REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
    COMBAT_UNIT_TYPE_PLAYER
  )

  const petName = ADDON_NAME + "_pet"
  EVENT_MANAGER.RegisterForEvent(
    petName,
    EVENT_EFFECT_CHANGED,
    function (
      this: void,
      _eventCode: number,
      changeType: number,
      _effectSlot: number,
      effectName: string,
      unitTag: string,
      beginTime: number,
      endTime: number,
      stackCount: number,
      iconName: string,
      _buffType: string,
      effectType: number,
      _abilityType: number,
      _statusEffectType: number,
      _unitName: string,
      unitId: number,
      abilityId: number,
      _sourceType: number
    ): undefined {
      handleEffectChanged(
        decodeEffectChange(
          changeType,
          effectName,
          unitTag,
          beginTime,
          endTime,
          stackCount,
          iconName,
          effectType,
          unitId,
          abilityId
        ),
        getNow()
      )
    }
  )
  EVENT_MANAGER.AddFilterForEvent(
    petName,
    EVENT_EFFECT_CHANGED,
    REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
    COMBAT_UNIT_TYPE_PLAYER_PET
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME + "_patch",
    EVENT_EFFECT_CHANGED,
    function (
      this: void,
      _eventCode: number,
      changeType: number,
      _effectSlot: number,
      effectName: string,
      unitTag: string,
      beginTime: number,
      endTime: number,
      stackCount: number,
      iconName: string,
      _buffType: string,
      effectType: number,
      _abilityType: number,
      _statusEffectType: number,
      _unitName: string,
      unitId: number,
      abilityId: number,
      sourceType: number
    ): undefined {
      if (sourceType !== COMBAT_UNIT_TYPE_NONE && sourceType !== COMBAT_UNIT_TYPE_TARGET_DUMMY) {
        return undefined
      }
      let matched = false
      for (const keyword of PATCH_ICON_KEYWORDS) {
        if (iconName.includes(keyword)) {
          matched = true
        }
      }
      if (!matched) {
        return undefined
      }
      handleEffectChanged(
        decodeEffectChange(
          changeType,
          effectName,
          unitTag,
          beginTime,
          endTime,
          stackCount,
          iconName,
          effectType,
          unitId,
          abilityId
        ),
        getNow()
      )
    }
  )
  return undefined
}

function registerCombatEvent(): undefined {
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME,
    EVENT_COMBAT_EVENT,
    function (
      this: void,
      _eventCode: number,
      result: number,
      _isError: boolean,
      abilityName: string,
      _abilityGraphic: number,
      _abilityActionSlotType: number,
      _sourceName: string,
      sourceType: number,
      _targetName: string,
      targetType: number,
      hitValue: number,
      _powerType: number,
      _damageType: number,
      _log: boolean,
      _sourceUnitId: number,
      targetUnitId: number,
      abilityId: number,
      _overflow: number
    ): undefined {
      handleCombatEvent(
        decodeCombatEvent(
          result,
          abilityName,
          sourceType,
          targetType,
          hitValue,
          targetUnitId,
          abilityId
        ),
        getNow()
      )
    }
  )

  const fromPlayerName = ADDON_NAME + "_fromPlayer"
  EVENT_MANAGER.RegisterForEvent(
    fromPlayerName,
    EVENT_COMBAT_EVENT,
    function (
      this: void,
      _eventCode: number,
      result: number,
      _isError: boolean,
      abilityName: string,
      _abilityGraphic: number,
      _abilityActionSlotType: number,
      _sourceName: string,
      sourceType: number,
      _targetName: string,
      targetType: number,
      hitValue: number,
      _powerType: number,
      _damageType: number,
      _log: boolean,
      _sourceUnitId: number,
      targetUnitId: number,
      abilityId: number,
      _overflow: number
    ): undefined {
      handlePlayerCombatEvent(
        decodeCombatEvent(
          result,
          abilityName,
          sourceType,
          targetType,
          hitValue,
          targetUnitId,
          abilityId
        ),
        getNow()
      )
    }
  )
  EVENT_MANAGER.AddFilterForEvent(
    fromPlayerName,
    EVENT_COMBAT_EVENT,
    REGISTER_FILTER_SOURCE_COMBAT_UNIT_TYPE,
    COMBAT_UNIT_TYPE_PLAYER
  )
  return undefined
}

export function registerEngineEvents(): undefined {
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME,
    EVENT_ACTION_SLOT_ABILITY_USED,
    function (this: void, _eventCode: number, actionSlotIndex: number): undefined {
      handleAbilityUsed(actionSlotIndex, getNow())
    }
  )

  registerEffectChanged()
  registerCruxDiagnostics()
  registerCombatEvent()

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME,
    EVENT_RETICLE_TARGET_CHANGED,
    function (this: void, _eventCode: number): undefined {
      handleReticleTargetChanged(getNow())
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME,
    EVENT_PLAYER_ACTIVATED,
    function (this: void, _eventCode: number, _initial: boolean): undefined {
      onPlayerActivated()
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME,
    EVENT_ACTION_UPDATE_COOLDOWNS,
    function (this: void, _eventCode: number): undefined {
      onActionUpdateCooldowns(getNow())
    }
  )

  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME,
    EVENT_MOUNTED_STATE_CHANGED,
    function (this: void, _eventCode: number, mounted: boolean): undefined {
      onMountedStateChanged(mounted, getNow())
    }
  )

  EVENT_MANAGER.RegisterForUpdate(REFINE_UPDATE, 100, function (this: void): undefined {
    refineTick(getNow())
  })
  EVENT_MANAGER.RegisterForUpdate(POWER_LASH_UPDATE, 200, function (this: void): undefined {
    powerLashPoll(getNow())
  })
  return undefined
}
