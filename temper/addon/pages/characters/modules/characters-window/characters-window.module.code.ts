import { initializeTabs } from "akasha/temper/addon/pages/characters/modules/characters-tab-manager/characters-tab-manager.module.code.ts"
import { createMovableWindow } from "akasha/temper/modules/movable-window/movable-window.module.code.ts"
import { getSavedVariables } from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import { frameWindow } from "akasha/temper/window/modules/window-frame/window-frame.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const TABS_WIDTH = 220

const TABS_GAP = 16

let window: TopLevelWindow | undefined
let windowFragment: SceneFragment | undefined

function showWindow(): undefined {
  if (!window) {
    initializeWindow()
  }
  if (!window || !windowFragment) return

  window.SetHidden(false)
  SCENE_MANAGER.SetInUIMode(true)

  const hudScene = SCENE_MANAGER.GetScene("hud")
  hudScene.AddFragment(windowFragment)
}

export function hideWindow(): undefined {
  if (!window || !windowFragment) return

  window.SetHidden(true)

  const hudScene = SCENE_MANAGER.GetScene("hud")
  const hudUIScene = SCENE_MANAGER.GetScene("hudui")
  hudScene.RemoveFragment(windowFragment)
  hudUIScene.RemoveFragment(windowFragment)

  SCENE_MANAGER.SetInUIMode(false)
}

export function toggleWindow(): undefined {
  if (!window || window.IsHidden()) {
    showWindow()
  } else {
    hideWindow()
  }
}

function initializeWindow(): undefined {
  if (window) return

  const existingWindow = WINDOW_MANAGER.GetControlByName<TopLevelWindow>("TemperWindow")
  if (existingWindow) {
    window = existingWindow
    return
  }

  const tlw = WINDOW_MANAGER.CreateTopLevelWindow("TemperWindow")
  tlw.SetDimensions(1050, 600)
  tlw.SetHidden(true)

  windowFragment = ZO_SimpleSceneFragment.New(tlw)

  const onStateChange = (_oldState: number, newState: number): undefined => {
    if (newState === SCENE_HIDING) {
      if (window && !window.IsHidden()) {
        hideWindow()
      }
    }
  }

  const hudScene = SCENE_MANAGER.GetScene("hud")
  const hudUIScene = SCENE_MANAGER.GetScene("hudui")

  hudScene.RemoveFragment(windowFragment)
  hudUIScene.RemoveFragment(windowFragment)

  hudScene.RegisterCallback("StateChange", onStateChange)
  hudUIScene.RegisterCallback("StateChange", onStateChange)

  const { header, body } = frameWindow(tlw, "Temper Build Editor", () => hideWindow())

  const tabContainer = WINDOW_MANAGER.CreateControl(undefined, body, CT_CONTROL)
  tabContainer.SetAnchor(TOPLEFT, body, TOPLEFT, 0, 0)
  tabContainer.SetAnchor(BOTTOMLEFT, body, BOTTOMLEFT, 0, 0)
  tabContainer.SetWidth(TABS_WIDTH)

  const contentContainer = WINDOW_MANAGER.CreateControl(undefined, body, CT_CONTROL)
  contentContainer.SetAnchor(TOPLEFT, tabContainer, TOPRIGHT, TABS_GAP, 0)
  contentContainer.SetAnchor(BOTTOMRIGHT, body, BOTTOMRIGHT, 0, 0)

  initializeTabs(tabContainer, contentContainer)

  createMovableWindow({
    window: tlw,
    dragHandle: header,
    loadPosition: () => {
      const pos = getSavedVariables().navigation.windowPosition
      if (pos === undefined) return undefined
      return { left: pos.left, top: pos.top }
    },
    savePosition: (position) => {
      getSavedVariables().navigation.windowPosition = {
        left: position.left,
        top: position.top,
      }
    },
    applyDefaultAnchor: () => {
      tlw.SetAnchor(CENTER, GuiRoot, CENTER, 0, 0)
    },
  })

  window = tlw
}
