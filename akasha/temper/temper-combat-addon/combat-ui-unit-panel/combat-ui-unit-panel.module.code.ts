import { LOG_LEVEL_DEBUG, log } from "@akasha/temper-combat-addon/combat-core-log"
import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import { spairs } from "@akasha/temper-combat-addon/combat-sorted-pairs"
import type { RowAnchor } from "@akasha/temper-combat-addon/combat-ui-buff-panel"
import {
  adjustRowSize,
  getShortFormattedNumber,
  numberValue,
  resetBars,
  setChildText,
} from "@akasha/temper-combat-addon/combat-ui-main-panel"
import type {
  BarsPanelControl,
  SelectionRowControl,
} from "@akasha/temper-combat-addon/combat-ui-selection"
import { getDx, getFightData, getSelections } from "@akasha/temper-combat-addon/combat-ui-state"

export function updateUnitPanel(this: void, panel: BarsPanelControl): undefined {
  log("UI", LOG_LEVEL_DEBUG, "Updating UnitPanel")

  const barsPanel = panel
  resetBars(barsPanel)

  const db = getDb()
  const category = db.FightReport.category

  const isdamage = category === "damageOut" || category === "damageIn"

  const label1 =
    category === "damageOut" || category === "healingOut" ? GetString(SI_TEMPER_COMBAT_TARGET) : ""
  const label2 = isdamage ? GetString(SI_TEMPER_COMBAT_DPS) : GetString(SI_TEMPER_COMBAT_HPS)
  const label3 = isdamage ? GetString(SI_TEMPER_COMBAT_DAMAGE) : GetString(SI_TEMPER_COMBAT_HEALING)

  const header = panel.GetNamedChild("Header")
  if (header == null) {
    return undefined
  }

  setChildText(header, "Name", label1)
  setChildText(header, "PerSecond", label2)
  setChildText(header, "Total", label3)

  const fightData = getFightData()
  if (fightData == null) {
    return undefined
  }

  const data = fightData.calculated
  if (data == null) {
    return undefined
  }

  const selectedunits = getSelections().unit[category]

  const totalAmountKey = `${category}Total`
  const totalAmount = numberValue(data[totalAmountKey])

  const scrollchild = GetControl(panel, "PanelScrollChild")
  if (scrollchild == null) {
    return undefined
  }
  let currentanchor: RowAnchor = [TOPLEFT, scrollchild, TOPLEFT, 0, 1]

  const frSettings = db.FightReport

  const rightpanel = frSettings.rightpanel

  const showids = db.showDebugIds

  for (const [unitId, unit] of spairs(
    data.units,
    (t, a, b) => numberValue(t[a]?.[totalAmountKey]) > numberValue(t[b]?.[totalAmountKey])
  )) {
    const totalUnitAmount = numberValue(unit[totalAmountKey])

    const unitData = fightData.units[unitId]
    if (unitData == null) {
      continue
    }

    const showByBuffs =
      (rightpanel === "buffsout" &&
        NonContiguousCount(unit.buffs) > 0 &&
        unitData.isFriendly === false &&
        isdamage) ||
      (unitData.isFriendly && !isdamage)

    if (
      !(totalUnitAmount > 0 || showByBuffs) ||
      (unitData.unitType === COMBAT_UNIT_TYPE_PLAYER_PET && frSettings.showPets === false)
    ) {
      continue
    }

    let highlight = false
    if (selectedunits != null) {
      highlight = selectedunits[unitId] != null
    }

    const dbug = showids ? string.format("(%d) ", unitId) : ""

    const name =
      dbug + ((frSettings.useDisplayNames ? unitData.displayname : undefined) ?? unitData.name)

    const isboss = unitData.bossId != null
    const namecolor: [number, number, number, number] = isboss ? [1, 0.8, 0.3, 1] : [1, 1, 1, 1]

    const unitTime =
      unitData.dpsend != null && unitData.dpsstart != null
        ? zo_max((unitData.dpsend - unitData.dpsstart) / 1000, 1)
        : 1
    const dps = totalUnitAmount / unitTime
    const damage = totalUnitAmount
    const ratio = damage / totalAmount

    const bars = barsPanel.bars ?? []
    barsPanel.bars = bars
    const rowId = bars.length + 1

    const rowName = `${scrollchild.GetName()}Row${rowId}`
    const row =
      GetControl<SelectionRowControl>(rowName) ??
      CreateControlFromVirtual<SelectionRowControl>(
        rowName,
        scrollchild,
        "TemperCombat_UnitRowTemplate"
      )
    row.SetAnchor(...currentanchor)
    row.SetHidden(false)

    adjustRowSize(row, header)

    row.GetNamedChild("HighLight")?.SetHidden(!highlight)

    const nameControl = row.GetNamedChild<LabelControl>("Name")
    nameControl?.SetText(name)
    nameControl?.SetColor(...namecolor)

    const maxwidth = nameControl?.GetWidth() ?? 0

    row.GetNamedChild("Bar")?.SetWidth(maxwidth * ratio)

    setChildText(row, "PerSecond", string.format("%.0f", dps))
    setChildText(row, "Total", getShortFormattedNumber(damage))
    setChildText(row, "Fraction", string.format("%.1f%%", 100 * ratio))

    currentanchor = [TOPLEFT, row, BOTTOMLEFT, 0, getDx()]

    bars[rowId - 1] = row

    row.dataId = unitId
    row.type = "unit"
    row.id = rowId
    row.panel = barsPanel
  }
  return undefined
}
