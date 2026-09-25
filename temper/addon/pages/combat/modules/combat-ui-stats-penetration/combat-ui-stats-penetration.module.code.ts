import type {
  DamageCategory,
  StatData,
} from "akasha/temper/addon/pages/combat/modules/combat-core-types/combat-core-types.module.code.ts"
import { getDb } from "akasha/temper/addon/pages/combat/modules/combat-saved-variables/combat-saved-variables.module.code.ts"
import { spairs } from "akasha/temper/addon/pages/combat/modules/combat-sorted-pairs/combat-sorted-pairs.module.code.ts"
import {
  isNonNullObject,
  type TooltipCarrier,
} from "akasha/temper/addon/pages/combat/modules/combat-ui-helpers/combat-ui-helpers.module.code.ts"
import {
  numberValue,
  setChildText,
} from "akasha/temper/addon/pages/combat/modules/combat-ui-main-panel/combat-ui-main-panel.module.code.ts"
import {
  optionalNumberValue,
  type StatFormatEntry,
} from "akasha/temper/addon/pages/combat/modules/combat-ui-stats-panels/combat-ui-stats-panels.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-string-ids-report/combat-string-ids-report.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-05/eso-enums-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

interface PenetrationRowContext {
  category: DamageCategory
  powerType: number
  keys: StatFormatEntry[] | undefined
  statsById: Record<number, StatData>
  stats: Record<string, unknown>
  fightStats: Record<string, unknown>
  avgvalues: Record<string, unknown>
  avgkey: "dmgavg" | "healavg"
  resdata: Record<string, unknown>
  stringKey: string
}

export function updatePenetrationRows(
  this: void,
  statWindowControl: Control,
  ctx: PenetrationRowContext
): undefined {
  const {
    category,
    powerType,
    keys,
    statsById,
    stats,
    fightStats,
    avgvalues,
    avgkey,
    resdata,
    stringKey,
  } = ctx
  const db = getDb()

  const row5 = statWindowControl.GetNamedChild("Row5")
  const row6 = statWindowControl.GetNamedChild<TooltipCarrier>("Row6")
  const row7 = statWindowControl.GetNamedChild("Row7")
  if (row5 == null || row6 == null || row7 == null) {
    return undefined
  }

  if (
    category === "damageOut" &&
    (powerType === COMBAT_MECHANIC_FLAGS_MAGICKA || powerType === COMBAT_MECHANIC_FLAGS_STAMINA)
  ) {
    const resistvaluesRaw =
      powerType === COMBAT_MECHANIC_FLAGS_MAGICKA
        ? resdata["spellResistance"]
        : resdata["physicalResistance"]
    const resistvalues: Record<number, number> = isNonNullObject<Record<number, number>>(
      resistvaluesRaw
    )
      ? resistvaluesRaw
      : {}
    const statId = keys?.[4]?.[0] ?? 0
    const statData = statsById[statId]

    let sum = 0
    let effectiveSum = 0
    let totalDamage = 0
    let maxvalue = statData?.max ?? numberValue(fightStats[`max${statId}`])
    let overpen = 0
    const maxpen = db.unitresistance

    const trimmedResistvalues: Record<number, number> = { [18]: 0 }

    for (const [penetration, damage] of pairs(resistvalues)) {
      sum = sum + penetration * damage
      effectiveSum = effectiveSum + zo_min(penetration, maxpen) * damage
      maxvalue = zo_max(maxvalue, penetration)
      totalDamage = totalDamage + damage

      if (penetration - maxpen > 0) {
        overpen = overpen + damage
      }

      const trimmedkey = zo_floor((penetration + 800) / 1000)
      trimmedResistvalues[trimmedkey] = (trimmedResistvalues[trimmedkey] ?? 0) + damage
    }

    totalDamage = zo_max(totalDamage, 1)

    const tooltiplines: string[] = [GetString(SI_TEMPER_COMBAT_PENETRATION_TT)]

    let sumdamage = 0

    for (const [penetration, damage] of spairs(trimmedResistvalues)) {
      sumdamage = sumdamage + damage

      const sumdamageRatio = 100 * (sumdamage / totalDamage)
      const damageRatio = (100 * damage) / totalDamage

      const color = penetration === 18 ? "|cffbb88" : damageRatio > 5 ? "|cffffff" : ""

      tooltiplines.push(string.format("<%s%2d.2k: %5.1f%%", color, penetration, sumdamageRatio))
    }

    const averagePenetration = string.format(
      "%d",
      zo_max(zo_round(effectiveSum / totalDamage), numberValue(avgvalues[`avg${statId}`]))
    )
    const overPenetrationRatio = string.format("%.1f%%", (100 * overpen) / totalDamage)

    tooltiplines.push(" ")
    tooltiplines.push(
      string.format("%s: %d", GetString(SI_TEMPER_COMBAT_AVERAGE), zo_round(sum / totalDamage))
    )

    row5.SetHidden(false)
    row6.SetHidden(false)
    row7.SetHidden(false)

    const text5 = ZO_CachedStrFormat("<<1>>:", GetString(stringKey, 5))

    setChildText(row5, "Label", text5)
    setChildText(row5, "Value", averagePenetration)
    setChildText(row5, "Value2", tostring(maxvalue))

    const text6 = ZO_CachedStrFormat("<<1>>:", GetString(stringKey, 6))

    setChildText(row6, "Label", text6)
    setChildText(row6, "Value", overPenetrationRatio)
    row6.tooltip = tooltiplines.length > 4 ? tooltiplines : undefined

    const text7 = ZO_CachedStrFormat("<<1>>:", GetString(stringKey, 7))
    const entry = keys?.[5]
    const dataKey = entry?.[0]
    const displayformat = entry?.[1]
    const statData7 = dataKey != null ? statsById[dataKey] : undefined

    if (text7 !== "" && dataKey != null) {
      const maxvalue7 = statData7?.max ?? numberValue(fightStats[`max${dataKey}`])
      const avgvalue7 =
        statData7?.[avgkey] ??
        optionalNumberValue(avgvalues[`avg${dataKey}`]) ??
        optionalNumberValue(stats[`avg${dataKey}`]) ??
        0

      const maxvalueText =
        displayformat != null ? string.format(displayformat, maxvalue7) : tostring(maxvalue7)
      const avgvalueText =
        displayformat != null ? string.format(displayformat, avgvalue7) : tostring(avgvalue7)

      setChildText(row7, "Label", text7)
      setChildText(row7, "Value", avgvalueText)
      setChildText(row7, "Value2", maxvalueText)
      row7.SetHidden(false)
    } else {
      row7.SetHidden(true)
    }
  } else {
    row5.SetHidden(true)
    row6.SetHidden(true)
    row7.SetHidden(true)
    row6.tooltip = undefined
  }
  return undefined
}
