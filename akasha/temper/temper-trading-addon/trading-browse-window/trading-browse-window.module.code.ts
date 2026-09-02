import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-14"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-event-manager"
import "@akasha/temper-eso-types/eso-events"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-03"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-functions-09"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-interface-extra-4"
import "@akasha/temper-eso-types/eso-objects-01"
import "@akasha/temper-eso-types/eso-objects-02"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import type { BarContext } from "@akasha/temper-items-filters-addon/filter-bar-controls"
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
} from "@akasha/temper-items-filters-addon/filter-bar-controls"
import type { FilterController } from "@akasha/temper-items-filters-addon/panel-filter-binding"
import { TEMPER_FILTERS } from "@akasha/temper-items-filters-core/search-filter-registry"
import type {
  AnyTemperFilter,
  FilterGroup,
  FilterId,
  FilterValue,
} from "@akasha/temper-items-filters-core/search-filter-types"
import type { BrowseEngine } from "../trading-browse-engine/trading-browse-engine.module.code.ts"
import {
  buildHeader,
  buildRow,
  hideRow,
  LIST_WIDTH,
  paintRow,
  type ResultRow,
  ROW_GAP,
  ROW_HEIGHT,
} from "../trading-browse-window-rows/trading-browse-window-rows.module.code.ts"
import {
  createSavedSearchBar,
  SAVED_SEARCH_BAR_HEIGHT,
} from "../trading-saved-search-bar/trading-saved-search-bar.module.code.ts"

const WINDOW_NAME = "TemperListingsBrowse"
const SEARCH_WIDTH = 130
const GROUP_GAP = 12
const FILTER_ROW_HEIGHT = CONTROL_HEIGHT + PADDING_Y * 2
const MAX_VISIBLE_ROWS = 50
const WINDOW_PAD = 12

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

export interface BrowseWindow {
  show: (this: void) => undefined
  hide: (this: void) => undefined
}

export function createBrowseWindow(this: void, engine: BrowseEngine): BrowseWindow {
  const existing = WINDOW_MANAGER.GetControlByName<TopLevelWindow>(WINDOW_NAME)
  if (existing !== undefined) existing.SetHidden(true)

  const tlw = WINDOW_MANAGER.CreateTopLevelWindow(WINDOW_NAME)
  tlw.SetHidden(true)
  tlw.SetClampedToScreen(true)
  tlw.SetMovable(true)

  const bg = WINDOW_MANAGER.CreateControl("$(parent)BG", tlw, CT_BACKDROP)
  bg.SetAnchorFill()
  bg.SetCenterColor(0, 0, 0, 0.7)
  bg.SetEdgeColor(0, 0, 0, 0)
  bg.SetEdgeTexture(undefined, 1, 1, 1)

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
    tlw,
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
  let xOffset = PADDING_X
  let lastGroup: FilterGroup | undefined
  for (const filter of TEMPER_FILTERS) {
    if (filter.group !== lastGroup) {
      xOffset = renderGroupLabel(ctx, filter.group, xOffset)
      lastGroup = filter.group
    }
    xOffset = renderFilter(ctx, filter, xOffset)
  }

  const filterBarWidth = xOffset - CONTROL_GAP + PADDING_X
  const windowWidth = math.max(filterBarWidth, LIST_WIDTH, 600)

  const searchY = FILTER_ROW_HEIGHT
  const search = createBarButton(
    tlw,
    "$(parent)Search",
    "Search All Guilds",
    PADDING_X,
    SEARCH_WIDTH
  )
  search.button.ClearAnchors()
  search.backdrop.ClearAnchors()
  search.backdrop.SetAnchor(TOPLEFT, tlw, TOPLEFT, PADDING_X, searchY)
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
  savedBar.mount(tlw, savedBarTop)

  const headerTop = savedBarTop + SAVED_SEARCH_BAR_HEIGHT + PADDING_Y
  buildHeader(tlw, WINDOW_NAME, headerTop)
  const rowsTop = headerTop + CONTROL_HEIGHT + ROW_GAP

  const rows: ResultRow[] = []
  for (let i = 0; i < MAX_VISIBLE_ROWS; i++) {
    rows[i] = buildRow(tlw, WINDOW_NAME, i, rowsTop)
  }

  const windowHeight = rowsTop + MAX_VISIBLE_ROWS * (ROW_HEIGHT + ROW_GAP) + WINDOW_PAD
  tlw.SetDimensions(windowWidth + WINDOW_PAD, windowHeight)
  tlw.ClearAnchors()
  tlw.SetAnchor(TOPLEFT, GuiRoot, TOPLEFT, 80, 80)

  function repaint(this: void): undefined {
    const results = engine.getResults()
    const visible = math.min(results.length, MAX_VISIBLE_ROWS)
    for (let i = 0; i < visible; i++) {
      const listing = results[i]
      const row = rows[i]
      if (listing !== undefined && row !== undefined) paintRow(row, listing)
    }
    for (let i = visible; i < MAX_VISIBLE_ROWS; i++) {
      const row = rows[i]
      if (row !== undefined) hideRow(row)
    }
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
  }
}

function renderGroupLabel(ctx: BarContext, group: FilterGroup, xOffset: number): number {
  const x = xOffset === PADDING_X ? xOffset : xOffset + GROUP_GAP - CONTROL_GAP
  const label = createFieldLabel(ctx.tlw, `${GROUP_LABELS[group]}:`, x)
  return x + label.GetTextWidth() + LABEL_GAP
}

function renderFilter(ctx: BarContext, filter: AnyTemperFilter, xOffset: number): number {
  const editor = filter.editor
  if (editor.kind === "text") return buildTextEditor(ctx, filter, xOffset)
  if (editor.kind === "multiselect")
    return buildMultiselectEditor(ctx, filter, editor.options, xOffset)
  if (editor.kind === "toggle") return buildToggleEditor(ctx, filter, xOffset)
  return buildRangeEditor(ctx, filter, xOffset)
}
