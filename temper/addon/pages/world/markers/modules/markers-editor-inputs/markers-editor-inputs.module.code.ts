import {
  deleteAllDuplicates,
  deleteMarkerPressed,
  editorApplyPressed,
  editorSavePressed,
  reselectCurrentMarker,
} from "akasha/temper/addon/pages/world/markers/modules/markers-editor-selection/markers-editor-selection.module.code.ts"
import {
  EDITOR,
  editorChild,
} from "akasha/temper/addon/pages/world/markers/modules/markers-editor-state/markers-editor-state.module.code.ts"
import { canonicalTexture } from "akasha/temper/addon/pages/world/markers/modules/markers-textures/markers-textures.module.code.ts"
import "akasha/temper/addon/pages/world/markers/markers-declarations/markers-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-4/eso-ui-4.type-declaration.d.ts"

const EDITS: readonly (readonly [key: string, path: readonly string[]])[] = [
  ["markersize", ["MarkerSize", "Edit"]],
  ["yaw", ["Yaw", "Edit"]],
  ["pitch", ["Pitch", "Edit"]],
  ["x", ["X", "Edit"]],
  ["y", ["Y", "Edit"]],
  ["z", ["Z", "Edit"]],
  ["text", ["TextEditor"]],
  ["colour", ["ColourSelector", "ColourHex", "Edit"]],
  ["texture", ["TextureSelector", "Texture", "Edit"]],
]

const COLOURS: readonly string[] = [
  "White",
  "Blue",
  "Green",
  "Orange",
  "Pink",
  "Red",
  "Yellow",
  "LimeGreen",
]

const TEXTURES: readonly string[] = [
  "Circle",
  "Hexagon",
  "Square",
  "Diamond",
  "Octagon",
  "Chevron",
  "Blank",
  "Sharkpog",
  "AD",
  "EP",
  "DC",
  "DPS",
  "Tank",
  "Healer",
  "DK",
  "Sorc",
  "NB",
  "Warden",
  "Necro",
  "Templar",
  "Arc",
]

const BUTTONS: readonly (readonly [name: string, action: (this: void) => void])[] = [
  ["ExitWithoutSaving", () => SCENE_MANAGER.Push("hud")],
  ["Save", () => editorSavePressed()],
  ["ClearDupes", () => deleteAllDuplicates()],
  ["Delete", () => deleteMarkerPressed()],
  ["Discard", () => reselectCurrentMarker()],
  ["Apply", () => editorApplyPressed()],
]

function wireEdit(this: void, key: string, path: readonly string[]): undefined {
  const edit = editorChild<EditControl>(...path)
  edit?.SetHandler("OnTextChanged", () => {
    EDITOR.selections[key] = edit.GetText()
  })
  return undefined
}

function wireColour(this: void, name: string): undefined {
  const swatch = editorChild<BackdropControl>("ColourSelector", name)
  swatch?.GetNamedChild("Button")?.SetHandler("OnClicked", () => {
    const [r, g, b, a] = swatch.GetCenterColor()
    editorChild<EditControl>("ColourSelector", "ColourHex", "Edit")?.SetText(
      ZO_ColorDef.FloatsToHex(r, g, b, a)
    )
  })
  return undefined
}

function wireTexture(this: void, name: string): undefined {
  const sample = editorChild<TextureControl>("TextureSelector", "Container", name)
  sample?.GetNamedChild("Button")?.SetHandler("OnClicked", () => {
    editorChild<EditControl>("TextureSelector", "Texture", "Edit")?.SetText(
      canonicalTexture(sample.GetTextureFileName())
    )
  })
  return undefined
}

export function wireEditorInputs(this: void, showMapSelect: (this: void) => void): undefined {
  for (const [key, path] of EDITS) wireEdit(key, path)
  for (const name of COLOURS) wireColour(name)
  for (const name of TEXTURES) wireTexture(name)
  for (const [name, action] of BUTTONS) {
    editorChild(name)?.SetHandler("OnClicked", () => action())
  }
  TemperWorldMarkerEditorToplevelMapSelectorGamepadButton.SetHandler("OnClicked", () =>
    showMapSelect()
  )
  const comboBox = ZO_ComboBox_ObjectFromContainer(TemperWorldMarkerEditorToplevelMapSelectorPicker)
  comboBox.SetSortsItems(true)
  EDITOR.mapSelector = comboBox
  editorChild("Cursor")?.SetTransformOffsetX(-12.5)
  editorChild("Cursor")?.SetTransformOffsetY(-12.5)
  return undefined
}
