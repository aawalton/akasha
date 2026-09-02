import { createMovableWindow } from "@akasha/temper-hud-window/movable-window"
import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"
import { initializeTabs } from "../characters-tab-manager/characters-tab-manager.module.code.ts"

export let window: TopLevelWindow | undefined
export let windowFragment: SceneFragment | undefined

export function showWindow(): undefined {
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

export function initializeWindow(): undefined {
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

  const bg = WINDOW_MANAGER.CreateControl("$(parent)BG", tlw, CT_BACKDROP)
  bg.SetAnchorFill()
  bg.SetCenterColor(0, 0, 0, 0.8)
  bg.SetEdgeColor(0.7, 0.7, 0.7, 1)
  bg.SetEdgeTexture(undefined, 1, 1, 1)

  const title = WINDOW_MANAGER.CreateControl("$(parent)Title", tlw, CT_LABEL)
  title.SetAnchor(TOPLEFT, tlw, TOPLEFT, 20, 20)
  title.SetFont("ZoFontWindowTitle")
  title.SetText("Temper Build Editor")

  const tabContainer = WINDOW_MANAGER.CreateControl(undefined, tlw, CT_CONTROL)
  tabContainer.SetAnchor(TOPLEFT, title, BOTTOMLEFT, 0, 20)
  tabContainer.SetDimensions(220, tlw.GetHeight() - 80)

  const contentContainer = WINDOW_MANAGER.CreateControl(undefined, tlw, CT_CONTROL)
  contentContainer.SetAnchor(TOPLEFT, title, BOTTOMLEFT, 240, 20)
  contentContainer.SetAnchor(BOTTOMRIGHT, tlw, BOTTOMRIGHT, -20, -20)

  initializeTabs(tabContainer, contentContainer)

  const dragHandle = WINDOW_MANAGER.CreateControl("$(parent)DragHandle", tlw, CT_CONTROL)
  dragHandle.SetAnchor(TOPLEFT, tlw, TOPLEFT, 0, 0)
  dragHandle.SetDimensions(tlw.GetWidth(), 60)

  createMovableWindow({
    window: tlw,
    dragHandle,
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
