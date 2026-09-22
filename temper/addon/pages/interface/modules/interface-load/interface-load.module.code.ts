import { initPersonalAssistant } from "akasha/temper/addon/pages/interface/modules/assistant-entry/assistant-entry.module.code.ts"
import { initFcoChangeStuff } from "akasha/temper/addon/pages/interface/modules/fco-entry/fco-entry.module.code.ts"
import { initNoThankYou } from "akasha/temper/addon/pages/interface/modules/quiet-entry/quiet-entry.module.code.ts"
import { initShifterBox } from "akasha/temper/addon/pages/interface/modules/shifter-public-api/shifter-public-api.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initShifterBox()
  initNoThankYou()
  initPersonalAssistant()
  initFcoChangeStuff()
  return undefined
}
