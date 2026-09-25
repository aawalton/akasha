import { parseNumber } from "akasha/code/type/narrowing/modules/parse-number/parse-number.module.code.ts"
import {
  LOG_LEVEL_DEBUG,
  log,
} from "akasha/temper/addon/pages/combat/modules/combat-core-log/combat-core-log.module.code.ts"
import type { DamageCategory } from "akasha/temper/addon/pages/combat/modules/combat-core-types/combat-core-types.module.code.ts"
import {
  LIBCOMBAT_STAT_CRITICALRESISTANCE,
  LIBCOMBAT_STAT_MAXHEALTH,
  LIBCOMBAT_STAT_MAXMAGICKA,
  LIBCOMBAT_STAT_MAXSTAMINA,
  LIBCOMBAT_STAT_PHYSICALRESISTANCE,
  LIBCOMBAT_STAT_SPELLCRIT,
  LIBCOMBAT_STAT_SPELLCRITBONUS,
  LIBCOMBAT_STAT_SPELLPENETRATION,
  LIBCOMBAT_STAT_SPELLPOWER,
  LIBCOMBAT_STAT_SPELLRESISTANCE,
  LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE,
  LIBCOMBAT_STAT_WEAPONCRIT,
  LIBCOMBAT_STAT_WEAPONCRITBONUS,
  LIBCOMBAT_STAT_WEAPONPENETRATION,
  LIBCOMBAT_STAT_WEAPONPOWER,
} from "akasha/temper/addon/pages/combat/modules/combat-lib-constants/combat-lib-constants.module.code.ts"
import { getDb } from "akasha/temper/addon/pages/combat/modules/combat-saved-variables/combat-saved-variables.module.code.ts"
import { getShowOverHeal } from "akasha/temper/addon/pages/combat/modules/combat-selection/combat-selection.module.code.ts"
import {
  numberValue,
  setChildText,
} from "akasha/temper/addon/pages/combat/modules/combat-ui-main-panel/combat-ui-main-panel.module.code.ts"
import {
  getFightData,
  getSelections,
  getUiSelectionData,
  type UpdatableControl,
} from "akasha/temper/addon/pages/combat/modules/combat-ui-state/combat-ui-state.module.code.ts"
import {
  formatCount,
  formatDuration,
  formatPercent,
} from "akasha/temper/window/modules/window-numbers/window-numbers.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-controls-report/combat-controls-report.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-string-ids-report/combat-string-ids-report.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-05/eso-enums-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const PERCENT = 100

export const POWER_TYPE_LABELS: Record<number, string> = {
  [COMBAT_MECHANIC_FLAGS_MAGICKA]: "_MAGICKA",
  [COMBAT_MECHANIC_FLAGS_STAMINA]: "_STAMINA",
  [COMBAT_MECHANIC_FLAGS_HEALTH]: "_HEALTH",
}

export const STAT_KEYS_LEGACY: Record<number, string> = {
  [LIBCOMBAT_STAT_MAXMAGICKA]: "maxmagicka",
  [LIBCOMBAT_STAT_SPELLPOWER]: "spellpower",
  [LIBCOMBAT_STAT_SPELLCRIT]: "spellcrit",
  [LIBCOMBAT_STAT_SPELLCRITBONUS]: "spellcritbonus",
  [LIBCOMBAT_STAT_SPELLPENETRATION]: "spellpen",
  [LIBCOMBAT_STAT_MAXSTAMINA]: "maxstamina",
  [LIBCOMBAT_STAT_WEAPONPOWER]: "weaponpower",
  [LIBCOMBAT_STAT_WEAPONCRIT]: "weaponcrit",
  [LIBCOMBAT_STAT_WEAPONCRITBONUS]: "weaponcritbonus",
  [LIBCOMBAT_STAT_WEAPONPENETRATION]: "weaponpen",
  [LIBCOMBAT_STAT_MAXHEALTH]: "maxhealth",
  [LIBCOMBAT_STAT_PHYSICALRESISTANCE]: "physres",
  [LIBCOMBAT_STAT_SPELLRESISTANCE]: "spellres",
  [LIBCOMBAT_STAT_CRITICALRESISTANCE]: "critres",
}

export type StatFormatter = (this: void, value: number) => string

export function asStatCount(this: void, value: number): string {
  return formatCount(value)
}

export function asStatPercent(this: void, value: number): string {
  return formatPercent(value / PERCENT)
}

function asStatBonus(this: void, value: number): string {
  return `+${formatPercent(value / PERCENT)}`
}

export type StatFormatEntry = [
  dataKey: number,
  displayformat: StatFormatter,
  convert?: boolean | string,
]

