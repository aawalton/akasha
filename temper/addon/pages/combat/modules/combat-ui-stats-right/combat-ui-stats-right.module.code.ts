import {
  LOG_LEVEL_DEBUG,
  log,
} from "akasha/temper/addon/pages/combat/modules/combat-core-log/combat-core-log.module.code.ts"
import type {
  DamageCategory,
  ResourceData,
  ResourceTable,
  StatData,
} from "akasha/temper/addon/pages/combat/modules/combat-core-types/combat-core-types.module.code.ts"
import { LIBCOMBAT_CPTYPE_SLOTTED } from "akasha/temper/addon/pages/combat/modules/combat-lib-constants/combat-lib-constants.module.code.ts"
import { getDb } from "akasha/temper/addon/pages/combat/modules/combat-saved-variables/combat-saved-variables.module.code.ts"
import { spairs } from "akasha/temper/addon/pages/combat/modules/combat-sorted-pairs/combat-sorted-pairs.module.code.ts"
import type { TooltipCarrier } from "akasha/temper/addon/pages/combat/modules/combat-ui-helpers/combat-ui-helpers.module.code.ts"
import { isNonNullObject } from "akasha/temper/addon/pages/combat/modules/combat-ui-helpers/combat-ui-helpers.module.code.ts"
import {
  numberValue,
  setChildText,
} from "akasha/temper/addon/pages/combat/modules/combat-ui-main-panel/combat-ui-main-panel.module.code.ts"
import {
  getFightData,
  getSelections,
  getUiSelectionData,
} from "akasha/temper/addon/pages/combat/modules/combat-ui-state/combat-ui-state.module.code.ts"
import {
  COUNT_STRINGS,
  optionalNumberValue,
  POWER_TYPE_LABELS,
  STAT_FORMAT,
  STAT_KEYS_LEGACY,
} from "akasha/temper/addon/pages/combat/modules/combat-ui-stats-panels/combat-ui-stats-panels.module.code.ts"
import { updatePenetrationRows } from "akasha/temper/addon/pages/combat/modules/combat-ui-stats-penetration/combat-ui-stats-penetration.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox-additions/eso-sandbox-additions.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-string-ids-report/combat-string-ids-report.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-05/eso-enums-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function updateFightStatsPanelRight(this: void, panel: Control): undefined {
  log("UI", LOG_LEVEL_DEBUG, "Updating FightStatsPanelRight")

  const fightData = getFightData()
  const selectionData = getUiSelectionData()
  const db = getDb()
  const powerType = db.FightReport.fightstatspanel
  const rawCategory = db.FightReport.category
  const category: DamageCategory = rawCategory === "healingIn" ? "healingOut" : rawCategory

  const calculated = fightData?.calculated
  const calcRecord: Record<string, unknown> = calculated ?? {}
  const calcVersion = calculated?.calcVersion ?? 1

  const statsById: Record<number, StatData> = calculated?.stats ?? {}
  const stats: Record<string, unknown> = istable(statsById) ? statsById : {}
  const fightStatsRaw = fightData != null && "stats" in fightData ? fightData.stats : undefined
  const fightStats: Record<string, unknown> = istable(fightStatsRaw) ? fightStatsRaw : {}

  const avgkey = category === "damageOut" || category === "damageIn" ? "dmgavg" : "healavg"
  const avgvaluesRaw =
    (powerType === COMBAT_MECHANIC_FLAGS_HEALTH ? stats["dmginavg"] : undefined) ?? stats[avgkey]
  const avgvalues: Record<string, unknown> = istable(avgvaluesRaw) ? avgvaluesRaw : {}
  const totalvalue =
    powerType === COMBAT_MECHANIC_FLAGS_HEALTH
      ? (optionalNumberValue(calcRecord["damageInTotal"]) ??
        optionalNumberValue(calcRecord[`${category}Total`]))
      : optionalNumberValue(calcRecord[`${category}Total`])
  const countvalue = optionalNumberValue(calcRecord[`${COUNT_STRINGS[category]}Total`])

  const resources: ResourceTable = calculated?.resources ?? {}

  const magicka: Partial<ResourceData> = resources[COMBAT_MECHANIC_FLAGS_MAGICKA] ?? {}
  const stamina: Partial<ResourceData> = resources[COMBAT_MECHANIC_FLAGS_STAMINA] ?? {}
  const ultimate: Partial<ResourceData> = resources[COMBAT_MECHANIC_FLAGS_ULTIMATE] ?? {}

  const magickacontrol = panel.GetNamedChild("ResourceMagicka")
  if (magickacontrol != null) {
    setChildText(magickacontrol, "Value", string.format("%.0f", magicka.gainRate ?? 0))
    setChildText(magickacontrol, "Value2", string.format("%.0f", magicka.drainRate ?? 0))
  }

  const staminacontrol = panel.GetNamedChild("ResourceStamina")
  if (staminacontrol != null) {
    setChildText(staminacontrol, "Value", string.format("%.0f", stamina.gainRate ?? 0))
    setChildText(staminacontrol, "Value2", string.format("%.0f", stamina.drainRate ?? 0))
  }

  const ultimatecontrol = panel.GetNamedChild("ResourceUltimate")
  if (ultimatecontrol != null) {
    setChildText(ultimatecontrol, "Value", string.format("%.2f", ultimate.gainRate ?? 0))
    setChildText(ultimatecontrol, "Value2", string.format("%.2f", ultimate.drainRate ?? 0))
  }

  const stringKey = `SI_TEMPER_COMBAT_STATS${POWER_TYPE_LABELS[powerType] ?? ""}`

  const statWindowControl = panel.GetNamedChild("AttackStats")
  if (statWindowControl == null) {
    return undefined
  }
  const keys = STAT_FORMAT[powerType]

  const resdata: Record<string, unknown> =
    (getSelections().unit[category] != null ? selectionData : undefined) ?? calculated ?? {}

  for (let i = 1; i <= 4; i++) {
    let text = ZO_CachedStrFormat("<<1>>:", GetString(stringKey, i))
    const rowcontrol = statWindowControl.GetNamedChild<TooltipCarrier>(`Row${i}`)
    if (rowcontrol == null) {
      continue
    }

    const entry = keys?.[i - 1]
    let dataKey: number | string | undefined = entry?.[0]
    const displayformat = entry?.[1]
    const convert = entry?.[2]
    const statData = typeof dataKey === "number" ? statsById[dataKey] : undefined
    if (calcVersion < 2 && typeof dataKey === "number") {
      dataKey = STAT_KEYS_LEGACY[dataKey]
    }

    if (text !== "" && dataKey != null) {
      let maxvalueNum = statData?.max ?? numberValue(fightStats[`max${dataKey}`])

      if (convert === true) {
        maxvalueNum = GetCriticalStrikeChance(maxvalueNum)
      }
      if (dataKey === COMBAT_MECHANIC_FLAGS_HEALTH && i === 4) {
        maxvalueNum = maxvalueNum / 68
      }
      const maxvalueText =
        displayformat != null ? string.format(displayformat, maxvalueNum) : tostring(maxvalueNum)

      let avgvalue: number | string | undefined =
        statData?.[avgkey] ??
        optionalNumberValue(avgvalues[`avg${dataKey}`]) ??
        optionalNumberValue(stats[`avg${dataKey}`])

      if (avgvalue == null) {
        const legacyvalue = optionalNumberValue(avgvalues[`sum${dataKey}`])
        avgvalue =
          legacyvalue != null
            ? legacyvalue /
              zo_max(
                (convert != null && convert !== false ? countvalue : undefined) ?? totalvalue ?? 1,
                1
              )
            : maxvalueNum
      }

      if (typeof avgvalue === "number") {
        if (convert != null && convert !== false) {
          avgvalue = GetCriticalStrikeChance(avgvalue)
        }
        if (displayformat != null) {
          avgvalue = string.format(displayformat, avgvalue)
        }
      }

      if (i === 4 && powerType !== COMBAT_MECHANIC_FLAGS_HEALTH) {
        rowcontrol.tooltip = []
        const tooltiplines: string[] = []
        let backstabberTT: string | undefined
        const cp = fightData?.CP

        if (cp != null && cp.version != null && cp.version >= 2) {
          const backstabber = cp[1]?.stars[31]

          if (
            backstabber != null &&
            backstabber[0] >= 10 &&
            backstabber[1] === LIBCOMBAT_CPTYPE_SLOTTED
          ) {
            text = ZO_CachedStrFormat("<<1>>*:", GetString(stringKey, i))
            backstabberTT = GetString(SI_TEMPER_COMBAT_BACKSTABBER_TT)
          }
        }

        const critvaluesRaw =
          powerType === COMBAT_MECHANIC_FLAGS_MAGICKA
            ? resdata["spellCrit"]
            : powerType === COMBAT_MECHANIC_FLAGS_STAMINA
              ? resdata["weaponCrit"]
              : undefined
        const critvalues = isNonNullObject<Record<number, number>>(critvaluesRaw)
          ? critvaluesRaw
          : undefined

        if (critvalues != null) {
          let sum = 0
          let effectiveSum = 0
          let totalDamage = 0
          const maxCritBonus = 125
          const trimmedCritValues: Record<number, number> = { [125]: 0 }
          let stepsize = 10

          for (const [crit, damage] of pairs(critvalues)) {
            sum = sum + crit * damage
            effectiveSum = effectiveSum + zo_min(crit, maxCritBonus) * damage
            totalDamage = totalDamage + damage

            if (crit < 130 && crit >= 120) {
              stepsize = 5
            }

            const trimmedkey = zo_ceil(crit / stepsize) * stepsize
            trimmedCritValues[trimmedkey] = (trimmedCritValues[trimmedkey] ?? 0) + damage
          }

          totalDamage = zo_max(totalDamage, 1)
          tooltiplines.push(GetString(SI_TEMPER_COMBAT_CRITBONUS_TT))

          let sumdamage = 0
          for (const [crit, damage] of spairs(trimmedCritValues)) {
            sumdamage = sumdamage + damage

            const sumdamageRatio = 100 * (sumdamage / totalDamage)
            const damageRatio = (100 * damage) / totalDamage
            const color = crit === 125 ? "|cffbb88" : damageRatio > 5 ? "|cffffff" : ""
            tooltiplines.push(string.format("<%s%2d%%: %5.1f%%", color, crit, sumdamageRatio))
          }

          avgvalue = string.format(
            displayformat ?? "",
            zo_max(effectiveSum / totalDamage, numberValue(avgvalues[`avg${dataKey}`]))
          )

          rowcontrol.tooltip = tooltiplines.length > 2 ? tooltiplines : undefined
          if (backstabberTT != null) {
            tooltiplines.unshift(backstabberTT)
          }

          tooltiplines.push(" ")
          tooltiplines.push(
            string.format("%s: %.1f%%", GetString(SI_TEMPER_COMBAT_AVERAGE), sum / totalDamage)
          )
        }
      } else {
        rowcontrol.tooltip = undefined
      }

      setChildText(rowcontrol, "Label", text)
      setChildText(
        rowcontrol,
        "Value",
        typeof avgvalue === "string" ? avgvalue : tostring(avgvalue)
      )
      setChildText(rowcontrol, "Value2", maxvalueText)
      rowcontrol.SetHidden(false)
    } else {
      rowcontrol.SetHidden(true)
    }
  }

  updatePenetrationRows(statWindowControl, {
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
  })
  return undefined
}
