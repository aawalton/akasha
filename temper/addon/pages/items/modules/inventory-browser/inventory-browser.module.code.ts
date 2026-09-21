import {
  buildBrowserRows,
  collectLocationOptions,
} from "akasha/temper/addon/pages/items/modules/inventory-browser-data/inventory-browser-data.module.code.ts"
import {
  filterRows,
  sortRows,
} from "akasha/temper/addon/pages/items/modules/inventory-browser-filter/inventory-browser-filter.module.code.ts"
import {
  type BrowserFilterBarHandle,
  createBrowserFilterBar,
} from "akasha/temper/addon/pages/items/modules/inventory-browser-filterbar/inventory-browser-filterbar.module.code.ts"
import { registerBrowserScene } from "akasha/temper/addon/pages/items/modules/inventory-browser-scene/inventory-browser-scene.module.code.ts"
import {
  BROWSER_QUALITY_ANY,
  type BrowserFilterState,
  type LocationViewOption,
} from "akasha/temper/addon/pages/items/modules/inventory-browser-types/inventory-browser-types.module.code.ts"
import {
  type BrowserWindowHandle,
  createBrowserWindow,
} from "akasha/temper/addon/pages/items/modules/inventory-browser-window/inventory-browser-window.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

interface BrowserState {
  window: BrowserWindowHandle
  filterBar: BrowserFilterBarHandle
  filter: BrowserFilterState
}

let browser: BrowserState | undefined

function defaultFilterState(locationOptions: readonly LocationViewOption[]): BrowserFilterState {
  let allOption: LocationViewOption = { label: "All", kind: "fixed", fixedId: "all" }
  for (const option of locationOptions) {
    if (option.kind === "fixed" && option.fixedId === "all") {
      allOption = option
      break
    }
  }
  return {
    category: "All",
    subfilterTypes: [],
    quality: BROWSER_QUALITY_ANY,
    locationOption: allOption,
    searchText: "",
    searchMode: "name",
    sortKey: "name",
    sortAscending: true,
  }
}

function refreshBrowser(): undefined {
  if (browser === undefined) return
  const charId = tostring(GetCurrentCharacterId())
  const rows = buildBrowserRows()
  const filtered = filterRows(rows, browser.filter, charId)
  const sorted = sortRows(filtered, browser.filter.sortKey, browser.filter.sortAscending)
  browser.window.setRows(sorted, browser.filter.locationOption, charId)
}

function onFilterChange(next: BrowserFilterState): undefined {
  if (browser === undefined) return
  browser.filter = next
  refreshBrowser()
}

export function initializeInventoryBrowser(): undefined {
  if (browser !== undefined) return

  const window = createBrowserWindow()
  const locationOptions = collectLocationOptions()
  const filter = defaultFilterState(locationOptions)
  const filterBar = createBrowserFilterBar({
    toolbar: window.toolbar,
    searchBar: window.searchBar,
    state: filter,
    locationOptions,
    onChange: onFilterChange,
  })

  browser = { window, filterBar, filter }
  registerBrowserScene(window, refreshBrowser)
}

export function toggleInventoryBrowser(): undefined {
  if (browser === undefined) return
  if (browser.window.isHidden()) {
    browser.filterBar.setLocationOptions(collectLocationOptions())
    refreshBrowser()
    browser.window.showFloating()
  } else {
    browser.window.hide()
  }
}
