import "akasha/temper/addon/pages/world/antiquities/modules/leads-global/leads-global.module.code.ts"

import {
  ADDON_NAME,
  SLASH_COMMAND,
} from "akasha/temper/addon/pages/world/antiquities/modules/leads-constants/leads-constants.module.code.ts"
import { createInventoryDropdown } from "akasha/temper/addon/pages/world/antiquities/modules/leads-dropdowns/leads-dropdowns.module.code.ts"
import { antiquityFound } from "akasha/temper/addon/pages/world/antiquities/modules/leads-reporting/leads-reporting.module.code.ts"
import { initializeSavedVariables } from "akasha/temper/addon/pages/world/antiquities/modules/leads-saved-variables/leads-saved-variables.module.code.ts"
import { toggleLeadsWindow } from "akasha/temper/addon/pages/world/antiquities/modules/leads-toggle/leads-toggle.module.code.ts"
import { STRINGS } from "akasha/temper/addon/pages/world/antiquities/modules/leads-ui-strings/leads-ui-strings.module.code.ts"
import { createUnitList } from "akasha/temper/addon/pages/world/antiquities/modules/leads-unit-list/leads-unit-list.module.code.ts"
import { ADDON_NAME as WORLD_ADDON_NAME } from "akasha/temper/addon/pages/world/modules/world-names/world-names.module.code.ts"
import "akasha/temper/addon/pages/world/antiquities/leads-window-declarations/leads-window-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-global/temper-global.type-declaration.d.ts"

export function initLeads(this: void): undefined {
  initializeSavedVariables()
  createUnitList()

  toggleLeadsWindow()
  TemperLeadsMainWindow.SetHidden(true)

  createInventoryDropdown("Major")
  createInventoryDropdown("Zone")
  createInventoryDropdown("SetType")
  TemperLeadsLocationBox.SetText(STRINGS.EDITBOX_INITIAL)
  TemperLeadsMainWindowLocationURL.SetText(STRINGS.LABEL_URL_INITIAL)
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_ANTIQUITY_LEAD_ACQUIRED, antiquityFound)
  SCENE_MANAGER.RegisterTopLevel(TemperLeadsMainWindow, false)
}

SLASH_COMMANDS[SLASH_COMMAND] = toggleLeadsWindow
ZO_CreateStringId("SI_BINDING_NAME_TOGGLE_TEMPER_LEADS", STRINGS.KEYBINDINGTEXT)

globalThis.Temper?.registerCommand({
  name: "/temperleads",
  description: "Toggle antiquity leads window",
  addon: WORLD_ADDON_NAME,
})
