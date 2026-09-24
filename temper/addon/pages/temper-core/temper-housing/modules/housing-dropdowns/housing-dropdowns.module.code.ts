import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import { houseTravel } from "akasha/temper/addon/pages/temper-core/temper-housing/modules/housing-state/housing-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"

interface ComboBoxView {
  SetSortsItems: (this: ComboBoxView, sortsItems: boolean) => void
  ClearItems: (this: ComboBoxView) => void
  CreateItemEntry: (this: ComboBoxView, name: string, callback: unknown) => ComboBoxEntry
  AddItem: (this: ComboBoxView, entry: ComboBoxEntry, suppressUpdate: unknown) => void
}
function asComboBoxView(value: unknown): ComboBoxView {
  return value as ComboBoxView
}

interface ComboBoxEntry {
  name: string
  filterId?: number
  sortId?: number
}

interface SliderView {
  SetValue: (this: SliderView, value: number) => void
}
function asSliderView(value: unknown): SliderView {
  return value as SliderView
}

interface SliderHost {
  slider: unknown
}
function asSliderHost(value: unknown): SliderHost {
  return value as SliderHost
}

type StringSeq = string[]
function asStringSeq(value: unknown): StringSeq {
  return value as StringSeq
}

type RecordKey = number | string
function asRecordKey(value: unknown): RecordKey {
  return value as RecordKey
}

type HousesRecord = Record<number, string>
function asHousesRecord(value: unknown): HousesRecord {
  return value as HousesRecord
}

function dropdownCallback(
  this: void,
  _control: Control,
  text: string,
  _choice: unknown
): undefined {
  houseTravel.addonState.houseId = houseTravel.GetIdFromName(text)
  if (houseTravel.config.houseDebug === true) {
    d(houseTravel.addonState.houseId)
  }
}
houseTravel.DropdownCallback = dropdownCallback

function categoryDropdownCallback(
  this: void,
  _control: Control,
  _text: string,
  choice: { filterId: number }
): undefined {
  houseTravel.addonState.selectedLibraryFilter = choice.filterId
  if (houseTravel.savedVars !== undefined) {
    houseTravel.savedVars.selectedLibraryFilter = choice.filterId
  }
  if (houseTravel.addonState.categoryFilterInitialized === true) {
    houseTravel.UpdateLibraryEntries()
  }
}
houseTravel.CategoryDropdownCallback = categoryDropdownCallback

function librarySortDropdownCallback(
  this: void,
  _control: Control,
  _text: string,
  choice: { filterId: number }
): undefined {
  houseTravel.addonState.selectedLibrarySort = choice.filterId
  if (houseTravel.savedVars !== undefined) {
    houseTravel.savedVars.selectedLibrarySort = choice.filterId
  }
  if (houseTravel.addonState.LibrarySortInitialized === true) {
    houseTravel.UpdateLibraryEntries()
  }
}
houseTravel.LibrarySortDropdownCallback = librarySortDropdownCallback

function updateLibraryEntries(this: void): undefined {
  const librarySlider = asSliderView(asSliderHost(houseTravel.controls.library).slider)
  librarySlider.SetValue(0)
  const entries = houseTravel.GetFilteredLibraryData()
  if (entries !== undefined) {
    for (let i = 0; i < houseTravel.controls.libraryEntries.length; i = i + 1) {
      houseTravel.ClearLibraryControls(i)
    }
    houseTravel.CreateLibraryEntries()
  }
}
houseTravel.UpdateLibraryEntries = updateLibraryEntries

function cloneTable(
  this: void,
  origTable: Record<number | string, unknown>
): Record<number | string, unknown> {
  const newTable: Record<number | string, unknown> = {}
  for (const [key, value] of pairs(origTable)) {
    newTable[asRecordKey(key)] = value
  }
  return newTable
}
houseTravel.CloneTable = cloneTable

function sortHouseList(this: void, names: Record<number, string>): string[] | undefined {
  return houseTravel.SortPairs(names)
}
houseTravel.SortHouseList = sortHouseList

function createSortedHouseList(this: void): string[] | undefined {
  const retVal = asHousesRecord(houseTravel.CloneTable(houseTravel.HOUSES))
  return houseTravel.SortHouseList(retVal)
}
houseTravel.CreateSortedHouseList = createSortedHouseList

function createCategoryFilterList(this: void): Record<number, string> {
  const c = houseTravel.constants
  const retVal: Record<number, string> = {}
  retVal[c.FILTER_ID_NONE] = c.FILTER_NONE ?? ""
  retVal[c.FILTER_ID_HIGHLIGHT] = c.FILTER_HIGHLIGHT ?? ""
  retVal[c.FILTER_ID_LABYRINTH] = c.FILTER_LABYRINTH ?? ""
  retVal[c.FILTER_ID_JUMPNRUN] = c.FILTER_JUMPNRUN ?? ""
  retVal[c.FILTER_ID_CRAFTING] = c.FILTER_CRAFTING ?? ""
  retVal[c.FILTER_ID_GUILD] = c.FILTER_GUILD ?? ""
  retVal[c.FILTER_ID_ROLEPLAY] = c.FILTER_ROLEPLAY ?? ""
  retVal[c.FILTER_ID_RAID] = c.FILTER_RAID ?? ""
  retVal[c.FILTER_ID_HIDE_SEEK] = c.FILTER_HIDE_SEEK ?? ""
  retVal[c.FILTER_ID_ERP] = c.FILTER_ERP ?? ""
  return retVal
}
houseTravel.CreateCategoryFilterList = createCategoryFilterList

