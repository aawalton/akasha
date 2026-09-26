import {
  LOG_LEVEL_DEBUG,
  log,
} from "akasha/temper/addon/pages/combat/modules/combat-core-log/combat-core-log.module.code.ts"
import {
  REPORT_SIZE,
  reportFont,
} from "akasha/temper/addon/pages/combat/modules/combat-report-type/combat-report-type.module.code.ts"
import { getDb } from "akasha/temper/addon/pages/combat/modules/combat-saved-variables/combat-saved-variables.module.code.ts"
import {
  isLabelControl,
  type LayoutControl,
} from "akasha/temper/addon/pages/combat/modules/combat-ui-helpers/combat-ui-helpers.module.code.ts"
import type { BarsPanelControl } from "akasha/temper/addon/pages/combat/modules/combat-ui-selection/combat-ui-selection.module.code.ts"
import type { UpdatableControl } from "akasha/temper/addon/pages/combat/modules/combat-ui-state/combat-ui-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-controls-report/combat-controls-report.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

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

  const scale = db.FightReport.scale
  row.scale = scale

  for (let i = 1; i <= header.GetNumChildren(); i++) {
    const child = header.GetChild(i)
    if (child == null) {
      continue
    }

    const childname = zo_strgsub(child.GetName(), header.GetName(), "")

    const template = header.GetNamedChild<LayoutControl>(childname)
    const rowchild = row.GetNamedChild(childname)

    if (template != null && rowchild != null) {
      const [liveX, liveY] = template.GetDimensions()
      const sizes = template.sizes
      const x = sizes != null ? sizes[0] * scale : liveX
      const y = sizes != null ? sizes[1] * scale : liveY
      rowchild.SetDimensions(x, y)

      const templateAnchor = template.anchors?.[0]
      const [valid2, point, relativeTo, relativePoint] = rowchild.GetAnchor(0)

      if (templateAnchor != null && valid2) {
        rowchild.ClearAnchors()
        rowchild.SetAnchor(
          point,
          relativeTo,
          relativePoint,
          templateAnchor[3] * scale,
          templateAnchor[4] * scale
        )
      }

      if (isLabelControl(rowchild)) {
        rowchild.SetFont(reportFont(REPORT_SIZE * scale, "soft-shadow-thin"))
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
