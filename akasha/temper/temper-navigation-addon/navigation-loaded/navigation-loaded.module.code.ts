import { initDestinations } from "../destinations-start/destinations-start.module.code.ts"
import { initMapPins } from "../map-pins-start/map-pins-start.module.code.ts"
import { initVotansMiniMap } from "../minimap-start/minimap-start.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initMapPins()
  initDestinations()
  initVotansMiniMap()
  return undefined
}
