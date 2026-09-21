import { initPersonalAssistant } from "akasha/temper/addon/pages/interface/modules/assistant-entry/assistant-entry.module.code.ts"
import { initFcoChangeStuff } from "akasha/temper/addon/pages/interface/modules/fco-entry/fco-entry.module.code.ts"
import { initNoThankYou } from "akasha/temper/addon/pages/interface/modules/quiet-entry/quiet-entry.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initNoThankYou()
  initPersonalAssistant()
  initFcoChangeStuff()
  return undefined
}
