import { initPersonalAssistant } from "akasha/temper/addon/interface-addon/modules/assistant-entry/assistant-entry.module.code.ts"
import { initFcoChangeStuff } from "akasha/temper/addon/interface-addon/modules/fco-entry/fco-entry.module.code.ts"
import { initNoThankYou } from "akasha/temper/addon/interface-addon/modules/quiet-entry/quiet-entry.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initNoThankYou()
  initPersonalAssistant()
  initFcoChangeStuff()
  return undefined
}
