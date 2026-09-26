import { rememberOrigin } from "akasha/temper/addon/pages/world/markers/modules/markers-editor-map/markers-editor-map.module.code.ts"
import { editorSavePressed } from "akasha/temper/addon/pages/world/markers/modules/markers-editor-selection/markers-editor-selection.module.code.ts"
import {
  EDITOR,
  editorChild,
} from "akasha/temper/addon/pages/world/markers/modules/markers-editor-state/markers-editor-state.module.code.ts"
import "akasha/temper/addon/pages/world/markers/markers-declarations/markers-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-alchemy-station/eso-alchemy-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-crafting-tooltips/eso-crafting-tooltips.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-4/eso-ui-4.type-declaration.d.ts"

type Clicker = (
  this: void,
  control: Control,
  button: number,
  upInside: boolean,
  ctrl: boolean,
  alt: boolean,
  shift: boolean,
  command: boolean,
  source: string
) => void

const CURSOR_TICK = "TemperWorldMarkerEditorCursor"

let cursorX = 0
let cursorY = 0
let oldCursorX = 0
let oldCursorY = 0

function handleFakeClick(this: void, button: number): undefined {
  const clicked = WINDOW_MANAGER.GetControlAtCursor(EDITOR.cursorId)
  if (clicked.GetOwningWindow() === ZO_KeybindStripControl) return undefined
  const handler = (clicked.GetHandler("OnMouseUp") ??
    clicked.GetHandler("OnClicked") ??
    clicked.GetHandler("OnMouseDown")) as Clicker | undefined
  handler?.(clicked, button, true, false, false, false, false, "gamepadCursor")
  return undefined
}

function snapCursor(this: void, location: string): undefined {
  const control = editorChild(location)
  if (control !== undefined) {
    cursorX = control.GetLeft()
    cursorY = control.GetTop()
  }
  return undefined
}

function snapWhenStill(this: void, location: string, vertical: boolean): undefined {
  const still = vertical
    ? GetGamepadLeftStickY() === 0 && GetGamepadRightStickY() === 0
    : GetGamepadLeftStickX() === 0 && GetGamepadRightStickX() === 0
  if (still) snapCursor(location)
  return undefined
}

function keybindButton(
  this: void,
  name: string,
  icon: string,
  text: string
): KeybindButtonControl | undefined {
  const button = editorChild<KeybindButtonControl>(name)
  button?.SetCustomKeyIcon(icon)
  button?.SetText(text)
  return button
}

function nothing(this: void): undefined {
  return undefined
}

export const KEYBOARD_KEYBINDS: object[] = []
export const GAMEPAD_KEYBINDS: object[] = []

export function initEditorKeybinds(this: void): undefined {
  const dpad = keybindButton(
    "DpadButton",
    "esoui/art/buttons/gamepad/ps4/nav_ps4_dpad.dds",
    "Snap Cursor"
  )
  const zoom = keybindButton(
    "GPZoom",
    "esoui/art/buttons/gamepad/scarlett/nav_scarlett_ltrt.dds",
    "Zoom"
  )
  const left = keybindButton("LeftMouseButton", "EsoUI/Art/Miscellaneous/icon_LMB.dds", "Select")
  const right = keybindButton(
    "RightMouseButton",
    "EsoUI/Art/Miscellaneous/icon_RMB.dds",
    "Place Marker"
  )

  GAMEPAD_KEYBINDS.push(
    {
      name: "Select",
      alignment: KEYBIND_STRIP_ALIGN_LEFT,
      keybind: "UI_SHORTCUT_PRIMARY",
      callback: () => handleFakeClick(MOUSE_BUTTON_INDEX_LEFT),
    },
    {
      name: "Place Marker",
      alignment: KEYBIND_STRIP_ALIGN_LEFT,
      keybind: "UI_SHORTCUT_SECONDARY",
      callback: () => handleFakeClick(MOUSE_BUTTON_INDEX_RIGHT),
    },
    {
      name: "Move Cursor",
      alignment: KEYBIND_STRIP_ALIGN_CENTER,
      keybind: "UI_SHORTCUT_LEFT_STICK",
    },
    { name: "Pan", alignment: KEYBIND_STRIP_ALIGN_CENTER, keybind: "UI_SHORTCUT_RIGHT_STICK" },
    {
      keybind: "CUSTOM_M0R_MARKERS_EDITOR_ZOOM",
      alignment: KEYBIND_STRIP_ALIGN_CENTER,
      customKeybindControl: zoom,
      callback: nothing,
    },
    {
      name: "Snap to Mid",
      alignment: KEYBIND_STRIP_ALIGN_RIGHT,
      keybind: "UI_SHORTCUT_INPUT_UP",
      ethereal: true,
      callback: () => snapWhenStill("SnapPointMid", true),
    },
    {
      name: "Snap to Discard",
      alignment: KEYBIND_STRIP_ALIGN_RIGHT,
      keybind: "UI_SHORTCUT_INPUT_DOWN",
      ethereal: true,
      callback: () => snapWhenStill("SnapPointApply", true),
    },
    {
      name: "Snap to Left",
      alignment: KEYBIND_STRIP_ALIGN_RIGHT,
      keybind: "UI_SHORTCUT_INPUT_LEFT",
      ethereal: true,
      callback: () => snapWhenStill("SnapPointLeft", false),
    },
    {
      name: "Snap to Right",
      alignment: KEYBIND_STRIP_ALIGN_RIGHT,
      keybind: "UI_SHORTCUT_INPUT_RIGHT",
      ethereal: true,
      callback: () => snapWhenStill("SnapPointRight", false),
    },
    {
      order: 5,
      keybind: "CUSTOM_M0R_MARKERS_EDITOR_SNAP",
      alignment: KEYBIND_STRIP_ALIGN_RIGHT,
      customKeybindControl: dpad,
      callback: nothing,
    },
    {
      name: "|c98FB98Save|r",
      alignment: KEYBIND_STRIP_ALIGN_RIGHT,
      keybind: "UI_SHORTCUT_TERTIARY",
      callback: () => editorSavePressed(),
    },
    {
      name: "|cFFB6C1Exit|r",
      alignment: KEYBIND_STRIP_ALIGN_RIGHT,
      keybind: "UI_SHORTCUT_NEGATIVE",
      callback: () => SCENE_MANAGER.Push("hud"),
    }
  )

  KEYBOARD_KEYBINDS.push(
    {
      order: 1,
      keybind: "CUSTOM_M0R_MARKERS_EDITOR_LEFT",
      alignment: KEYBIND_STRIP_ALIGN_LEFT,
      customKeybindControl: left,
      callback: nothing,
    },
    {
      order: 2,
      keybind: "CUSTOM_M0R_MARKERS_EDITOR_RIGHT",
      alignment: KEYBIND_STRIP_ALIGN_LEFT,
      customKeybindControl: right,
      callback: nothing,
    },
    {
      order: 2,
      name: "Save Profile",
      keybind: "CUSTOM_M0R_MARKERS_EDITOR_SAVE",
      alignment: KEYBIND_STRIP_ALIGN_RIGHT,
      callback: () => editorSavePressed(),
    }
  )
  return undefined
}

