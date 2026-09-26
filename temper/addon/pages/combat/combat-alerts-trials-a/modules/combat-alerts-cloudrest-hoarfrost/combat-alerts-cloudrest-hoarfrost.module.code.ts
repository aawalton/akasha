import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-core/combat-alerts-alerts-core.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-prominent/combat-alerts-alerts-prominent.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
  type EffectChangedCallback,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const C = CRUTCH.Constants

export const FROST_UNIQUE_NAME = "CrutchAlertsCRHoarfrost"
const TIME_UNTIL_DROP = 5800
export const HOARFROST_ID = 103695
export const HOARFROST_EXECUTE_ID = 110516
export const HOARFROST_CAST_ID = 105151
export const HOARFROST_CAST_EXECUTE_ID = 110466

const NUM_FROSTS: Record<number, number> = {
  [HOARFROST_ID]: 0,
  [HOARFROST_EXECUTE_ID]: 0,
}

export function resetFrosts(this: void): undefined {
  NUM_FROSTS[HOARFROST_ID] = 0
  NUM_FROSTS[HOARFROST_EXECUTE_ID] = 0
}

let frostDropCallLaterId: number | undefined
function onFrostDroppable(this: void, abilityId: number): undefined {
  frostDropCallLaterId = undefined

  if (CRUTCH.savedOptions.cloudrest.showFrostAlert) {
    const num = NUM_FROSTS[abilityId] as number
    const label = zo_strformat(
      "|c8ef5f5Drop <<C:1>> (<<2>>) |cFF0000now!|r",
      GetAbilityName(abilityId),
      num === 3 ? "last" : num
    )
    CRUTCH.DisplayNotification(abilityId, label, 9000 - TIME_UNTIL_DROP, 0, 0, 0, 0, 0, 0, 0, false)
  }

  if (CRUTCH.savedOptions.cloudrest.dropFrostProminent) {
    CRUTCH.DisplayProminent(C.ID.DROP_FROST)
  }
}

export const onHoarfrost: EffectChangedCallback = (
  _eventCode,
  changeType,
  _effectSlot,
  _effectName,
  unitTag,
  _beginTime,
  _endTime,
  _stackCount,
  _iconName,
  _buffType,
  _effectType,
  _abilityType,
  _statusEffectType,
  _unitName,
  _unitId,
  abilityId
) => {
  if (changeType === EFFECT_RESULT_FADED) {
    CRUTCH.InterruptAbility(abilityId, true)
    CRUTCH.RemoveAttachedIconForUnit(unitTag, FROST_UNIQUE_NAME)

    if (AreUnitsEqual(unitTag, "player") && frostDropCallLaterId !== undefined) {
      zo_removeCallLater(frostDropCallLaterId)
    }
  } else if (changeType === EFFECT_RESULT_GAINED) {
    let num = (NUM_FROSTS[abilityId] as number) + 1
    if (num === 4) {
      num = 1
    }
    NUM_FROSTS[abilityId] = num
    CRUTCH.dbgOther(`${GetUnitDisplayName(unitTag)} got hoarfrost #${num}`)

    if (AreUnitsEqual(unitTag, "player")) {
      if (CRUTCH.savedOptions.cloudrest.showFrostAlert) {
        const label = zo_strformat(
          "|c8ef5f5Drop <<C:1>> (<<2>>) in|r",
          GetAbilityName(abilityId),
          num === 3 ? "last" : num
        )
        CRUTCH.DisplayNotification(abilityId, label, TIME_UNTIL_DROP, 0, 0, 0, 0, 0, 0, 0, false)
      }

      frostDropCallLaterId = zo_callLater(() => {
        onFrostDroppable(abilityId)
      }, TIME_UNTIL_DROP)
    }

    if (CRUTCH.savedOptions.cloudrest.showFrostIcons) {
      CRUTCH.SetAttachedIconForUnit(
        unitTag,
        FROST_UNIQUE_NAME,
        C.PRIORITY.MECHANIC_1_PRIORITY,
        "esoui/art/icons/heraldrycrests_misc_snowflake_01.dds",
        undefined,
        [0, 0.9, 1]
      )
    }
  }
}

const HOARFROST_CAST_TO_ID: Record<number, number> = {
  [HOARFROST_CAST_ID]: HOARFROST_ID,
  [HOARFROST_CAST_EXECUTE_ID]: HOARFROST_EXECUTE_ID,
}
export const onHoarfrostCast: CombatEventCallback = (
  _eventCode,
  result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  _targetName,
  _targetType,
  _hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  _targetUnitId,
  abilityId
) => {
  if (result === ACTION_RESULT_EFFECT_GAINED) {
    const frostId = HOARFROST_CAST_TO_ID[abilityId] as number
    NUM_FROSTS[frostId] = 0
    CRUTCH.dbgOther(`resetting frost ${frostId}`)
  }
}

export const onVoltaicInitialDuration: CombatEventCallback = (
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  _targetName,
  _targetType,
  hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  _targetUnitId,
  abilityId
) => {
  CRUTCH.DisplayNotification(
    abilityId,
    zo_strformat("<<C:1>>", GetAbilityName(abilityId)),
    hitValue,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    false
  )
  CRUTCH.PlayMultiSound(SOUNDS.DUEL_BOUNDARY_WARNING as string, 3, 3, 1000)
}

export const onShedHoarfrost: CombatEventCallback = (
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  _targetName,
  _targetType,
  _hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  targetUnitId
) => {
  const unitTag = CRUTCH.groupIdToTag[targetUnitId]
  CRUTCH.msg(zo_strformat("shed hoarfrost |cFF00FF<<1>>", GetUnitDisplayName(unitTag as string)))
}

export const onAmplificationChanged: EffectChangedCallback = (
  _eventCode,
  changeType,
  _effectSlot,
  _effectName,
  unitTag,
  _beginTime,
  _endTime,
  stackCount
) => {
  if (changeType === EFFECT_RESULT_GAINED) {
    CRUTCH.msg(
      zo_strformat("|c00FFFF<<1>> |cAAAAAAgained Amplification", GetUnitDisplayName(unitTag))
    )
  } else if (changeType === EFFECT_RESULT_FADED) {
    CRUTCH.msg(
      zo_strformat(
        "|c00FFFF<<1>> |cAAAAAAlost Amplification at x<<2>>",
        GetUnitDisplayName(unitTag),
        stackCount
      )
    )
  }
}
