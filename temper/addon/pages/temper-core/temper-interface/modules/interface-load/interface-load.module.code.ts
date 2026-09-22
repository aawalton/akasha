import { initPersonalAssistant } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/assistant-entry/assistant-entry.module.code.ts"
import { initNoThankYou } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-entry/quiet-entry.module.code.ts"
import { initShifterBox } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/shifter-public-api/shifter-public-api.module.code.ts"
import { initFcoChangeStuff } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/tweak-entry/tweak-entry.module.code.ts"

export function initializeInterface(this: void): undefined {
  initShifterBox()
  initNoThankYou()
  initPersonalAssistant()
  initFcoChangeStuff()
  return undefined
}
