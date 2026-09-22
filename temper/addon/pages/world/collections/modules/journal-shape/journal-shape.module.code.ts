import "akasha/code/editor/extension/vscode-api/vscode-api.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-addon-menu/addon-menu-eso-window/addon-menu-eso-window.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-custom-menu/menu-decl/menu-decl.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export interface JournalList extends ZoSortFilterList {
  frame: Control
  sortHeaderGroup: ZoSortHeaderGroup & { SelectAndResetSortForKey: (key: string) => void }
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
  InitializeSearch: (sortType: number) => ZoStringSearch
}

export interface JournalListClass {
  Subclass: <T extends ZoSortFilterListSubclass>() => T
  New: <T extends JournalList>(this: void, self: object, control: Control, ...args: unknown[]) => T
}

export interface ControlsTable {
  frame: Control
  menu: Control
  subtitle: LabelControl
  title?: LabelControl
  mainMenu?: Control
}

export interface TabData {
  descriptor?: string
  order: number
  title?: string | number
  subtitle?: string | number
  name?: string
  control: Control
  iconPrefix?: string
  iconNormal?: string
  iconPressed?: string
  iconHighlight?: string
  binding?: string
  slashCommands?: readonly string[]
  settingsPanel?: object
  callbackShow?: (this: void) => void
  callbackHide?: (this: void) => void
}

export interface MenuBarButton {
  descriptor: string
  categoryName?: string | number
  title?: string | number
  subtitle?: string | number
}

export interface TooltipExtensionInstance {
  name: string
  control: Control
  sections: Control[]
  index: number
  loaded?: boolean
  unloadCallback?: (this: void) => void
  GetSection: (this: TooltipExtensionInstance) => Control
  Initialize: (
    this: TooltipExtensionInstance,
    showDivider: boolean,
    textLeft?: string,
    textRight?: string,
    appendExisting?: boolean
  ) => TooltipExtensionInstance
  AddSection: (
    this: TooltipExtensionInstance,
    textHeader?: string,
    textBody?: string,
    alignBody?: number
  ) => void
  Finalize: (
    this: TooltipExtensionInstance,
    tooltipControl: TooltipControl,
    showEmptyOrUnloadCallback?: boolean | ((this: void) => void)
  ) => void
  OnUnload: (this: TooltipExtensionInstance) => void
}

export interface InternalTable {
  name: string
  SCENE_NAME: string
  initialized: boolean
  controls: ControlsTable
  tabs: Record<string, TabData>
  activeTab: TabData | undefined
  settingsVisible: boolean
  currentTitle?: string
  scene?: Scene
  mainMenuFragment?: SceneFragment
  altMode?: (this: void) => void
  altModeList?: (this: void, listControl: Control) => void
  FixMainMenuCategory?: (this: void) => void
  LoadTooltipColors: (this: void) => void
  LazyInitialize: (this: void, initialDescriptor?: string) => void
  GetString: (this: void, str: string | number | undefined) => string
  UpdateTitle: (this: void, title?: string) => void
  HandleTabSwitch: (this: void, button: MenuBarButton) => void
  PrepareTabForDisplay: (this: void, descriptor?: string) => void
  FireCallbackForCurrentTab: (this: void, event: string) => void
  RefreshSettingsButton: (this: void) => void
  CleanupDefaultActionButton: (this: void) => void
}

export interface PublicTable {
  Used: boolean
  TOOLTIP_VERSION: number
  Show: (this: void, descriptor?: string, toggle?: boolean) => void
  RegisterTab: (this: void, descriptor: string, tabData: TabData) => void
  GetActiveTab: (this: void) => string | undefined
  IsTabActive: (this: void, descriptor: string) => boolean
  GetFrame: (this: void) => Control
  InvokeSettings: (this: void) => void
  SetAlternateMode: (
    this: void,
    callbackMain?: (this: void) => void,
    callbackList?: (this: void, listControl: Control) => void
  ) => void
  InitializeTooltip: (this: void, control?: TooltipControl) => TooltipControl
  ItemTooltip: (this: void, item: unknown, control?: TooltipControl) => TooltipControl
  TooltipExtensionInitialize: (
    this: void,
    showDivider: boolean,
    textLeft?: string,
    textRight?: string,
    name?: string,
    appendExisting?: boolean
  ) => TooltipExtensionInstance
  TooltipExtensionAddSection: (this: void, ...args: unknown[]) => void
  TooltipExtensionFinalize: (this: void, ...args: unknown[]) => void
  GetTooltipColor: (this: void, m: number, n: number) => number
  GetTooltipColorUnpacked: (
    this: void,
    m: number,
    n: number
  ) => LuaMultiReturn<[number, number, number]>
  SetTooltipColor: (this: void, m: number, n: number, color?: number, ...rgba: number[]) => void
  SelectComboBoxItemByIndex: (
    this: void,
    object: ZoComboBox,
    index: number,
    ...args: unknown[]
  ) => void
}
