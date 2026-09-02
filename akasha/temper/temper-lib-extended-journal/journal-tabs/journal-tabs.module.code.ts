import {
  asCallback,
  asNumber,
  asRecord,
  asString,
  asTabData,
} from "../journal-casts/journal-casts.module.code.ts"
import type { MenuBarButton, TabData } from "../journal-shape/journal-shape.module.code.ts"
import { Internal, Public } from "../journal-state/journal-state.module.code.ts"

const Controls = Internal.controls

Internal.GetString = (str?: string | number): string => {
  if (type(str) === "string") {
    return asString(str)
  } else if (type(str) === "number") {
    return GetString(asNumber(str))
  } else {
    return ""
  }
}

Internal.UpdateTitle = (title?: string): undefined => {
  Internal.currentTitle = title ?? Internal.currentTitle
  if (Controls.title !== undefined) {
    Controls.title.SetText(Internal.currentTitle ?? "")
  }
}

Internal.HandleTabSwitch = (button: MenuBarButton): undefined => {
  if (SCENE_MANAGER.IsShowing(Internal.SCENE_NAME)) {
    Internal.PrepareTabForDisplay(button.descriptor)
  }

  if (Internal.altMode === undefined) {
    Internal.UpdateTitle(Internal.GetString(button.title))
    Controls.subtitle.SetText(Internal.GetString(button.subtitle))
  } else {
    Controls.subtitle.SetText(Internal.GetString(button.categoryName))
  }

  for (const descriptor in Internal.tabs) {
    const tab = asTabData(Internal.tabs[descriptor])
    if (descriptor === button.descriptor) {
      tab.control.SetHidden(false)
    } else {
      tab.control.SetHidden(true)
    }
  }
}

Internal.PrepareTabForDisplay = (descriptor?: string): undefined => {
  let tab: TabData | undefined
  if (descriptor !== undefined) {
    tab = Internal.tabs[descriptor]
  }

  if (Internal.activeTab !== tab) {
    Internal.FireCallbackForCurrentTab("Hide")
  }
  Internal.activeTab = tab
  Internal.FireCallbackForCurrentTab("Show")

  Internal.RefreshSettingsButton()
}

Internal.FireCallbackForCurrentTab = (event: string): undefined => {
  const activeTab = Internal.activeTab
  const fn = activeTab !== undefined ? asRecord(activeTab)["callback" + event] : undefined
  if (fn !== undefined) {
    asCallback(fn)()
  }
}

const SETTINGS_BUTTON: {
  name: string
  keybind: string
  alignment: number
  callback?: (this: void) => void
} = {
  name: GetString(SI_GAME_MENU_SETTINGS),
  keybind: "UI_SHORTCUT_TERTIARY",
  alignment: KEYBIND_STRIP_ALIGN_RIGHT,
}

Internal.RefreshSettingsButton = (): undefined => {
  const activeTab = Internal.activeTab
  const settingsAvailable =
    LibAddonMenu2 !== undefined && activeTab !== undefined && activeTab.settingsPanel !== undefined
  if (settingsAvailable && !Internal.settingsVisible) {
    Internal.settingsVisible = true
    SETTINGS_BUTTON.callback = Public.InvokeSettings
    KEYBIND_STRIP.AddKeybindButton(SETTINGS_BUTTON)
  } else if (!settingsAvailable && Internal.settingsVisible) {
    Internal.settingsVisible = false
    KEYBIND_STRIP.RemoveKeybindButton(SETTINGS_BUTTON)
  }
}
