interface ExtendedJournalTooltipExtension {
  AddSection: (header: string, body: string) => void
  Finalize: (tooltip: object, addSpacer?: boolean) => void
}

interface ExtendedJournalTabConfig {
  title: number | string
  order: number
  iconPrefix: string
  control: Control
  settingsPanel?: object
  binding?: string
  slashCommands?: readonly string[]
  callbackShow?: (this: void) => void
}

interface LibExtendedJournalApi {
  Used: boolean
  RegisterTab: (this: void, name: string, config: ExtendedJournalTabConfig) => void
  IsTabActive: (this: void, name: string) => boolean
  ItemTooltip: (this: void, itemLink: string) => TooltipControl
  TooltipExtensionInitialize: (
    this: void,
    showHeader: boolean,
    headerStatus?: string,
    headerCost?: string
  ) => ExtendedJournalTooltipExtension
  GetTooltipColor: (this: void, group: number, index: number) => number
  GetTooltipColorUnpacked: (
    this: void,
    group: number,
    index: number
  ) => LuaMultiReturn<[number, number, number]>
  SetTooltipColor: (this: void, group: number, index: number, ...rgba: number[]) => void
  Show: (this: void, tabName: string, ...args: unknown[]) => void
}

declare const LibExtendedJournal: LibExtendedJournalApi

interface LibCodesCommonCodeApi {
  RegisterString: (this: void, name: string, value: string) => void
  GetZoneName: (this: void, zoneId: number) => string
  MonitorZoneChanges: (this: void, name: string, callback: (this: void) => void) => void
  GetZoneId: (this: void) => number
  GetServerAndAccountList?: (this: void, includeCurrent: boolean) => unknown
  Int32ToRGBA: (this: void, value: number) => LuaMultiReturn<[number, number, number, number]>
  HSLToRGB: (
    this: void,
    h: number,
    s: number,
    l: number,
    a?: number
  ) => LuaMultiReturn<[number, number, number, number]>
  RunAfterInitialLoadscreen: (this: void, fn: (this: void) => void) => void
}

interface ExtendedJournalSearch {
  IsMatch: (searchTerm: string, data: object) => boolean
}

interface ExtendedJournalSortFilterList {
  list: Control
  frame: Control
  sortHeaderGroup: ZoSortHeaderGroup & {
    SelectAndResetSortForKey: (key: string) => void
  }
  currentSortKey: string
  currentSortOrder: boolean
  sortFunction:
    | ((this: void, e1: ZoScrollListDataEntry<never>, e2: ZoScrollListDataEntry<never>) => boolean)
    | undefined
  masterList: unknown[]
  RefreshData: () => void
  RefreshFilters: () => void
  SetAlternateRowBackgrounds: (alternate: boolean) => void
  SetupRow: (rowControl: Control, data: unknown) => void
  Row_OnMouseEnter: (rowControl: Control) => void
  Row_OnMouseExit: (rowControl: Control) => void
  Row_OnMouseUp: (...args: unknown[]) => void
  InitializeComboBox: (
    comboBox: object,
    config: object,
    initialSelection?: number,
    noCallbackOnInit?: boolean,
    onChange?: (
      this: void,
      comboBox: object,
      entryText: string,
      entry: object,
      selectionChanged: boolean
    ) => void
  ) => void
  InitializeSearch: (sortType: number) => ExtendedJournalSearch
  [key: string]: unknown
}

interface ExtendedJournalSortFilterListSubclass {
  [key: string]: unknown
}

interface ExtendedJournalSortFilterListClass {
  Subclass: <
    T extends ExtendedJournalSortFilterListSubclass = ExtendedJournalSortFilterListSubclass,
  >() => T
  New: <T = ExtendedJournalSortFilterList>(this: void, self: object, ...args: unknown[]) => T
  Initialize: (this: void, self: object, ...args: unknown[]) => void
  SetupRow: (this: void, self: object, rowControl: Control, data: unknown) => void
}

declare const ExtendedJournalSortFilterList: ExtendedJournalSortFilterListClass
