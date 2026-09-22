import { STATE } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/fco-state/fco-state.module.code.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"

interface TradingHouseCancelListing {
  cancelListingDialog: {
    listingIndex: number | undefined
  }
}

function asTradingHouseCancelListing(this: void, value: unknown): TradingHouseCancelListing {
  return value as TradingHouseCancelListing
}

let DIALOG_ON_SHOW_HOOKED = false

function loadDialogOnShowHook(this: void): undefined {
  if (!DIALOG_ON_SHOW_HOOKED) {
    ZO_PreHook("ZO_Dialogs_ShowDialog", (dialogName: unknown) => {
      if (dialogName !== undefined) {
        const suppressDialog = STATE.settingsVars.settings.suppressDialog
        if (
          dialogName === "CONFIRM_TRADING_HOUSE_CANCEL_LISTING" &&
          suppressDialog[dialogName] === true
        ) {
          const tradingHouse = asTradingHouseCancelListing(TRADING_HOUSE)
          const listIndex = tradingHouse.cancelListingDialog.listingIndex
          if (listIndex !== undefined) {
            CancelTradingHouseListing(listIndex)
            tradingHouse.cancelListingDialog.listingIndex = undefined
            return true
          }
        }
      }
      return undefined
    })
    DIALOG_ON_SHOW_HOOKED = true
  }
}

export function dialogsChanges(this: void): undefined {
  loadDialogOnShowHook()
}
