import {
  asAnyArray,
  asAnyAsyncTask,
  asAnyTable,
  asAnyTableMember,
  asMiniMapControl,
  asMiniMapPanAndZoom,
  asMiniMapScene,
  asNumber,
} from "../minimap-casts/minimap-casts.module.code.ts"
import { holder, type VotansMiniMap } from "../minimap-holder/minimap-holder.module.code.ts"
import { MINIMAP_MAP_MODE } from "../minimap-names/minimap-names.module.code.ts"
import {
  createAsyncTask,
  getScene,
  noGamepad,
} from "../minimap-shared/minimap-shared.module.code.ts"
import { newUpdateSize, STATE } from "../minimap-state/minimap-state.module.code.ts"
import type {
  AnyAsyncTask,
  LooseTable,
} from "../minimap-view-types/minimap-view-types.module.code.ts"

const em = EVENT_MANAGER

export function adjustZoom(this: void): undefined {
  const self = holder
  const [,] = GetMapPlayerPosition("player")
  const [numTiles] = GetMapNumTiles()
  let tilePixelWidth = 1
  if (ZO_WorldMapContainer1 != null) {
    ;[tilePixelWidth] = ZO_WorldMapContainer1.GetTextureFileDimensions()
  }
  const totalPixels = numTiles * tilePixelWidth
  let [w, h] = ZO_WorldMapScroll.GetDimensions()
  w = zo_round(w)
  h = zo_round(h)
  const mapAreaUIUnits = zo_min(w, h)
  let mapAreaPixels = mapAreaUIUnits * GetUIGlobalScale()
  if (mapAreaPixels < 1) {
    mapAreaPixels = 1
  }

  let mode: string
  let targetScale: number
  const mapType = GetMapContentType()

  if (self.isSpecialZoom) {
    mode = "specialZoom"
    targetScale = self.specialZoom
  } else if (mapType === MAP_CONTENT_BATTLEGROUND) {
    mode = "battlegroundZoom"
    targetScale = self.account.battlegroundZoom
  } else if (mapType === MAP_CONTENT_DUNGEON) {
    mode = "dungeonZoom"
    targetScale = self.account.dungeonZoom
  } else if (GetMapType() === MAPTYPE_SUBZONE) {
    mode = "subZoneZoom"
    targetScale = self.account.subZoneZoom
  } else {
    mode = "zoom"
    targetScale = self.account.zoom
  }

  if (self.isMounted) {
    targetScale = targetScale * self.account.mountedZoom
    mode = "mountedZoom"
  }

  const r = zo_max(w, h) / mapAreaUIUnits
  const maxZoomToStayBelowNative =
    math.floor((totalPixels / mapAreaPixels - r) * 500 * targetScale) / 500 + r
  if (
    STATE.lastZoom !== maxZoomToStayBelowNative ||
    self.zoomMode !== mode ||
    w !== STATE.lastW ||
    h !== STATE.lastH
  ) {
    self.zoomMode = mode
    STATE.moveToPlayer = ZO_WorldMap_JumpToPlayer
    STATE.scale = math.min(math.max(0.6, targetScale * 0.75), 1)
    STATE.limitedScale = math.max(STATE.scale, self.account.unitPinScaleLimit)
    asAnyTable(ZO_MapPin).UpdateSize = asAnyTableMember(newUpdateSize)

    asAnyTable(self.modeData).mapZoom = asAnyTableMember(maxZoomToStayBelowNative)
    self.scale = STATE.scale
    self.limitedScale = STATE.limitedScale

    STATE.lastZoom = maxZoomToStayBelowNative
    STATE.lastW = w
    STATE.lastH = h
    const pz = asMiniMapPanAndZoom(self.panZoom)
    pz.SetMapZoomMinMax(pz.ComputeMinZoom(), maxZoomToStayBelowNative)
  }
}

