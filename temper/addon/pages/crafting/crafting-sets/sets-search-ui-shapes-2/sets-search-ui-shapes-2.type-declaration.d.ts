interface SetsSearchUISharedObject {
  control: SearchUIControl
  filtersControl: SearchUIControl
  contentControl: SearchUIControl
  resultsList: LibSetsSearchUIList
  resultsListControl: SearchUIControl
  counterControl: SearchUIControl
  searchButton?: SearchUIControl

  searchParams?: LibSetsSearchParams
  lastSearchParams?: LibSetsSearchParams

  searchDoneCallback?: (this: void, selfVar: SetsSearchUISharedObject) => void
  searchErrorCallback?: (this: void, selfVar: SetsSearchUISharedObject) => void
  searchCanceledCallback?: (this: void, selfVar: SetsSearchUISharedObject) => void

  stringSearch: ZoStringSearch

  tooltipControl: SearchUIControl
  tooltipControlTLC: SearchUIControl

  searchEditBoxControl: SearchUIEditBox
  bonusSearchEditBoxControl: SearchUIEditBox
  editBoxFilters: SearchUIEditBox[]
  editBoxFilterToSearchParamName: LuaMap<SearchUIEditBox, string>

  setTypeFiltersControl: SearchUIControl
  armorTypeFiltersControl: SearchUIControl
  weaponTypeFiltersControl: SearchUIControl
  equipmentTypeFiltersControl: SearchUIControl
  DCLIdFiltersControl: SearchUIControl
  enchantSearchCategoryTypeFiltersControl: SearchUIControl
  favoritesFiltersControl: SearchUIControl
  dropZoneFiltersControl: SearchUIControl
  dropMechanicsFiltersControl: SearchUIControl
  dropLocationsFiltersControl: SearchUIControl
  numBonusFiltersControl: SearchUIControl

  multiSelectFilterDropdowns: SearchUIControl[]
  multiSelectFilterDropdownToSearchParamName: LuaMap<SearchUIControl, string>

  itemIdRelevantFilterKeys?: { [searchParamKey: string]: boolean } | false

  Initialize: (this: SetsSearchUISharedObject, control: SearchUIControl) => void
  SetSearchCallbacks: (
    this: SetsSearchUISharedObject,
    doneCb?: (this: void, selfVar: SetsSearchUISharedObject) => void,
    errorCb?: (this: void, selfVar: SetsSearchUISharedObject) => void,
    canceledCb?: (this: void, selfVar: SetsSearchUISharedObject) => void
  ) => void
  ResetInternal: (this: SetsSearchUISharedObject) => void
  ResetUI: (this: SetsSearchUISharedObject) => void
  Reset: (this: SetsSearchUISharedObject) => void
  ResetMultiSelectDropdown: (
    this: SetsSearchUISharedObject,
    dropdownControl: SearchUIControl
  ) => void
  SelectAllAtMultiSelectDropdown: (
    this: SetsSearchUISharedObject,
    dropdownControl: SearchUIControl
  ) => void
  SelectInvertMultiSelectDropdown: (
    this: SetsSearchUISharedObject,
    dropdownControl: SearchUIControl
  ) => void
  SelectMultiSelectDropdownEntries: (
    this: SetsSearchUISharedObject,
    dropdownControl: SearchUIControl,
    entriesToSelect: unknown[],
    refreshResultsListAfterwards?: boolean
  ) => void
  IsShown: (this: SetsSearchUISharedObject) => boolean
  ShowUI: (this: SetsSearchUISharedObject, slashOptions?: unknown) => void
  HideUI: (this: SetsSearchUISharedObject) => void
  Show: (
    this: SetsSearchUISharedObject,
    searchParams?: LibSetsSearchParams,
    doneCb?: (this: void, selfVar: SetsSearchUISharedObject) => void,
    errorCb?: (this: void, selfVar: SetsSearchUISharedObject) => void,
    canceledCb?: (this: void, selfVar: SetsSearchUISharedObject) => void
  ) => void
  ToggleUI: (this: SetsSearchUISharedObject, slashOptions?: unknown) => void
  UpdateSearchButtonEnabledState: (
    this: SetsSearchUISharedObject,
    isEnabled: boolean | undefined
  ) => void
  UpdateSearchHistory: (this: SetsSearchUISharedObject, editBoxCtrl: SearchUIEditBox) => void
  GetSetNameSearchString: (
    this: SetsSearchUISharedObject,
    tableOrString: unknown
  ) => string | undefined
  Cancel: (this: SetsSearchUISharedObject) => void
  ValidateSearchParams: (this: SetsSearchUISharedObject) => boolean | undefined
  StartSearch: (
    this: SetsSearchUISharedObject,
    doNotShowUI: boolean | undefined,
    wasReset?: boolean
  ) => boolean
  Search: (
    this: SetsSearchUISharedObject,
    doNotShowUI: boolean | undefined,
    searchParams: LibSetsSearchParams | undefined
  ) => void
  CheckForMatch: (
    this: SetsSearchUISharedObject,
    data: LibSetsSearchRowData,
    searchInput: string
  ) => boolean
  ProcessItemEntry: (
    this: SetsSearchUISharedObject,
    stringSearch: unknown,
    data: LibSetsSearchRowData,
    searchTerm: string,
    cache?: unknown
  ) => boolean
  SearchSetBonuses: (
    this: SetsSearchUISharedObject,
    bonuses: (string | undefined)[] | undefined,
    searchInput: string,
    setId: number | undefined
  ) => boolean
  OnFilterChanged: (
    this: SetsSearchUISharedObject,
    dropdownControl?: SearchUIControl,
    editControl?: SearchUIEditBox
  ) => void
  DidAnyFilterChange: (this: SetsSearchUISharedObject) => boolean
  PreFilterMasterList: (
    this: SetsSearchUISharedObject,
    defaultMasterListBase: { [setId: number]: { [key: string]: unknown } } | undefined
  ) => { [setId: number]: { [key: string]: unknown } } | undefined
  ThrottledCall: (
    this: SetsSearchUISharedObject,
    callbackName: string,
    timer: number,
    callback: (this: void, ...args: unknown[]) => void,
    ...args: unknown[]
  ) => void
  ModifyWeaponType2hd: (
    this: SetsSearchUISharedObject,
    weaponType: number | undefined
  ) => string | undefined
  SetSearchEditBoxValue: (
    this: SetsSearchUISharedObject,
    editBoxControl: SearchUIEditBox | undefined,
    searchTerm: string
  ) => void
  ShowItemLinkTooltip: (
    this: SetsSearchUISharedObject,
    rowControl: SearchUIControl,
    data: LibSetsSearchRowData | undefined
  ) => boolean | undefined
  HideItemLinkTooltip: (this: SetsSearchUISharedObject) => void
  ShowItemLinkPopupTooltip: (
    this: SetsSearchUISharedObject,
    parent: SearchUIControl,
    data: LibSetsSearchRowData | undefined
  ) => void
  HideItemLinkPopupTooltip: (this: SetsSearchUISharedObject) => void
  ShowSetDropLocationTooltip: (
    this: SetsSearchUISharedObject,
    rowControl: SearchUIControl,
    data: LibSetsSearchRowData | undefined,
    itemLinkTooltipShownLeftOfControl?: boolean
  ) => void
  ItemLinkToChat: (this: SetsSearchUISharedObject, data: LibSetsSearchRowData | undefined) => void
  GetAllFavoritesCategories: (
    this: SetsSearchUISharedObject,
    setId: number | undefined
  ) => string[] | undefined
  GetNextFavoritesCategory: (
    this: SetsSearchUISharedObject,
    setId: number | undefined
  ) => string | undefined
  IsSetIdInFavorites: (
    this: SetsSearchUISharedObject,
    setId: number | undefined,
    favoriteCategory: string | undefined
  ) => boolean
  AddSetIdToFavorites: (
    this: SetsSearchUISharedObject,
    rowControl: SearchUIControl,
    setId: number,
    favoriteCategory: string | undefined
  ) => void
  RemoveSetIdFromFavorites: (
    this: SetsSearchUISharedObject,
    rowControl: SearchUIControl,
    setId: number,
    favoriteCategory: string
  ) => void
  RemoveSetIdFromAllFavorites: (
    this: SetsSearchUISharedObject,
    rowControl: SearchUIControl,
    setId: number
  ) => void
  RemoveAllSetFavorites: (this: SetsSearchUISharedObject, favoriteCategory: string) => void
  ShowSettingsMenu: (this: SetsSearchUISharedObject, anchorControl: SearchUIControl) => void
  ShowRowContextMenu: (this: SetsSearchUISharedObject, rowControl: SearchUIControl) => void
  ShowDropdownContextMenu: (
    this: SetsSearchUISharedObject,
    dropdownControl: SearchUIControl,
    shift?: boolean,
    alt?: boolean,
    ctrl?: boolean,
    command?: boolean
  ) => void
  OnSearchEditBoxContextMenu: (
    this: SetsSearchUISharedObject,
    editBoxControl: SearchUIEditBox | undefined,
    shift?: boolean,
    alt?: boolean,
    ctrl?: boolean,
    command?: boolean
  ) => void
  ApplySearchParamsToUI: (this: SetsSearchUISharedObject) => void

  [key: string]: unknown
}