export const STAT_FORMAT: Record<number, StatFormatEntry[]> = {
  [COMBAT_MECHANIC_FLAGS_MAGICKA]: [
    [LIBCOMBAT_STAT_MAXMAGICKA, asStatCount],
    [LIBCOMBAT_STAT_SPELLPOWER, asStatCount],
    [LIBCOMBAT_STAT_SPELLCRIT, asStatPercent, true],
    [LIBCOMBAT_STAT_SPELLCRITBONUS, asStatPercent],
    [LIBCOMBAT_STAT_SPELLPENETRATION, asStatCount],
    [LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE, asStatBonus],
  ],
  [COMBAT_MECHANIC_FLAGS_STAMINA]: [
    [LIBCOMBAT_STAT_MAXSTAMINA, asStatCount],
    [LIBCOMBAT_STAT_WEAPONPOWER, asStatCount],
    [LIBCOMBAT_STAT_WEAPONCRIT, asStatPercent, true],
    [LIBCOMBAT_STAT_WEAPONCRITBONUS, asStatPercent],
    [LIBCOMBAT_STAT_WEAPONPENETRATION, asStatCount],
    [LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE, asStatBonus],
  ],
  [COMBAT_MECHANIC_FLAGS_HEALTH]: [
    [LIBCOMBAT_STAT_MAXHEALTH, asStatCount],
    [LIBCOMBAT_STAT_PHYSICALRESISTANCE, asStatCount],
    [LIBCOMBAT_STAT_SPELLRESISTANCE, asStatCount],
    [LIBCOMBAT_STAT_CRITICALRESISTANCE, asStatCount, "%.1f%%"],
  ],
}

export const DPS_STRINGS: Record<DamageCategory, "DPSOut" | "DPSIn" | "HPSOut" | "HPSIn"> = {
  damageOut: "DPSOut",
  damageIn: "DPSIn",
  healingOut: "HPSOut",
  healingIn: "HPSIn",
}

export function optionalNumberValue(this: void, value: unknown): number | undefined {
  return parseNumber(value)
}

export const COUNT_STRINGS: Record<DamageCategory, string> = {
  damageOut: "hitsOut",
  damageIn: "hitsIn",
  healingOut: "healsOut",
  healingIn: "healsIn",
}