export function installZoomOverrides(this: void): undefined {
  const self = holder
  const panZoom = asAnyTable(self.panZoom)
  const glob = asAnyTable(globalThis)
  const orgGetMapCustomMaxZoom = glob.GetMapCustomMaxZoom
  function newGetMapCustomMaxZoom(this: void, ...args: unknown[]): unknown {
    if (!WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE)) {
      STATE.lastW = -1
      STATE.lastH = -1
      STATE.lastZoom = -1
      return orgGetMapCustomMaxZoom != null ? orgGetMapCustomMaxZoom(...args) : undefined
    } else {
      if (STATE.lastZoom < 0) {
        adjustZoom()
      }
      return STATE.lastZoom
    }
  }
  glob.GetMapCustomMaxZoom = asAnyTableMember(newGetMapCustomMaxZoom)

  const orgCanMapZoom = panZoom.CanMapZoom
  function newCanMapZoom(this: void, ...args: unknown[]): unknown {
    return orgCanMapZoom(...args) || WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE)
  }
  panZoom.CanMapZoom = asAnyTableMember(newCanMapZoom)
}

export function installCallbackPump(this: void): undefined {
  const self = holder
  const panZoom = asMiniMapPanAndZoom(self.panZoom)
  const glob = asAnyTable(globalThis)
  const asyncCallbacks = createAsyncTask("VOTANS_MAP_DO_CALLBACKS")
  STATE.asyncCallbacks = asyncCallbacks

  function stopCallbacks(this: void): undefined {
    if (!STATE.runningCallbacks) {
      asyncCallbacks.Cancel()
    }
    panZoom.ClearJumpToPinWhenAvailable()
  }
  CALLBACK_MANAGER.RegisterCallback("OnWorldMapChanged", stopCallbacks)

  let isWaitingForTexture = false
  function waitForTexture(this: void): undefined {
    if (!panZoom.CanInitializeMap()) {
      asyncCallbacks.Suspend()
      isWaitingForTexture = true
    }
  }

  function waitForTextureLoaded(this: void): undefined {
    if (isWaitingForTexture) {
      isWaitingForTexture = false
      asyncCallbacks.Resume()
    }
  }
  const id = self.name + "WaitForTextureLoaded"
  em.RegisterForUpdate(id, 0, function (this: void): undefined {
    if (ZO_WorldMapContainer1 == null) {
      return
    }
    const preHookHandler = asAnyTable(globalThis).ZO_PreHookHandler
    if (preHookHandler != null) {
      preHookHandler(ZO_WorldMapContainer1, "OnTextureLoaded", waitForTextureLoaded)
    }
    em.UnregisterForUpdate(id)
  })

  let callbacks: LooseTable | undefined
  function callback(this: void, index: number): undefined {
    const callback = callbacks?.[index]
    if (callback != null) {
      const deleted: unknown = callback[3]
      if (deleted != null && deleted !== false) {
        return
      }
      const argument: unknown = callback[2]
      const fn = callback[1]
      if (fn == null) {
        return
      }

      if (argument != null && argument !== false) {
        pcall(fn, argument, false)
      } else {
        pcall(fn, false)
      }
    }
  }
  function doCallbacks(this: void, callbackTask: LooseTable): undefined {
    callbacks = asAnyTable(CALLBACK_MANAGER).callbackRegistry?.["OnWorldMapChanged"]
    if (callbacks == null || asAnyArray(callbacks).length === 0) {
      return
    }
    asAnyAsyncTask(callbackTask).For(1, asAnyArray(callbacks).length).Do(callback)
  }
  function afterCallbacks(this: void): undefined {
    callbacks = undefined
    STATE.runningCallbacks = false
    if (WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE)) {
      adjustZoom()
      if (DoesCurrentMapMatchMapForPlayerLocation()) {
        const orgSetMapToPlayerLocation = SetMapToPlayerLocation
        glob.SetMapToPlayerLocation = asAnyTableMember(noOpExport)

        STATE.moveToPlayer()
        glob.SetMapToPlayerLocation = asAnyTableMember(orgSetMapToPlayerLocation)
      }
      if (IsInGamepadPreferredMode()) {
        self.RestorePosition()
      }
    }
  }
  asyncCallbacks.Finally(afterCallbacks)
  PUMP.DoCallbacks = doCallbacks
  PUMP.WaitForTexture = waitForTexture
}

