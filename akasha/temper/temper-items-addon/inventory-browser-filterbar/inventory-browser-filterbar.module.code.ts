import {
  type BarButton,
  COLOR_SECONDARY,
  setButtonActive,
} from "@akasha/temper-items-filters-addon/filter-bar-controls"
import { BROWSER_CATEGORIES } from "../inventory-browser-category-defs/inventory-browser-category-defs.module.code.ts"
import type {
  BrowserFilterState,
  BrowserSortKey,
  CategoryDef,
  LocationViewOption,
  SubfilterDef,
} from "../inventory-browser-types/inventory-browser-types.module.code.ts"
import { BROWSER_QUALITY_ANY } from "../inventory-browser-types/inventory-browser-types.module.code.ts"
export interface BrowserFilterBarParams {
  toolbar: Control
  searchBar: Control
  state: BrowserFilterState
  locationOptions: readonly LocationViewOption[]
  onChange: (this: void, next: BrowserFilterState) => undefined
}

export interface BrowserFilterBarHandle {
  setLocationOptions: (this: void, options: readonly LocationViewOption[]) => undefined
}

const COLOR_PRIMARY: readonly [number, number, number] = [0.8442, 0.8442, 0.8442]

const PAD = 6
const CAT_W = 78
const CAT_H = 24
const SUB_W = 70
const SUB_H = 22
const GAP = 4
const DROP_W = 130
const QUAL_W = 120
const SORT_W = 72
const SEARCH_H = 24
const CLEAR_W = 24
const TOGGLE_W = 70
const CAT_ROW_Y = PAD
const SUB_ROW_Y = CAT_ROW_Y + CAT_H + GAP
const SORT_ROW_Y = SUB_ROW_Y + SUB_H + GAP

interface QualityTier {
  quality: number
  label: string
}

function makeButton(
  parent: Control,
  name: string,
  text: string,
  x: number,
  y: number,
  w: number,
  h: number
): BarButton {
  const backdrop = WINDOW_MANAGER.CreateControl(`${name}BG`, parent, CT_BACKDROP)
  backdrop.SetAnchor(TOPLEFT, parent, TOPLEFT, x, y)
  backdrop.SetDimensions(w, h)
  backdrop.SetCenterColor(0, 0, 0, 0.6)
  backdrop.SetEdgeColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2], 0.6)
  backdrop.SetEdgeTexture(undefined, 1, 1, 1)

  const label = WINDOW_MANAGER.CreateControl(`${name}Label`, backdrop, CT_LABEL)
  label.SetAnchorFill()
  label.SetFont("$(BOLD_FONT)|14|shadow")
  label.SetColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2], 1)
  label.SetHorizontalAlignment(TEXT_ALIGN_CENTER)
  label.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  label.SetText(text)
  label.SetMouseEnabled(false)

  const button = WINDOW_MANAGER.CreateControl(name, parent, CT_BUTTON)
  button.SetAnchor(TOPLEFT, backdrop, TOPLEFT, 0, 0)
  button.SetAnchor(BOTTOMRIGHT, backdrop, BOTTOMRIGHT, 0, 0)
  button.SetMouseEnabled(true)

  return { button, backdrop, label }
}

function makeEditBox(
  parent: Control,
  name: string,
  x: number,
  y: number,
  w: number,
  h: number,
  placeholder: string
): EditControl {
  const bg = WINDOW_MANAGER.CreateControl(`${name}BG`, parent, CT_BACKDROP)
  bg.SetAnchor(TOPLEFT, parent, TOPLEFT, x, y)
  bg.SetDimensions(w, h)
  bg.SetCenterColor(0, 0, 0, 0.6)
  bg.SetEdgeColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2], 0.6)
  bg.SetEdgeTexture(undefined, 1, 1, 1)

  const edit = WINDOW_MANAGER.CreateControl(name, parent, CT_EDITBOX)
  edit.SetAnchor(TOPLEFT, bg, TOPLEFT, 4, 0)
  edit.SetAnchor(BOTTOMRIGHT, bg, BOTTOMRIGHT, -4, 0)
  edit.SetFont("$(BOLD_FONT)|14|shadow")
  edit.SetColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2], 1)
  edit.SetDefaultText(placeholder)
  edit.SetMaxInputChars(64)
  edit.SetMouseEnabled(true)
  edit.SetHandler("OnMouseUp", function (this: void): undefined {
    edit.TakeFocus()
  })
  return edit
}

