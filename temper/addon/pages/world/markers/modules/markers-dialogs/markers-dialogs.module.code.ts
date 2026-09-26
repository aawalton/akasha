import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-extra/eso-ui-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-4/eso-ui-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-strings-2/eso-lib-sets-strings-2.type-declaration.d.ts"

type Answer = (this: void) => void
type NamedAnswer = (this: void, name: string | undefined) => void

interface DialogButton {
  text: string | number
  keybind?: string
  control?: Control
  callback?: (this: void, dialog: ZO_DialogData) => void
}

interface MarkerDialogInfo {
  canQueue?: boolean
  gamepadInfo?: { dialogType: number }
  customControl?: (this: void) => Control
  title: { text: string | number }
  mainText?: { text: string }
  warning?: { text: string }
  editBox?: Record<string, unknown>
  setup?: (this: void, dialog: ZO_DialogData) => void
  parametricList?: unknown[]
  blockDialogReleaseOnPress?: boolean
  buttons: DialogButton[]
}

interface EditBoxRow extends Control {
  highlight: Control
  editBoxControl: EditControl & { textChangedCallback?: (this: void, control: EditControl) => void }
}

interface EditBoxRowData {
  control?: EditBoxRow
  textChangedCallback: (this: void, control: EditControl) => void
}

interface ParametricDialog extends ZO_DialogData {
  setupFunc: (this: ParametricDialog) => void
  entryList: {
    GetTargetData: (this: unknown) => {
      callback?: (this: void, dialog: ParametricDialog) => void
      control?: EditBoxRow
    }
  }
}

export const CONFIRM_DIALOG = "TemperWorldMarkerConfirmDialogue"
export const NOTICE_DIALOG = "TemperWorldMarkerNotice"
export const EDIT_DIALOG = "TemperWorldMarkerEditDialogue"
export const GAMEPAD_EDIT_DIALOG = "TemperWorldMarkerEditBox"

export function registerDialog(this: void, name: string, info: MarkerDialogInfo): undefined {
  ESO_Dialogs[name] = info
  return undefined
}

export function registerCustomDialog(this: void, name: string, info: MarkerDialogInfo): undefined {
  ZO_Dialogs_RegisterCustomDialog(name, info)
  return undefined
}

const register = registerDialog

function answerOf(this: void, dialog: ZO_DialogData, key: string): Answer | undefined {
  return dialog.data[key] as Answer | undefined
}

function namedAnswerOf(this: void, dialog: ZO_DialogData, key: string): NamedAnswer | undefined {
  return dialog.data[key] as NamedAnswer | undefined
}

register(CONFIRM_DIALOG, {
  canQueue: true,
  gamepadInfo: { dialogType: GAMEPAD_DIALOGS.BASIC },
  title: { text: "<<1>>" },
  mainText: { text: "<<1>>" },
  warning: { text: "<<1>>" },
  buttons: [
    {
      text: "Yes",
      callback: (dialog) => {
        answerOf(dialog, "yesCallback")?.()
      },
    },
    {
      text: "No",
      callback: (dialog) => {
        answerOf(dialog, "noCallback")?.()
      },
    },
  ],
})

register(NOTICE_DIALOG, {
  canQueue: true,
  gamepadInfo: { dialogType: GAMEPAD_DIALOGS.BASIC },
  title: { text: "<<1>>" },
  mainText: { text: "<<1>>" },
  warning: { text: "<<1>>" },
  buttons: [{ text: "OK" }],
})

register(EDIT_DIALOG, {
  canQueue: true,
  gamepadInfo: { dialogType: GAMEPAD_DIALOGS.BASIC },
  title: { text: "<<1>>" },
  mainText: { text: "<<1>>" },
  warning: { text: "<<1>>" },
  editBox: {},
  buttons: [
    {
      text: "Confirm",
      callback: (dialog) => {
        namedAnswerOf(dialog, "yesCallback")?.(ZO_Dialogs_GetEditBoxText(dialog))
      },
    },
    { text: "Cancel" },
  ],
})

function textParams(this: void, title: string, description: string, warning: string): object {
  return {
    titleParams: [title],
    mainTextParams: [description],
    warningParams: [warning],
  }
}

