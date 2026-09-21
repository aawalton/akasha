interface LibHistoireEditBoxControl {
  SetEditEnabled: (this: LibHistoireEditBoxControl, enabled: boolean) => void
  SetSelectAllOnFocus: (this: LibHistoireEditBoxControl, enabled: boolean) => void
  SetCursorPosition: (this: LibHistoireEditBoxControl, position: number) => void
}

interface LibHistoireCachePathEditboxControl {
  editbox: LibHistoireEditBoxControl
}

declare const LibHistoireCachePathEditbox: LibHistoireCachePathEditboxControl

declare const LibHistoireGuildHistoryStatusWindow: TopLevelWindow

interface LibHistoireWarningDialogButton {
  text: string | number
  callback?: (this: void, ...args: unknown[]) => unknown
}

interface LibHistoireWarningDialog {
  canQueue?: boolean
  gamepadInfo?: { dialogType: number }
  setup?: (this: void, dialog: LibHistoireWarningDialog) => void
  setupFunc?: (this: LibHistoireWarningDialog) => void
  title: { text: string | number }
  mainText: { text: string | number }
  buttons: {
    1: LibHistoireWarningDialogButton
    2: LibHistoireWarningDialogButton
    [index: number]: LibHistoireWarningDialogButton
  }
}
