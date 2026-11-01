import { getSavedVariables } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type { SavedVariablesData } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
import {
  type BarButton,
  CONTROL_GAP,
  CONTROL_HEIGHT,
  createBarButton,
  createFieldLabel,
  PADDING_X,
  PADDING_Y,
  setButtonActive,
} from "akasha/temper/items/filters/addon/modules/filter-bar-controls/filter-bar-controls.module.code.ts"
import { drawSurface } from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-deconstruction/eso-deconstruction.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"

type FilterState = NonNullable<SavedVariablesData["deconstructionFilter"]>

interface DeconstructionInventory {
  AddItemData: (
    this: DeconstructionInventory,
    bagId: number,
    slotIndex: number,
    ...rest: unknown[]
  ) => unknown
  HandleDirtyEvent?: (this: DeconstructionInventory) => void
  PerformFullRefresh?: (this: DeconstructionInventory) => void
}

interface DeconstructionHost {
  deconstructionPanel?: { inventory?: DeconstructionInventory }
}

interface Surface {
  host: (this: void) => unknown
  inventoryControlName: string
  panelName: string
}

interface QualityButton {
  quality: number
  bar: BarButton
}

interface PanelButtons {
  reconstructed: BarButton
  twentyFiveCrystal: BarButton
  qualities: QualityButton[]
}

const FULL_SET_CRYSTAL_COST = 25
const PANEL_OFFSET_X = 40
const BUTTON_WIDTH = 96
const BUTTONS_PER_ROW = 3
const QUALITY_FIRST_ROW = 2
const ROW_HEIGHT = CONTROL_HEIGHT + PADDING_Y
const PANEL_WIDTH = PADDING_X * 2 + BUTTON_WIDTH * BUTTONS_PER_ROW + CONTROL_GAP * 2

const SURFACES: readonly Surface[] = [
  {
    host: () => SMITHING,
    inventoryControlName: "ZO_SmithingTopLevelDeconstructionPanelInventory",
    panelName: "TemperDeconstructionFilterSmithing",
  },
  {
    host: () => UNIVERSAL_DECONSTRUCTION,
    inventoryControlName: "ZO_UniversalDeconstructionTopLevel_KeyboardPanelInventory",
    panelName: "TemperDeconstructionFilterUniversal",
  },
]

const WRAPPED: DeconstructionInventory[] = []
const PANELS: PanelButtons[] = []

function filterState(): FilterState {
  const saved = getSavedVariables()
  let state = saved.deconstructionFilter
  if (state === undefined) {
    state = { reconstructed: false, twentyFiveCrystal: false, hiddenQualities: [] }
    saved.deconstructionFilter = state
  }
  return state
}

function qualityChoices(): { quality: number; label: string }[] {
  return [
    { quality: ITEM_DISPLAY_QUALITY_NORMAL, label: "Normal" },
    { quality: ITEM_DISPLAY_QUALITY_MAGIC, label: "Fine" },
    { quality: ITEM_DISPLAY_QUALITY_ARCANE, label: "Superior" },
    { quality: ITEM_DISPLAY_QUALITY_ARTIFACT, label: "Epic" },
    { quality: ITEM_DISPLAY_QUALITY_LEGENDARY, label: "Legendary" },
    { quality: ITEM_DISPLAY_QUALITY_MYTHIC_OVERRIDE, label: "Mythic" },
  ]
}

function costsTwentyFiveCrystals(bagId: number, slotIndex: number): boolean {
  const [hasSet, , , , , setId] = GetItemLinkSetInfo(GetItemLink(bagId, slotIndex), false)
  if (!hasSet) return false
  const cost = GetItemReconstructionCurrencyOptionCost(setId, CURT_TRANSMUTE_CRYSTALS)
  return cost === FULL_SET_CRYSTAL_COST
}

function itemPasses(bagId: number, slotIndex: number): boolean {
  const state = filterState()
  if (state.reconstructed && !IsItemReconstructed(bagId, slotIndex)) return false
  if (
    state.hiddenQualities.length > 0 &&
    state.hiddenQualities.includes(GetItemDisplayQuality(bagId, slotIndex))
  ) {
    return false
  }
  if (state.twentyFiveCrystal && !costsTwentyFiveCrystals(bagId, slotIndex)) return false
  return true
}

function wrapInventory(inventory: DeconstructionInventory): undefined {
  const original = inventory.AddItemData
  inventory.AddItemData = function (
    this: DeconstructionInventory,
    bagId: number,
    slotIndex: number,
    ...rest: unknown[]
  ): unknown {
    if (!itemPasses(bagId, slotIndex)) return undefined
    return original.call(this, bagId, slotIndex, ...rest)
  }
  WRAPPED.push(inventory)
}

