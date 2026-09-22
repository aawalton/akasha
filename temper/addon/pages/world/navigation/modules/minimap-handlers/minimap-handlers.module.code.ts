import {
  asAnyAsyncTask,
  asAnyTable,
  asAnyTableMember,
  asMiniMapCallbackManager,
  asMiniMapControl,
  asMiniMapScene,
  asNumber,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-casts/minimap-casts.module.code.ts"
import { installFocusZoom } from "akasha/temper/addon/pages/world/navigation/modules/minimap-focus-zoom/minimap-focus-zoom.module.code.ts"
import {
  holder,
  type TemperMiniMap,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-holder/minimap-holder.module.code.ts"
import { MINIMAP_MAP_MODE } from "akasha/temper/addon/pages/world/navigation/modules/minimap-names/minimap-names.module.code.ts"
import { noOp } from "akasha/temper/addon/pages/world/navigation/modules/minimap-shared/minimap-shared.module.code.ts"
import {
  clearMouseoverText,
  newUpdateSize,
  STATE,
  saveMapPosition,
  setMapTitle,
  setMapTitleCurrentLocation,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-state/minimap-state.module.code.ts"
import { EXPORTED_UPDATE_MAP } from "akasha/temper/addon/pages/world/navigation/modules/minimap-update/minimap-update.module.code.ts"
import type { LooseTable } from "akasha/temper/addon/pages/world/navigation/modules/minimap-view-types/minimap-view-types.module.code.ts"
import "akasha/temper/addon/type/temper-async-global/temper-async-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-alchemy-station/eso-alchemy-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-15/eso-enums-15.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-3/eso-interface-extra-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra/eso-interface-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-ui/eso-lib-sets-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-pins/eso-world-map-pins.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-window/eso-world-map-window.type-declaration.d.ts"

const em = EVENT_MANAGER
const async = TemperAsync

export function installHandlers(this: void, self: TemperMiniMap): undefined {
  function zoneChanged(
    this: void,
    _event: unknown,
    zoneName: string,
    subZoneName: string
  ): undefined {
    if (!WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE)) {
      return
    }
    ZO_WorldMapTitle.SetText(setMapTitle(zoneName, subZoneName))
  }
  em.RegisterForEvent(self.name, EVENT_ZONE_CHANGED, zoneChanged)

  const orgZoWorldMapGetMapTitle = ZO_WorldMap_GetMapTitle
  ZO_WorldMap_GetMapTitle = function (this: void, ...args: unknown[]): unknown {
    if (WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE) && DoesCurrentMapMatchMapForPlayerLocation()) {
      return setMapTitleCurrentLocation()
    }
    return orgZoWorldMapGetMapTitle(...args)
  }

  {
    const headerInfo: LooseTable = asAnyTable({
      nameText: "",
      descriptionText: "",
      owner: self.name,
      showProgressBar: false,
    })
    holder.SetMapHeader = function (this: TemperMiniMap): undefined {
      if (WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE)) {
        WORLD_MAP_MANAGER.SetMapHeader(headerInfo)
      }
    }
    const orgTryShowSpectacleMapHeader = asAnyTable(ZO_WorldMapManager).TryShowSpectacleMapHeader
    function newTryShowSpectacleMapHeader(this: void, manager: WorldMapManager): unknown {
      if (asNumber(manager.GetMode()) === MINIMAP_MAP_MODE) {
        return undefined
      } else {
        return orgTryShowSpectacleMapHeader(manager)
      }
    }
    asAnyTable(ZO_WorldMapManager).TryShowSpectacleMapHeader = asAnyTableMember(
      newTryShowSpectacleMapHeader
    )
  }

  {
    function doIt(
      this: void,
      orgZoWorldMapUpdateMap: (this: void, ...a: unknown[]) => unknown,
      skipWorldMapUpdate?: boolean
    ): undefined {
      asMiniMapCallbackManager(CALLBACK_MANAGER).UnregisterCallback(
        "OnWorldMapModeChanged",
        doIt,
        orgZoWorldMapUpdateMap
      )
      if (WORLD_MAP_MANAGER.inSpecialMode) {
        ZO_WorldMap_UpdateMap = noOp
        EndInteraction(INTERACTION_FAST_TRAVEL_KEEP)
        EndInteraction(INTERACTION_FAST_TRAVEL)
      }

      asAnyTable(ZO_MapPin).UpdateSize = asAnyTableMember(newUpdateSize)
      ZO_WorldMap_UpdateMap =
        skipWorldMapUpdate != null && skipWorldMapUpdate !== false ? noOp : orgZoWorldMapUpdateMap
      WORLD_MAP_MANAGER.SetToMode(MINIMAP_MAP_MODE)
      ZO_WorldMap_ClearCustomZoomLevels()
      ZO_WorldMap_UpdateMap = orgZoWorldMapUpdateMap

      asMiniMapControl(self.background).SetHidden(false)

      asMiniMapControl(ZO_WorldMap).StopMovingOrResizing()
      asAnyTableMember(ZO_WorldMap_MouseUp)()
      STATE.moveToPlayer = ZO_WorldMap_JumpToPlayer
      self.RestorePosition()
      self.UpdateBorder()
      clearMouseoverText()
      STATE.lastZoom = -1
      self.SetMapHeader()
    }
    holder.GoMiniMapMode = function (this: TemperMiniMap, skipWorldMapUpdate?: boolean): undefined {
      const orgZoWorldMapUpdateMap = ZO_WorldMap_UpdateMap

      const mode = asNumber(WORLD_MAP_MANAGER.GetMode())
      if (mode !== MINIMAP_MAP_MODE) {
        if (WORLD_MAP_MANAGER.inSpecialMode) {
          if (mode !== MAP_MODE_KEEP_TRAVEL && mode !== MAP_MODE_FAST_TRAVEL) {
            clearMouseoverText()

            ZO_WorldMap_UpdateMap = noOp
            WORLD_MAP_MANAGER.SetToMode(MINIMAP_MAP_MODE)
            ZO_WorldMap_UpdateMap = orgZoWorldMapUpdateMap

            asMiniMapControl(self.background).SetHidden(false)

            this.RestorePosition()
            this.UpdateBorder()
          } else {
            asMiniMapCallbackManager(CALLBACK_MANAGER).RegisterCallback(
              "OnWorldMapModeChanged",
              doIt,
              orgZoWorldMapUpdateMap,
              skipWorldMapUpdate
            )
            EndInteraction(INTERACTION_FAST_TRAVEL_KEEP)
            EndInteraction(INTERACTION_FAST_TRAVEL)
          }
        } else {
          doIt(orgZoWorldMapUpdateMap, skipWorldMapUpdate)
        }
      } else {
        setMapTitleCurrentLocation()
      }
      WORLD_MAP_MANAGER.UpdateFloorAndLevelNavigation()

      this.StartFollowPlayer()
    }
  }

  {
    const orgZoWorldMapOnResizeStop = ZO_WorldMap_OnResizeStop
    ZO_WorldMap_OnResizeStop = function (this: void, ...args: unknown[]): undefined {
      orgZoWorldMapOnResizeStop(...args)
      if (WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE)) {
        saveMapPosition()
      }
    }
  }

  {
    const orgZoWorldMapTitleBarOnMouseUp = ZO_WorldMapTitleBar_OnMouseUp
    ZO_WorldMapTitleBar_OnMouseUp = function (this: void, ...args: unknown[]): undefined {
      orgZoWorldMapTitleBarOnMouseUp(...args)
      saveMapPosition()
      {
        const [cw, ch] = ZO_WorldMapContainer.GetDimensions()
        ZO_WorldMapContainer.SetDimensions(cw, ch)
      }
      {
        const [sw, sh] = ZO_WorldMapScroll.GetDimensions()
        ZO_WorldMapScroll.SetDimensions(sw, sh)
      }
      EXPORTED_UPDATE_MAP.fn(true)
    }
  }

  {
    function worldMapStateChanged(this: void, _oldState: unknown, newState: unknown): undefined {
      if (newState === SCENE_FRAGMENT_SHOWING) {
        self.GoWorldMapMode()
      } else if (newState === SCENE_FRAGMENT_SHOWN) {
        asAnyTable(WORLD_MAP_FRAGMENT).duration = asAnyTableMember(100)
      } else if (newState === SCENE_FRAGMENT_HIDING) {
        self.GoMiniMapMode(asNumber(WORLD_MAP_MANAGER.GetMode()) <= MAP_MODE_LARGE_CUSTOM)
      } else if (newState === SCENE_FRAGMENT_HIDDEN) {
        asAnyTable(WORLD_MAP_FRAGMENT).duration = asAnyTableMember(0)
      }
    }
    asMiniMapScene(WORLD_MAP_SCENE).RegisterCallback("StateChange", worldMapStateChanged)
    asMiniMapScene(GAMEPAD_WORLD_MAP_SCENE).RegisterCallback("StateChange", worldMapStateChanged)
    asMiniMapScene(SCRYING_SCENE).RegisterCallback("StateChange", worldMapStateChanged)
  }

  {
    function siegeStateChanged(this: void, _oldState: unknown, newState: unknown): undefined {
      if (newState === SCENE_FRAGMENT_SHOWING) {
        self.GoMiniMapMode(asNumber(WORLD_MAP_MANAGER.GetMode()) <= MAP_MODE_LARGE_CUSTOM)
      }
    }
    asMiniMapScene(SIEGE_BAR_SCENE).RegisterCallback("StateChange", siegeStateChanged)
  }

  {
    function worldFragmentStateChanged(
      this: void,
      _oldState: unknown,
      newState: unknown
    ): undefined {
      if (newState === SCENE_FRAGMENT_SHOWING) {
        if (self.account.showClock) {
          em.RegisterForUpdate("TEMPER_MAP_CLOCK", 5000, holder.ShowClock)
          holder.ShowClock()
        }
        self.SetMapHeader()
      } else if (newState === SCENE_FRAGMENT_HIDING) {
        em.UnregisterForUpdate("TEMPER_MAP_CLOCK")
      }
      const hidden = !self.account.showClock
      asMiniMapControl(self.clockRealTime).SetHidden(hidden)
      asMiniMapControl(self.clockInGame).SetHidden(hidden)
    }
    asMiniMapScene(WORLD_MAP_FRAGMENT).RegisterCallback("StateChange", worldFragmentStateChanged)
  }

  {
    const orgRefreshMapFrameAnchor = asAnyTable(ZO_WorldMapManager).RefreshMapFrameAnchor
    function newRefreshMapFrameAnchor(
      this: void,
      manager: WorldMapManager,
      ...args: unknown[]
    ): unknown {
      if (manager.IsInMode(MINIMAP_MAP_MODE)) {
        self.RestorePosition()
        return undefined
      }
      return orgRefreshMapFrameAnchor(manager, ...args)
    }
    asAnyTable(ZO_WorldMapManager).RefreshMapFrameAnchor =
      asAnyTableMember(newRefreshMapFrameAnchor)
  }

  {
    const orgZoWorldMapPushSpecialMode = asAnyTable(ZO_WorldMapManager).PushSpecialMode
    function newPushSpecialMode(
      this: void,
      manager: LooseTable,
      mode: number,
      ...args: unknown[]
    ): unknown {
      if (manager.inSpecialMode) {
        return orgZoWorldMapPushSpecialMode(manager, mode, ...args)
      }
      const zoomOut = mode === MAP_MODE_FAST_TRAVEL || mode === MAP_MODE_KEEP_TRAVEL
      const orgZoWorldMapUpdateMap = ZO_WorldMap_UpdateMap
      if (WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE)) {
        ZO_WorldMap_UpdateMap = noOp
        self.GoWorldMapMode(zoomOut)
      }
      if (zoomOut && GetMapType() === MAPTYPE_SUBZONE) {
        asAnyAsyncTask(STATE.asyncCallbacks).Cancel()
        MapZoomOut()

        ZO_WorldMap_UpdateMap = noOp
        orgZoWorldMapPushSpecialMode(manager, mode, ...args)

        ZO_WorldMap_UpdateMap = orgZoWorldMapUpdateMap
        CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged", true)
        return undefined
      }
      ZO_WorldMap_UpdateMap = orgZoWorldMapUpdateMap
      return orgZoWorldMapPushSpecialMode(manager, mode, ...args)
    }
    asAnyTable(ZO_WorldMapManager).PushSpecialMode = asAnyTableMember(newPushSpecialMode)
  }

  {
    const orgZoWorldMapShowWorldMap = ZO_WorldMap_ShowWorldMap
    ZO_WorldMap_ShowWorldMap = function (this: void): undefined {
      if (WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE)) {
        self.GoWorldMapMode()
      }
      if (orgZoWorldMapShowWorldMap !== undefined) {
        orgZoWorldMapShowWorldMap()
      }
    }
  }

  {
    function questTrackerRefreshedMapPins(this: void): undefined {
      if (!ZO_WorldMap_IsWorldMapShowing() && !DoesCurrentMapMatchMapForPlayerLocation()) {
        if (SetMapToPlayerLocation() === SET_MAP_RESULT_MAP_CHANGED) {
          CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged")
        }
      }
    }
    asMiniMapScene(FOCUSED_QUEST_TRACKER).RegisterCallback(
      "QuestTrackerRefreshedMapPins",
      questTrackerRefreshedMapPins
    )
  }

  {
    const handlers = ZO_AlertText_GetHandlers()
    const orgZoneChange = handlers[EVENT_ZONE_CHANGED]
    function newZoneChangeHandler(this: void, ...args: unknown[]): unknown {
      const mode = self.account.zoneAlertMode
      if (mode === self.zoneAlertMode.Never) {
        return undefined
      }
      if (
        mode === self.zoneAlertMode.MiniMapHidden &&
        asMiniMapScene(WORLD_MAP_FRAGMENT).IsShowing()
      ) {
        return undefined
      }
      return orgZoneChange?.(...args)
    }
    handlers[EVENT_ZONE_CHANGED] = asAnyTableMember(newZoneChangeHandler)
  }

  installFocusZoom(self)

  {
    function refreshFragment(this: void): undefined {
      asMiniMapScene(WORLD_MAP_FRAGMENT).Refresh()
    }
    function mountedStateChanged(this: void, _event: unknown, mounted: boolean): undefined {
      self.isMounted = mounted
      async.Call(refreshFragment)
    }
    em.RegisterForEvent(self.name, EVENT_MOUNTED_STATE_CHANGED, mountedStateChanged)
  }
}
