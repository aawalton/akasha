import { TEXT_PRIMARY } from "akasha/design/interface/token/modules/text-color/text-color.module.code.ts"
import { quantityInView } from "akasha/temper/addon/pages/items/modules/inventory-browser-locations/inventory-browser-locations.module.code.ts"
import type {
  BrowserRow,
  LocationViewOption,
} from "akasha/temper/addon/pages/items/modules/inventory-browser-types/inventory-browser-types.module.code.ts"
import {
  hideLocationBreakdown,
  showLocationBreakdown,
} from "akasha/temper/addon/pages/items/modules/inventory-location-tooltip/inventory-location-tooltip.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import { createMovableWindow } from "akasha/temper/modules/movable-window/movable-window.module.code.ts"
import {
  drawSurface,
  type SurfaceLevel,
} from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-addon-list/eso-addon-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-alchemy-station/eso-alchemy-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-fonts/eso-fonts.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-02/eso-objects-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const WINDOW_NAME = "TemperItemsBrowser"
const LIST_NAME = "TemperItemsBrowserList"
const ROW_TEMPLATE = "TemperItemsBrowserRow"
const DATA_TYPE = 1
const ROW_HEIGHT = 52

const DEFAULT_WIDTH = 360
const DEFAULT_HEIGHT = 640
const PADDING = 8
const TITLE_HEIGHT = 30
const TOOLBAR_HEIGHT = 90
const SEARCHBAR_HEIGHT = 30
const PANEL_LEVEL: SurfaceLevel = 1

const DOCK_OFFSET_X = -20
const DOCK_OFFSET_TOP = 16
const DOCK_OFFSET_BOTTOM = 16

export interface BrowserWindowHandle {
  frame: TopLevelWindow
  toolbar: Control
  searchBar: Control
  setRows: (
    this: void,
    rows: readonly BrowserRow[],
    view: LocationViewOption,
    currentCharId: string
  ) => undefined
  showFloating: (this: void) => undefined
  showDocked: (this: void) => undefined
  hide: (this: void) => undefined
  isHidden: (this: void) => boolean
}

interface RowData {
  row: BrowserRow
  viewQty: number
}

function setupRow(this: void, rowControl: Control, data: RowData): undefined {
  const row = data.row

  const icon = GetControl<TextureControl>(rowControl, "Icon")
  if (icon !== undefined) {
    icon.SetTexture(row.icon)
  }

  const qty = GetControl<LabelControl>(rowControl, "Qty")
  if (qty !== undefined) {
    qty.SetText(data.viewQty > 1 ? tostring(data.viewQty) : "")
  }

  rowControl.SetHandler("OnMouseEnter", () => {
    showLocationBreakdown(rowControl, row.itemId)
  })
  rowControl.SetHandler("OnMouseExit", () => {
    hideLocationBreakdown()
  })

  const name = GetControl<LabelControl>(rowControl, "Name")
  if (name !== undefined) {
    name.SetText(row.itemName)
    const [r, g, b, a] = GetItemQualityColor(row.quality).UnpackRGBA()
    name.SetColor(r, g, b, a)
  }

  const worn = GetControl<TextureControl>(rowControl, "IconWorn")
  if (worn !== undefined) {
    worn.SetHidden(!row.worn)
  }
  const companionWorn = GetControl<TextureControl>(rowControl, "IconCompanionWorn")
  if (companionWorn !== undefined) {
    companionWorn.SetHidden(!row.wornCompanion)
  }
  const stolen = GetControl<TextureControl>(rowControl, "IconStolen")
  if (stolen !== undefined) {
    stolen.SetHidden(!row.stolen)
  }
}

function resolveDockTarget(this: void): Control {
  const primary = ZO_SharedRightPanelBackground
  if (primary !== undefined && !primary.IsControlHidden()) {
    return primary
  }
  const secondary = ZO_SharedRightBackground
  if (secondary !== undefined && !secondary.IsControlHidden()) {
    return secondary
  }
  return GuiRoot
}

