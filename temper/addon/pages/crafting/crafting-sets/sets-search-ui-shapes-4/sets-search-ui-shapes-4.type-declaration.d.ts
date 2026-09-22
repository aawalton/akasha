interface LibSetsSearchUIList extends ZoSortFilterList {
  _parentObject: SetsSearchUIKeyboardObject
  masterList: SetsSearchRowData[]
  sortKeys: Record<string, ZoSortKeyConfig>
  isAnyItemIdRelevantFilterActive?: boolean
  updateListColumnWith?: number
  headerAndColumnsMinAndMaxData: LuaMap<SearchUIControl, LibSetsListColumnData>

  sortHeaderGroup: ZoSortHeaderGroup & {
    SelectAndResetSortForKey: (this: ZoSortHeaderGroup, key: string) => void
    GetCurrentSortKey: (this: ZoSortHeaderGroup) => string | undefined
    GetSortDirection: (this: ZoSortHeaderGroup) => boolean | undefined
  }

  SetEmptyText: (this: LibSetsSearchUIList, text: string) => void
  RefreshVisible: (this: LibSetsSearchUIList) => void

  Row_OnMouseEnter: (this: LibSetsSearchUIList, rowControl: SearchUIControl) => void
  Row_OnMouseExit: (this: LibSetsSearchUIList, rowControl: SearchUIControl) => void

  Setup: (this: LibSetsSearchUIList) => void
  SetHeaderAndColumnDimensionConstraints: (
    this: LibSetsSearchUIList,
    rowControl?: SearchUIControl,
    columnsToo?: boolean,
    noHeader?: boolean
  ) => void
  SetupItemRow: (
    this: LibSetsSearchUIList,
    control: SearchUIControl,
    data: SetsSearchRowData
  ) => void
  CreateEntryForSet: (
    this: LibSetsSearchUIList,
    setId: number,
    setData: { [key: string]: unknown }
  ) => SetsSearchRowData | undefined
  BuildSortKeys: (this: LibSetsSearchUIList) => void
  UpdateCounter: (this: LibSetsSearchUIList, scrollData: unknown[]) => void
  AddFavorite: (
    this: LibSetsSearchUIList,
    rowControl: SearchUIControl,
    favoriteCategory: string
  ) => void
  RemoveFavorite: (
    this: LibSetsSearchUIList,
    rowControl: SearchUIControl,
    favoriteCategory: string
  ) => void
  [key: string]: unknown
}

interface LibSetsListColumnData {
  minX: number
  maxX: number | string
  factorMultiplier?: number
  columnName?: string
  anchors?: SetsAnchorData[]
}

interface LibSetsSearchUIListClass extends LibSetsSearchUIList, ZoSortFilterListSubclass {
  New: (
    this: LibSetsSearchUIListClass,
    listParentControl: SearchUIControl,
    parentObject: SetsSearchUIKeyboardObject
  ) => LibSetsSearchUIList
}

interface LibSetsSearchUISharedClass
  extends SetsSearchUISharedObject,
    ZoInitializingObjectSubclass {
  New: (this: LibSetsSearchUISharedClass, ...args: unknown[]) => SetsSearchUISharedObject
}

interface LibSetsSearchUIKeyboardClass
  extends SetsSearchUIKeyboardObject,
    ZoInitializingObjectSubclass {
  New: (this: LibSetsSearchUIKeyboardClass, control: SearchUIControl) => SetsSearchUIKeyboardObject
}

interface LibSetsSetInfoPart {
  enabled: boolean
  data?: unknown
  dataClean?: unknown
  text?: string
  textClean?: string
  icon?: string
}

type LibSetsSearchUIDescriptorExt = {
  name: string
  controlName: LuaMap<boolean, string>
  control: LuaMap<boolean, unknown>
  KeyboardVars: { minWidth: number; minHeight: number }

  favoriteIcon: string

  [favoriteIconKey: string]: unknown

  favoriteIconTextStar: string
  favoriteIconTexts: { [category: string]: string | undefined }

  MAX_NUM_SET_BONUS: number
  searchTypeDefault: number
  scrollListDataTypeDefault: number
}

type LSMSubmenuEntry = {
  label?: string
  callback?: (this: void, ...args: unknown[]) => void
  entryType?: number
  checked?: (this: void) => boolean
  enabled?: boolean | ((this: void) => boolean)
  buttonGroup?: number
  [key: string]: unknown
}
