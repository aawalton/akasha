interface LibSetsSearchUISharedObject {
  control: SearchUIControl
  filtersControl: SearchUIControl
  contentControl: SearchUIControl
  resultsList: LibSetsSearchUIList
  resultsListControl: SearchUIControl
  counterControl: SearchUIControl
  searchButton?: SearchUIControl

  searchParams?: LibSetsSearchParams
  lastSearchParams?: LibSetsSearchParams

  searchDoneCallback?: (this: void, selfVar: LibSetsSearchUISharedObject) => void
  searchErrorCallback?: (this: void, selfVar: LibSetsSearchUISharedObject) => void
  searchCanceledCallback?: (this: void, selfVar: LibSetsSearchUISharedObject) => void

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

  Initialize: (this: LibSetsSearchUISharedObject, control: SearchUIControl) => void
  SetSearchCallbacks: (
    this: LibSetsSearchUISharedObject,
    doneCb?: (this: void, selfVar: LibSetsSearchUISharedObject) => void,
    errorCb?: (this: void, selfVar: LibSetsSearchUISharedObject) => void,
    canceledCb?: (this: void, selfVar: LibSetsSearchUISharedObject) => void
  ) => void
  ResetInternal: (this: LibSetsSearchUISharedObject) => void
  ResetUI: (this: LibSetsSearchUISharedObject) => void
  Reset: (this: LibSetsSearchUISharedObject) => void
  ResetMultiSelectDropdown: (
    this: LibSetsSearchUISharedObject,
    dropdownControl: SearchUIControl
  ) => void
  SelectAllAtMultiSelectDropdown: (
    this: LibSetsSearchUISharedObject,
    dropdownControl: SearchUIControl
  ) => void
  SelectInvertMultiSelectDropdown: (
    this: LibSetsSearchUISharedObject,
    dropdownControl: SearchUIControl
  ) => void
  SelectMultiSelectDropdownEntries: (
    this: LibSetsSearchUISharedObject,
    dropdownControl: SearchUIControl,
    entriesToSelect: unknown[],
    refreshResultsListAfterwards?: boolean
  ) => void
  IsShown: (this: LibSetsSearchUISharedObject) => boolean
  ShowUI: (this: LibSetsSearchUISharedObject, slashOptions?: unknown) => void
  HideUI: (this: LibSetsSearchUISharedObject) => void
  Show: (
    this: LibSetsSearchUISharedObject,
    searchParams?: LibSetsSearchParams,
    doneCb?: (this: void, selfVar: LibSetsSearchUISharedObject) => void,
    errorCb?: (this: void, selfVar: LibSetsSearchUISharedObject) => void,
    canceledCb?: (this: void, selfVar: LibSetsSearchUISharedObject) => void
  ) => void
  ToggleUI: (this: LibSetsSearchUISharedObject, slashOptions?: unknown) => void
  UpdateSearchButtonEnabledState: (
    this: LibSetsSearchUISharedObject,
    isEnabled: boolean | undefined
  ) => void
  UpdateSearchHistory: (this: LibSetsSearchUISharedObject, editBoxCtrl: SearchUIEditBox) => void
  GetSetNameSearchString: (
    this: LibSetsSearchUISharedObject,
    tableOrString: unknown
  ) => string | undefined
  Cancel: (this: LibSetsSearchUISharedObject) => void
  ValidateSearchParams: (this: LibSetsSearchUISharedObject) => boolean | undefined
  StartSearch: (
    this: LibSetsSearchUISharedObject,
    doNotShowUI: boolean | undefined,
    wasReset?: boolean
  ) => boolean
  Search: (
    this: LibSetsSearchUISharedObject,
    doNotShowUI: boolean | undefined,
    searchParams: LibSetsSearchParams | undefined
  ) => void
  CheckForMatch: (
    this: LibSetsSearchUISharedObject,
    data: LibSetsSearchRowData,
    searchInput: string
  ) => boolean
  ProcessItemEntry: (
    this: LibSetsSearchUISharedObject,
    stringSearch: unknown,
    data: LibSetsSearchRowData,
    searchTerm: string,
    cache?: unknown
  ) => boolean
  SearchSetBonuses: (
    this: LibSetsSearchUISharedObject,
    bonuses: (string | undefined)[] | undefined,
    searchInput: string,
    setId: number | undefined
  ) => boolean
  OnFilterChanged: (
    this: LibSetsSearchUISharedObject,
    dropdownControl?: SearchUIControl,
    editControl?: SearchUIEditBox
  ) => void
  DidAnyFilterChange: (this: LibSetsSearchUISharedObject) => boolean
  PreFilterMasterList: (
    this: LibSetsSearchUISharedObject,
    defaultMasterListBase: { [setId: number]: { [key: string]: unknown } } | undefined
  ) => { [setId: number]: { [key: string]: unknown } } | undefined
  ThrottledCall: (
    this: LibSetsSearchUISharedObject,
    callbackName: string,
    timer: number,
    callback: (this: void, ...args: unknown[]) => void,
    ...args: unknown[]
  ) => void
  ModifyWeaponType2hd: (
    this: LibSetsSearchUISharedObject,
    weaponType: number | undefined
  ) => string | undefined
  SetSearchEditBoxValue: (
    this: LibSetsSearchUISharedObject,
    editBoxControl: SearchUIEditBox | undefined,
    searchTerm: string
  ) => void
  ShowItemLinkTooltip: (
    this: LibSetsSearchUISharedObject,
    rowControl: SearchUIControl,
    data: LibSetsSearchRowData | undefined
  ) => boolean | undefined
  HideItemLinkTooltip: (this: LibSetsSearchUISharedObject) => void
  ShowItemLinkPopupTooltip: (
    this: LibSetsSearchUISharedObject,
    parent: SearchUIControl,
    data: LibSetsSearchRowData | undefined
  ) => void
  HideItemLinkPopupTooltip: (this: LibSetsSearchUISharedObject) => void
  ShowSetDropLocationTooltip: (
    this: LibSetsSearchUISharedObject,
    rowControl: SearchUIControl,
    data: LibSetsSearchRowData | undefined,
    itemLinkTooltipShownLeftOfControl?: boolean
  ) => void
  ItemLinkToChat: (
    this: LibSetsSearchUISharedObject,
    data: LibSetsSearchRowData | undefined
  ) => void
  GetAllFavoritesCategories: (
    this: LibSetsSearchUISharedObject,
    setId: number | undefined
  ) => string[] | undefined
  GetNextFavoritesCategory: (
    this: LibSetsSearchUISharedObject,
    setId: number | undefined
  ) => string | undefined
  IsSetIdInFavorites: (
    this: LibSetsSearchUISharedObject,
    setId: number | undefined,
    favoriteCategory: string | undefined
  ) => boolean
  AddSetIdToFavorites: (
    this: LibSetsSearchUISharedObject,
    rowControl: SearchUIControl,
    setId: number,
    favoriteCategory: string | undefined
  ) => void
  RemoveSetIdFromFavorites: (
    this: LibSetsSearchUISharedObject,
    rowControl: SearchUIControl,
    setId: number,
    favoriteCategory: string
  ) => void
  RemoveSetIdFromAllFavorites: (
    this: LibSetsSearchUISharedObject,
    rowControl: SearchUIControl,
    setId: number
  ) => void
  RemoveAllSetFavorites: (this: LibSetsSearchUISharedObject, favoriteCategory: string) => void
  ShowSettingsMenu: (this: LibSetsSearchUISharedObject, anchorControl: SearchUIControl) => void
  ShowRowContextMenu: (this: LibSetsSearchUISharedObject, rowControl: SearchUIControl) => void
  ShowDropdownContextMenu: (
    this: LibSetsSearchUISharedObject,
    dropdownControl: SearchUIControl,
    shift?: boolean,
    alt?: boolean,
    ctrl?: boolean,
    command?: boolean
  ) => void
  OnSearchEditBoxContextMenu: (
    this: LibSetsSearchUISharedObject,
    editBoxControl: SearchUIEditBox | undefined,
    shift?: boolean,
    alt?: boolean,
    ctrl?: boolean,
    command?: boolean
  ) => void
  ApplySearchParamsToUI: (this: LibSetsSearchUISharedObject) => void

  [key: string]: unknown
}