function noOpExport(this: void, ..._args: unknown[]): undefined {}

const PUMP: {
  DoCallbacks: (this: void, t: LooseTable) => void
  WaitForTexture: (this: void) => void
} = {
  DoCallbacks: () => undefined,
  WaitForTexture: () => undefined,
}

let currentTime = 0
export function installUpdateHandler(this: void): undefined {
  const self = holder
  const glob = asAnyTable(globalThis)
  let lastUpdate = 0
  let lastMapUpdate = 0
  let lastMapId = GetMapTileTexture()
  let map: unknown

  function updateMap(this: void, force?: boolean): undefined {
    if (STATE.runningCallbacks) {
      return
    }

    if (force == null || force === false) {
      if (
        asMiniMapScene(HUD_UI_SCENE).IsShowing() ||
        !WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE)
      ) {
        return
      }
    }

    let needChange: boolean
    let oldMapType: number | undefined
    let mapId: string | undefined
    if (currentTime - lastMapUpdate >= 1) {
      lastMapUpdate = currentTime

      needChange = !DoesCurrentMapMatchMapForPlayerLocation()
      oldMapType = GetMapType()
      mapId = GetMapTileTexture()
      needChange = needChange || mapId !== lastMapId
      if (needChange) {
        SetMapToPlayerLocation()
        if (oldMapType !== MAPTYPE_SUBZONE && DoesCurrentMapShowPlayerWorld()) {
          const mapType = GetMapType()
          if (mapType === MAPTYPE_SUBZONE && GetMapContentType() === MAP_CONTENT_NONE) {
            const [x, y] = GetMapPlayerPosition("player")
            if (x < 0.17 || x > 0.83 || y < 0.17 || y > 0.83) {
              MapZoomOut()
              const currentMapId = GetMapTileTexture()
              if (mapId === currentMapId) {
                needChange = currentMapId !== lastMapId
                lastMapUpdate = lastMapUpdate + 1.5
              }
            }
          }
        }
      } else if (oldMapType === MAPTYPE_SUBZONE && DoesCurrentMapShowPlayerWorld()) {
        const [x, y] = GetMapPlayerPosition("player")
        if (x < 0.1 || x > 0.9 || y < 0.1 || y > 0.9) {
          MapZoomOut()
          const mapType = GetMapType()
          if (mapType === MAPTYPE_SUBZONE || GetMapTileTexture() !== mapId) {
            lastMapUpdate = lastMapUpdate + 1.5
            SetMapToPlayerLocation()
          } else {
            needChange = true
          }
        }
      }
    } else {
      needChange = lastMapId !== GetMapTileTexture()
    }
    if (needChange) {
      STATE.runningCallbacks = true
      asAnyAsyncTask(STATE.asyncCallbacks).Cancel().Call(PUMP.DoCallbacks).Then(PUMP.WaitForTexture)
      STATE.moveToPlayer = ZO_WorldMap_JumpToPlayer
      lastMapId = GetMapTileTexture()
    } else if (currentTime - lastUpdate >= 0.2) {
      lastUpdate = currentTime
      const orgZoWorldMapUpdateMap = ZO_WorldMap_UpdateMap
      const orgSetMapToPlayerLocation = SetMapToPlayerLocation
      ZO_WorldMap_UpdateMap = noOpExport
      glob.SetMapToPlayerLocation = asAnyTableMember(noOpExport)

      adjustZoom()

      STATE.moveToPlayer()
      STATE.moveToPlayer = ZO_WorldMap_PanToPlayer
      ZO_WorldMap_UpdateMap = orgZoWorldMapUpdateMap
      glob.SetMapToPlayerLocation = asAnyTableMember(orgSetMapToPlayerLocation)
    }
  }
  EXPORTED_UPDATE_MAP.fn = updateMap

  const orgUpdateMaybe = ZO_WorldMap.GetHandler("OnUpdate")
  const orgUpdate = orgUpdateMaybe != null ? orgUpdateMaybe : noOpExport
  let orgSetMapToPlayerLocation = SetMapToPlayerLocation
  const updateTask = createAsyncTask("VotansMiniMapUpdateMap")
  let running = false

  function asyncUpdate1(this: void): undefined {
    const current: unknown = glob.SetMapToPlayerLocation
    if (current !== noOpExport) {
      orgSetMapToPlayerLocation = SetMapToPlayerLocation
    }
    updateMap()
  }
  function asyncUpdate2(this: void, _task: AnyAsyncTask): undefined {
    glob.SetMapToPlayerLocation = asAnyTableMember(noOpExport)
    if (WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE)) {
      noGamepad(orgUpdate, map, currentTime)
    } else {
      orgUpdate(map, currentTime)
    }
    glob.SetMapToPlayerLocation = asAnyTableMember(orgSetMapToPlayerLocation)
    running = false
  }
  function updateHeading(this: void): undefined {
    const heading = GetPlayerCameraHeading()
    const angle = self.cameraAngleRad ?? 0
    self.cameraAngleRad = angle
    const cameraAngleLeft = asMiniMapControl(self.cameraAngleLeft)
    const cameraAngleRight = asMiniMapControl(self.cameraAngleRight)
    cameraAngleLeft.SetTextureRotation(heading - angle, 0.5, 1)
    cameraAngleRight.SetTextureRotation(heading + angle, 0.5, 1)
  }
  function minimapUpdate(this: void, ...args: unknown[]): undefined {
    map = args[0]
    currentTime = asNumber(args[1])

    if (self.account.showCameraAngle) {
      updateHeading()
    }

    if (self.account.asyncUpdate) {
      if (running) {
        return
      }
      running = true
      updateTask.Call(asyncUpdate1).Then(asyncUpdate2)
    } else {
      asyncUpdate1()
      asyncUpdate2(updateTask)
    }
  }
  ZO_WorldMap.SetHandler("OnUpdate", minimapUpdate)
}

