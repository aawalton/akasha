import { initDestinations } from "akasha/temper/addon/pages/world/navigation/modules/destinations-start/destinations-start.module.code.ts"
import { initMapPins } from "akasha/temper/addon/pages/world/navigation/modules/map-pins-start/map-pins-start.module.code.ts"
import { initVotansMiniMap } from "akasha/temper/addon/pages/world/navigation/modules/minimap-start/minimap-start.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initMapPins()
  initDestinations()
  initVotansMiniMap()
  return undefined
}