function createLibrarySortFilterList(this: void): Record<number, string> {
  const c = houseTravel.constants
  const retVal: Record<number, string> = {}
  retVal[c.LIBRARY_SORT_ID_NONE] = c.LIBRARY_SORT_NONE ?? ""
  retVal[c.LIBRARY_SORT_ID_NAME] = c.LIBRARY_SORT_NAME ?? ""
  retVal[c.LIBRARY_SORT_ID_HOUSE] = c.LIBRARY_SORT_HOUSE ?? ""
  return retVal
}
houseTravel.CreateLibrarySortFilterList = createLibrarySortFilterList

function createDropdownEntries(this: void, dropdown: unknown): undefined {
  const combo = asComboBoxView(dropdown)
  combo.SetSortsItems(false)
  combo.ClearItems()
  const sortedHouses = houseTravel.CreateSortedHouseList()
  if (sortedHouses !== undefined) {
    for (let i = 0; i < sortedHouses.length; i = i + 1) {
      const name = sortedHouses[i]
      if (name !== undefined) {
        const entry = combo.CreateItemEntry(name, houseTravel.DropdownCallback)
        combo.AddItem(entry, ZO_COMBOBOX_SUPRESS_UPDATE)
      }
    }
  }
}
houseTravel.CreateDropdownEntries = createDropdownEntries

function createCategoryDropdownEntries(this: void, dropdown: unknown): undefined {
  const combo = asComboBoxView(dropdown)
  combo.SetSortsItems(false)
  combo.ClearItems()
  const entries = asStringSeq(houseTravel.CreateCategoryFilterList())
  for (let i = 0; i < entries.length; i = i + 1) {
    const label = entries[i]
    if (label === undefined) {
      continue
    }
    const entry = combo.CreateItemEntry(label, houseTravel.CategoryDropdownCallback)
    entry.filterId = i + 1
    combo.AddItem(entry, ZO_COMBOBOX_SUPRESS_UPDATE)
  }
}
houseTravel.CreateCategoryDropdownEntries = createCategoryDropdownEntries

function createLibrarySortDropdownEntries(this: void, dropdown: unknown): undefined {
  const combo = asComboBoxView(dropdown)
  combo.SetSortsItems(false)
  combo.ClearItems()
  const entries = asStringSeq(houseTravel.CreateLibrarySortFilterList())
  for (let i = 0; i < entries.length; i = i + 1) {
    const label = entries[i]
    if (label === undefined) {
      continue
    }
    const entry = combo.CreateItemEntry(label, houseTravel.LibrarySortDropdownCallback)
    entry.filterId = i + 1
    combo.AddItem(entry, ZO_COMBOBOX_SUPRESS_UPDATE)
  }
}
houseTravel.CreateLibrarySortDropdownEntries = createLibrarySortDropdownEntries

function sortDropdownCallback(
  this: void,
  _control: Control,
  _text: string,
  choice: { sortId: number }
): undefined {
  houseTravel.addonState.selectedMyHousesSort = choice.sortId
  if (houseTravel.savedVars !== undefined) {
    houseTravel.savedVars.selectedMyHousesSort = choice.sortId
  }
  if (houseTravel.addonState.sortInitialized === true) {
    const myHousesSlider = asSliderView(asSliderHost(houseTravel.controls.myHouses).slider)
    myHousesSlider.SetValue(1)
    houseTravel.UpdateMyHouses()
  }
}
houseTravel.SortDropdownCallback = sortDropdownCallback

function createSortDropdownEntries(this: void, dropdown: unknown): undefined {
  const combo = asComboBoxView(dropdown)
  combo.SetSortsItems(false)
  combo.ClearItems()
  const c = houseTravel.constants
  const entriesRec: Record<number, string> = {}
  entriesRec[c.SORT_ID_HOUSE] = c.SORT_HOUSE ?? ""
  entriesRec[c.SORT_ID_LOCATION] = c.SORT_LOCATION ?? ""
  const entries = asStringSeq(entriesRec)
  for (let i = 0; i < entries.length; i = i + 1) {
    const label = entries[i]
    if (label === undefined) {
      continue
    }
    const entry = combo.CreateItemEntry(label, houseTravel.SortDropdownCallback)
    entry.sortId = i + 1
    combo.AddItem(entry, ZO_COMBOBOX_SUPRESS_UPDATE)
  }
}
houseTravel.CreateSortDropdownEntries = createSortDropdownEntries
