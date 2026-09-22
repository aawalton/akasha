import "akasha/temper/addon/pages/world/modules/map-pins-global/map-pins-global.module.code.ts"

import { onLoad } from "akasha/temper/addon/pages/world/modules/map-pins-on-load/map-pins-on-load.module.code.ts"

export function initMapPins(this: void): undefined {
  onLoad()
  return undefined
}
