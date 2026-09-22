interface SetsCopyDialogControl {
  _object?: unknown
  GetNamedChild: (this: SetsCopyDialogControl, name: string) => SetsCopyDialogChild
  GetWidth: (this: SetsCopyDialogControl) => number
  IsHidden: (this: SetsCopyDialogControl) => boolean
  SetHidden: (this: SetsCopyDialogControl, hidden: boolean) => void
}

interface SetsCopyDialogChild {
  SetText: (this: SetsCopyDialogChild, text: string) => void
  SetHidden: (this: SetsCopyDialogChild, hidden: boolean) => void
  SetEditEnabled: (this: SetsCopyDialogChild, enabled: boolean) => void
  SelectAll: (this: SetsCopyDialogChild) => void
  TakeFocus: (this: SetsCopyDialogChild) => void
  SetDimensionConstraints: (
    this: SetsCopyDialogChild,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
  ) => void
  SetDimensions: (this: SetsCopyDialogChild, width: number, height: number) => void
}

interface SetsCopyDialogInfo {
  customControl: SetsCopyDialogControl
  title: { text: string }
  setup: (this: void, dialog: unknown, data: SetsCopyDialogData | undefined) => void
  buttons: ReadonlyArray<{
    control: SetsCopyDialogChild
    text: number
    keybind: string
  }>
}

interface SetsCopyDialogData {
  text?: string
  setData?: {
    nameClean?: string
    name?: string
    setId?: number
  }
}

interface SetsCopyDialog {
  control: SetsCopyDialogControl
  dialogName: string
  title: SetsCopyDialogChild
  text: SetsCopyDialogChild
  prevButton: SetsCopyDialogChild
  nextButton: SetsCopyDialogChild
  textContent?: string
  messageTable?: string[]
  messageTableId?: number

  IsShown: (this: SetsCopyDialog) => boolean
  OnShow: (this: SetsCopyDialog) => void
  Show: (
    this: SetsCopyDialog,
    dialogData?: SetsCopyDialogData,
    textParams?: { [param: string]: string }
  ) => void
  OnHide: (this: SetsCopyDialog) => void
  Hide: (this: SetsCopyDialog) => void
  PreviousPage: (this: SetsCopyDialog) => void
  NextPage: (this: SetsCopyDialog) => void
  UpdateEditAndButtons: (this: SetsCopyDialog) => void
  SetupDialog: (
    this: SetsCopyDialog,
    control: SetsCopyDialogControl,
    dialog: unknown,
    data: SetsCopyDialogData | undefined
  ) => void
}
