import { initPtf } from "akasha/temper/addon/pages/housing/modules/housing-init/housing-init.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initPtf()
  return undefined
}
