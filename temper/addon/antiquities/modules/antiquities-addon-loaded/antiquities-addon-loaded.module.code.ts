import { initLeads } from "akasha/temper/addon/antiquities/modules/leads-init/leads-init.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initLeads()
  return undefined
}
