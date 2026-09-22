interface SetsSearchUIList extends ZoSortFilterList {
  _parentObject: SetsSearchUIKeyboardObject
  masterList: SetsSearchRowData[]
  sortKeys: Record<string, ZoSortKeyConfig>
  isAnyItemIdRelevantFilterActive?: boolean
  updateListColumnWith?: number
  headerAndColumnsMinAndMaxData: LuaMap<SearchUIControl, SetsListColumnData>

  sortHeaderGroup: ZoSortHeaderGroup & {
    SelectAndResetSortForKey: (this: ZoSortHeaderGroup, key: string) => void
    GetCurrentSortKey: (this: ZoSortHeaderGroup) => string | undefined
    GetSortDirection: (this: ZoSortHeaderGroup) => boolean | undefined
  }

  SetEmptyText: (this: SetsSearchUIList, text: string) => void
  RefreshVisible: (this: SetsSearchUIList) => void

  Row_OnMouseEnter: (this: SetsSearchUIList, rowControl: SearchUIControl) => void
  Row_OnMouseExit: (this: SetsSearchUIList, rowControl: SearchUIControl) => void

  Setup: (this: SetsSearchUIList) => void
  SetHeaderAndColumnDimensionConstraints: (
    this: SetsSearchUIList,
    rowControl?: SearchUIControl,
    columnsToo?: boolean,
    noHeader?: boolean
  ) => void
  SetupItemRow: (this: SetsSearchUIList, control: SearchUIControl, data: SetsSearchRowData) => void
  CreateEntryForSet: (
    this: SetsSearchUIList,
    setId: number,
    setData: { [key: string]: unknown }
  ) => SetsSearchRowData | undefined
  BuildSortKeys: (this: SetsSearchUIList) => void
  UpdateCounter: (this: SetsSearchUIList, scrollData: unknown[]) => void
  AddFavorite: (
    this: SetsSearchUIList,
    rowControl: SearchUIControl,
    favoriteCategory: string
  ) => void
  RemoveFavorite: (
    this: SetsSearchUIList,
    rowControl: SearchUIControl,
    favoriteCategory: string
  ) => void
  [key: string]: unknown
}

interface SetsListColumnData {
  minX: number
  maxX: number | string
  factorMultiplier?: number
  columnName?: string
  anchors?: SetsAnchorData[]
}

interface SetsSearchUIListClass extends SetsSearchUIList, ZoSortFilterListSubclass {
  New: (
    this: SetsSearchUIListClass,
    listParentControl: SearchUIControl,
    parentObject: SetsSearchUIKeyboardObject
  ) => SetsSearchUIList
}

interface SetsSearchUISharedClass extends SetsSearchUISharedObject, ZoInitializingObjectSubclass {
  New: (this: SetsSearchUISharedClass, ...args: unknown[]) => SetsSearchUISharedObject
}

interface SetsSearchUIKeyboardClass
  extends SetsSearchUIKeyboardObject,
    ZoInitializingObjectSubclass {
  New: (this: SetsSearchUIKeyboardClass, control: SearchUIControl) => SetsSearchUIKeyboardObject
}

interface SetsSetInfoPart {
  enabled: boolean
  data?: unknown
  dataClean?: unknown
  text?: string
  textClean?: string
  icon?: string
}

type SetsSearchUIDescriptorExt = {
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
