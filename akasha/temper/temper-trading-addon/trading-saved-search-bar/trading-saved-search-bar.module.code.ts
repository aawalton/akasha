import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-objects-01"
import "@akasha/temper-eso-types/eso-objects-02"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import {
  type BarButton,
  CONTROL_GAP,
  CONTROL_HEIGHT,
  createBarButton,
  createEditBox,
  PADDING_X,
  PADDING_Y,
  setButtonActive,
} from "@akasha/temper-items-filters-addon/filter-bar-controls"
import {
  deserializeSavedSearch,
  serializeSavedSearch,
} from "@akasha/temper-items-filters-core/saved-search"
import { buildFilterIndex } from "@akasha/temper-items-filters-core/search-filter-registry"
import type { ActiveFilterValues } from "@akasha/temper-items-filters-core/search-filter-set"
import {
  addSavedSearch,
  getSavedSearches,
  removeSavedSearch,
  renameSavedSearch,
  setActiveSavedSearchIndex,
} from "../trading-saved-search-store/trading-saved-search-store.module.code.ts"

const SLOT_WIDTH = 110
const DELETE_WIDTH = 20
const RENAME_BTN_WIDTH = 20
const SAVE_WIDTH = 100
const RENAME_WIDTH = 110
export const SAVED_SEARCH_BAR_HEIGHT = CONTROL_HEIGHT + PADDING_Y * 2

export interface SavedSearchBarConfig {
  readonly getActive: (this: void) => ActiveFilterValues
  readonly applySearch: (this: void, active: ActiveFilterValues) => void
}

export interface SavedSearchBar {
  mount: (this: void, parent: TopLevelWindow, topOffset: number) => undefined
  refresh: (this: void) => undefined
}

interface SlotControls {
  readonly apply: BarButton
  readonly ren: BarButton
  readonly del: BarButton
  readonly rename: EditControl
  readonly renameBg: BackdropControl
}

