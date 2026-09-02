import "../map-pins-global/map-pins-global.module.code.ts"

import { onLoad } from "../map-pins-on-load/map-pins-on-load.module.code.ts"

export function initMapPins(this: void): undefined {
  onLoad()
  return undefined
}
