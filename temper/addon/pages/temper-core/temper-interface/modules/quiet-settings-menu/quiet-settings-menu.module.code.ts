import {
  ADDON_AUTHOR,
  ADDON_VERSION,
  ADDON_WEBSITE,
  PANEL_ID,
  SLASH_COMMAND,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-identity/quiet-identity.module.code.ts"
import { buildDialogSections } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-settings-dialogs/quiet-settings-dialogs.module.code.ts"
import { buildGuildSubmenus } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-settings-guilds/quiet-settings-guilds.module.code.ts"
import { buildMessageSections } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-settings-messages/quiet-settings-messages.module.code.ts"
import { buildWorldSections } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-settings-world/quiet-settings-world.module.code.ts"
import { registerPanel } from "akasha/temper/addon/shared/settings-panel/modules/register-panel/register-panel.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"

export function buildSettingsMenu(this: void): undefined {
  const panelData: LamPanelData = {
    type: "panel",
    name: "No, thank you!",
    author: ADDON_AUTHOR,
    version: ADDON_VERSION,
    slashCommand: SLASH_COMMAND,
    registerForRefresh: true,
    registerForDefaults: true,
    website: ADDON_WEBSITE,
  }

  const optionsData: LamControlData[] = [
    ...buildMessageSections(),
    ...buildDialogSections(),
    ...buildWorldSections(),
    ...buildGuildSubmenus(),
  ]

  registerPanel(TemperAddonMenu, PANEL_ID, panelData, optionsData)
}