export function createSavedSearchBar(this: void, config: SavedSearchBarConfig): SavedSearchBar {
  const filterIndex = buildFilterIndex()
  const slots: SlotControls[] = []
  let parentRef: TopLevelWindow | undefined
  let baseY = 0
  let saveButton: BarButton | undefined

  function applySlot(this: void, index: number): undefined {
    const store = getSavedSearches()
    const saved = store.searches[index]
    if (saved === undefined) return
    const active = deserializeSavedSearch(saved, filterIndex)
    setActiveSavedSearchIndex(index)
    config.applySearch(active)
    refresh()
  }

  function deleteSlot(this: void, index: number): undefined {
    removeSavedSearch(index)
    refresh()
  }

  function commitRename(this: void, index: number, text: string): undefined {
    if (text.length === 0) return
    renameSavedSearch(index, text)
    refresh()
  }

  function saveCurrent(this: void): undefined {
    const active = config.getActive()
    const store = getSavedSearches()
    const name = `Search ${store.searches.length + 1}`
    addSavedSearch(serializeSavedSearch(name, active, filterIndex))
    refresh()
  }

  function buildSlot(this: void, parent: TopLevelWindow, index: number): SlotControls {
    const safe = `${index}`
    const apply = createBarButton(parent, `$(parent)SSApply_${safe}`, "", 0, SLOT_WIDTH)
    apply.button.SetHandler("OnClicked", function (this: void): undefined {
      applySlot(index)
    })

    const ren = createBarButton(parent, `$(parent)SSRen_${safe}`, "R", 0, RENAME_BTN_WIDTH)
    ren.button.SetHandler("OnClicked", function (this: void): undefined {
      toggleRename(index)
    })

    const del = createBarButton(parent, `$(parent)SSDel_${safe}`, "x", 0, DELETE_WIDTH)
    del.button.SetHandler("OnClicked", function (this: void): undefined {
      deleteSlot(index)
    })

    const rename = createEditBox(parent, `$(parent)SSRename_${safe}`, 0, RENAME_WIDTH, "Rename…")
    const renameBg = WINDOW_MANAGER.GetControlByName<BackdropControl>(
      `${parent.GetName()}SSRename_${safe}BG`
    )
    rename.SetHandler("OnEnter", function (this: void): undefined {
      commitRename(index, rename.GetText())
      rename.SetHidden(true)
      if (renameBg !== undefined) renameBg.SetHidden(true)
    })

    const controls: SlotControls = { apply, ren, del, rename, renameBg: renameBg ?? apply.backdrop }
    setSlotHidden(controls, true)
    return controls
  }

  function toggleRename(this: void, index: number): undefined {
    const controls = slots[index]
    if (controls === undefined) return
    const nowHidden = controls.rename.IsHidden() === false
    controls.rename.SetHidden(nowHidden)
    controls.renameBg.SetHidden(nowHidden)
    if (!nowHidden) controls.rename.TakeFocus()
  }

  function refresh(this: void): undefined {
    const parent = parentRef
    if (parent === undefined) return
    const store = getSavedSearches()
    const count = store.searches.length

    for (let i = slots.length; i < count; i++) {
      slots[i] = buildSlot(parent, i)
    }

    let x = PADDING_X
    for (let i = 0; i < count; i++) {
      const controls = slots[i]
      const saved = store.searches[i]
      if (controls === undefined || saved === undefined) continue
      x = placeSlot(controls, saved.name, i === store.activeIndex, x)
    }
    for (let i = count; i < slots.length; i++) {
      const controls = slots[i]
      if (controls !== undefined) setSlotHidden(controls, true)
    }

    if (saveButton !== undefined) {
      saveButton.backdrop.ClearAnchors()
      saveButton.button.ClearAnchors()
      saveButton.backdrop.SetAnchor(TOPLEFT, parent, TOPLEFT, x, baseY)
      saveButton.button.SetAnchor(TOPLEFT, saveButton.backdrop, TOPLEFT, 0, 0)
      saveButton.button.SetAnchor(BOTTOMRIGHT, saveButton.backdrop, BOTTOMRIGHT, 0, 0)
    }
  }

  function placeSlot(
    this: void,
    controls: SlotControls,
    name: string,
    isActive: boolean,
    x: number
  ): number {
    anchorBarButton(controls.apply, x, baseY)
    controls.apply.label.SetText(name)
    setButtonActive(controls.apply, isActive)
    controls.apply.button.SetHidden(false)
    controls.apply.backdrop.SetHidden(false)

    const renX = x + SLOT_WIDTH + 2
    anchorBarButton(controls.ren, renX, baseY)
    controls.ren.button.SetHidden(false)
    controls.ren.backdrop.SetHidden(false)

    const delX = renX + RENAME_BTN_WIDTH + 2
    anchorBarButton(controls.del, delX, baseY)
    controls.del.button.SetHidden(false)
    controls.del.backdrop.SetHidden(false)

    controls.renameBg.ClearAnchors()
    controls.rename.ClearAnchors()
    controls.renameBg.SetAnchor(TOPLEFT, parentRef ?? controls.apply.backdrop, TOPLEFT, x, baseY)
    controls.rename.SetAnchor(TOPLEFT, controls.renameBg, TOPLEFT, 4, 0)
    controls.rename.SetAnchor(BOTTOMRIGHT, controls.renameBg, BOTTOMRIGHT, -4, 0)
    controls.rename.SetHidden(true)
    controls.renameBg.SetHidden(true)

    return delX + DELETE_WIDTH + CONTROL_GAP
  }

  return {
    mount(parent: TopLevelWindow, topOffset: number): undefined {
      parentRef = parent
      baseY = topOffset + PADDING_Y
      saveButton = createBarButton(parent, "$(parent)SSSave", "Save current", PADDING_X, SAVE_WIDTH)
      saveButton.button.SetHandler("OnClicked", function (this: void): undefined {
        saveCurrent()
      })
      refresh()
    },
    refresh,
  }
}

function anchorBarButton(this: void, bar: BarButton, x: number, y: number): undefined {
  bar.backdrop.ClearAnchors()
  bar.button.ClearAnchors()
  bar.backdrop.SetAnchor(TOPLEFT, bar.backdrop.GetParent(), TOPLEFT, x, y)
  bar.button.SetAnchor(TOPLEFT, bar.backdrop, TOPLEFT, 0, 0)
  bar.button.SetAnchor(BOTTOMRIGHT, bar.backdrop, BOTTOMRIGHT, 0, 0)
}

function setSlotHidden(this: void, controls: SlotControls, hidden: boolean): undefined {
  controls.apply.button.SetHidden(hidden)
  controls.apply.backdrop.SetHidden(hidden)
  controls.ren.button.SetHidden(hidden)
  controls.ren.backdrop.SetHidden(hidden)
  controls.del.button.SetHidden(hidden)
  controls.del.backdrop.SetHidden(hidden)
  controls.rename.SetHidden(true)
  controls.renameBg.SetHidden(true)
}
