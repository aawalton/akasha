import {
  asGlobalTable,
  asPresent,
  asStrRecord,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { strLensplit } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-copy-text-split/sets-copy-text-split.module.code.ts"
import { frameWindow } from "akasha/temper/window/modules/window-frame/window-frame.module.code.ts"

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

const strlen = string.len

const MAX_CHARACTERS_IN_TEXT_EDITBOX = 20000

const dialogName = `${string.upper(major)}_COPY_TEXT_DIALOG`

const globalTable = asGlobalTable(globalThis)

const DIALOG_CONTROL_NAME = "TemperItemsCraftingSetsCopyTextDialog"

const PAGE_BUTTON_HEIGHT = 32

const ROW_GAP = 12

asStrRecord(lib)["CopyDialog"] = {}

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
  const pageText = messageTable[messageTableId - 1]
  if (pageText !== undefined) {
    const prevButton = copyDialogRef.prevButton
    const nextButton = copyDialogRef.nextButton
    const editBox = copyDialogRef.text
    const prevButtonText = `${tostring(oldIndex)} / ${numPages}`
    const nextButtonText = `${tostring(messageTableId)} / ${numPages}`
    prevButton.SetText(`${GetString(SI_LORE_READER_PREVIOUS_PAGE)} ( ${prevButtonText} )`)
    nextButton.SetText(`${GetString(SI_LORE_READER_NEXT_PAGE)} ( ${nextButtonText} )`)
    editBox.SetText(pageText)
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
  _control: SetsCopyDialogControl,
  dialog: unknown,
  data: SetsCopyDialogData | undefined
): undefined {
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

function frameCopyDialog(this: void): undefined {
  const window = WINDOW_MANAGER.GetControlByName<TopLevelWindow>(DIALOG_CONTROL_NAME)
  if (window === undefined) return undefined
  const { body } = frameWindow(window, "", () => {
    lib.CopyDialog.Hide()
    return undefined
  })
  const next = window.GetNamedChild("Next")
  next?.ClearAnchors()
  next?.SetAnchor(BOTTOMRIGHT, body, BOTTOMRIGHT, 0, 0)
  const note = window.GetNamedChild("Note")
  note?.ClearAnchors()
  note?.SetAnchor(TOPLEFT, body, TOPLEFT, 0, 0)
  note?.SetAnchor(BOTTOMRIGHT, body, BOTTOMRIGHT, 0, -(PAGE_BUTTON_HEIGHT + ROW_GAP))
  return undefined
}

function createCopyTextDialog(this: void, control: SetsCopyDialogControl): SetsCopyDialog {
  frameCopyDialog()
  const self: SetsCopyDialog = {
    control,
    dialogName,
    title: control.GetNamedChild("FrameTitle"),
    text: control.GetNamedChild("NoteEdit"),
    prevButton: control.GetNamedChild("Prev"),
    nextButton: control.GetNamedChild("Next"),
    IsShown: isShown,
    OnShow: onShow,
    Show: show,
    OnHide: onHide,
    Hide: hide,
    PreviousPage: previousPage,
    NextPage: nextPage,
    UpdateEditAndButtons: updateEditAndButtonsMethod,
    SetupDialog: setupDialogMethod,
  }
  control._object = self

  return self
}

function isShown(this: SetsCopyDialog): boolean {
  return !this.control.IsHidden()
}

function onShow(this: SetsCopyDialog): undefined {
  updateEditAndButtons(this)
}

function show(this: SetsCopyDialog, dialogData?: SetsCopyDialogData): undefined {
  if (this.IsShown()) {
    return
  }
  const setData = dialogData?.setData
  const setName = setData?.nameClean ?? setData?.name
  this.title.SetText(setName === undefined ? "Copy set" : `Copy set '${setName}'`)
  setupDialog(this, this.control, true, dialogData)
  this.control.SetHidden(false)
  this.OnShow()
}

function onHide(this: SetsCopyDialog): undefined {
  this.text.SetText("")
  this.textContent = undefined
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
