import {
  asAnyTable,
  asFocusZoomSlot,
  asMiniMapPanAndZoom,
  asNumber,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-casts/minimap-casts.module.code.ts"
import type { TemperMiniMap } from "akasha/temper/addon/pages/world/navigation/modules/minimap-holder/minimap-holder.module.code.ts"
import { MINIMAP_MAP_MODE } from "akasha/temper/addon/pages/world/navigation/modules/minimap-names/minimap-names.module.code.ts"
import type { LooseTable } from "akasha/temper/addon/pages/world/navigation/modules/minimap-view-types/minimap-view-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-window/eso-world-map-window.type-declaration.d.ts"

export function installFocusZoom(this: void, self: TemperMiniMap): undefined {
  const zoMapPanAndZoom = asAnyTable(asAnyTable(getmetatable(ZO_WorldMap_GetPanAndZoom())).__index)
  function isNormalizedPointInsideMapBounds(this: void, x: number, y: number): boolean {
    return x > 0 && x < 1 && y > 0 && y < 1
  }
  function focusZoomAndOffset(
    this: void,
    panZoomArg: LooseTable,
    normalizedXArg: number | undefined,
    normalizedYArg: number | undefined
  ): LuaMultiReturn<[number, number, number]> | undefined {
    let normalizedX = normalizedXArg
    let normalizedY = normalizedYArg
    const mapId = GetMapTileTexture()
    const fixed = self.account.fixedMaps[mapId]
    if (fixed != null) {
      ;[normalizedX, normalizedY] = unpack(fixed)
    }

    if (
      normalizedX != null &&
      normalizedY != null &&
      isNormalizedPointInsideMapBounds(normalizedX, normalizedY)
    ) {
      const targetNormalizedZoom = 1
      const curvedTargetZoom = asNumber(
        asMiniMapPanAndZoom(panZoomArg).ComputeCurvedZoom(targetNormalizedZoom)
      )

      const zoomedNX = normalizedX * curvedTargetZoom
      const zoomedNY = normalizedY * curvedTargetZoom
      const borderSizeN = (curvedTargetZoom - 1) * 0.5
      let offsetNX = 0.5 + borderSizeN - zoomedNX
      let offsetNY = 0.5 + borderSizeN - zoomedNY

      const allowPan: unknown = panZoomArg.allowPanPastMapEdge
      if (allowPan == null || allowPan === false) {
        offsetNX = zo_clamp(offsetNX, -borderSizeN, borderSizeN)
        offsetNY = zo_clamp(offsetNY, -borderSizeN, borderSizeN)
      }

      const [units] = ZO_WorldMapScroll.GetDimensions()
      const offsetX = offsetNX * units
      const offsetY = offsetNY * units

      return $multi(targetNormalizedZoom, offsetX, offsetY)
    }
    return undefined
  }
  const panZoomSlot = asFocusZoomSlot(zoMapPanAndZoom)
  const orgGetNormalizedPositionFocusZoomAndOffset =
    panZoomSlot.GetNormalizedPositionFocusZoomAndOffset
  function newGetNormalizedPositionFocusZoomAndOffset(
    this: void,
    panZoom: LooseTable,
    normalizedX: number,
    normalizedY: number,
    useCurrentZoom?: unknown
  ): LuaMultiReturn<[number, number, number]> | undefined {
    if (asNumber(WORLD_MAP_MANAGER.GetMode()) !== MINIMAP_MAP_MODE) {
      return orgGetNormalizedPositionFocusZoomAndOffset(
        panZoom,
        normalizedX,
        normalizedY,
        useCurrentZoom
      )
    }
    return focusZoomAndOffset(panZoom, normalizedX, normalizedY)
  }
  panZoomSlot.GetNormalizedPositionFocusZoomAndOffset = newGetNormalizedPositionFocusZoomAndOffset
}
