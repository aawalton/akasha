import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"

import {
  defaultComponentVisible,
  isComponentVisible,
  setComponentVisiblePersistent,
} from "akasha/temper/addon/pages/temper-core/modules/hud-addon-hide-init/hud-addon-hide-init.module.code.ts"
import type { HudComponentRecord } from "akasha/temper/addon/shared/hud-component/modules/hud-component-record/hud-component-record.module.code.ts"
import { HUD_SCENE_CATALOG } from "akasha/temper/addon/shared/hud-component/modules/hud-scene-catalog/hud-scene-catalog.module.code.ts"
import { header } from "akasha/temper/addon/shared/settings-panel/modules/header/header.module.code.ts"
import { registerPanel } from "akasha/temper/addon/shared/settings-panel/modules/register-panel/register-panel.module.code.ts"

const PANEL_ID = "TemperHudOptions"

function groupByCategory(this: void): {
  order: readonly string[]
  groups: Record<string, readonly HudComponentRecord[]>
} {
  const order: string[] = []
  const groups: Record<string, HudComponentRecord[]> = {}
  for (const record of HUD_SCENE_CATALOG) {
    const existing = groups[record.category]
    if (existing === undefined) {
      groups[record.category] = [record]
      order.push(record.category)
    } else {
      existing.push(record)
    }
  }
  return { order, groups }
}

function buildControls(this: void): readonly LamControlData[] {
  const controls: LamControlData[] = [
    {
      type: "description",
      text: "Show or hide any main-scene HUD component. On = shown, Off = hidden. Components turned off stay hidden across scene changes, combat, and /reloadui.",
    },
  ]
  const { order, groups } = groupByCategory()
  for (const category of order) {
    const records = groups[category]
    if (records === undefined) continue
    controls.push(header(category))
    for (const record of records) {
      const id = record.id
      controls.push({
        type: "checkbox",
        name: record.name,
        tooltip: `${record.esoGlobal} (${record.hideMechanism}) — on = shown, off = hidden`,
        getFunc: () => isComponentVisible(id),
        setFunc: (value) => setComponentVisiblePersistent(id, value),
        default: defaultComponentVisible(id),
      })
    }
  }
  return controls
}

export function initializeSettingsPanel(this: void): undefined {
  const panelData: LamPanelData = {
    type: "panel",
    name: "Temper HUD",
    slashCommand: "/temperhud",
    registerForRefresh: true,
    registerForDefaults: true,
  }
  registerPanel(TemperAddonMenu, PANEL_ID, panelData, [...buildControls()])
  return undefined
}
