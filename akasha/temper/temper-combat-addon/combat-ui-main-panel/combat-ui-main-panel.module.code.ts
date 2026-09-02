import { LOG_LEVEL_DEBUG, log } from "@akasha/temper-combat-addon/combat-core-log"
import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import { isLabelControl } from "@akasha/temper-combat-addon/combat-ui-helpers"
import type { BarsPanelControl } from "@akasha/temper-combat-addon/combat-ui-selection"
import type { UpdatableControl } from "@akasha/temper-combat-addon/combat-ui-state"

export interface ActivePanelControl extends UpdatableControl {
  active?: UpdatableControl
}

export function updateMainPanel(this: void, mainpanel: ActivePanelControl): undefined {
  log("UI", LOG_LEVEL_DEBUG, "Updating MainPanel")

  const active = mainpanel.active
  active?.Update?.(active)
  return undefined
}

export function updateRightPanel(this: void, rightPanel: ActivePanelControl): undefined {
  log("UI", LOG_LEVEL_DEBUG, "Updating RightPanel")

  const active = rightPanel.active
  active?.Update?.(active)
  return undefined
}

export function numberValue(this: void, value: unknown): number {
  return typeof value === "number" ? value : 0
}

export function setChildText(this: void, parent: Control, name: string, text: string): undefined {
  parent.GetNamedChild<LabelControl>(name)?.SetText(text)
  return undefined
}

export interface ScalableRowControl extends Control {
  scale?: number
}

export function adjustRowSize(
  this: void,
  row: ScalableRowControl | undefined,
  header: Control
): undefined {
  const db = getDb()

  if (row == null || row.scale === db.FightReport.scale) {
    return undefined
  }

  row.scale = db.FightReport.scale

  for (let i = 1; i <= header.GetNumChildren(); i++) {
    const child = header.GetChild(i)
    if (child == null) {
      continue
    }

    const childname = zo_strgsub(child.GetName(), header.GetName(), "")

    const template = header.GetNamedChild(childname)
    const rowchild = row.GetNamedChild(childname)

    if (template != null && rowchild != null) {
      const [x, y] = template.GetDimensions()
      rowchild.SetDimensions(x, y)

      const [valid1, , , , anchorX, anchorY] = template.GetAnchor(0)
      const [valid2, point, relativeTo, relativePoint] = rowchild.GetAnchor(0)

      if (valid1 && valid2) {
        rowchild.ClearAnchors()
        rowchild.SetAnchor(point, relativeTo, relativePoint, anchorX, anchorY)
      }

      if (isLabelControl(rowchild)) {
        const fontsize = (tonumber(GetString(SI_TEMPER_COMBAT_FONT_SIZE)) ?? 0) * row.scale
        rowchild.SetFont(
          string.format(
            "%s|%s|%s",
            GetString(SI_TEMPER_COMBAT_STD_FONT),
            fontsize,
            "soft-shadow-thin"
          )
        )
      }
    }
  }
  return undefined
}

export function resetBars(this: void, panel: BarsPanelControl): undefined {
  const bars = panel.bars

  if (bars == null) {
    panel.bars = []
    return undefined
  }

  if (bars.length === 0) {
    return undefined
  }

  for (const bar of bars) {
    bar.SetHidden(true)
  }

  panel.bars = []
  return undefined
}

export function getShortFormattedNumber(this: void, value: number): string {
  const exponent = zo_floor(math.log(value) / math.log(10))
  const loweredNumber = zo_roundToNearest(value, zo_pow(10, exponent - 2))

  return ZO_AbbreviateNumber(loweredNumber, 2, exponent >= 6)
}
