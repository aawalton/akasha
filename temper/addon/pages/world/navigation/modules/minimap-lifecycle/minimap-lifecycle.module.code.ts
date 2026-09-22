import {
  asAnyTable,
  asAnyTableMember,
  asMiniMapControl,
  asMiniMapPanAndZoom,
  asMiniMapPinManager,
  asNumber,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-casts/minimap-casts.module.code.ts"
import {
  holder,
  type TemperMiniMap,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-holder/minimap-holder.module.code.ts"
import {
  panZoom,
  pins,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-shared/minimap-shared.module.code.ts"
import type {
  LooseTable,
  MiniMapControl,
} from "akasha/temper/addon/pages/world/navigation/modules/minimap-view-types/minimap-view-types.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-2/eso-interface-extra-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-window/eso-world-map-window.type-declaration.d.ts"

holder.GetCurrentZoom = function (this: TemperMiniMap): number {
  return asNumber(asMiniMapPanAndZoom(panZoom()).GetCurrentNormalizedZoom())
}

holder.SetCurrentZoom = function (this: TemperMiniMap, zoom: number): undefined {
  asMiniMapPanAndZoom(panZoom()).SetCurrentNormalizedZoom(zoom)
}

holder.InitRequiredModifications = function (this: TemperMiniMap): undefined {
  const orgUpdatePinsForMapSizeChange =
    asAnyTable(ZO_WorldMapPins_Manager).UpdatePinsForMapSizeChange
  let lastW = -1
  let lastH = -1
  let lastZone: unknown = -1
  asAnyTable(ZO_WorldMapPins_Manager).UpdatePinsForMapSizeChange = asAnyTableMember(function (
    this: LooseTable
  ): unknown {
    const [dw, dh] = ZO_WorldMapContainer.GetDimensions()
    const w = zo_round(dw)
    const h = zo_round(dh)
    const zone = GetMapTileTexture()
    if (lastW !== w || lastH !== h || lastZone !== zone) {
      lastW = w
      lastH = h
      lastZone = zone
      return orgUpdatePinsForMapSizeChange(this)
    }
    return undefined
  })
}

holder.InitCameraAngle = function (this: TemperMiniMap): undefined {
  const self = this
  if (self.cameraAngleLeft != null) {
    return
  }
  const playerPin = asMiniMapPinManager(pins()).GetPlayerPin()
  const playerControl = playerPin.GetControl()
  const parent = asMiniMapControl(asMiniMapControl(playerControl).GetParent())
  function setupCameraAngle(this: void, control: MiniMapControl): undefined {
    control.SetTexture("TemperWorld/ViewLimit.dds")
    control.SetDimensions(4, 64)
    control.SetAnchor(BOTTOM, asMiniMapControl(playerControl), CENTER)
    control.SetHidden(!self.account.showCameraAngle)
    control.SetPixelRoundingEnabled(true)
    control.SetDrawLayer(DL_TEXT)
  }
  let control = CreateControl("$(parent)ViewLimitLeft", parent, CT_TEXTURE)
  setupCameraAngle(asMiniMapControl(control))
  self.cameraAngleLeft = control
  control = CreateControl("$(parent)ViewLimitRight", parent, CT_TEXTURE)
  setupCameraAngle(asMiniMapControl(control))
  self.cameraAngleRight = control

  self.cameraAngleRad = self.account.cameraAngle * 0.0174532925199
  const orgSetHidden = playerControl.SetHidden
  function setHiddenPlayerPin(this: void, pin: LooseTable, hidden: boolean): unknown {
    const noViewLimit = hidden || !self.account.showCameraAngle
    asMiniMapControl(self.cameraAngleLeft).SetHidden(noViewLimit)
    asMiniMapControl(self.cameraAngleRight).SetHidden(noViewLimit)
    return orgSetHidden(pin, hidden)
  }
  playerControl.SetHidden = asAnyTableMember(setHiddenPlayerPin)
  const orgSetRotation = playerPin.SetRotation
  playerPin.SetRotation = asAnyTableMember(function (this: void, ...args: unknown[]): unknown {
    if (self.account.showCameraAngle) {
      const pin = args[0]
      const [, , heading] = GetMapPlayerPosition("player")
      return orgSetRotation(pin, heading)
    } else {
      return orgSetRotation(...args)
    }
  })
}