export function showDialogue(
  this: void,
  title: string,
  description: string,
  warning: string,
  callback: Answer,
  noCallback?: Answer
): undefined {
  ZO_Dialogs_ShowPlatformDialog(
    CONFIRM_DIALOG,
    { yesCallback: callback, noCallback },
    textParams(title, description, warning)
  )
  return undefined
}

export function showNotice(
  this: void,
  title: string,
  description: string,
  warning: string
): undefined {
  ZO_Dialogs_ShowPlatformDialog(NOTICE_DIALOG, {}, textParams(title, description, warning))
  return undefined
}

function showEditDialogue(
  this: void,
  title: string,
  description: string,
  warning: string,
  callback: NamedAnswer
): undefined {
  ZO_Dialogs_ShowPlatformDialog(
    EDIT_DIALOG,
    { yesCallback: callback },
    textParams(title, description, warning)
  )
  return undefined
}

function parametricDialog(this: void): ParametricDialog {
  return ZO_GenericGamepadDialog_GetControl(GAMEPAD_DIALOGS["PARAMETRIC"] ?? 0) as ParametricDialog
}

const TEXT_FIELD_ROW: EditBoxRowData & Record<string, unknown> = {
  textChangedCallback: (control) => {
    parametricDialog().data["selectedName"] = control.GetText()
  },
  setup: (control: EditBoxRow, data: EditBoxRowData, selected: boolean): undefined => {
    control.highlight.SetHidden(!selected)
    control.editBoxControl.textChangedCallback = data.textChangedCallback
    control.editBoxControl.SetMaxInputChars(1000)
    data.control = control
    const selectedName = parametricDialog().data["selectedName"]
    if (typeof selectedName === "string") {
      control.editBoxControl.SetText(selectedName)
    }
    return undefined
  },
  callback: (dialog: ParametricDialog): undefined => {
    dialog.entryList.GetTargetData().control?.editBoxControl.TakeFocus()
    return undefined
  },
}

register(GAMEPAD_EDIT_DIALOG, {
  canQueue: true,
  gamepadInfo: { dialogType: GAMEPAD_DIALOGS["PARAMETRIC"] ?? 0 },
  title: { text: "<<1>>" },
  mainText: { text: "<<1>>" },
  warning: { text: "<<1>>" },
  setup: (dialog) => {
    ;(dialog as ParametricDialog).setupFunc()
  },
  parametricList: [
    { template: "ZO_Gamepad_GenericDialog_Parametric_TextFieldItem", templateData: TEXT_FIELD_ROW },
    {
      template: "ZO_GamepadTextFieldSubmitItem",
      templateData: {
        text: GetString(SI_GAMEPAD_CONTACTS_EDIT_NOTE_CONFIRM),
        setup: ZO_SharedGamepadEntry_OnSetup,
        callback: (dialog: ParametricDialog): undefined => {
          const name = dialog.data["selectedName"]
          namedAnswerOf(
            dialog,
            "textConfirmCallback"
          )?.(typeof name === "string" ? name : undefined)
          ZO_Dialogs_ReleaseDialogOnButtonPress(GAMEPAD_EDIT_DIALOG)
          return undefined
        },
      },
    },
  ],
  blockDialogReleaseOnPress: true,
  buttons: [
    {
      text: SI_GAMEPAD_SELECT_OPTION,
      callback: (dialog) => {
        const parametric = dialog as ParametricDialog
        parametric.entryList.GetTargetData().callback?.(parametric)
      },
    },
    {
      text: SI_DIALOG_EXIT,
      callback: () => {
        ZO_Dialogs_ReleaseDialogOnButtonPress(GAMEPAD_EDIT_DIALOG)
      },
    },
  ],
})

function showGamepadEdit(
  this: void,
  title: string,
  description: string,
  warning: string,
  callback: NamedAnswer
): undefined {
  ZO_Dialogs_ShowPlatformDialog(
    GAMEPAD_EDIT_DIALOG,
    { textConfirmCallback: callback },
    textParams(title, description, warning)
  )
  return undefined
}

export function askForName(
  this: void,
  title: string,
  description: string,
  warning: string,
  callback: NamedAnswer
): undefined {
  if (IsInGamepadPreferredMode()) {
    showGamepadEdit(title, description, warning, callback)
  } else {
    showEditDialogue(title, description, warning, callback)
  }
  return undefined
}
