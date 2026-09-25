import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-14/eso-enums-14.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-02/eso-objects-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import type { BrowseEngine } from "akasha/temper/addon/pages/items/modules/trading-browse-engine/trading-browse-engine.module.code.ts"
import {
  buildHeader,
  buildRow,
  HEADER_HEIGHT,
  hideRow,
  LIST_WIDTH,
  paintRow,
  type ResultRow,
  ROW_GAP,
  ROW_HEIGHT,
} from "akasha/temper/addon/pages/items/modules/trading-browse-window-rows/trading-browse-window-rows.module.code.ts"
import {
  createSavedSearchBar,
  SAVED_SEARCH_BAR_HEIGHT,
} from "akasha/temper/addon/pages/items/modules/trading-saved-search-bar/trading-saved-search-bar.module.code.ts"
import type { BarContext } from "akasha/temper/items/filters/addon/modules/filter-bar-controls/filter-bar-controls.module.code.ts"
import {
  buildMultiselectEditor,
  buildRangeEditor,
  buildTextEditor,
  buildToggleEditor,
  CONTROL_GAP,
  CONTROL_HEIGHT,
  createBarButton,
  createFieldLabel,
  LABEL_GAP,
  PADDING_X,
  PADDING_Y,
} from "akasha/temper/items/filters/addon/modules/filter-bar-controls/filter-bar-controls.module.code.ts"
import type { FilterController } from "akasha/temper/items/filters/addon/modules/panel-filter-binding/panel-filter-binding.module.code.ts"
import { TEMPER_FILTERS } from "akasha/temper/items/filters/core/modules/search-filter-registry/search-filter-registry.module.code.ts"
import type {
  AnyTemperFilter,
  FilterGroup,
  FilterId,
  FilterValue,
} from "akasha/temper/items/filters/core/modules/search-filter-types/search-filter-types.module.code.ts"
import {
  buildDataState,
  type DataState,
} from "akasha/temper/window/modules/window-data-state/window-data-state.module.code.ts"
import {
  FRAME_PADDING,
  FRAME_TOP,
  frameWindow,
} from "akasha/temper/window/modules/window-frame/window-frame.module.code.ts"
import { drawPanel } from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

const WINDOW_NAME = "TemperItemsListingsBrowse"
const WINDOW_TITLE = "Guild Store Search"
const SEARCH_WIDTH = 130
const GROUP_GAP = 12
const FILTER_ROW_HEIGHT = CONTROL_HEIGHT + PADDING_Y * 2
const MAX_VISIBLE_ROWS = 50
const INSET_X = FRAME_PADDING - PADDING_X
const INSET_Y = FRAME_TOP - PADDING_Y
const SCREEN_MARGIN = 80
const PANEL_LEVEL = 2
const NOT_SEARCHED = "Search all guilds to list what is for sale."
const NONE_MATCH = "No listing matches these filters."
const SEARCHING = "Searching guild stores"
const SEARCH_FAILED = "The guild store refused the search."

const GROUP_LABELS: Record<FilterGroup, string> = {
  quality: "Quality",
  trait: "Trait",
  type: "Type",
  set: "Set",
  level: "Level",
  value: "Value",
  location: "Location",
  state: "State",
  knowledge: "Knowledge",
  text: "Text",
}

interface BrowseWindow {
  show: (this: void) => undefined
  hide: (this: void) => undefined
  refresh: (this: void) => undefined
}

