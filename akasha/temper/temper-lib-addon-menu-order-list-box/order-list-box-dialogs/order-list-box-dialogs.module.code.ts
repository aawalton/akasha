import {
  asEsoHandler,
  asOrderButtonControl,
} from "../order-list-box-casts/order-list-box-casts.module.code.ts"
import {
  ORDER_LIST_BOX_ADD_NEW_ENTRY_BUTTON_SUFFIX,
  ORDER_LIST_BOX_ADD_NEW_ENTRY_DIALOG_SUFFIX,
  ORDER_LIST_BOX_ASK_BEFORE_REMOVE_ENTRY_DIALOG_SUFFIX,
  ORDER_LIST_BOX_REMOVE_ENTRY_BUTTON_SUFFIX,
  translation,
} from "../order-list-box-constants/order-list-box-constants.module.code.ts"
import {
  getDefaultValue,
  getStringFromValue,
  wm,
} from "../order-list-box-state/order-list-box-state.module.code.ts"

export function setupAddEntryDialog(
  this: void,
  orderListBox: OrderListBox,
  control: LamControl,
  controlName: string,
  orderListBoxData: OrderListBoxData
): undefined {
  const addEntryStr =
    translation.ADD_ENTRY !== undefined ? getStringFromValue(translation.ADD_ENTRY) : undefined
  const addEntryDescStr =
    translation.ADD_ENTRY_DESC !== undefined
      ? getStringFromValue(translation.ADD_ENTRY_DESC)
      : undefined

  const addEntryDialogData =
    orderListBoxData.addEntryDialog !== undefined
      ? getDefaultValue(orderListBoxData.addEntryDialog)
      : undefined
  if (addEntryDialogData === undefined) {
    return
  }

  const title =
    (addEntryDialogData.title !== undefined
      ? getDefaultValue(addEntryDialogData.title)
      : undefined) ?? addEntryStr
  const text =
    (addEntryDialogData.text !== undefined
      ? getDefaultValue(addEntryDialogData.text)
      : undefined) ?? addEntryDescStr
  const textType =
    (addEntryDialogData.textType !== undefined
      ? getDefaultValue(addEntryDialogData.textType)
      : undefined) ?? TEXT_TYPE_ALL
  const specialCharacters =
    addEntryDialogData.specialCharacters !== undefined
      ? getDefaultValue(addEntryDialogData.specialCharacters)
      : undefined
  const maxInputCharacters =
    addEntryDialogData.maxInputCharacters !== undefined
      ? getDefaultValue(addEntryDialogData.maxInputCharacters)
      : undefined
  const validateFunction = addEntryDialogData.validator
  const validatesText = typeof validateFunction === "function"
  const defaultText =
    addEntryDialogData.defaultText !== undefined
      ? getDefaultValue(addEntryDialogData.defaultText)
      : undefined
  const instructions =
    addEntryDialogData.instructions !== undefined
      ? getDefaultValue(addEntryDialogData.instructions)
      : undefined
  const selectAll =
    addEntryDialogData.selectAll !== undefined
      ? getDefaultValue(addEntryDialogData.selectAll)
      : undefined

  const addNewEntryDialogName = controlName + ORDER_LIST_BOX_ADD_NEW_ENTRY_DIALOG_SUFFIX
  control.addNewEntryDialogName = addNewEntryDialogName
  if (ZO_Dialogs_IsDialogRegistered(addNewEntryDialogName)) {
    return
  }

  ZO_Dialogs_RegisterCustomDialog(addNewEntryDialogName, {
    gamepadInfo: { dialogType: GAMEPAD_DIALOGS.BASIC },
    title: { text: title },
    mainText: { text: text },
    editBox: {
      textType,
      specialCharacters,
      maxInputCharacters,
      defaultText,
      instructions,
      selectAll,
      validatesText,
      validator: validateFunction,
    },
    buttons: [
      {
        text: SI_DIALOG_ACCEPT,
        callback: (dialog: Control): undefined => {
          const editControl = dialog.GetNamedChild<LamDialogEditBoxControl>("EditBox")
          if (editControl !== undefined) {
            orderListBox.AddNewEntryFromDialog(editControl.GetText(), validateFunction)
          }
        },
      },
      { text: SI_DIALOG_EXIT },
    ],
  })

  const addNewEntryButton = asOrderButtonControl(
    wm.CreateControl(controlName + ORDER_LIST_BOX_ADD_NEW_ENTRY_BUTTON_SUFFIX, control, CT_BUTTON)
  )
  addNewEntryButton.SetDimensions(24, 24)

  const addNewValueButtonTexture =
    addEntryDialogData.buttonTexture !== undefined
      ? getDefaultValue(addEntryDialogData.buttonTexture)
      : undefined
  const useDefaultButton = addNewValueButtonTexture === undefined || addNewValueButtonTexture === ""
  if (useDefaultButton) {
    addNewEntryButton.SetNormalTexture("/esoui/art/buttons/plus_up.dds")
    addNewEntryButton.SetPressedTexture("/esoui/art/buttons/plus_down.dds")
    addNewEntryButton.SetMouseOverTexture("/esoui/art/buttons/plus_over.dds")
    addNewEntryButton.SetDisabledTexture("/esoui/art/buttons/plus_disabled.dds")
  } else {
    addNewEntryButton.SetNormalTexture(addNewValueButtonTexture)
    addNewEntryButton.SetPressedOffset(2, 2)
  }
  addNewEntryButton.SetMouseEnabled(true)
  addNewEntryButton.SetHidden(false)
  if (control.isHalfWidth === true) {
    addNewEntryButton.SetAnchor(TOPRIGHT, control, TOPRIGHT, -24, 0)
  } else {
    addNewEntryButton.SetAnchor(TOP, control, TOP, 0, 0)
  }
  addNewEntryButton.SetClickSound("Click")
  addNewEntryButton.data = { tooltipText: title }
  addNewEntryButton.SetHandler("OnMouseEnter", asEsoHandler(ZO_Options_OnMouseEnter))
  addNewEntryButton.SetHandler("OnMouseExit", asEsoHandler(ZO_Options_OnMouseExit))
  addNewEntryButton.SetHandler("OnClicked", (): undefined => {
    orderListBox.ShowAddNewEntryDialog(addNewEntryDialogName)
  })
  control.AddNewEntryButton = addNewEntryButton
}

