import type {
  AbilityData,
  CmxFight,
  CoreLogLine,
  UnitCalc,
} from "@akasha/temper-combat-addon/combat-core-types"
import {
  DAMAGE_RESULT_CATEGORY,
  HEAL_RESULT_CATEGORY,
  INCOMING_STAT_LIST,
  IS_MAGICKA_ABILITY,
  STAT_LIST_TABLE,
  STATTYPE_CRITICAL,
  STATTYPE_CRITICALBONUS,
  STATTYPE_INCSPELL,
  STATTYPE_INCWEAPON,
  STATTYPE_PENETRATION,
} from "@akasha/temper-combat-addon/combat-data-tables"
import {
  acquireAbilityData,
  acquireBarStats,
  acquireStatData,
  acquireUnitData,
  getCalculated,
  getCurrentBar,
} from "@akasha/temper-combat-addon/combat-fight-model"
import {
  LIBCOMBAT_EVENT_DAMAGE_OUT,
  LIBCOMBAT_EVENT_HEAL_IN,
  LIBCOMBAT_EVENT_HEAL_OUT,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { isDamageLogLine, isHealLogLine } from "@akasha/temper-combat-addon/combat-lib-log-lines"

function incrementStatSum(
  fight: CmxFight,
  damageType: number,
  resultkey: string | undefined,
  isDamageOut: boolean,
  hitValue: number,
  isheal: boolean,
  unit?: UnitCalc
): undefined {
  const ismagical: boolean | undefined = IS_MAGICKA_ABILITY[damageType]
  let statlist: Record<number, number> = INCOMING_STAT_LIST

  if (isDamageOut) {
    const useMagickaList: boolean | undefined = isheal
      ? damageType === COMBAT_MECHANIC_FLAGS_MAGICKA
      : ismagical
    if (useMagickaList == null) {
      return undefined
    }

    const key = useMagickaList ? "Spell" : "Weapon"
    statlist = STAT_LIST_TABLE[key]
  }

  const barStats = acquireBarStats(fight, getCurrentBar())
  const data = getCalculated(fight)
  const temp = data.temp
  if (temp === undefined) {
    error("incrementStatSum called outside a calculation pass")
  }
  const currentStats = temp.stats
  let key: "dmgsum" | "healsum"

  if (isheal === true && isDamageOut === true) {
    barStats.healingOut = barStats.healingOut + hitValue
    key = "healsum"
  } else if (isheal === true && isDamageOut === false) {
    barStats.healingIn = barStats.healingIn + hitValue
    return undefined
  } else if (isheal === false && isDamageOut === true) {
    barStats.damageOut = barStats.damageOut + hitValue
    key = "dmgsum"
  } else {
    barStats.damageIn = barStats.damageIn + hitValue
    key = "dmgsum"
  }

  for (const [statId, stattype] of pairs(statlist)) {
    const unitData = unit !== undefined ? unit.statData[statId] : undefined
    const unitValue = unitData !== undefined ? unitData.value : 0
    const currentValue = (currentStats[statId] ?? 0) + unitValue
    let value = hitValue

    const statData = acquireStatData(fight, statId)
    statData.max = zo_max(currentValue, statData.max)

    if (stattype === STATTYPE_PENETRATION) {
      if (isheal === true) {
        value = 0
      } else if (ismagical != null && unit !== undefined) {
        const resistDataKey = ismagical ? "spellResistance" : "physicalResistance"
        const histogram = unit[resistDataKey]
        histogram[currentValue] = (histogram[currentValue] ?? 0) + value
      }
    }

    if (stattype === STATTYPE_CRITICAL) {
      value = resultkey === "Blocked" ? 0 : 1
    } else if (stattype === STATTYPE_CRITICALBONUS) {
      if (resultkey !== "Critical") {
        value = 0
      }
      if (ismagical != null && isheal === false && isDamageOut === true && unit !== undefined) {
        const critDataKey = ismagical ? "spellCrit" : "weaponCrit"
        const histogram = unit[critDataKey]
        histogram[currentValue] = (histogram[currentValue] ?? 0) + value
      }
    } else if (stattype === STATTYPE_INCSPELL && ismagical !== true) {
      value = 0
    } else if (stattype === STATTYPE_INCWEAPON && ismagical !== false) {
      value = 0
    }

    statData[key] = statData[key] + value * currentValue
  }
  return undefined
}

function addToAbilityKey(
  ability: Record<string, unknown>,
  abilityKey: string,
  amount: number
): undefined {
  const current = ability[abilityKey]
  ability[abilityKey] = (typeof current === "number" ? current : 0) + amount
  return undefined
}

export function processLogDamage(fight: CmxFight, logline: CoreLogLine): undefined {
  if (!isDamageLogLine(logline)) {
    return undefined
  }
  const callbacktype = logline[0]
  const timems = logline[1]
  const result = logline[2]
  const sourceUnitId = logline[3]
  const targetUnitId = logline[4]
  const abilityId = logline[5]
  let hitValue = logline[6]
  const damageType = logline[7]
  const overflow = logline[8]

  if (
    timems < fight.combatstart - 500 ||
    fight.units[sourceUnitId] == null ||
    fight.units[targetUnitId] == null
  ) {
    return undefined
  }

  const sourceUnit = fight.units[sourceUnitId]
  const ispet = sourceUnit !== undefined && sourceUnit.unitType === COMBAT_UNIT_TYPE_PLAYER_PET

  let abilitydata: AbilityData
  let isDamageOut: boolean
  let unit: UnitCalc | undefined

  const resultkey = DAMAGE_RESULT_CATEGORY[result]

  let dmgkey: string
  let hitkey: string
  let graphkey: "damageOut" | "damageIn"

  hitValue = hitValue + overflow

  if (callbacktype === LIBCOMBAT_EVENT_DAMAGE_OUT) {
    unit = acquireUnitData(fight, targetUnitId, timems)
    abilitydata = acquireAbilityData(unit, abilityId, ispet, damageType, "damageOut")
    isDamageOut = true

    dmgkey = ZO_CachedStrFormat("damageOut<<1>>", resultkey ?? "")
    hitkey = ZO_CachedStrFormat("hitsOut<<1>>", resultkey ?? "")
    graphkey = "damageOut"

    if (overflow > 0) {
      addToAbilityKey(abilitydata, "damageOutShielded", overflow)
      addToAbilityKey(abilitydata, "hitsOutShielded", 1)
    }
  } else {
    abilitydata = acquireAbilityData(
      acquireUnitData(fight, sourceUnitId, timems),
      abilityId,
      ispet,
      damageType,
      "damageIn"
    )
    isDamageOut = false

    dmgkey = ZO_CachedStrFormat("damageIn<<1>>", resultkey ?? "")
    hitkey = ZO_CachedStrFormat("hitsIn<<1>>", resultkey ?? "")
    graphkey = "damageIn"

    if (overflow > 0) {
      addToAbilityKey(abilitydata, "damageInShielded", overflow)
      addToAbilityKey(abilitydata, "hitsInShielded", 1)
    }
  }

  addToAbilityKey(abilitydata, dmgkey, hitValue)
  addToAbilityKey(abilitydata, hitkey, 1)

  const inttime = zo_floor((timems - fight.combatstart) / 1000)

  if (inttime >= 0) {
    const graph = getCalculated(fight).graph[graphkey]
    graph[inttime] = (graph[inttime] ?? 0) + hitValue
  }

  abilitydata.max = zo_max(abilitydata.max, hitValue)
  abilitydata.min = zo_min(abilitydata.min, hitValue)
  incrementStatSum(fight, damageType, resultkey, isDamageOut, hitValue, false, unit)
  return undefined
}

export function processLogHeal(
  fight: CmxFight,
  logline: CoreLogLine,
  overrideCallbackType?: number
): undefined {
  if (!isHealLogLine(logline)) {
    return undefined
  }
  let callbacktype: number = logline[0]
  const timems = logline[1]
  const result = logline[2]
  const sourceUnitId = logline[3]
  const targetUnitId = logline[4]
  const abilityId = logline[5]
  const hitValue = logline[6]
  const powerType = logline[7]
  let overflow = logline[8]

  callbacktype = overrideCallbackType ?? callbacktype

  if (
    timems < fight.combatstart - 500 ||
    fight.units[sourceUnitId] == null ||
    fight.units[targetUnitId] == null
  ) {
    return undefined
  }

  const sourceUnit = fight.units[sourceUnitId]
  const ispet = sourceUnit !== undefined && sourceUnit.unitType === COMBAT_UNIT_TYPE_PLAYER_PET

  let abilitydata: AbilityData
  let isHealingOut: boolean

  const resultkey = HEAL_RESULT_CATEGORY[result]

  let valuekey: "healingOut" | "healingIn"
  let hitkey: string

  if (callbacktype === LIBCOMBAT_EVENT_HEAL_OUT) {
    abilitydata = acquireAbilityData(
      acquireUnitData(fight, targetUnitId, timems),
      abilityId,
      ispet,
      powerType,
      "healingOut"
    )
    isHealingOut = true

    valuekey = "healingOut"
    hitkey = "healsOut"
  } else {
    abilitydata = acquireAbilityData(
      acquireUnitData(fight, sourceUnitId, timems),
      abilityId,
      ispet,
      powerType,
      "healingIn"
    )
    isHealingOut = false

    valuekey = "healingIn"
    hitkey = "healsIn"
  }

  const healingkey = ZO_CachedStrFormat("<<1>><<2>>", valuekey, resultkey ?? "")
  const healskey = ZO_CachedStrFormat("<<1>><<2>>", hitkey, resultkey ?? "")
  const overflowHealingKey = ZO_CachedStrFormat("<<1>>Overflow", valuekey)
  const overflowHealskey = ZO_CachedStrFormat("<<1>>Overflow", hitkey)

  overflow = overflow ?? 0

  addToAbilityKey(abilitydata, healingkey, hitValue)
  addToAbilityKey(abilitydata, healskey, 1)
  addToAbilityKey(abilitydata, overflowHealingKey, overflow)

  if (hitValue === 0 && overflow > 0) {
    addToAbilityKey(abilitydata, overflowHealskey, 1)
  }

  const inttime = zo_floor((timems - fight.combatstart) / 1000)

  if (inttime >= 0) {
    const graph = getCalculated(fight).graph[valuekey]
    graph[inttime] = (graph[inttime] ?? 0) + hitValue
  }

  abilitydata.max = zo_max(abilitydata.max, hitValue)
  abilitydata.min = zo_min(abilitydata.min, hitValue)

  incrementStatSum(fight, powerType, resultkey, isHealingOut, hitValue, true)
  return undefined
}

export function processLogHealSelf(fight: CmxFight, logline: CoreLogLine): undefined {
  processLogHeal(fight, logline, LIBCOMBAT_EVENT_HEAL_OUT)
  processLogHeal(fight, logline, LIBCOMBAT_EVENT_HEAL_IN)
  return undefined
}
