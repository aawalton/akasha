import {
  registerDialog,
  showDialogue,
} from "akasha/temper/addon/pages/world/markers/modules/markers-dialogs/markers-dialogs.module.code.ts"
import {
  endGamepad,
  GAMEPAD_KEYBINDS,
  initEditorKeybinds,
  KEYBOARD_KEYBINDS,
  startGamepad,
} from "akasha/temper/addon/pages/world/markers/modules/markers-editor-gamepad/markers-editor-gamepad.module.code.ts"
import { wireEditorInputs } from "akasha/temper/addon/pages/world/markers/modules/markers-editor-inputs/markers-editor-inputs.module.code.ts"
import {
  destroyPreviews,
  initEditorMap,
} from "akasha/temper/addon/pages/world/markers/modules/markers-editor-map/markers-editor-map.module.code.ts"
import { EDITOR } from "akasha/temper/addon/pages/world/markers/modules/markers-editor-state/markers-editor-state.module.code.ts"
import { gamepadEntry } from "akasha/temper/addon/pages/world/markers/modules/markers-profile-dialogs/markers-profile-dialogs.module.code.ts"
import {
  type MarkerIcon,
  MM,
} from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import "akasha/temper/addon/pages/world/markers/markers-declarations/markers-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-alchemy-station/eso-alchemy-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-15/eso-enums-15.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-strings-2/eso-lib-sets-strings-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-4/eso-ui-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"

interface MapEntryData {
  mapId?: number
  isActive: boolean
}

interface ParametricMapDialog extends ZO_DialogData {
  info: { parametricList: unknown[] }
  setupFunc: (this: ParametricMapDialog) => void
  entryList: {
    SetSelectedDataByEval: (
      this: unknown,
      test: (this: void, data: MapEntryData) => boolean
    ) => void
    GetTargetData: (this: unknown) => MapEntryData | undefined
  }
}

export const EDITOR_SCENE = "TemperWorldMarkerEditorScene"
const MAP_SELECT_DIALOG = "TemperWorldMarkerEditorMapSelect"

const scene = ZO_InteractScene.New(EDITOR_SCENE, SCENE_MANAGER, {
  type: "Banking",
  interactTypes: [INTERACTION_BANK],
})
EDITOR.scene = scene

function mapLabel(this: void, name: string, mapId: number): string {
  return `${tostring(name)} (${tostring(mapId)})`
}

registerDialog(MAP_SELECT_DIALOG, {
  canQueue: true,
  gamepadInfo: { dialogType: GAMEPAD_DIALOGS["PARAMETRIC"] ?? 0 },
  setup: (given) => {
    const dialog = given as ParametricMapDialog
    const [zone] = GetUnitRawWorldPosition("player")
    const lookup = EDITOR.mapZoneLookup[zone]
    dialog.info.parametricList = []
    if (lookup === undefined) return
    for (const [mapId, name] of pairs(lookup)) {
      const entry = gamepadEntry(mapLabel(name, mapId), mapId === EDITOR.tiles?.mapid) as {
        entryData: MapEntryData
      }
      entry.entryData.mapId = mapId
      dialog.info.parametricList.push(entry)
    }
    dialog.setupFunc()
    dialog.entryList.SetSelectedDataByEval((data) => data.isActive)
  },
  title: { text: "Select the Zone Map!" },
  buttons: [
    {
      text: SI_GAMEPAD_SELECT_OPTION,
      callback: (dialog) => {
        const mapId = (dialog as ParametricMapDialog).entryList.GetTargetData()?.mapId
        if (mapId !== undefined) EDITOR.setMapId?.(mapId)
      },
    },
    { text: SI_DIALOG_EXIT },
  ],
})

export function showEditorMapSelect(this: void): undefined {
  ZO_Dialogs_ShowPlatformDialog(MAP_SELECT_DIALOG)
  return undefined
}

function buildMapLookup(this: void): undefined {
  const lookup = EDITOR.mapZoneLookup
  for (let mapId = 1; mapId <= 10000; mapId++) {
    const [name, , , zoneIndex] = GetMapInfoById(mapId)
    const zoneId = GetZoneId(zoneIndex)
    if (zoneId !== 2) {
      const maps = lookup[zoneId]
      if (maps !== undefined) maps[mapId] = name
      else lookup[zoneId] = { [mapId]: name }
    }
  }
  lookup[1196] = {
    [1805]: GetMapNameById(1805),
    [1806]: GetMapNameById(1806),
    [1807]: GetMapNameById(1807),
    [1808]: GetMapNameById(1808),
  }
  return undefined
}

function sizeToScreen(this: void): undefined {
  const [, guiHeight] = GuiRoot.GetDimensions()
  EDITOR.mapWidth = guiHeight * 0.75
  EDITOR.mapHeight = guiHeight * 0.75
  EDITOR.frame?.SetDimensions(EDITOR.mapWidth, EDITOR.mapHeight)
  EDITOR.image?.SetDimensions(EDITOR.mapWidth, EDITOR.mapHeight)
  EDITOR.frame?.SetScale(835 / EDITOR.mapWidth)
  TemperWorldMarkerEditorToplevel.SetScale(EDITOR.mapWidth / 835)
  return undefined
}

