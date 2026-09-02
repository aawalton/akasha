import { fireCombatEvent } from "@akasha/temper-combat-addon/combat-lib-callbacks"
import {
  getFormattedAbilityName,
  LIBCOMBAT_EVENT_DAMAGE_OUT,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { prepareFight } from "@akasha/temper-combat-addon/combat-lib-fight"
import { addCombatEvent } from "@akasha/temper-combat-addon/combat-lib-fight-stats"
import {
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_VERBOSE,
  LOG_LEVEL_WARNING,
  log,
} from "@akasha/temper-combat-addon/combat-lib-log"
import type {
  CombatEventHandler,
  DamageShieldEntry,
} from "@akasha/temper-combat-addon/combat-lib-message-types"
import {
  DAMAGE_SHIELD_BUFFER,
  DATA,
  getCurrentFight,
} from "@akasha/temper-combat-addon/combat-lib-state"
import { checkUnit } from "@akasha/temper-combat-addon/combat-lib-units"

const SPECIAL_RESULTS_INVERSE: Record<string, number | undefined> = {
  ACTION_RESULT_BLADETURN: ACTION_RESULT_BLADETURN,
  ACTION_RESULT_BLOCKED_DAMAGE: ACTION_RESULT_BLOCKED_DAMAGE,
  ACTION_RESULT_DIED: ACTION_RESULT_DIED,
  ACTION_RESULT_DIED_XP: ACTION_RESULT_DIED_XP,
  ACTION_RESULT_KILLING_BLOW: ACTION_RESULT_KILLING_BLOW,
  ACTION_RESULT_PARTIAL_RESIST: ACTION_RESULT_PARTIAL_RESIST,
  ACTION_RESULT_PRECISE_DAMAGE: ACTION_RESULT_PRECISE_DAMAGE,
  ACTION_RESULT_REFLECTED: ACTION_RESULT_REFLECTED,
  ACTION_RESULT_REINCARNATING: ACTION_RESULT_REINCARNATING,
  ACTION_RESULT_RESIST: ACTION_RESULT_RESIST,
  ACTION_RESULT_RESURRECT: ACTION_RESULT_RESURRECT,
  ACTION_RESULT_WRECKING_DAMAGE: ACTION_RESULT_WRECKING_DAMAGE,
}

const SPECIAL_RESULTS: Record<number, string> = {}
for (const [name, value] of pairs(SPECIAL_RESULTS_INVERSE)) {
  if (value != null) {
    SPECIAL_RESULTS[value] = name
  }
}

export const onWTF: CombatEventHandler = (
  _eventCode,
  result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  sourceName,
  sourceType,
  targetName,
  targetType,
  hitValue,
  _powerType,
  damageType,
  _log,
  sourceUnitId,
  targetUnitId,
  abilityId
) => {
  const resulttext = SPECIAL_RESULTS[result] ?? tostring(result)

  log(
    "other",
    LOG_LEVEL_VERBOSE,
    "onWTF (%s): %s (%d, %d) / %s (%d, %d) - %s (%d): %d (type: %d)",
    resulttext,
    sourceName,
    sourceUnitId,
    sourceType,
    targetName,
    targetUnitId,
    targetType,
    getFormattedAbilityName(abilityId),
    abilityId,
    hitValue ?? 0,
    damageType ?? 0
  )
  return undefined
}

function checkForShield(
  timems: number,
  sourceUnitId: number,
  targetUnitId: number
): number | undefined {
  for (let i = DAMAGE_SHIELD_BUFFER.length; i >= 1; i--) {
    const entry = DAMAGE_SHIELD_BUFFER[i - 1]
    if (entry === undefined) {
      error("lib-combat: damage shield buffer entry missing")
    }
    const [shieldTimems, shieldSourceUnitId, shieldTargetUnitId, shieldHitValue] = entry

    log(
      "debug",
      LOG_LEVEL_VERBOSE,
      "Eval Shield Index %d: Source: %s, Target: %s, Time: %d",
      i,
      tostring(shieldSourceUnitId === sourceUnitId),
      tostring(shieldTargetUnitId === targetUnitId),
      timems - shieldTimems
    )

    if (
      shieldSourceUnitId === sourceUnitId &&
      shieldTargetUnitId === targetUnitId &&
      timems - shieldTimems < 100
    ) {
      table.remove(DAMAGE_SHIELD_BUFFER, i)

      return shieldHitValue
    }
  }
  return undefined
}

export const onCombatEventShield: CombatEventHandler = (
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
  sourceUnitId,
  targetUnitId
) => {
  const entry: DamageShieldEntry = [GetGameTimeMilliseconds(), sourceUnitId, targetUnitId, hitValue]
  DAMAGE_SHIELD_BUFFER[DAMAGE_SHIELD_BUFFER.length] = entry

  log(
    "debug",
    LOG_LEVEL_DEBUG,
    "Add %d Shield: %d -> %d  (%d)",
    hitValue,
    sourceUnitId,
    targetUnitId,
    DAMAGE_SHIELD_BUFFER.length
  )
  return undefined
}

export function combatEventHandler(
  isheal: boolean,
  _eventCode: number,
  result: number,
  _isError: boolean,
  _abilityName: string,
  _abilityGraphic: number,
  _abilityActionSlotType: number,
  sourceName: string,
  sourceType: number,
  targetName: string,
  targetType: number,
  hitValue: number,
  powerType: number,
  damageType: number,
  _log: boolean,
  sourceUnitId: number,
  targetUnitId: number,
  abilityId: number,
  overflow: number
): undefined {
  if (
    !(sourceUnitId > 0 && targetUnitId > 0) ||
    (DATA.inCombat === false &&
      (result === ACTION_RESULT_DOT_TICK_CRITICAL ||
        result === ACTION_RESULT_DOT_TICK ||
        isheal)) ||
    targetType === 2
  ) {
    return undefined
  }

  const timems = GetGameTimeMilliseconds()

  const shieldHitValue = checkForShield(timems, sourceUnitId, targetUnitId) ?? 0

  if (hitValue + (overflow ?? 0) + shieldHitValue <= 0) {
    return undefined
  }

  checkUnit(sourceName, sourceUnitId, sourceType, timems)
  checkUnit(targetName, targetUnitId, targetType, timems)

  if (result === ACTION_RESULT_DAMAGE_SHIELDED) {
    sourceUnitId = targetUnitId
    sourceType = targetType
  }

  const isout = sourceType === 1 || sourceType === 2
  const isin = targetType === 1

  const eventid = LIBCOMBAT_EVENT_DAMAGE_OUT + (isheal ? 3 : 0) + (isout && isin ? 2 : isin ? 1 : 0)

  const currentfight = getCurrentFight()
  if (currentfight.dpsstart === undefined) {
    prepareFight(currentfight)
  }

  damageType = isheal ? powerType : damageType

  if (!isheal) {
    overflow = shieldHitValue
  }

  addCombatEvent(currentfight, timems, result, targetUnitId, hitValue, eventid, overflow)

  fireCombatEvent(
    eventid,
    timems,
    result,
    sourceUnitId,
    targetUnitId,
    abilityId,
    hitValue,
    damageType,
    overflow ?? 0
  )
  return undefined
}

export const onCombatEventDmg: CombatEventHandler = (...args) => {
  combatEventHandler(false, ...args)
  return undefined
}

export const onCombatEventDmgIn: CombatEventHandler = (
  eventCode,
  result,
  isError,
  abilityName,
  abilityGraphic,
  abilityActionSlotType,
  sourceName,
  sourceType,
  targetName,
  targetType,
  ...rest
) => {
  if (
    (sourceType === COMBAT_UNIT_TYPE_PLAYER || sourceType === COMBAT_UNIT_TYPE_PLAYER_PET) &&
    (targetType === COMBAT_UNIT_TYPE_PLAYER || targetType === COMBAT_UNIT_TYPE_PLAYER_PET)
  ) {
    return undefined
  }

  combatEventHandler(
    false,
    eventCode,
    result,
    isError,
    abilityName,
    abilityGraphic,
    abilityActionSlotType,
    sourceName,
    sourceType,
    targetName,
    targetType,
    ...rest
  )
  return undefined
}

export const onCombatEventDmgGrp: CombatEventHandler = (
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  targetName,
  targetType,
  hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  targetUnitId,
  abilityId
) => {
  if (hitValue < 2 || targetUnitId == null || targetType === 2) {
    return undefined
  }

  if (hitValue > 200000) {
    log(
      "debug",
      LOG_LEVEL_WARNING,
      "Big Damage Event: (%d) %s did %d damage to %s",
      abilityId,
      getFormattedAbilityName(abilityId),
      hitValue,
      tostring(targetName)
    )

    return undefined
  }

  const currentfight = getCurrentFight()
  currentfight.grplog[currentfight.grplog.length] = [targetUnitId, hitValue, "dmg"]
  return undefined
}
