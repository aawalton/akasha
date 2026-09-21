import { initPtf } from "akasha/temper/addon/housing-addon/modules/housing-init/housing-init.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initPtf()
  return undefined
}
