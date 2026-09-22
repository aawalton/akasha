import {
  asGlobalTable,
  asPresent,
  asTyped,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { strLensplit } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-copy-text-split/sets-copy-text-split.module.code.ts"
import "akasha/code/editor/extension/vscode-api/vscode-api.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-custom-menu/menu-decl/menu-decl.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-copy-dialog-shapes/sets-copy-dialog-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-strings-2/eso-lib-sets-strings-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

const isConsole = lib.IsConsole

const major = lib.name
const libPrefix = lib.prefix

const strlen = string.len

const MAX_CHARACTERS_IN_TEXT_EDITBOX = 20000

const dialogName = `${string.upper(major)}_COPY_TEXT_DIALOG`

const globalTable = asGlobalTable(globalThis)

function dialogChild(
  this: void,
  parent: SetsCopyDialogControl,
  suffix: string
): SetsCopyDialogChild {
  return asTyped<SetsCopyDialogChild>(asPresent(GetControl(asTyped<Control>(parent), suffix)))
}

const showDialogWithTextParams =
  asTyped<
    (
      this: void,
      name: string,
      data?: SetsCopyDialogData,
      textParams?: { [param: string]: string }
    ) => void
  >(ZO_Dialogs_ShowDialog)

lib.CopyDialog = asTyped<SetsCopyDialog>({})

function changeCopyDialogPage(
  this: void,
  copyDialogRef: SetsCopyDialog | undefined,
  newIndex: number | undefined
): undefined {
  if (copyDialogRef === undefined) {
    return
  }
  if (newIndex === undefined || newIndex === 0 || newIndex > 1 || newIndex < -1) {
    return
  }
  const messageTable = copyDialogRef.messageTable
  if (messageTable === undefined) {
    return
  }
  const oldIndex = copyDialogRef.messageTableId
  if (oldIndex === undefined) {
    return
  }

  const numPages = tostring(messageTable.length)
  copyDialogRef.messageTableId = oldIndex + newIndex
  const messageTableId = copyDialogRef.messageTableId
  if (messageTable[messageTableId - 1] !== undefined) {
    const prevButton = copyDialogRef.prevButton
    const nextButton = copyDialogRef.nextButton
    const editBox = copyDialogRef.text
    const prevButtonText = `${tostring(oldIndex)} / ${numPages}`
    const nextButtonText = `${tostring(messageTableId)} / ${numPages}`
    prevButton.SetText(`${GetString(SI_LORE_READER_PREVIOUS_PAGE)} ( ${prevButtonText} )`)
    nextButton.SetText(`${GetString(SI_LORE_READER_NEXT_PAGE)} ( ${nextButtonText} )`)
    editBox.SetText(asPresent(messageTable[messageTableId - 1]))
    editBox.SetEditEnabled(false)
    editBox.SelectAll()

    if (messageTable[messageTableId - 1 - 1] === undefined) {
      prevButton.SetHidden(true)
    } else {
      prevButton.SetHidden(false)
    }
    if (messageTable[messageTableId + 1 - 1] === undefined) {
      nextButton.SetHidden(true)
    } else {
      nextButton.SetHidden(false)
    }
    editBox.TakeFocus()
  }
}

function setupDialog(
  this: void,
  self: SetsCopyDialog,
  control: SetsCopyDialogControl,
  dialog: unknown,
  data: SetsCopyDialogData | undefined
): undefined {
  const controlWidth = control.GetWidth() - 10
  self.title.SetDimensionConstraints(controlWidth, 75, controlWidth, 75)
  self.title.SetDimensions(controlWidth, 75)

  if (dialog === undefined || data === undefined) {
    return
  }
  let textForEdit = data.text
  if (textForEdit !== undefined) {
    const setData = data.setData
    if (setData !== undefined) {
      if (setData.nameClean !== undefined) {
        textForEdit = `${setData.nameClean}\n${textForEdit}`
      } else if (setData.name !== undefined) {
        textForEdit = `${setData.name}\n${textForEdit}`
      }
      if (setData.setId !== undefined) {
        textForEdit = `[${setData.setId}]${textForEdit}`
      }
    }
    self.textContent = textForEdit
  }
}

function updateEditAndButtons(this: void, self: SetsCopyDialog): undefined {
  const textContent = self.textContent
  if (textContent === undefined) {
    return
  }

  const editBox = self.text

  const copyDialog = lib.CopyDialog
  if (strlen(textContent) < MAX_CHARACTERS_IN_TEXT_EDITBOX) {
    editBox.SetText(textContent)

    editBox.SetEditEnabled(false)
    editBox.SelectAll()

    self.prevButton.SetText(GetString(SI_LORE_READER_PREVIOUS_PAGE))
    self.nextButton.SetText(GetString(SI_LORE_READER_NEXT_PAGE))
    self.nextButton.SetHidden(true)
    self.prevButton.SetHidden(true)

    copyDialog.messageTable = undefined
    copyDialog.messageTableId = undefined
  } else {
    copyDialog.messageTableId = 1
    copyDialog.messageTable = strLensplit(textContent, MAX_CHARACTERS_IN_TEXT_EDITBOX)

    editBox.SetText(asPresent(copyDialog.messageTable[copyDialog.messageTableId - 1]))
    editBox.SetEditEnabled(false)
    editBox.SelectAll()
    editBox.TakeFocus()

    self.prevButton.SetText(GetString(SI_LORE_READER_PREV_PAGE))
    self.prevButton.SetHidden(true)

    const numPages = copyDialog.messageTable.length
    const nextButtonText = `${tostring(copyDialog.messageTableId)} / ${numPages}`
    self.nextButton.SetText(`${GetString(SI_LORE_READER_NEXT_PAGE)} ( ${nextButtonText} )`)
    self.nextButton.SetHidden(false)
  }
}

function createCopyTextDialog(this: void, control: SetsCopyDialogControl): SetsCopyDialog {
  const self = asTyped<SetsCopyDialog>({})
  self.control = control
  control._object = self

  self.dialogName = dialogName
  self.title = control.GetNamedChild("Title")
  self.text = control.GetNamedChild("NoteEdit")
  self.prevButton = control.GetNamedChild("Prev")
  self.nextButton = control.GetNamedChild("Next")

  self.IsShown = isShown
  self.OnShow = onShow
  self.Show = show
  self.OnHide = onHide
  self.Hide = hide
  self.PreviousPage = previousPage
  self.NextPage = nextPage
  self.UpdateEditAndButtons = updateEditAndButtonsMethod
  self.SetupDialog = setupDialogMethod

  const dialogInfo: SetsCopyDialogInfo = {
    customControl: control,
    title: {
      text: `${libPrefix}Copy set '<<C:1>>'`,
    },
    setup: (dialog: unknown, data: SetsCopyDialogData | undefined): undefined => {
      setupDialog(self, control, dialog, data)
    },
    buttons: [
      {
        control: dialogChild(control, "Close"),
        text: SI_DIALOG_EXIT,
        keybind: "DIALOG_NEGATIVE",
      },
    ],
  }
  ZO_Dialogs_RegisterCustomDialog(self.dialogName, asTyped<ZO_DialogInfo>(dialogInfo))

  return self
}

function isShown(this: SetsCopyDialog): boolean {
  return !this.control.IsHidden()
}

function onShow(this: SetsCopyDialog): undefined {
  updateEditAndButtons(this)
}

function show(
  this: SetsCopyDialog,
  dialogData?: SetsCopyDialogData,
  textParams?: { [param: string]: string }
): undefined {
  if (this.IsShown()) {
    return
  }
  showDialogWithTextParams(this.dialogName, dialogData, textParams)
  this.OnShow()
}

function onHide(this: SetsCopyDialog): undefined {
  this.title.SetText("")
  this.text.SetText("")
  this.textContent = undefined
  ZO_Dialogs_ReleaseDialog(this.dialogName)
}

function hide(this: SetsCopyDialog): undefined {
  if (!this.IsShown()) {
    return
  }
  this.control.SetHidden(true)
  this.OnHide()
}

function previousPage(this: SetsCopyDialog): undefined {
  changeCopyDialogPage(this, -1)
}

function nextPage(this: SetsCopyDialog): undefined {
  changeCopyDialogPage(this, 1)
}

function updateEditAndButtonsMethod(this: SetsCopyDialog): undefined {
  updateEditAndButtons(this)
}

function setupDialogMethod(
  this: SetsCopyDialog,
  control: SetsCopyDialogControl,
  dialog: unknown,
  data: SetsCopyDialogData | undefined
): undefined {
  setupDialog(this, control, dialog, data)
}

function onDialogInitialized(this: void, dialogControl: SetsCopyDialogControl): undefined {
  if (isConsole) {
    return
  }
  lib.CopyDialog = createCopyTextDialog(dialogControl)

  const copyDialog = lib.CopyDialog
  copyDialog.messageTable = undefined
  copyDialog.messageTableId = undefined
}

globalTable.TemperItemsCraftingSets_CopyDialog_OnInitialized = onDialogInitialized
