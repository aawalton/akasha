import { initLeads } from "../leads-init/leads-init.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initLeads()
  return undefined
}
