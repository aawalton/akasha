interface SetsSearchUIKeyboardObject extends SetsSearchUISharedObject {
  resetButton: SearchUIControl
  multiSelectFilterTypeNameToDropdown: { [filterName: string]: SearchUIControl }
  multiSelectMinAndMaxData: LuaMap<SearchUIControl, SetsMultiSelectMinMaxData>
  isItemIdRelevantMultiSelectFilterDropdown: LuaMap<SearchUIControl, boolean>
  LSM_Dropdowns?: { [filterName: string]: unknown }
  tooltipKeyboardHookWasDone: boolean

  LoadSearchUIPositionAndSize: (this: SetsSearchUIKeyboardObject, tlcCtrl?: SearchUIControl) => void
  SaveSearchUIPositionAndSize: (this: SetsSearchUIKeyboardObject, tlcCtrl?: SearchUIControl) => void
  SetMultiSelectDropdownDimensionConstraints: (this: SetsSearchUIKeyboardObject) => void
  UpdateSearchParamsFromSlashcommand: (
    this: SetsSearchUIKeyboardObject,
    slashOptions: unknown
  ) => void
  InitializeFilters: (this: SetsSearchUIKeyboardObject) => void
  UpdateDropdownSort: (
    this: SetsSearchUIKeyboardObject,
    comboBoxType: string,
    sortType: unknown,
    suppressRebuild?: boolean
  ) => void
  GetSelectedMultiSelectDropdownFilters: (
    this: SetsSearchUIKeyboardObject,
    multiSelectDropdown: SearchUIControl
  ) => { [filterType: string]: boolean }
  SetMultiSelectDropdownFilters: (
    this: SetsSearchUIKeyboardObject,
    multiSelectDropdown: SearchUIControl,
    entriesToSelect: { [filterType: string]: boolean }
  ) => void
  IsAnyItemIdRelevantFilterActive: (this: SetsSearchUIKeyboardObject) => boolean
  GetItemIdRelevantFilterKeys: (
    this: SetsSearchUIKeyboardObject
  ) => { [searchParamKey: string]: boolean } | false
  GetItemIdsForSetIdRespectingFilters: (
    this: SetsSearchUIKeyboardObject,
    setId: number,
    onlyOneItemId?: boolean
  ) => number[] | undefined
  OnRowMouseEnter: (this: SetsSearchUIKeyboardObject, rowControl: SearchUIControl) => void
  OnRowMouseExit: (this: SetsSearchUIKeyboardObject, rowControl: SearchUIControl) => void
  OnRowMouseUp: (
    this: SetsSearchUIKeyboardObject,
    rowControl: SearchUIControl,
    mouseButton: number,
    upInside: boolean,
    shift?: boolean,
    alt?: boolean,
    ctrl?: boolean,
    command?: boolean
  ) => void
  OnDropdownMouseUp: (
    this: SetsSearchUIKeyboardObject,
    dropdownControl: SearchUIControl,
    mouseButton: number,
    upInside: boolean,
    shift?: boolean,
    alt?: boolean,
    ctrl?: boolean,
    command?: boolean
  ) => void
}

interface SetsSearchParams {
  names?: string
  bonuses?: string
  [filterKey: string]: string | { [id: string]: boolean } | undefined
}

interface SetsSearchRowData {
  name: string
  nameLower?: string
  nameClean?: string
  setId?: number
  setType?: number
  setTypeName?: string
  setTypeTexture?: string
  itemLink?: string
  itemId?: number
  isFavorite?: string | number | boolean
  bonuses?: (string | undefined)[]
  numBonuses?: number
  dropLocationText?: string
  dropLocationSort?: string
  setDataText?: string
  setDataTextClean?: string
  setInfoParts?: { [part: string]: SetsSetInfoPart }
  zoneIds?: number[]
  [key: string]: unknown
}

interface SetsMultiSelectMinMaxData {
  minX: number
  maxX?: number | string
  anchors?: SetsAnchorData[]
}

interface SetsAnchorData {
  point: number
  relativeTo: unknown
  relativePoint: number
  offsetX?: number | string
  offsetY?: number | string
}