function fillMapSelector(this: void, currentMapId: number): undefined {
  const comboBox = EDITOR.mapSelector
  if (comboBox === undefined) return undefined
  comboBox.ClearItems()
  const [zone] = GetUnitRawWorldPosition("player")
  const lookup = EDITOR.mapZoneLookup[zone]
  if (lookup !== undefined) {
    for (const [mapId, name] of pairs(lookup)) {
      const entry = comboBox.CreateItemEntry(mapLabel(name, mapId), () => EDITOR.setMapId?.(mapId))
      comboBox.AddItem(entry)
      if (mapId === currentMapId) comboBox.SelectItem(entry)
    }
  } else {
    const [name] = GetMapInfoById(currentMapId)
    const entry = comboBox.CreateItemEntry(mapLabel(name, currentMapId), () =>
      EDITOR.setMapId?.(currentMapId)
    )
    comboBox.AddItem(entry)
    comboBox.SelectItem(entry)
  }
  return undefined
}

function copyOf(this: void, icons: readonly MarkerIcon[]): MarkerIcon[] {
  return ZO_DeepTableCopy(icons as MarkerIcon[])
}

function sceneShowing(this: void): undefined {
  sizeToScreen()
  const gamepad = IsInGamepadPreferredMode()
  TemperWorldMarkerEditorToplevelMapSelectorPicker.SetHidden(gamepad)
  TemperWorldMarkerEditorToplevelMapSelectorGamepadButton.SetHidden(!gamepad)
  if (gamepad) {
    scene.AddFragmentGroup(FRAGMENT_GROUP.GAMEPAD_DRIVEN_UI_WINDOW)
    KEYBIND_STRIP.AddKeybindButtonGroup(GAMEPAD_KEYBINDS as KeybindButtonGroupDescriptor[])
    startGamepad()
  } else {
    KEYBIND_STRIP.AddKeybindButtonGroup(KEYBOARD_KEYBINDS as KeybindButtonGroupDescriptor[])
    scene.AddFragmentGroup(FRAGMENT_GROUP.MOUSE_DRIVEN_UI_WINDOW)
  }
  const oldMap = GetCurrentMapId()
  SetMapToPlayerLocation()
  const currentMapId = GetCurrentMapId()
  SetMapToMapId(oldMap)
  EDITOR.zoneMarkers = new LuaTable()
  let count = 0
  for (const icon of [...copyOf(MM.facing), ...copyOf(MM.ground)]) {
    count += 1
    EDITOR.zoneMarkers.set(count, icon)
  }
  fillMapSelector(currentMapId)
  return undefined
}

function sceneHidden(this: void): undefined {
  if (IsInGamepadPreferredMode()) {
    KEYBIND_STRIP.RemoveKeybindButtonGroup(GAMEPAD_KEYBINDS as KeybindButtonGroupDescriptor[])
    scene.RemoveFragmentGroup(FRAGMENT_GROUP.GAMEPAD_DRIVEN_UI_WINDOW)
  } else {
    KEYBIND_STRIP.RemoveKeybindButtonGroup(KEYBOARD_KEYBINDS as KeybindButtonGroupDescriptor[])
    scene.RemoveFragmentGroup(FRAGMENT_GROUP.MOUSE_DRIVEN_UI_WINDOW)
  }
  endGamepad()
  destroyPreviews()
  return undefined
}

function editorInit(this: void): undefined {
  EDITOR.selections = {}
  buildMapLookup()
  const toplevel = TemperWorldMarkerEditorToplevel
  const frame = WINDOW_MANAGER.CreateControl(
    "TemperWorldMarkersEditorImageBackground",
    toplevel,
    CT_BACKDROP
  )
  frame.SetAnchor(CENTER, GuiRoot, CENTER, 0, 0)
  frame.SetCenterColor(0, 0, 0, 0)
  frame.SetEdgeColor(0, 0, 0, 1)
  frame.SetAutoRectClipChildren(true)
  frame.SetMouseEnabled(true)
  const image = WINDOW_MANAGER.CreateControl(
    "TemperWorldMarkersEditorImageImage",
    frame,
    CT_CONTROL
  )
  image.SetAnchor(CENTER, frame, CENTER, 0, 0)
  EDITOR.frame = frame
  EDITOR.image = image
  sizeToScreen()
  wireEditorInputs(showEditorMapSelect)
  initEditorMap(image, frame)
  scene.AddFragment(ZO_HUDFadeSceneFragment.New(toplevel, DEFAULT_SCENE_TRANSITION_TIME, 0))
  scene.SetHideSceneConfirmationCallback((hiding) => {
    if (hiding.hideSceneConfirmationPush === true) {
      hiding.AcceptHideScene()
    } else {
      showDialogue(
        "Warning: Exiting Editor",
        "Are you sure you would like to close the editor?",
        "This will discard all changes you have made.",
        () => hiding.AcceptHideScene()
      )
    }
  })
  initEditorKeybinds()
  scene.RegisterCallback("StateChange", (_oldState, newState) => {
    if (newState === SCENE_SHOWING) sceneShowing()
    else if (newState === SCENE_HIDDEN) sceneHidden()
  })
  return undefined
}

const deferred = ZO_DeferredInitializingObject.New(scene)
deferred.OnDeferredInitialize = editorInit

export function showEditor(this: void): undefined {
  SCENE_MANAGER.Push(EDITOR_SCENE)
  return undefined
}
