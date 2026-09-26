import {
  placeQuickMenuIcon,
  placeQuickMenuIconAtCursor,
  removeClosestIcon,
  removeIconAtCursor,
} from "akasha/temper/addon/pages/world/markers/modules/markers-placing/markers-placing.module.code.ts"
import {
  CHOICE_OF_TEXTURE,
  COLOUR_PRESETS,
  hexOf,
  PRESET_OF_HEX,
  RGBA_OF_PRESET,
  TEXTURE_CHOICES,
  TEXTURE_OF_CHOICE,
} from "akasha/temper/addon/pages/world/markers/modules/markers-settings-placing/markers-settings-placing.module.code.ts"
import { MM } from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import "akasha/temper/addon/pages/world/markers/markers-declarations/markers-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"

function fillPicker(
  this: void,
  container: Control,
  choices: readonly string[],
  current: string | undefined,
  chosen: (this: void, choice: string) => void
): undefined {
  const comboBox = ZO_ComboBox_ObjectFromContainer(container)
  comboBox.SetSortsItems(false)
  for (const choice of choices) {
    const entry = comboBox.CreateItemEntry(choice, () => chosen(choice))
    comboBox.AddItem(entry)
    if (choice === current) comboBox.SelectItem(entry)
  }
  return undefined
}

function sizeChanged(this: void): undefined {
  const value = TemperWorldMarkerPlaceToplevelSizeSlider.GetValue()
  TemperWorldMarkerPlaceToplevelSize.SetText(`Size: ${value / 10}m`)
  MM.quickSelections.size = value / 10
  return undefined
}

function offsetChanged(this: void): undefined {
  const value = TemperWorldMarkerPlaceToplevelOffsetSlider.GetValue()
  TemperWorldMarkerPlaceToplevelOffset.SetText(`Vertical Offset: ${value}%`)
  MM.quickSelections.offsetY = value
  return undefined
}

function textChanged(this: void): undefined {
  MM.quickSelections.text = TemperWorldMarkerPlaceToplevelTextEdit.GetText()
  return undefined
}

function clicked(this: void, name: string, action: (this: void) => void): undefined {
  TemperWorldMarkerPlaceToplevel.GetNamedChild(name)?.SetHandler("OnClicked", () => action())
  return undefined
}

export function initQuickMenu(this: void): undefined {
  const selections = MM.quickSelections
  fillPicker(
    TemperWorldMarkerPlaceToplevelColourPicker,
    COLOUR_PRESETS,
    PRESET_OF_HEX[hexOf(selections.rgba)],
    (choice) => {
      selections.rgba = RGBA_OF_PRESET[choice]
    }
  )
  fillPicker(
    TemperWorldMarkerPlaceToplevelTexturePicker,
    TEXTURE_CHOICES,
    CHOICE_OF_TEXTURE[selections.texture ?? ""],
    (choice) => {
      selections.texture = TEXTURE_OF_CHOICE[choice]
    }
  )
  TemperWorldMarkerPlaceToplevelSizeSlider.SetHandler("OnValueChanged", sizeChanged)
  TemperWorldMarkerPlaceToplevelOffsetSlider.SetHandler("OnValueChanged", offsetChanged)
  TemperWorldMarkerPlaceToplevelTextEdit.SetHandler("OnTextChanged", textChanged)
  clicked("PlaceAtCursor", () => placeQuickMenuIconAtCursor())
  clicked("Place", () => placeQuickMenuIcon())
  clicked("RemoveAtCursor", () => removeIconAtCursor())
  clicked("Remove", () => removeClosestIcon())

  const size = selections.size ?? 1
  const offset = selections.offsetY ?? 50
  TemperWorldMarkerPlaceToplevelSizeSlider.SetValue(size * 10)
  TemperWorldMarkerPlaceToplevelSize.SetText(`Size: ${size}m`)
  TemperWorldMarkerPlaceToplevelOffsetSlider.SetValue(offset)
  TemperWorldMarkerPlaceToplevelOffset.SetText(`Vertical Offset: ${offset}%`)
  TemperWorldMarkerPlaceToplevelTextEdit.SetText(selections.text ?? "")
  return undefined
}
