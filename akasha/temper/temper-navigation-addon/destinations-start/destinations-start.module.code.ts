import "../destinations-global/destinations-global.module.code.ts"

import { initializeDestinations } from "../destinations-pins-initialize/destinations-pins-initialize.module.code.ts"

export function initDestinations(this: void): undefined {
  initializeDestinations()
  return undefined
}
