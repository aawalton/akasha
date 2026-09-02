import {
  asAnyTable,
  asColorDef,
  asMiniMapScene,
  asNumber,
  asScene,
  asSceneFragment,
} from "../minimap-casts/minimap-casts.module.code.ts"
import { holder, type VotansMiniMap } from "../minimap-holder/minimap-holder.module.code.ts"
import { MINIMAP_MAP_MODE } from "../minimap-names/minimap-names.module.code.ts"
import type {
  AccountSettings,
  PlayerSettings,
} from "../minimap-saved-variables/minimap-saved-variables.module.code.ts"
import {
  SAVED_VARS_GLOBAL,
  SAVED_VARS_VERSION,
} from "../minimap-saved-variables/minimap-saved-variables.module.code.ts"

const async = LibAsync

holder.Initialize = function (this: VotansMiniMap): undefined {
  const [titleColorR, titleColorG, titleColorB, titleColorA] = GetInterfaceColor(
    INTERFACE_COLOR_TYPE_TEXT_COLORS,
    INTERFACE_TEXT_COLOR_NORMAL
  )
  const accountDefaults: AccountSettings = {
    enableTweaks: true,
    enableMap: true,
    zoom: 1.3,
    mountedZoom: 1,
    subZoneZoom: 1,
    dungeonZoom: 0.7,
    battlegroundZoom: 0,
    zoomOut: 0.15,
    zoomIn: 2,
    zoomToPlayer: false,
    frameStyle: ZO_IsConsoleOrGameCoreUI() ? "Default" : "ESO",
    borderAlpha: 100,
    titleFont: "BOLD_FONT",
    titleFontSize: 16,
    titleColor: [titleColorR, titleColorG, titleColorB, titleColorA],
    showClock: true,
    showRealTimeClock: true,
    showInGameClock: true,
    lockWindow: false,
    showFullTitle: false,
    showCameraAngle: false,
    cameraAngle: 45,
    zoneAlertMode: this.zoneAlertMode.MiniMapHidden,
    timeFormat: TIME_FORMAT_PRECISION_TWENTY_FOUR_HOUR,
    debug: false,
    asyncUpdate: false,
    enableCompass: this.compassMode.Untouched,
    showOnTop: false,
    titleAtTop: true,
    unitPinScaleLimit: 0.8,
    showHUD: true,
    showLoot: true,
    showMounted: true,
    showCombat: false,
    showSiege: false,
    showInHousing: true,
    fixedMaps: {},
    showAllTravelNodes: false,
  }
  this.accountDefaults = accountDefaults

  this.account = ZO_SavedVars.NewAccountWide<AccountSettings>(
    SAVED_VARS_GLOBAL,
    SAVED_VARS_VERSION,
    undefined,
    accountDefaults
  )

  const defaults: PlayerSettings = {
    showMap: true,
  }
  this.defaults = defaults

  this.player = ZO_SavedVars.NewCharacterIdSettings<PlayerSettings>(
    SAVED_VARS_GLOBAL,
    SAVED_VARS_VERSION,
    undefined,
    defaults
  )

  if (ZO_IsConsoleOrGameCoreUI()) {
    this.account.enableTweaks = true
  }
  if (this.account.enableTweaks) {
    this.InitTweaks()
  } else if (this.account.enableMap) {
    this.InitRequiredModifications()
  }
  if (this.account.enableMap) {
    this.InitMapSettings()

    const colorArr =
      type(this.account.titleColor) === "table"
        ? this.account.titleColor
        : accountDefaults.titleColor
    const [colorR, colorG, colorB, colorA] = unpack(colorArr)
    const titleColor = asColorDef(ZO_ColorDef.New(colorR ?? 0, colorG ?? 0, colorB ?? 0, colorA))
    this.titleColor = titleColor
    titleColor.SetAlpha(1)

    this.InitMiniMap()
    HUD_UI_SCENE.RemoveFragment(asSceneFragment(MOUSE_UI_MODE_FRAGMENT))
    HUD_SCENE.AddFragment(asSceneFragment(WORLD_MAP_FRAGMENT))
    HUD_UI_SCENE.AddFragment(asSceneFragment(WORLD_MAP_FRAGMENT))
    asScene(SIEGE_BAR_SCENE).AddFragment(asSceneFragment(WORLD_MAP_FRAGMENT))
    asScene(SIEGE_BAR_UI_SCENE).AddFragment(asSceneFragment(WORLD_MAP_FRAGMENT))
    asScene(LOOT_SCENE).AddFragment(asSceneFragment(WORLD_MAP_FRAGMENT))
    HUD_UI_SCENE.AddFragment(asSceneFragment(MOUSE_UI_MODE_FRAGMENT))

    async.SetDebug(this.account.debug)
  }
}

CALLBACK_MANAGER.RegisterCallback(
  "OnWorldMapSavedVarsReady",
  function (this: void, vars: unknown): undefined {
    holder.mapVars = asAnyTable(vars)
  }
)