function gamepadVirtualMouseLoop(this: void): undefined {
  if (ZO_Dialogs_IsShowingDialog()) return undefined
  const image = EDITOR.image
  if (image === undefined) return undefined
  cursorX += GetGamepadLeftStickX() * 10
  cursorY -= GetGamepadLeftStickY() * 10
  const scaleDelta = GetGamepadRightTriggerMagnitude() - GetGamepadLeftTriggerMagnitude()
  const panX = GetGamepadRightStickX() * 20
  const panY = GetGamepadRightStickY() * 20
  if (scaleDelta !== 0 || panX !== 0 || panY !== 0) rememberOrigin(image)
  if (scaleDelta !== 0) EDITOR.changeScale?.(scaleDelta, "gamepadCursor")
  if (panX !== 0 || panY !== 0) EDITOR.pan?.("customDelta", -panX, panY)
  if (cursorX !== oldCursorX || cursorY !== oldCursorY) {
    const scale = TemperWorldMarkerEditorToplevel.GetScale()
    TemperWorldMarkerEditorToplevelCursor.ClearAnchors()
    TemperWorldMarkerEditorToplevelCursor.SetAnchor(
      TOPLEFT,
      GuiRoot,
      TOPLEFT,
      cursorX / scale,
      cursorY / scale
    )
    if (EDITOR.cursorId !== undefined)
      WINDOW_MANAGER.UpdateCursorPosition(EDITOR.cursorId, cursorX, cursorY)
    oldCursorX = cursorX
    oldCursorY = cursorY
  }
  return undefined
}

export function startGamepad(this: void): undefined {
  cursorX = GuiRoot.GetWidth() / 2
  cursorY = GuiRoot.GetHeight() / 2
  if (EDITOR.cursorId !== undefined) WINDOW_MANAGER.DestroyCursor(EDITOR.cursorId)
  EDITOR.cursorId = WINDOW_MANAGER.CreateCursor(cursorX, cursorY)
  TemperWorldMarkerEditorToplevelCursor.SetHidden(false)
  EVENT_MANAGER.RegisterForUpdate(CURSOR_TICK, 0, gamepadVirtualMouseLoop)
  return undefined
}

export function endGamepad(this: void): undefined {
  EVENT_MANAGER.UnregisterForUpdate(CURSOR_TICK)
  TemperWorldMarkerEditorToplevelCursor.SetHidden(true)
  cursorX = 0
  cursorY = 0
  oldCursorX = 0
  oldCursorY = 0
  if (EDITOR.cursorId !== undefined) {
    WINDOW_MANAGER.DestroyCursor(EDITOR.cursorId)
    EDITOR.cursorId = undefined
  }
  return undefined
}
