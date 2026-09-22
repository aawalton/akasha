interface HistoryEditBoxControl {
  SetEditEnabled: (this: HistoryEditBoxControl, enabled: boolean) => void
  SetSelectAllOnFocus: (this: HistoryEditBoxControl, enabled: boolean) => void
  SetCursorPosition: (this: HistoryEditBoxControl, position: number) => void
}

interface HistoryCachePathEditboxControl {
  editbox: HistoryEditBoxControl
}

declare const TemperSalesHistoryCachePathEditbox: HistoryCachePathEditboxControl

declare const TemperSalesHistoryStatusWindow: TopLevelWindow

interface HistoryWarningDialogButton {
  text: string | number
  callback?: (this: void, ...args: unknown[]) => unknown
}

interface HistoryWarningDialog {
  canQueue?: boolean
  gamepadInfo?: { dialogType: number }
  setup?: (this: void, dialog: HistoryWarningDialog) => void
  setupFunc?: (this: HistoryWarningDialog) => void
  title: { text: string | number }
  mainText: { text: string | number }
  buttons: {
    1: HistoryWarningDialogButton
    2: HistoryWarningDialogButton
    [index: number]: HistoryWarningDialogButton
  }
}