export function updateFightStatsPanelLeft(this: void, panel: Control): undefined {
  log("UI", LOG_LEVEL_DEBUG, "Updating FightStatsPanelLeft")

  const fightData = getFightData()
  const selectionData = getUiSelectionData()
  const data: Record<string, unknown> = fightData?.calculated ?? {}
  const db = getDb()
  const category = db.FightReport.category

  const selections = getSelections()
  const selectedabilities = selections.ability[category]
  const selectedunits = selections.unit[category]

  const noselection = selectedunits == null && selectedabilities == null

  const headerstring = noselection ? SI_TEMPER_COMBAT_GROUP : SI_TEMPER_COMBAT_SELECTION
  setChildText(panel, "StatHeaderLabel2", GetString(headerstring))

  let label1: string
  let label2: string
  let label3: string
  let rowList: string[]
  let labelList: number[]
  let activetime: number

  const showOverHeal = category === "healingOut" && getShowOverHeal()

  if (category === "healingOut" || category === "healingIn") {
    label1 = GetString(showOverHeal ? SI_TEMPER_COMBAT_HPSA : SI_TEMPER_COMBAT_HPS)
    label2 = GetString(SI_TEMPER_COMBAT_HEALING)
    label3 = GetString(SI_TEMPER_COMBAT_HEALS)

    rowList = ["Total", "Normal", "Critical", "Overflow", "Absolute"]
    labelList = [
      SI_TEMPER_COMBAT_TOTALC,
      SI_TEMPER_COMBAT_NORMAL,
      SI_TEMPER_COMBAT_CRITICAL,
      SI_TEMPER_COMBAT_OVERHEAL,
      SI_TEMPER_COMBAT_ABSOLUTEC,
    ]

    activetime = fightData?.hpstime ?? 1
  } else {
    label1 = GetString(SI_TEMPER_COMBAT_DPS)
    label2 = GetString(SI_TEMPER_COMBAT_DAMAGE)
    label3 = GetString(SI_TEMPER_COMBAT_HIT)

    rowList = ["Total", "Normal", "Critical", "Blocked", "Shielded"]
    labelList = [
      SI_TEMPER_COMBAT_TOTALC,
      SI_TEMPER_COMBAT_NORMAL,
      SI_TEMPER_COMBAT_CRITICAL,
      SI_TEMPER_COMBAT_BLOCKED,
      SI_TEMPER_COMBAT_SHIELDED,
    ]

    activetime = fightData?.dpstime ?? 1
  }

  const activetimestring = formatDuration(activetime)

  const dpsRow = panel.GetNamedChild("StatRowAPS")
  if (dpsRow == null) {
    return undefined
  }

  setChildText(dpsRow, "Label", label1)
  const amountTitle = panel.GetNamedChild("StatTitleAmount")
  if (amountTitle != null) {
    setChildText(amountTitle, "Label", label2)
  }
  const countTitle = panel.GetNamedChild("StatTitleCount")
  if (countTitle != null) {
    setChildText(countTitle, "Label", label3)
  }

  const combattimestring = formatDuration(fightData?.combattime ?? 1)

  setChildText(panel, "ActiveTimeValue", activetimestring)
  setChildText(panel, "CombatTimeValue", combattimestring)

  const key = showOverHeal ? "HPSAOut" : DPS_STRINGS[category]

  const aps1 = numberValue(data[key])
  let aps2: number
  let apsratio: number

  if (!noselection || showOverHeal) {
    aps2 = numberValue(selectionData?.[key])
    apsratio = aps1 === 0 ? 0 : (aps2 / aps1) * 100
  } else {
    const groupkey = zo_strformat("group<<C:1>>", key)
    aps2 = numberValue(data[groupkey])
    apsratio = aps2 === 0 ? 0 : (aps1 / aps2) * 100
  }

  setChildText(dpsRow, "Value", formatCount(aps1))
  setChildText(dpsRow, "Value2", formatCount(aps2))
  setChildText(dpsRow, "Value3", formatPercent(apsratio / PERCENT))

  for (const [k, v] of ipairs(rowList)) {
    const rowcontrol1 = panel.GetNamedChild(`StatRowAmount${k}`)
    const rowcontrol2 = panel.GetNamedChild(`StatRowCount${k}`)

    if (rowcontrol1 == null || rowcontrol2 == null) {
      continue
    }

    setChildText(rowcontrol1, "Label", GetString(labelList[k - 1] ?? 0))
    const amountcontrol2 = rowcontrol1.GetNamedChild("Value2")
    const amountcontrol3 = rowcontrol1.GetNamedChild("Value3")

    setChildText(rowcontrol2, "Label", GetString(labelList[k - 1] ?? 0))
    const countcontrol2 = rowcontrol2.GetNamedChild("Value2")
    const countcontrol3 = rowcontrol2.GetNamedChild("Value3")

    let hide2 = false
    let hide3 = false
    let hide4 = false

    const amountkey = category + v
    const countkey = COUNT_STRINGS[category] + v
    const basekey = v === "Overflow" || v === "Absolute" ? "Absolute" : (rowList[0] ?? "Total")

    const amount1 = numberValue(data[amountkey])
    let amount2 = 0
    let amount3 = numberValue(data[category + basekey])
    let amountratio = 0

    const count1 = numberValue(data[countkey])
    let count2 = 0
    let count3 = numberValue(data[COUNT_STRINGS[category] + basekey])
    let countratio = 0

    const groupAmountKey = zo_strformat("group<<C:1>>", category)

    if (k === 1 && noselection) {
      amount2 = numberValue(data[groupAmountKey])
      amountratio = amount2 === 0 ? 0 : (amount1 / amount2) * 100

      hide2 = true
    } else if (noselection && v === "Absolute") {
      amount2 = numberValue(data[groupAmountKey])
      amountratio = amount2 === 0 ? 0 : (amount1 / amount2) * 100

      hide4 = true
    } else if (noselection) {
      hide3 = true

      amountratio = amount3 === 0 ? 0 : (amount1 / amount3) * 100
      countratio = count3 === 0 ? 0 : (count1 / count3) * 100
    } else {
      if (k !== 1 && v !== "Absolute") {
        amount3 = numberValue(selectionData?.[category + basekey])
        count3 = numberValue(selectionData?.[COUNT_STRINGS[category] + basekey])
      }

      amount2 = numberValue(selectionData?.[amountkey])
      amountratio = amount3 === 0 ? 0 : (amount2 / amount3) * 100

      count2 = numberValue(selectionData?.[countkey])
      countratio = count3 === 0 ? 0 : (count2 / count3) * 100
    }

    setChildText(rowcontrol1, "Value", formatCount(amount1))
    setChildText(rowcontrol1, "Value2", formatCount(amount2))
    setChildText(rowcontrol1, "Value3", formatPercent(amountratio / PERCENT))

    setChildText(rowcontrol2, "Value", formatCount(count1))
    setChildText(rowcontrol2, "Value2", formatCount(count2))
    setChildText(rowcontrol2, "Value3", formatPercent(countratio / PERCENT))

    amountcontrol2?.SetHidden(hide3 || hide4)
    amountcontrol3?.SetHidden(hide4)

    countcontrol2?.SetHidden(hide3 || hide2)
    countcontrol3?.SetHidden(hide2)
  }
  return undefined
}

export function updateFightStatsPanel(this: void, panel: Control): undefined {
  log("UI", LOG_LEVEL_DEBUG, "Updating FightStatsPanel")

  const left = panel.GetNamedChild<UpdatableControl>("Left")
  left?.Update?.(left)
  const right = panel.GetNamedChild<UpdatableControl>("Right")
  right?.Update?.(right)
  return undefined
}