export const EXPORTED_UPDATE_MAP: { fn: (this: void, force?: boolean) => void } = {
  fn: () => undefined,
}

export function installVisibility(this: void): undefined {
  const self = holder

  holder.StartFollowPlayer = function (this: VotansMiniMap): undefined {
    STATE.moveToPlayer = ZO_WorldMap_JumpToPlayer
  }

  holder.StopFollowPlayer = function (this: VotansMiniMap): undefined {}

  let isDirty = false
  function refreshVisibility(this: void): boolean {
    isDirty = false
    if (getScene().IsShowing() || !WORLD_MAP_MANAGER.IsInMode(MINIMAP_MAP_MODE)) {
      return true
    }
    const settingsScene = self.settingsScene
    if (settingsScene != null && asMiniMapScene(settingsScene).IsShowing()) {
      return self.wasMapAdded ?? false
    }

    if (!self.player.showMap) {
      return false
    }

    const settings = self.account
    if (self.isMounted) {
      return settings.showMounted
    }
    if (asMiniMapScene(SIEGE_BAR_SCENE).IsShowing()) {
      return settings.showSiege
    }
    if (GetCurrentZoneHouseId() !== 0) {
      return settings.showInHousing
    }
    if (asMiniMapScene(LOOT_SCENE).IsShowing()) {
      return settings.showLoot
    }
    if (IsUnitInCombat("player")) {
      return settings.showCombat
    } else {
      return settings.showHUD
    }
  }
  asMiniMapScene(WORLD_MAP_FRAGMENT).SetConditional(refreshVisibility)

  holder.UpdateVisibility = function (this: VotansMiniMap): undefined {
    if (!isDirty) {
      isDirty = true
      asMiniMapScene(WORLD_MAP_FRAGMENT).Refresh()
    }
    if (asMiniMapScene(WORLD_MAP_FRAGMENT).IsShowing()) {
      this.StartFollowPlayer()
    } else {
      this.StopFollowPlayer()
    }
  }
}
