import {
  asAnyTable,
  asAnyTableMember,
  asBoolean,
  asMiniMapControl,
  asNumber,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-casts/minimap-casts.module.code.ts"
import {
  holder,
  type VotansMiniMap,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-holder/minimap-holder.module.code.ts"
import { MINIMAP_MAP_MODE } from "akasha/temper/addon/pages/world/navigation/modules/minimap-names/minimap-names.module.code.ts"
import {
  noGamepad,
  noOp,
  panZoom,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-shared/minimap-shared.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/world/navigation/modules/minimap-state/minimap-state.module.code.ts"
import type { LooseTable } from "akasha/temper/addon/pages/world/navigation/modules/minimap-view-types/minimap-view-types.module.code.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-window/eso-world-map-window.type-declaration.d.ts"

holder.GoWorldMapMode = function (this: VotansMiniMap, skipPanToPlayer?: boolean): undefined {
  const glob = asAnyTable(globalThis)
  this.StopFollowPlayer()
  if (WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE)) {
    STATE.lastZoom = -1
    STATE.moveToPlayer = ZO_WorldMap_JumpToPlayer
    asAnyTable(ZO_MapPin).UpdateSize = asAnyTableMember(STATE.orgUpdateSize)

    const orgZoWorldMapUpdateMap = ZO_WorldMap_UpdateMap
    const orgSetMapToPlayerLocation = SetMapToPlayerLocation
    glob.SetMapToPlayerLocation = asAnyTableMember(noOp)
    ZO_WorldMap_UpdateMap = noOp

    ZO_WorldMap_ClearCustomZoomLevels()
    WORLD_MAP_MANAGER.SetToMode(MAP_MODE_LARGE_CUSTOM)

    this.SetCurrentZoom(0)
    CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged", true)
    if (
      this.account.zoomToPlayer &&
      !(skipPanToPlayer != null && skipPanToPlayer !== false) &&
      DoesCurrentMapMatchMapForPlayerLocation()
    ) {
      ZO_WorldMap_JumpToPlayer()
    }

    glob.SetMapToPlayerLocation = asAnyTableMember(orgSetMapToPlayerLocation)
    ZO_WorldMap_UpdateMap = orgZoWorldMapUpdateMap

    asMiniMapControl(this.background).SetHidden(true)
  } else {
    if (WORLD_MAP_MANAGER.IsPreventingMapNavigation()) {
      panZoom().pendingInitializeMap = undefined
    }
  }
  this.UpdateBorder()
  WORLD_MAP_MANAGER.UpdateFloorAndLevelNavigation()
  let cachedMapMode: boolean | undefined
  function updateCachedMapMode(this: void): undefined {
    cachedMapMode = asBoolean(WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE))
  }

  ZO_PreHook(
    WORLD_MAP_MANAGER,
    "SetToMode",
    function (this: void, _manager: unknown, mode: unknown): undefined {
      if (mode === MINIMAP_MAP_MODE) {
        cachedMapMode = true
      } else if (mode !== MINIMAP_MAP_MODE && cachedMapMode === true) {
        cachedMapMode = false
      }
    }
  )

  updateCachedMapMode()

  ZO_PreHook(WORLD_MAP_MANAGER, "TryShowSpectacleMapHeader", function (this: void): boolean {
    if (cachedMapMode === true) {
      WORLD_MAP_MANAGER.ClearMapHeader()
      return true
    }
    return false
  })
}

{
  const tooltipControl = asAnyTable(GAMEPAD_WORLD_MAP_TOOLTIP_FRAGMENT.control)
  const orgGetLeft = tooltipControl.GetLeft
  tooltipControl.GetLeft = asAnyTableMember(function (this: LooseTable): unknown {
    const mode: unknown = WORLD_MAP_MANAGER.GetMode()
    if (mode !== MINIMAP_MAP_MODE) {
      return orgGetLeft(this)
    } else {
      const right = asNumber(asMiniMapControl(GAMEPAD_WORLD_MAP_INFO_FRAGMENT.control).GetRight())
      const padding = 50
      const width = asNumber(holder.account.width ?? asAnyTable(holder.modeData).width ?? 301)
      return width + right + padding
    }
  })
}

{
  const keybindBg = asAnyTable(ZO_KeybindStripGamepadBackgroundTexture)
  const orgGetHeight = keybindBg.GetHeight
  keybindBg.GetHeight = asAnyTableMember(function (this: LooseTable): unknown {
    const mode: unknown = WORLD_MAP_MANAGER.GetMode()
    if (mode !== MINIMAP_MAP_MODE) {
      return orgGetHeight(this)
    } else {
      return -100
    }
  })
}

{
  const ZO_MapPanAndZoom = panZoom()
  const orgZO_MapPanAndZoomUpdate = ZO_MapPanAndZoom.Update
  ZO_MapPanAndZoom.Update = asAnyTableMember(function (this: void, ...args: unknown[]): unknown {
    if (WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE)) {
      return noGamepad(orgZO_MapPanAndZoomUpdate, ...args)
    }
    return orgZO_MapPanAndZoomUpdate(...args)
  })

  const orgZO_MapPanAndZoomSetCurrentZoom = ZO_MapPanAndZoom.SetCurrentNormalizedZoom
  ZO_MapPanAndZoom.SetCurrentNormalizedZoom = asAnyTableMember(function (
    this: void,
    ...args: unknown[]
  ): unknown {
    if (WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE)) {
      return noGamepad(orgZO_MapPanAndZoomSetCurrentZoom, ...args)
    }
    return orgZO_MapPanAndZoomSetCurrentZoom(...args)
  })

  const orgZO_WorldMap_UpdateMap = ZO_WorldMap_UpdateMap
  ZO_WorldMap_UpdateMap = function (this: void, ...args: unknown[]): unknown {
    if (WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE)) {
      return noGamepad(orgZO_WorldMap_UpdateMap, ...args)
    }
    return orgZO_WorldMap_UpdateMap(...args)
  }
}

export function applyModeStyle(this: void): undefined {
  ApplyTemplateToControl(ZO_WorldMapMapFrame, ZO_GetPlatformTemplate("ZO_WorldMapFrame"))
}

ZO_PreHook(WORLD_MAP_MANAGER, "UpdateFloorAndLevelNavigation", function (this: void):
  | boolean
  | undefined {
  if (WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE)) {
    ZO_WorldMapButtonsFloors_Keyboard.SetHidden(true)
    ZO_WorldMapButtonsFloors_Gamepad.SetHidden(true)
    ZO_WorldMapButtonsLevels_Gamepad.SetHidden(true)
    return true
  }
  return undefined
})
