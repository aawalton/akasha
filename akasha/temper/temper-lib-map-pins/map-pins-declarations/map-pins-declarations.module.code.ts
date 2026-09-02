declare global {
  interface Control {
    oldOffsetY?: number
  }

  interface ResolvedFilterPanel {
    checkBoxPool: WorldMapFilterControlPool
    AnchorControl: (this: ResolvedFilterPanel, control: Control) => void
  }

  const ZO_WorldMapFiltersBattleground: Control | undefined

  const ZO_WorldMapFiltersBattlegroundContainer: Control | undefined

  const ZO_WorldMapFiltersBattlegroundContainerScrollChild: Control | undefined

  const ZO_WorldMapFiltersBattlegroundCheckBox1: Control | undefined

  const ZO_WorldMapFiltersBattlegroundComboBox1: Control | undefined

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
    New: (
      this: GamepadParametricScrollListClass,
      listControl: Control
    ) => GamepadParametricScrollList
  }

  const ZO_GamepadVerticalParametricScrollList: GamepadParametricScrollListClass

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

  const GAMEPAD_WORLD_MAP_FILTERS: GamepadWorldMapFilters | undefined

  const SCREEN_NARRATION_MANAGER: {
    QueueParametricListEntry: (list: GamepadParametricScrollList) => void
  }

  const ZO_FormatToggleNarrationText: (this: void, text: string, value: boolean) => unknown

  const ZO_GamepadCheckboxOptionTemplate_Setup: unknown

  const ZO_GamepadMenuEntryTemplateParametricListFunction: unknown
}

export {}
