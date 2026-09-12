import "akasha/temper/antiquities-addon/modules/leads-global/leads-global.module.code.ts"

import {
  ADDON_NAME,
  SLASH_COMMAND,
} from "akasha/temper/antiquities-addon/modules/leads-constants/leads-constants.module.code.ts"
import { createInventoryDropdown } from "akasha/temper/antiquities-addon/modules/leads-dropdowns/leads-dropdowns.module.code.ts"
import { antiquityFound } from "akasha/temper/antiquities-addon/modules/leads-reporting/leads-reporting.module.code.ts"
import { initializeSavedVariables } from "akasha/temper/antiquities-addon/modules/leads-saved-variables/leads-saved-variables.module.code.ts"
import { toggleLeadsWindow } from "akasha/temper/antiquities-addon/modules/leads-toggle/leads-toggle.module.code.ts"
import { STRINGS } from "akasha/temper/antiquities-addon/modules/leads-ui-strings/leads-ui-strings.module.code.ts"
import { createUnitList } from "akasha/temper/antiquities-addon/modules/leads-unit-list/leads-unit-list.module.code.ts"

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

globalThis.TemperHud?.registerCommand({
  name: "/temperleads",
  description: "Toggle antiquity leads window",
  addon: "TemperAntiquities",
})