function refreshLists(): undefined {
  for (const inventory of WRAPPED) {
    if (inventory.HandleDirtyEvent !== undefined) {
      inventory.HandleDirtyEvent()
    } else if (inventory.PerformFullRefresh !== undefined) {
      inventory.PerformFullRefresh()
    }
  }
}

function showState(): undefined {
  const state = filterState()
  for (const panel of PANELS) {
    setButtonActive(panel.reconstructed, state.reconstructed)
    setButtonActive(panel.twentyFiveCrystal, state.twentyFiveCrystal)
    for (const entry of panel.qualities) {
      setButtonActive(entry.bar, !state.hiddenQualities.includes(entry.quality))
    }
  }
}

function changeState(change: (this: void, state: FilterState) => undefined): undefined {
  change(filterState())
  showState()
  refreshLists()
}

function toggleQuality(quality: number): undefined {
  changeState((state) => {
    if (state.hiddenQualities.includes(quality)) {
      state.hiddenQualities = state.hiddenQualities.filter((hidden) => hidden !== quality)
    } else {
      state.hiddenQualities = [...state.hiddenQualities, quality]
    }
  })
}

function buttonRow(panel: Control, name: string, row: number): Control {
  const container = WINDOW_MANAGER.CreateControl(`${name}Row${row}`, panel, CT_CONTROL)
  container.SetAnchor(TOPLEFT, panel, TOPLEFT, 0, PADDING_Y + ROW_HEIGHT * row)
  container.SetDimensions(PANEL_WIDTH, ROW_HEIGHT)
  return container
}

function buttonAt(row: Control, name: string, text: string, column: number): BarButton {
  const x = PADDING_X + (BUTTON_WIDTH + CONTROL_GAP) * column
  return createBarButton(row, name, text, x, BUTTON_WIDTH)
}

function buildQualityButtons(panel: Control, name: string): QualityButton[] {
  const qualities: QualityButton[] = []
  const choices = qualityChoices()
  let rowControl: Control = panel
  for (let at = 0; at < choices.length; at += 1) {
    const choice = choices[at]
    if (choice === undefined) continue
    const column = at % BUTTONS_PER_ROW
    if (column === 0) {
      rowControl = buttonRow(panel, name, QUALITY_FIRST_ROW + Math.floor(at / BUTTONS_PER_ROW))
    }
    const quality = choice.quality
    const text = GetItemQualityColor(quality).Colorize(choice.label)
    const bar = buttonAt(rowControl, `${name}Quality${quality}`, text, column)
    bar.button.SetHandler("OnClicked", function (this: void): undefined {
      toggleQuality(quality)
    })
    qualities.push({ quality, bar })
  }
  return qualities
}

function buildPanel(surface: Surface, inventoryControl: Control): undefined {
  const name = surface.panelName
  const panel = WINDOW_MANAGER.CreateControl(name, inventoryControl, CT_CONTROL)
  panel.SetAnchor(TOPRIGHT, inventoryControl, TOPLEFT, -PANEL_OFFSET_X, 0)
  panel.SetMouseEnabled(true)
  drawSurface(panel, 1)

  const header = buttonRow(panel, name, 0)
  createFieldLabel(header, "Deconstruction filters", PADDING_X).SetMouseEnabled(false)

  const toggles = buttonRow(panel, name, 1)
  const reconstructed = buttonAt(toggles, `${name}Reconstructed`, "Reconstructed", 0)
  reconstructed.button.SetHandler("OnClicked", function (this: void): undefined {
    changeState((state) => {
      state.reconstructed = !state.reconstructed
    })
  })
  const twentyFiveCrystal = buttonAt(toggles, `${name}TwentyFiveCrystal`, "25 crystals", 1)
  twentyFiveCrystal.button.SetHandler("OnClicked", function (this: void): undefined {
    changeState((state) => {
      state.twentyFiveCrystal = !state.twentyFiveCrystal
    })
  })

  const qualities = buildQualityButtons(panel, name)
  const rows = QUALITY_FIRST_ROW + Math.ceil(qualities.length / BUTTONS_PER_ROW)
  panel.SetDimensions(PANEL_WIDTH, PADDING_Y * 2 + ROW_HEIGHT * rows)

  PANELS.push({ reconstructed, twentyFiveCrystal, qualities })
}

export function initializeDeconstructionFilter(): undefined {
  for (const surface of SURFACES) {
    const host = surface.host() as DeconstructionHost | undefined
    const inventory = host?.deconstructionPanel?.inventory
    const inventoryControl = WINDOW_MANAGER.GetControlByName<Control>(surface.inventoryControlName)
    if (inventory === undefined || inventoryControl === undefined) continue
    wrapInventory(inventory)
    buildPanel(surface, inventoryControl)
  }
  showState()
}
