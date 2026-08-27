interface ZoSortKeyConfig {
  tiebreaker?: string
  isNumeric?: boolean
  caseInsensitive?: boolean
  tieBreakerSortOrder?: boolean
}

declare function ZO_TableOrderingFunction(
  data1: unknown,
  data2: unknown,
  sortKey: string,
  sortKeys: Record<string, ZoSortKeyConfig>,
  sortOrder: boolean
): boolean

declare const ZO_SORT_ORDER_UP: boolean
declare const ZO_SORT_ORDER_DOWN: boolean

interface ZoSortHeaderGroup {
  SelectHeaderByKey(key: string): void
  [key: string]: unknown
}

interface ZoSortFilterList {
  list: Control
  sortHeaderGroup: ZoSortHeaderGroup
  currentSortKey: string
  currentSortOrder: boolean
  sortFunction:
    | ((
        this: void,
        entry1: ZoScrollListDataEntry<never>,
        entry2: ZoScrollListDataEntry<never>
      ) => boolean)
    | undefined
  masterList: unknown[]
  RefreshData(): void
  RefreshFilters(): void
  RefreshSort(): void
  CommitScrollList(): void
  SetAlternateRowBackgrounds(alternate: boolean): void
  GetListControl(): Control
  BuildMasterList(): void
  FilterScrollList(): void
  SortScrollList(): void
  SetupRow(rowControl: Control, data: unknown): void
  [key: string]: unknown
}

interface ZoSortFilterListSubclass {
  [key: string]: unknown
}

interface ZoSortFilterListClass {
  Subclass<T extends ZoSortFilterListSubclass = ZoSortFilterListSubclass>(): T
  New: <T = ZoSortFilterList>(this: void, self: object, control: Control, ...args: unknown[]) => T
  Initialize: (this: void, self: object, control: Control) => void
  InitializeSortFilterList: (this: void, self: object, control: Control) => void
  SetupRow: (this: void, self: object, rowControl: Control, data: unknown) => void
}
declare const ZO_SortFilterList: ZoSortFilterListClass

declare function ZO_ScrollList_AddDataType<T, C extends Control = Control>(
  listControl: Control,
  typeId: number,
  templateName: string,
  height: number,
  setupCallback: (this: void, rowControl: C, data: T) => void
): void

declare function ZO_ScrollList_EnableHighlight(listControl: Control, templateName: string): void

declare function ZO_ScrollList_CreateDataEntry<T>(
  typeId: number,
  data: T,
  categoryId?: number
): ZoScrollListDataEntry<T>

declare function ZO_ClearNumericallyIndexedTable(table: object): void
