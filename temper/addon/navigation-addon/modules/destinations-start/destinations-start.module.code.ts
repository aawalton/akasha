import "akasha/temper/addon/navigation-addon/modules/destinations-global/destinations-global.module.code.ts"

import { initializeDestinations } from "akasha/temper/addon/navigation-addon/modules/destinations-pins-initialize/destinations-pins-initialize.module.code.ts"

export function initDestinations(this: void): undefined {
  initializeDestinations()
  return undefined
}
