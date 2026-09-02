import { LOG_LEVEL_WARNING, log } from "@akasha/temper-combat-addon/combat-core-log"
import type {
  CmxFight,
  EffectData,
  EffectSlotData,
  UnitCalc,
} from "@akasha/temper-combat-addon/combat-core-types"
import {
  getStatDebuffs,
  OVERRIDE_VALUES,
  STATUS_EFFECT_IDS,
} from "@akasha/temper-combat-addon/combat-data-tables"
import { acquireUnitStatData } from "@akasha/temper-combat-addon/combat-fight-model"

export function countSlots(
  slots: Record<number, EffectSlotData>
): LuaMultiReturn<[slotcount: number, groupSlotCount: number]> {
  let slotcount = 0
  let groupSlotCount = 0

  for (const [, slotData] of pairs(slots)) {
    if (slotData.isPlayerSource === true) {
      slotcount = slotcount + 1
    }
    groupSlotCount = groupSlotCount + 1
  }

  return $multi(slotcount, groupSlotCount)
}

export function updateUnitStats(
  unit: UnitCalc,
  fight: CmxFight,
  effectdata: EffectData,
  abilityId: number
): undefined {
  const debuffName = effectdata.name

  const debuffStatData = getStatDebuffs()[debuffName]

  if (debuffStatData === undefined) {
    return undefined
  }

  for (const [stat, statValue] of pairs(debuffStatData)) {
    const value: number | undefined = OVERRIDE_VALUES[abilityId] ?? statValue

    if (STATUS_EFFECT_IDS[abilityId] === true && fight.special["wrathCP"] !== true) {
      return undefined
    }

    const statData = acquireUnitStatData(unit, stat)
    const debuffData = statData.debuffs

    const debuff = unit.buffs[debuffName]
    const isactive = debuff !== undefined && NonContiguousCount(debuff.slots ?? {}) > 0
    const storedValue = debuffData[debuffName]

    if (isactive === true && storedValue == null) {
      if (value == null) {
        log(
          "calc",
          LOG_LEVEL_WARNING,
          "Debuff stat value missing: %s (%d)",
          debuffName ?? "nil",
          effectdata.iconId ?? 0
        )
        return undefined
      }

      debuffData[debuffName] = value

      statData.value = statData.value + value
    } else if (isactive === false && storedValue != null) {
      delete debuffData[debuffName]

      statData.value = statData.value - storedValue
    }
  }
  return undefined
}