export function setupRemoveEntryButton(
  this: void,
  orderListBox: OrderListBox,
  control: LamControl,
  controlName: string,
  orderListBoxData: OrderListBoxData
): undefined {
  const askBeforeRemoveEntryDialogName =
    controlName + ORDER_LIST_BOX_ASK_BEFORE_REMOVE_ENTRY_DIALOG_SUFFIX
  const showRemoveButton =
    orderListBoxData.showRemoveEntryButton !== undefined
      ? getDefaultValue(orderListBoxData.showRemoveEntryButton)
      : undefined
  if (showRemoveButton !== true) {
    return
  }

  const removeEntryStr =
    translation.REMOVE_ENTRY !== undefined
      ? getStringFromValue(translation.REMOVE_ENTRY)
      : undefined
  const removeEntryDescStr =
    translation.REMOVE_ENTRY_DESC !== undefined
      ? getStringFromValue(translation.REMOVE_ENTRY_DESC)
      : undefined

  const askBeforeRemoveEntry =
    orderListBoxData.askBeforeRemoveEntry !== undefined
      ? getDefaultValue(orderListBoxData.askBeforeRemoveEntry)
      : undefined
  if (askBeforeRemoveEntry === true) {
    control.askBeforeRemoveEntryDialogName = askBeforeRemoveEntryDialogName
    if (!ZO_Dialogs_IsDialogRegistered(askBeforeRemoveEntryDialogName)) {
      ZO_Dialogs_RegisterCustomDialog(askBeforeRemoveEntryDialogName, {
        gamepadInfo: { dialogType: GAMEPAD_DIALOGS.BASIC },
        title: { text: removeEntryStr },
        mainText: { text: removeEntryDescStr },
        buttons: [
          {
            text: SI_DIALOG_ACCEPT,
            callback: (): undefined => {
              orderListBox.RemoveSelectedEntry()
            },
          },
          { text: SI_DIALOG_EXIT },
        ],
      })
    }
  }

  const removeEntryButton = asOrderButtonControl(
    wm.CreateControl(controlName + ORDER_LIST_BOX_REMOVE_ENTRY_BUTTON_SUFFIX, control, CT_BUTTON)
  )
  removeEntryButton.SetDimensions(24, 24)
  removeEntryButton.SetNormalTexture("/esoui/art/buttons/minus_up.dds")
  removeEntryButton.SetPressedTexture("/esoui/art/buttons/minus_down.dds")
  removeEntryButton.SetMouseOverTexture("/esoui/art/buttons/minus_over.dds")
  removeEntryButton.SetDisabledTexture("/esoui/art/buttons/minus_disabled.dds")
  removeEntryButton.SetMouseEnabled(false)
  removeEntryButton.SetHidden(false)
  if (control.AddNewEntryButton !== undefined) {
    removeEntryButton.SetAnchor(LEFT, control.AddNewEntryButton, RIGHT, 0, 0)
  } else if (control.isHalfWidth === true) {
    removeEntryButton.SetAnchor(TOPRIGHT, control, TOPRIGHT, -24, 0)
  } else {
    removeEntryButton.SetAnchor(TOP, control, TOP, 0, 0)
  }
  removeEntryButton.SetClickSound("Click")
  removeEntryButton.data = { tooltipText: removeEntryStr }
  removeEntryButton.SetHandler("OnMouseEnter", asEsoHandler(ZO_Options_OnMouseEnter))
  removeEntryButton.SetHandler("OnMouseExit", asEsoHandler(ZO_Options_OnMouseExit))
  removeEntryButton.SetHandler("OnClicked", (): undefined => {
    if (askBeforeRemoveEntry === true) {
      orderListBox.ShowAskBeforeRemoveEntryDialog(askBeforeRemoveEntryDialogName)
    } else {
      orderListBox.RemoveSelectedEntry()
    }
  })
  control.RemoveEntryButton = removeEntryButton
}