export function createBrowserWindow(): BrowserWindowHandle {
  const existing = WINDOW_MANAGER.GetControlByName<TopLevelWindow>(WINDOW_NAME)
  if (existing !== undefined) {
    existing.SetHidden(true)
  }

  const frame = WINDOW_MANAGER.CreateTopLevelWindow(WINDOW_NAME)
  frame.SetHidden(true)
  frame.SetDimensions(DEFAULT_WIDTH, DEFAULT_HEIGHT)
  frame.SetClampedToScreen(true)

  drawSurface(frame, PANEL_LEVEL)

  const title = WINDOW_MANAGER.CreateControl("$(parent)Title", frame, CT_LABEL)
  title.SetAnchor(TOPLEFT, frame, TOPLEFT, PADDING, PADDING)
  title.SetAnchor(TOPRIGHT, frame, TOPRIGHT, -PADDING, PADDING)
  title.SetHeight(TITLE_HEIGHT)
  title.SetFont("$(BOLD_FONT)|18|shadow")
  title.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
  title.SetText("Cross-Character Inventory")

  const toolbar = WINDOW_MANAGER.CreateControl("$(parent)Toolbar", frame, CT_CONTROL)
  toolbar.SetAnchor(TOPLEFT, title, BOTTOMLEFT, 0, PADDING)
  toolbar.SetAnchor(TOPRIGHT, title, BOTTOMRIGHT, 0, PADDING)
  toolbar.SetHeight(TOOLBAR_HEIGHT)

  const searchBar = WINDOW_MANAGER.CreateControl("$(parent)SearchBar", frame, CT_CONTROL)
  searchBar.SetAnchor(BOTTOMLEFT, frame, BOTTOMLEFT, PADDING, -PADDING)
  searchBar.SetAnchor(BOTTOMRIGHT, frame, BOTTOMRIGHT, -PADDING, -PADDING)
  searchBar.SetHeight(SEARCHBAR_HEIGHT)

  const list = WINDOW_MANAGER.CreateControlFromVirtual(LIST_NAME, frame, "ZO_ScrollList")
  list.SetAnchor(TOPLEFT, toolbar, BOTTOMLEFT, 0, PADDING)
  list.SetAnchor(BOTTOMRIGHT, searchBar, TOPRIGHT, 0, -PADDING)

  ZO_ScrollList_AddDataType<RowData>(list, DATA_TYPE, ROW_TEMPLATE, ROW_HEIGHT, setupRow)

  const dragHandle = WINDOW_MANAGER.CreateControl("$(parent)DragHandle", frame, CT_CONTROL)
  dragHandle.SetAnchor(TOPLEFT, frame, TOPLEFT, 0, 0)
  dragHandle.SetAnchor(TOPRIGHT, frame, TOPRIGHT, 0, 0)
  dragHandle.SetHeight(TITLE_HEIGHT + PADDING * 2)

  const movable = createMovableWindow({
    window: frame,
    dragHandle,
    loadPosition: () => {
      const saved = getSavedVariables().inventoryBrowser?.position
      if (saved === undefined) {
        return undefined
      }
      return { left: saved.left, top: saved.top }
    },
    savePosition: (position) => {
      getSavedVariables().inventoryBrowser = {
        position: { left: position.left, top: position.top },
      }
    },
    applyDefaultAnchor: () => {
      frame.SetAnchor(CENTER, GuiRoot, CENTER, 0, 0)
    },
  })

  function setRows(
    this: void,
    rows: readonly BrowserRow[],
    view: LocationViewOption,
    currentCharId: string
  ): undefined {
    ZO_ScrollList_Clear(list)
    hideLocationBreakdown()
    const dataList = ZO_ScrollList_GetDataList<RowData>(list)
    if (dataList !== undefined) {
      for (const row of rows) {
        const viewQty = quantityInView(row.locations, view, currentCharId)
        dataList.push(ZO_ScrollList_CreateDataEntry(DATA_TYPE, { row, viewQty }))
      }
    }
    ZO_ScrollList_Commit(list)
  }

  function showFloating(this: void): undefined {
    frame.SetMovable(true)
    movable.reanchor()
    SetGameCameraUIMode(true)
    frame.SetHidden(false)
  }

  function showDocked(this: void): undefined {
    const target = resolveDockTarget()
    frame.SetMovable(false)
    frame.ClearAnchors()
    frame.SetAnchor(TOPRIGHT, target, TOPLEFT, DOCK_OFFSET_X, DOCK_OFFSET_TOP)
    frame.SetAnchor(BOTTOMRIGHT, target, BOTTOMLEFT, DOCK_OFFSET_X, DOCK_OFFSET_BOTTOM)
    frame.SetHidden(false)
  }

  function hide(this: void): undefined {
    hideLocationBreakdown()
    frame.SetHidden(true)
  }

  function isHidden(this: void): boolean {
    return frame.IsHidden()
  }

  return { frame, toolbar, searchBar, setRows, showFloating, showDocked, hide, isHidden }
}
