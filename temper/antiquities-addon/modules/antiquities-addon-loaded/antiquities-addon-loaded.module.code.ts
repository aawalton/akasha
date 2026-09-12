import { initLeads } from "akasha/temper/antiquities-addon/modules/leads-init/leads-init.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initLeads()
  return undefined
}