export function createBrowseWindow(this: void, engine: BrowseEngine): BrowseWindow {
  const existing = WINDOW_MANAGER.GetControlByName<TopLevelWindow>(WINDOW_NAME)
  if (existing !== undefined) existing.SetHidden(true)

  const tlw = WINDOW_MANAGER.CreateTopLevelWindow(WINDOW_NAME)
  tlw.SetHidden(true)
  tlw.SetClampedToScreen(true)
  tlw.SetMovable(true)

  frameWindow(tlw, WINDOW_TITLE, function (this: void): undefined {
    tlw.SetHidden(true)
  })
  const content = WINDOW_MANAGER.CreateControl("$(parent)Content", tlw, CT_CONTROL)
  content.SetAnchor(TOPLEFT, tlw, TOPLEFT, INSET_X, INSET_Y)
  content.SetAnchor(BOTTOMRIGHT, tlw, BOTTOMRIGHT, -INSET_X, 0)

  const active = new Map<FilterId, FilterValue>()

  function pushActive(this: void): undefined {
    engine.setActive(active)
    repaint()
  }

  const controller: FilterController = {
    setFilter(id, value) {
      active.set(id, value)
      pushActive()
    },
    clearFilter(id) {
      active.delete(id)
      pushActive()
    },
    clearAll() {
      active.clear()
      pushActive()
    },
    getActive() {
      return active
    },
    refresh() {
      pushActive()
    },
  }

  const resets: ((this: void) => void)[] = []
  const ctx: BarContext = {
    tlw: content,
    controller,
    addReset(reset) {
      resets.push(reset)
    },
    runResets() {
      for (const reset of resets) {
        reset()
      }
    },
  }
  const barCap = GuiRoot.GetWidth() - SCREEN_MARGIN * 2 - INSET_X * 2
  const groups = buildFilterGroups(ctx, content)
  let rowX = 0
  let rowY = 0
  let filterBarWidth = 0
  for (const group of groups) {
    const width = group.GetWidth()
    if (rowX > 0 && rowX + width > barCap) {
      rowX = 0
      rowY += FILTER_ROW_HEIGHT
    }
    group.SetAnchor(TOPLEFT, content, TOPLEFT, rowX, rowY)
    rowX += width
    filterBarWidth = math.max(filterBarWidth, rowX)
  }
  const windowWidth = math.max(filterBarWidth, LIST_WIDTH, 600)

  const searchY = rowY + FILTER_ROW_HEIGHT
  const search = createBarButton(
    content,
    "$(parent)Search",
    "Search All Guilds",
    PADDING_X,
    SEARCH_WIDTH
  )
  search.button.ClearAnchors()
  search.backdrop.ClearAnchors()
  search.backdrop.SetAnchor(TOPLEFT, content, TOPLEFT, PADDING_X, searchY)
  search.button.SetAnchor(TOPLEFT, search.backdrop, TOPLEFT, 0, 0)
  search.button.SetAnchor(BOTTOMRIGHT, search.backdrop, BOTTOMRIGHT, 0, 0)
  search.button.SetHandler("OnClicked", function (this: void): undefined {
    engine.start(active)
    repaint()
  })

  const savedBar = createSavedSearchBar({
    getActive(): typeof active {
      return active
    },
    applySearch(restored): undefined {
      active.clear()
      for (const [id, value] of restored) active.set(id, value)
      engine.setActive(active)
      repaint()
      engine.start(active)
    },
  })

  const savedBarTop = searchY + CONTROL_HEIGHT + PADDING_Y
  savedBar.mount(content, savedBarTop)

  const headerTop = savedBarTop + SAVED_SEARCH_BAR_HEIGHT + PADDING_Y
  const header = buildHeader(content, WINDOW_NAME, headerTop)
  const rowsTop = headerTop + HEADER_HEIGHT + ROW_GAP
  const rowRoom = GuiRoot.GetHeight() - SCREEN_MARGIN * 2 - INSET_Y - rowsTop - FRAME_PADDING
  const rowCount = math.max(
    1,
    math.min(MAX_VISIBLE_ROWS, math.floor(rowRoom / (ROW_HEIGHT + ROW_GAP)))
  )

  const rows: ResultRow[] = []
  let lastRow: Control = header
  for (let i = 0; i < rowCount; i++) {
    const row = buildRow(content, WINDOW_NAME, i, rowsTop)
    rows[i] = row
    lastRow = row.container
  }
  drawPanel(content, "$(parent)ListPanel", header, lastRow)
  const listArea = WINDOW_MANAGER.CreateControl(undefined, content, CT_CONTROL)
  listArea.SetAnchor(TOPLEFT, header, BOTTOMLEFT, 0, 0)
  listArea.SetAnchor(BOTTOMRIGHT, lastRow, BOTTOMRIGHT, 0, 0)
  const dataState = buildDataState(listArea, {
    empty: NONE_MATCH,
    loading: SEARCHING,
    failed: SEARCH_FAILED,
    level: PANEL_LEVEL,
    retry(): undefined {
      engine.start(active)
      return undefined
    },
  })

  const listHeight = rowsTop + rowCount * (ROW_HEIGHT + ROW_GAP)
  tlw.SetDimensions(windowWidth + INSET_X * 2, INSET_Y + listHeight + FRAME_PADDING)
  tlw.ClearAnchors()
  tlw.SetAnchor(TOPLEFT, GuiRoot, TOPLEFT, SCREEN_MARGIN, SCREEN_MARGIN)

  function repaint(this: void): undefined {
    const results = engine.getResults()
    const visible = math.min(results.length, rowCount)
    for (let i = 0; i < visible; i++) {
      const listing = results[i]
      const row = rows[i]
      if (listing !== undefined && row !== undefined) paintRow(row, listing)
    }
    for (let i = visible; i < rowCount; i++) {
      const row = rows[i]
      if (row !== undefined) hideRow(row)
    }
    const shown = stateOf(results.length)
    dataState.show(
      shown,
      shown === "empty" && engine.getState().phase === "idle" ? NOT_SEARCHED : undefined
    )
  }

  function stateOf(this: void, found: number): DataState {
    if (found > 0) return "loaded"
    const state = engine.getState()
    if (state.error !== undefined) return "failed"
    if (state.phase === "searching" || state.phase === "cooldown") return "loading"
    return "empty"
  }

  return {
    show(): undefined {
      savedBar.refresh()
      repaint()
      tlw.SetHidden(false)
    },
    hide(): undefined {
      tlw.SetHidden(true)
    },
    refresh(): undefined {
      if (!tlw.IsHidden()) repaint()
    },
  }
}