{
  holder.ToggleShowMap = function (this: VotansMiniMap): undefined {
    this.player.showMap = !this.player.showMap
    const label = GetString(SI_VOTANSMINIMAP_SHOW_MAP)
    const stateText = GetString(this.player.showMap ? SI_CHECK_BUTTON_ON : SI_CHECK_BUTTON_OFF)
    asAnyTable(CENTER_SCREEN_ANNOUNCE).AddMessage(
      EVENT_BROADCAST,
      CSA_CATEGORY_SMALL_TEXT,
      undefined,
      label + ": " + stateText
    )
    this.UpdateVisibility()
  }

  holder.ToggleShowHUD = function (this: VotansMiniMap): undefined {
    if (this.isMounted) {
      this.account.showMounted = !this.account.showMounted
    } else if (GetCurrentZoneHouseId() !== 0) {
      this.account.showInHousing = !this.account.showInHousing
    } else {
      this.account.showHUD = !this.account.showHUD
    }
    this.UpdateVisibility()
    this.UpdateCompass()
  }

  holder.ToggleShowCombat = function (this: VotansMiniMap): undefined {
    this.account.showCombat = !this.account.showCombat
    this.UpdateVisibility()
  }

  holder.ToggleShowSiege = function (this: VotansMiniMap): undefined {
    this.account.showSiege = !this.account.showSiege
    this.UpdateVisibility()
  }

  holder.ToggleShowInHousing = function (this: VotansMiniMap): undefined {
    this.account.showInHousing = !this.account.showInHousing
    this.UpdateVisibility()
  }

  holder.ToogleZoom = function (this: VotansMiniMap, enabled: boolean, zoom?: number): undefined {
    this.isSpecialZoom = enabled
    if (enabled) {
      this.specialZoom = zoom ?? 1
    }
  }

  holder.StepZoom = function (this: VotansMiniMap, add: boolean): undefined {
    const mode: unknown = WORLD_MAP_MANAGER.GetMode()
    if (
      mode !== MINIMAP_MAP_MODE ||
      asMiniMapScene(WORLD_MAP_FRAGMENT).IsHidden() ||
      this.isSpecialZoom ||
      !this.account[this.zoomMode]
    ) {
      PlaySound(SOUNDS.NEGATIVE_CLICK ?? "")
      return
    }

    let step = -0.05
    if (add) {
      step = -step
    }
    if (IsShiftKeyDown()) {
      step = step * 5
    }

    const current = this.account[this.zoomMode]
    this.account[this.zoomMode] = math.max(0, math.min(2, asNumber(current) + step))
  }

  function mouseIsOverMap(this: void): boolean {
    if (IsInGamepadPreferredMode()) {
      return SCENE_MANAGER.IsShowing("gamepad_worldMap")
    } else {
      return (
        !ZO_WorldMapScroll.IsHidden() &&
        MouseIsOver(ZO_WorldMapScroll) &&
        SCENE_MANAGER.IsShowing("worldMap")
      )
    }
  }
  function normalizePreferredMousePositionToMap(this: void): LuaMultiReturn<[number, number]> {
    if (IsInGamepadPreferredMode()) {
      const [x, y] = ZO_WorldMapScroll.GetCenter()
      return NormalizePointToControl(x, y, ZO_WorldMapContainer)
    } else {
      return NormalizeMousePositionToControl(ZO_WorldMapContainer)
    }
  }
  function distanceSq(this: void, x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1
    const dy = y2 - y1
    return dx * dx + dy * dy
  }

  holder.ToggleFixedOffset = function (this: VotansMiniMap): undefined {
    const mapId = GetMapTileTexture()
    const fixedMaps = this.account.fixedMaps
    const isNotFixed = fixedMaps[mapId] == null
    const isMouseOverMap = mouseIsOverMap()
    if (isNotFixed && !isMouseOverMap) {
      PlaySound(SOUNDS.NEGATIVE_CLICK ?? "")
      return
    }
    if (isMouseOverMap) {
      const [offsetX, offsetY] = normalizePreferredMousePositionToMap()
      function distanceToFixed(this: void): number {
        const fixedEntry = fixedMaps[mapId]
        if (fixedEntry == null) {
          return 0
        }
        const [fx, fy] = unpack(fixedEntry)
        return distanceSq(offsetX, offsetY, fx, fy)
      }
      if (isNotFixed || distanceToFixed() > 0.0001) {
        fixedMaps[mapId] = [offsetX, offsetY]
        PlaySound(SOUNDS.MAP_PING ?? "")
      } else {
        delete fixedMaps[mapId]
        PlaySound(SOUNDS.MAP_PING_REMOVE ?? "")
      }
    } else {
      delete fixedMaps[mapId]
      PlaySound(SOUNDS.MAP_PING_REMOVE ?? "")
    }
  }
}
