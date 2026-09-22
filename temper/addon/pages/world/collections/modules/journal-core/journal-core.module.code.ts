import type { TabData } from "akasha/temper/addon/pages/world/collections/modules/journal-shape/journal-shape.module.code.ts"
import {
  Internal,
  Public,
} from "akasha/temper/addon/pages/world/collections/modules/journal-state/journal-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/lib-custom-menu/custom-menu-declarations/custom-menu-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-deconstruction/eso-deconstruction.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-addon-menu/lib-addon-menu.type-declaration.d.ts"

const Controls = Internal.controls

Public.Show = (descriptor?: string, toggle?: boolean): undefined => {
  Internal.LazyInitialize(descriptor)

  let toggleLocal = toggle
  if (descriptor !== undefined && descriptor !== ZO_MenuBar_GetSelectedDescriptor(Controls.menu)) {
    ZO_MenuBar_SelectDescriptor(Controls.menu, descriptor, true)
    toggleLocal = false
  }

  if (!SCENE_MANAGER.IsShowing(Internal.SCENE_NAME)) {
    SCENE_MANAGER.Push(Internal.SCENE_NAME)
    if (
      Controls.mainMenu !== undefined &&
      ZO_MenuBar_GetSelectedDescriptor(Controls.mainMenu) !== Internal.name
    ) {
      ZO_MenuBar_SelectDescriptor(Controls.mainMenu, Internal.name, true)
    }
    if (Internal.FixMainMenuCategory !== undefined) {
      Internal.FixMainMenuCategory()
    }
  } else if (toggleLocal === true) {
    SCENE_MANAGER.ShowBaseScene()
  }
}

Public.RegisterTab = (descriptor: string, tabData: TabData): undefined => {
  tabData.descriptor = descriptor
  Internal.tabs[descriptor] = tabData

  if (tabData.title !== undefined) {
    const parts = [Internal.GetString(tabData.title)]
    if (tabData.subtitle !== undefined) {
      parts.push(Internal.GetString(tabData.subtitle))
    }
    tabData.name = table.concat(parts, ": ")
  }

  const binding = tabData.binding
  if (binding !== undefined && type(binding) === "string") {
    ZO_CreateStringId("SI_BINDING_NAME_" + binding, Internal.GetString(tabData.name))
  }

  const slashCommands = tabData.slashCommands
  if (slashCommands !== undefined && type(slashCommands) === "table") {
    const showTab = (): undefined => {
      Public.Show(descriptor)
    }
    for (const command of slashCommands) {
      if (SLASH_COMMANDS[command] === undefined) {
        SLASH_COMMANDS[command] = showTab
      }
    }
  }
}

Public.GetActiveTab = (): string | undefined => {
  const activeTab = Internal.activeTab
  return activeTab !== undefined ? activeTab.descriptor : undefined
}

Public.IsTabActive = (descriptor: string): boolean => descriptor === Public.GetActiveTab()

Public.GetFrame = (): Control => Controls.frame

Public.InvokeSettings = (): undefined => {
  if (Internal.settingsVisible) {
    const activeTab = Internal.activeTab
    if (
      LibAddonMenu2 !== undefined &&
      activeTab !== undefined &&
      activeTab.settingsPanel !== undefined
    ) {
      LibAddonMenu2.OpenToPanel(activeTab.settingsPanel)
    }
  }
}

Public.SetAlternateMode = (
  callbackMain?: (this: void) => void,
  callbackList?: (this: void, listControl: Control) => void
): undefined => {
  Internal.altMode = callbackMain
  Internal.altModeList = callbackList
}