function buildFilterGroups(ctx: BarContext, content: Control): Control[] {
  const groups: Control[] = []
  let group: Control | undefined
  let lastGroup: FilterGroup | undefined
  let xOffset = PADDING_X
  const close = (): undefined => {
    if (group !== undefined)
      group.SetDimensions(xOffset - CONTROL_GAP + GROUP_GAP, FILTER_ROW_HEIGHT)
    return undefined
  }
  for (const filter of TEMPER_FILTERS) {
    if (group === undefined || filter.group !== lastGroup) {
      close()
      group = WINDOW_MANAGER.CreateControl(undefined, content, CT_CONTROL)
      groups.push(group)
      const label = createFieldLabel(group, `${GROUP_LABELS[filter.group]}:`, PADDING_X)
      xOffset = PADDING_X + label.GetTextWidth() + LABEL_GAP
      lastGroup = filter.group
    }
    xOffset = renderFilter(ctx, filter, xOffset, group)
  }
  close()
  return groups
}

function renderFilter(
  ctx: BarContext,
  filter: AnyTemperFilter,
  xOffset: number,
  parent: Control
): number {
  const editor = filter.editor
  if (editor.kind === "text") return buildTextEditor(ctx, filter, xOffset, parent)
  if (editor.kind === "multiselect")
    return buildMultiselectEditor(ctx, filter, editor.options, xOffset, parent)
  if (editor.kind === "toggle") return buildToggleEditor(ctx, filter, xOffset, parent)
  return buildRangeEditor(ctx, filter, xOffset, parent)
}
