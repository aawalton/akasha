import { getInventoryConfig } from "akasha/temper/addon/pages/items/modules/inventory-config/inventory-config.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const CONFIRM_DIALOG_NAME = "TEMPERITEMS_CONFIRM_DESTRUCTIVE"

export function shouldConfirmAction(action: string): boolean {
  const confirmActions = getInventoryConfig().safety?.confirmActions
  if (!confirmActions) return true
  return confirmActions.indexOf(action) !== -1
}

export function registerConfirmDialog(): undefined {
  ZO_Dialogs_RegisterCustomDialog(CONFIRM_DIALOG_NAME, {
    title: { text: "Temper Inventory" },
    mainText: {
      text: (dialog: ZO_DialogData): string => {
        const message = dialog.data.message
        return typeof message === "string" ? message : "Proceed?"
      },
    },
    buttons: [
      {
        text: "Proceed",
        keybind: "DIALOG_PRIMARY",
        callback: (dialog: ZO_DialogData): undefined => {
          const onConfirm = dialog.data.onConfirm
          if (typeof onConfirm === "function") onConfirm()
        },
      },
      {
        text: "Cancel",
        keybind: "DIALOG_NEGATIVE",
      },
    ],
  })
}

export function showConfirmDialog(message: string, onConfirm: () => void): undefined {
  ZO_Dialogs_ShowDialog(CONFIRM_DIALOG_NAME, { message, onConfirm })

  const textControl = WINDOW_MANAGER.GetControlByName("ZO_Dialog1Text")
  if (textControl && isLabelControl(textControl)) {
    textControl.SetLinkEnabled(true)
    textControl.SetMouseEnabled(true)
    textControl.SetHandler("OnLinkMouseUp", onLinkMouseUpHandler)
  }
}

function isLabelControl(control: Control): control is LabelControl {
  return "SetLinkEnabled" in control
}

function onLinkMouseUpHandler(...args: unknown[]): undefined {
  const owner = args[0]
  const linkText = args[2]
  const button = args[3]
  if (typeof linkText !== "string") return
  if (typeof button !== "number") return
  if (!isControl(owner)) return
  ZO_LinkHandler_OnLinkMouseUp(linkText, button, owner)
}

function isControl(value: unknown): value is Control {
  if (typeof value !== "object" || value === null) return false
  if (!("SetHandler" in value)) return false
  const candidate: { SetHandler: unknown } = value
  return typeof candidate.SetHandler === "function"
}

export function isConfirmDialogShowing(): boolean {
  return ZO_Dialogs_IsShowing(CONFIRM_DIALOG_NAME)
}

export function releaseConfirmDialog(): undefined {
  if (ZO_Dialogs_IsShowing(CONFIRM_DIALOG_NAME)) {
    ZO_Dialogs_ReleaseDialog(CONFIRM_DIALOG_NAME)
  }
}
