import { fireCombatEvent } from "@akasha/temper-combat-addon/combat-lib-callbacks"
import {
  ABILITY_ID_FORCE_OF_NATURE,
  ABILITY_ID_ZEN,
  getFormattedAbilityName,
  LIBCOMBAT_EVENT_EFFECTS_OUT,
  STATUS_EFFECT_IDS,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import {
  LOG_LEVEL_VERBOSE,
  LOG_LEVEL_WARNING,
  log,
} from "@akasha/temper-combat-addon/combat-lib-log"
import { DATA, getCurrentFight } from "@akasha/temper-combat-addon/combat-lib-state"
import type { UnitEntry, UnitInfo } from "@akasha/temper-combat-addon/combat-lib-types"

export function createUnit(name: string, unitId: number, unitType: number | undefined): UnitEntry {
  name = ZO_CachedStrFormat(SI_UNIT_NAME, name)

  if (unitType === undefined || unitType === COMBAT_UNIT_TYPE_TARGET_DUMMY) {
    unitType = COMBAT_UNIT_TYPE_NONE
  }

  let isFriendly = false

  if (
    unitType === COMBAT_UNIT_TYPE_PLAYER ||
    unitType === COMBAT_UNIT_TYPE_GROUP ||
    unitType === COMBAT_UNIT_TYPE_PLAYER_PET
  ) {
    isFriendly = true
  }

  const unit: UnitEntry = {
    unitId: unitId,
    name: name,
    displayname: undefined,
    unitTag: undefined,
    unitType: unitType,
    isFriendly: isFriendly,
    isDead: undefined,
    damageOutTotal: 0,
    groupDamageOut: 0,
    dpsstart: undefined,
    dpsend: undefined,
    starttime: undefined,
    endtime: undefined,
    zenEffectSlot: undefined,
    stacksOfZen: 0,
    forceOfNature: {},
    forceOfNatureStacks: 0,
    bossId: undefined,
    isTrialDummy: undefined,
  }

  if (unitType === COMBAT_UNIT_TYPE_PLAYER) {
    DATA.playerid = unitId
    getCurrentFight().playerid = unitId
    unit.displayname = DATA.accountname
    unit.unitTag = "player"
    unit.isDead = IsUnitDeadOrReincarnating("player")
  }

  if (unit.unitType === COMBAT_UNIT_TYPE_GROUP) {
    updateGroupData(unit)
  }

  return unit
}

export function updateGroupData(unit: UnitEntry): undefined {
  const groupdata = DATA.groupInfo

  const unitTag = groupdata.nameToTag[unit.name]

  unit.displayname = groupdata.nameToDisplayname[unit.name]
  unit.unitTag = unitTag

  if (unitTag !== undefined) {
    unit.isDead = IsUnitDeadOrReincarnating(unitTag)
  }

  groupdata.nameToId[unit.name] = unit.unitId

  if (unitTag !== undefined) {
    groupdata.tagToId[unitTag] = unit.unitId
  }
  return undefined
}

export function getUnitInfo(unit: UnitEntry): UnitInfo {
  return {
    unitId: unit.unitId,
    name: unit.name,
    displayname: unit.displayname,
    unitTag: unit.unitTag,
    unitType: unit.unitType,
  }
}

export function updateZenData(
  unit: UnitEntry,
  eventId: number,
  timeMs: number,
  unitId: number,
  abilityId: number,
  changeType: number,
  effectType: number,
  _stacks: number,
  sourceType: number,
  effectSlot: number,
  abilityType: number | undefined
): undefined {
  if (abilityId === ABILITY_ID_ZEN) {
    const isActive = changeType === EFFECT_RESULT_GAINED
    const stacks = isActive ? math.min(unit.stacksOfZen, 5) : 0

    fireCombatEvent(
      eventId,
      timeMs,
      unitId,
      ABILITY_ID_ZEN,
      changeType,
      effectType,
      stacks,
      sourceType,
      effectSlot
    )
    log(
      "debug",
      LOG_LEVEL_VERBOSE,
      table.concat(
        [
          eventId,
          timeMs,
          unitId,
          ABILITY_ID_ZEN,
          changeType,
          effectType,
          stacks,
          sourceType,
          effectSlot,
        ],
        ", "
      )
    )
    unit.zenEffectSlot = isActive ? effectSlot : undefined
  } else if (abilityType === ABILITY_TYPE_DAMAGE) {
    if (changeType === EFFECT_RESULT_GAINED) {
      unit.stacksOfZen = unit.stacksOfZen + 1
    } else if (changeType === EFFECT_RESULT_FADED) {
      if (unit.stacksOfZen - 1 < 0) {
        log(
          "debug",
          LOG_LEVEL_WARNING,
          "Encountered negative Z'en stacks: %s (%d)",
          getFormattedAbilityName(abilityId),
          abilityId
        )
      }
      unit.stacksOfZen = math.max(0, unit.stacksOfZen - 1)
    }

    if (unit.zenEffectSlot !== undefined) {
      const stacks = math.min(unit.stacksOfZen, 5)
      fireCombatEvent(
        LIBCOMBAT_EVENT_EFFECTS_OUT,
        timeMs,
        unitId,
        ABILITY_ID_ZEN,
        EFFECT_RESULT_UPDATED,
        effectType,
        stacks,
        sourceType,
        unit.zenEffectSlot
      )
    }
  }
  return undefined
}

export function updateForceOfNatureData(
  unit: UnitEntry,
  _eventId: number,
  timeMs: number,
  unitId: number,
  abilityId: number,
  changeType: number
): undefined {
  const currentfight = getCurrentFight()
  const cpDiscipline = currentfight.CP !== undefined ? currentfight.CP[1] : undefined

  if (
    STATUS_EFFECT_IDS[abilityId] === undefined ||
    cpDiscipline === undefined ||
    cpDiscipline.slotted === undefined ||
    cpDiscipline.slotted[276] !== true
  ) {
    return undefined
  }

  let forceOfNatureChangeType = EFFECT_RESULT_UPDATED

  let debugChangeType = "o"

  if (changeType === EFFECT_RESULT_GAINED && unit.forceOfNature[abilityId] === undefined) {
    unit.forceOfNature[abilityId] = true

    unit.forceOfNatureStacks = unit.forceOfNatureStacks + 1

    if (unit.forceOfNatureStacks === 1) {
      forceOfNatureChangeType = EFFECT_RESULT_GAINED
    }
    if (unit.forceOfNatureStacks > 8) {
      log(
        "debug",
        LOG_LEVEL_WARNING,
        "Encountered too many Force of Nature stacks (%d): %s (%d)",
        unit.forceOfNatureStacks,
        getFormattedAbilityName(abilityId),
        abilityId
      )
    }
    debugChangeType = "+"
  } else if (changeType === EFFECT_RESULT_FADED && unit.forceOfNature[abilityId] === true) {
    delete unit.forceOfNature[abilityId]

    if (unit.forceOfNatureStacks === 0) {
      forceOfNatureChangeType = EFFECT_RESULT_FADED
    }
    if (unit.forceOfNatureStacks - 1 < 0) {
      log(
        "debug",
        LOG_LEVEL_WARNING,
        "Encountered negative Force of Nature stacks: %s (%d)",
        getFormattedAbilityName(abilityId),
        abilityId
      )
    }

    unit.forceOfNatureStacks = math.max(0, unit.forceOfNatureStacks - 1)
    debugChangeType = "-"
  }

  const stacks = math.min(unit.forceOfNatureStacks, 8)
  fireCombatEvent(
    LIBCOMBAT_EVENT_EFFECTS_OUT,
    timeMs,
    unitId,
    ABILITY_ID_FORCE_OF_NATURE,
    forceOfNatureChangeType,
    BUFF_EFFECT_TYPE_DEBUFF,
    stacks,
    COMBAT_UNIT_TYPE_PLAYER,
    0
  )
  log(
    "debug",
    LOG_LEVEL_VERBOSE,
    "Force of Nature: %s (%d) x%d, %s%s",
    unit.name,
    unit.unitId,
    stacks,
    getFormattedAbilityName(abilityId),
    debugChangeType
  )
  return undefined
}

export function onGroupChange(this: void): undefined {
  DATA.inGroup = IsUnitGrouped("player")

  const groupdata = DATA.groupInfo

  groupdata.nameToDisplayname = {}
  groupdata.nameToTag = {}

  if (DATA.inGroup === true) {
    for (let i = 1; i <= GetGroupSize(); i++) {
      const unitTag = `group${i}`

      const name = ZO_CachedStrFormat(SI_UNIT_NAME, GetUnitName(unitTag))
      const displayname = ZO_CachedStrFormat(SI_UNIT_NAME, GetUnitDisplayName(unitTag))

      groupdata.nameToDisplayname[name] = displayname
      groupdata.nameToTag[name] = unitTag

      const unitId = groupdata.nameToId[name]
      const unit = unitId !== undefined ? getCurrentFight().units[unitId] : undefined

      if (unit !== undefined) {
        updateGroupData(unit)
      }
    }
  }
  return undefined
}

export function checkUnit(
  unitName: string,
  unitId: number,
  unitType: number | undefined,
  timems: number
): undefined {
  const currentunits = getCurrentFight().units

  if (currentunits[unitId] === undefined) {
    currentunits[unitId] = createUnit(unitName, unitId, unitType)
  }
  const unit = currentunits[unitId]

  if (unit.name === "Offline" || unit.name === "") {
    unit.name = ZO_CachedStrFormat(SI_UNIT_NAME, unitName)
  }

  if (unit.unitType !== COMBAT_UNIT_TYPE_GROUP && unitType === COMBAT_UNIT_TYPE_GROUP) {
    unit.unitType = COMBAT_UNIT_TYPE_GROUP
    unit.isFriendly = true
  }

  if (unit.isFriendly === false) {
    const bossId = DATA.bossInfo[unit.name]

    if (bossId !== undefined) {
      unit.bossId = bossId
      getCurrentFight().bosses[bossId] = unitId

      unit.unitTag = ZO_CachedStrFormat("boss<<1>>", bossId)
    }
  }

  if (unit.dpsstart === undefined) {
    unit.dpsstart = timems
  }
  unit.dpsend = timems

  if (unit.starttime === undefined) {
    unit.starttime = timems
  }
  unit.endtime = timems
  return undefined
}

export function onTrialDummy(
  this: void,
  _eventCode: number,
  _result: number,
  _isError: boolean,
  _abilityName: string,
  _abilityGraphic: number,
  _abilityActionSlotType: number,
  _sourceName: string,
  _sourceType: number,
  _targetName: string,
  _targetType: number,
  _hitValue: number,
  _powerType: number,
  _damageType: number,
  _log: boolean,
  sourceUnitId: number
): undefined {
  const currentfight = getCurrentFight()
  if (currentfight.prepared !== true) {
    return undefined
  }

  const unit = currentfight.units[sourceUnitId]
  if (unit !== undefined) {
    unit.isTrialDummy = true
  }
  return undefined
}