function qualityTiers(): readonly QualityTier[] {
  return [
    { quality: ITEM_DISPLAY_QUALITY_TRASH, label: "Trash" },
    { quality: ITEM_DISPLAY_QUALITY_NORMAL, label: "Normal" },
    { quality: ITEM_DISPLAY_QUALITY_MAGIC, label: "Magic" },
    { quality: ITEM_DISPLAY_QUALITY_ARCANE, label: "Arcane" },
    { quality: ITEM_DISPLAY_QUALITY_ARTIFACT, label: "Artifact" },
    { quality: ITEM_DISPLAY_QUALITY_LEGENDARY, label: "Legendary" },
    { quality: ITEM_DISPLAY_QUALITY_MYTHIC_OVERRIDE, label: "Mythic" },
  ]
}

export function createBrowserFilterBar(params: BrowserFilterBarParams): BrowserFilterBarHandle {
  const toolbar = params.toolbar
  const searchBar = params.searchBar

  let current: BrowserFilterState = params.state

  function emit(next: BrowserFilterState): undefined {
    current = next
    params.onChange(next)
  }

  const categoryButtons: BarButton[] = []
  const stripContainers: Control[] = []
  const stripButtons: BarButton[][] = []

  function highlightCategory(activeIndex: number): undefined {
    for (let i = 0; i < categoryButtons.length; i = i + 1) {
      const bar = categoryButtons[i]
      if (bar !== undefined) setButtonActive(bar, i === activeIndex)
    }
  }

  function revealStrip(activeIndex: number): undefined {
    for (let i = 0; i < stripContainers.length; i = i + 1) {
      const container = stripContainers[i]
      if (container !== undefined) container.SetHidden(i !== activeIndex)
    }
  }

  function clearSubfilterHighlight(catIndex: number): undefined {
    const bars = stripButtons[catIndex]
    if (bars === undefined) return
    for (const bar of bars) setButtonActive(bar, false)
  }

  function buildSubfilterStrip(def: CategoryDef, catIndex: number): undefined {
    const container = WINDOW_MANAGER.CreateControl(
      `$(parent)BrSub_${catIndex}`,
      toolbar,
      CT_CONTROL
    )
    container.SetAnchor(TOPLEFT, toolbar, TOPLEFT, 0, SUB_ROW_Y)
    container.SetDimensions(1, SUB_H)
    container.SetHidden(true)
    stripContainers[catIndex] = container

    const bars: BarButton[] = []
    let subX = 0
    for (let s = 0; s < def.subfilters.length; s = s + 1) {
      const sub = def.subfilters[s]
      if (sub === undefined) continue
      const bar = makeButton(
        container,
        `$(parent)BrSub_${catIndex}_${s}`,
        sub.label,
        subX,
        0,
        SUB_W,
        SUB_H
      )
      wireSubfilter(bar, sub, catIndex, s, bars)
      bars.push(bar)
      subX = subX + SUB_W + GAP
    }
    stripButtons[catIndex] = bars
  }

  function wireSubfilter(
    bar: BarButton,
    sub: SubfilterDef,
    catIndex: number,
    subIndex: number,
    bars: BarButton[]
  ): undefined {
    bar.button.SetHandler("OnMouseUp", function (this: void): undefined {
      clearSubfilterHighlight(catIndex)
      const active = bars[subIndex]
      if (active !== undefined) setButtonActive(active, true)
      emit({ ...current, category: sub.category, subfilterTypes: sub.buildTypes() })
    })
  }

  function wireCategory(bar: BarButton, def: CategoryDef, catIndex: number): undefined {
    bar.button.SetHandler("OnMouseUp", function (this: void): undefined {
      highlightCategory(catIndex)
      revealStrip(catIndex)
      clearSubfilterHighlight(catIndex)
      emit({ ...current, category: def.category, subfilterTypes: def.buildTypes() })
    })
  }

  let catX = 0
  for (let c = 0; c < BROWSER_CATEGORIES.length; c = c + 1) {
    const def = BROWSER_CATEGORIES[c]
    if (def === undefined) continue
    const bar = makeButton(toolbar, `$(parent)BrCat_${c}`, def.label, catX, CAT_ROW_Y, CAT_W, CAT_H)
    wireCategory(bar, def, c)
    categoryButtons.push(bar)
    buildSubfilterStrip(def, c)
    catX = catX + CAT_W + GAP
  }
  highlightCategory(0)
  revealStrip(0)

  const qualityContainer = WINDOW_MANAGER.CreateControlFromVirtual(
    "$(parent)BrQuality",
    toolbar,
    "ZO_ComboBox"
  )
  qualityContainer.SetDimensions(QUAL_W, CAT_H)
  qualityContainer.SetAnchor(TOPLEFT, toolbar, TOPLEFT, 0, SORT_ROW_Y)
  const qualityCombo = ZO_ComboBox_ObjectFromContainer(qualityContainer)
  qualityCombo.SetSortsItems(false)
  qualityCombo.AddItem(
    qualityCombo.CreateItemEntry("Any", function (this: void): undefined {
      emit({ ...current, quality: BROWSER_QUALITY_ANY })
    })
  )
  for (const tier of qualityTiers()) {
    const q = tier.quality
    const colored = GetItemQualityColor(q).Colorize(tier.label)
    qualityCombo.AddItem(
      qualityCombo.CreateItemEntry(colored, function (this: void): undefined {
        emit({ ...current, quality: q })
      })
    )
  }

  const locationContainer = WINDOW_MANAGER.CreateControlFromVirtual(
    "$(parent)BrLocation",
    toolbar,
    "ZO_ScrollableComboBox"
  )
  locationContainer.SetDimensions(DROP_W, CAT_H)
  locationContainer.SetAnchor(TOPLEFT, qualityContainer, TOPRIGHT, GAP, 0)
  const locationCombo = ZO_ComboBox_ObjectFromContainer(locationContainer)
  locationCombo.SetSortsItems(false)

  function populateLocations(options: readonly LocationViewOption[]): undefined {
    locationCombo.ClearItems()
    for (const option of options) {
      const captured = option
      locationCombo.AddItem(
        locationCombo.CreateItemEntry(option.label, function (this: void): undefined {
          emit({ ...current, locationOption: captured })
        })
      )
    }
  }
  populateLocations(params.locationOptions)

  function onSort(key: BrowserSortKey): undefined {
    if (key === current.sortKey) {
      emit({ ...current, sortAscending: !current.sortAscending })
    } else {
      emit({ ...current, sortKey: key })
    }
  }
  const sortX = QUAL_W + GAP + DROP_W + GAP
  const sortName = makeButton(
    toolbar,
    "$(parent)BrSortName",
    "Name",
    sortX,
    SORT_ROW_Y,
    SORT_W,
    CAT_H
  )
  sortName.button.SetHandler("OnMouseUp", function (this: void): undefined {
    onSort("name")
  })
  const sortQuality = makeButton(
    toolbar,
    "$(parent)BrSortQuality",
    "Quality",
    sortX + SORT_W + GAP,
    SORT_ROW_Y,
    SORT_W,
    CAT_H
  )
  sortQuality.button.SetHandler("OnMouseUp", function (this: void): undefined {
    onSort("quality")
  })

  const searchEdit = makeEditBox(searchBar, "$(parent)BrSearch", 0, 0, 240, SEARCH_H, "Search…")
  searchEdit.SetHandler("OnTextChanged", function (this: void): undefined {
    emit({ ...current, searchText: searchEdit.GetText() })
  })

  const clearBtn = makeButton(
    searchBar,
    "$(parent)BrSearchClear",
    "X",
    240 + GAP,
    0,
    CLEAR_W,
    SEARCH_H
  )
  clearBtn.button.SetHandler("OnMouseUp", function (this: void): undefined {
    searchEdit.SetText("")
    emit({ ...current, searchText: "" })
  })

  const toggleBtn = makeButton(
    searchBar,
    "$(parent)BrSearchMode",
    "Name",
    240 + GAP + CLEAR_W + GAP,
    0,
    TOGGLE_W,
    SEARCH_H
  )
  setButtonActive(toggleBtn, current.searchMode === "set")
  toggleBtn.button.SetHandler("OnMouseUp", function (this: void): undefined {
    const nextMode = current.searchMode === "name" ? "set" : "name"
    toggleBtn.label.SetText(nextMode === "set" ? "Set" : "Name")
    setButtonActive(toggleBtn, nextMode === "set")
    emit({ ...current, searchMode: nextMode })
  })

  return {
    setLocationOptions(options: readonly LocationViewOption[]): undefined {
      populateLocations(options)
    },
  }
}
