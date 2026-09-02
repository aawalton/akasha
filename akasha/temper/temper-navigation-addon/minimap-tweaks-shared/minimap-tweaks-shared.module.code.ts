import { asMiniMapPanAndZoom } from "../minimap-casts/minimap-casts.module.code.ts"
import { panZoom } from "../minimap-shared/minimap-shared.module.code.ts"

export function zoomDone(this: void): boolean {
  const pz = panZoom()
  return (
    pz.targetNormalizedZoom == null &&
    pz.pendingPanToPinZoomMode == null &&
    !!asMiniMapPanAndZoom(pz).CanInitializeMap()
  )
}

export interface WayshrineCell {
  node: number | undefined
}
