interface MapPinsFilterControl extends Control {
  oldOffsetY?: number
}

interface ResolvedFilterPanel {
  checkBoxPool: WorldMapFilterControlPool
  AnchorControl: (this: ResolvedFilterPanel, control: Control) => void
}

declare const ZO_WorldMapFiltersBattleground: Control | undefined

declare const ZO_WorldMapFiltersBattlegroundContainer: Control | undefined

declare const ZO_WorldMapFiltersBattlegroundContainerScrollChild: Control | undefined

declare const ZO_WorldMapFiltersBattlegroundCheckBox1: Control | undefined

declare const ZO_WorldMapFiltersBattlegroundComboBox1: Control | undefined

interface GamepadParametricScrollList {
  SetAlignToScreenCenter: (this: GamepadParametricScrollList, align: boolean) => void
  SetOnSelectedDataChangedCallback: (
    this: GamepadParametricScrollList,
    callback: (this: void, ...args: unknown[]) => void
  ) => void
  AddDataTemplate: (
    this: GamepadParametricScrollList,
    templateName: string,
    setupFunction: unknown,
    equalityFunction: unknown
  ) => void
  AddDataTemplateWithHeader: (
    this: GamepadParametricScrollList,
    templateName: string,
    setupFunction: unknown,
    equalityFunction: unknown,
    selectionTemplate: unknown,
    headerTemplate: string
  ) => void
  AddEntry: (this: GamepadParametricScrollList, templateName: string, entryData: object) => void
}

interface GamepadParametricScrollListClass {
  New: (this: GamepadParametricScrollListClass, listControl: Control) => GamepadParametricScrollList
}

declare const ZO_GamepadVerticalParametricScrollList: GamepadParametricScrollListClass

interface GamepadFilterPanel {
  control?: Control
  list?: GamepadParametricScrollList
  gamepadMapFiltersInfo?: object[]
  pinFilterCheckBoxes: object[]
  SetPinFilter: (this: GamepadFilterPanel, pinTypeId: number, enabled: boolean) => void
  BuildControls: (this: GamepadFilterPanel) => void
  SetupDropDown: (this: GamepadFilterPanel, ...args: unknown[]) => void
  [key: string]: unknown
}

interface GamepadWorldMapFilters {
  currentPanel?: GamepadFilterPanel
  pvePanel: GamepadFilterPanel
  pvpPanel: GamepadFilterPanel
  imperialPvPPanel: GamepadFilterPanel
  battlegroundPanel: GamepadFilterPanel
  SelectKeybind?: (this: GamepadWorldMapFilters) => void
  [key: string]: unknown
}

declare const GAMEPAD_WORLD_MAP_FILTERS: GamepadWorldMapFilters | undefined

declare const ZO_FormatToggleNarrationText: (this: void, text: string, value: boolean) => unknown

declare const ZO_GamepadCheckboxOptionTemplate_Setup: unknown

declare const ZO_GamepadMenuEntryTemplateParametricListFunction: unknown
