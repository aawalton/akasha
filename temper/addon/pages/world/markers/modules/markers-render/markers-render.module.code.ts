import {
  type MarkerControl,
  type MarkerIcon,
  MM,
} from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import { drawnTexture } from "akasha/temper/addon/pages/world/markers/modules/markers-textures/markers-textures.module.code.ts"
import "akasha/temper/addon/pages/world/markers/markers-declarations/markers-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-scroll-list-extra/eso-scroll-list-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-4/eso-api-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-space/eso-space.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-4/eso-ui-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-window/eso-world-map-window.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"

export type MarkerPool = ZoControlPool<MarkerControl>

export const TEMPLATE_NAME = "TemperWorldMarkersTemplate"

const UPDATE_TICK = "TemperWorldMarkersUpdateTick"
const CULL_TICK = "TemperWorldMarkersCullTick"

let controlPool: MarkerPool | undefined

export function newMarkerPool(this: void, parent: Control, prefix: string): MarkerPool {
  return ZO_ControlPool.New<MarkerControl>(TEMPLATE_NAME, parent, prefix)
}

function sceneChanged(this: void, scene: Scene, newState: number): undefined {
  if (scene.name !== "hud" && scene.name !== "hudui" && newState === SCENE_SHOWING) {
    TemperWorldMarkerPlaceToplevel.SetHidden(true)
  }
  return undefined
}

export function initRender(this: void): undefined {
  controlPool = newMarkerPool(TemperWorldMarkersToplevel, "TemperWorldMarker")
  const iconFragment = ZO_HUDFadeSceneFragment.New(
    TemperWorldMarkersToplevel,
    DEFAULT_SCENE_TRANSITION_TIME,
    0
  )
  HUD_SCENE.AddFragment(iconFragment)
  HUD_UI_SCENE.AddFragment(iconFragment)
  GAME_MENU_SCENE.AddFragment(iconFragment)
  SCENE_MANAGER.RegisterCallback("SceneStateChanged", sceneChanged)
  return undefined
}

export function cameraAngles(this: void): LuaMultiReturn<[pitch: number, yaw: number]> {
  const [fX, fY, fZ] = GetCameraForward(SPACE_WORLD)
  const yaw = zo_atan2(fX, fZ) - math.pi
  const pitch = zo_atan2(fY, zo_sqrt(fX * fX + fZ * fZ))
  return $multi(pitch, yaw)
}

let currentlyUpdating = false
let currentlyCulling = false

function updateMarkers(this: void): undefined {
  if (MM.facing.length === 0) {
    EVENT_MANAGER.UnregisterForUpdate(UPDATE_TICK)
    currentlyUpdating = false
    return undefined
  }
  const [pitch, yaw] = cameraAngles()
  for (const icon of MM.facing) {
    icon.control?.SetTransformRotation(pitch, yaw, 0)
  }
  return undefined
}

function cullList(
  this: void,
  icons: MarkerIcon[],
  x: number,
  y: number,
  z: number,
  cull: number
): undefined {
  for (const icon of icons) {
    icon.control?.SetHidden(zo_distance3D(x, y, z, icon.x, icon.y, icon.z) > cull)
  }
  return undefined
}

function cullMarkers(this: void): undefined {
  const cullDistance = MM.vars.cullingDistance * 100
  if (cullDistance === 0) {
    EVENT_MANAGER.UnregisterForUpdate(CULL_TICK)
    currentlyCulling = false
    for (const icon of MM.facing) icon.control?.SetHidden(false)
    for (const icon of MM.ground) icon.control?.SetHidden(false)
    return undefined
  }
  const [, x, y, z] = GetUnitRawWorldPosition("player")
  cullList(MM.facing, x, y, z, cullDistance)
  cullList(MM.ground, x, y, z, cullDistance)
  return undefined
}

export function startCulling(this: void): undefined {
  if (!currentlyCulling) {
    EVENT_MANAGER.RegisterForUpdate(CULL_TICK, 500, cullMarkers)
    currentlyCulling = true
  }
  return undefined
}

function placeList(this: void, icons: MarkerIcon[], sx: number, sz: number): undefined {
  for (const icon of icons) {
    icon.control?.SetTransformOffset((icon.x - sx) / 100, icon.y / 100, (icon.z - sz) / 100)
  }
  return undefined
}

export function updateMarkerPositions(this: void): undefined {
  const [sx, , sz] = GuiRender3DPositionToWorldPosition(0, 0, 0)
  placeList(MM.facing, sx, sz)
  placeList(MM.ground, sx, sz)
  return undefined
}

export function markerFont(this: void): string {
  return string.format("$(%s)|$(GP_20)%s", MM.vars.fontface, MM.vars.fonteffect)
}

export function createControl(this: void, icon: MarkerIcon): MarkerIcon {
  const pool = controlPool
  if (pool === undefined) return icon
  const [control, key] = pool.AcquireObject()
  control.SetHidden(false)
  control.SetSpace(SPACE_WORLD)
  control.SetAnchor(CENTER, GuiRoot, CENTER)
  control.SetScale(1 / 100)
  const bgLayer = control.GetNamedChild<TextureControl>("Background")
  const textLayer = bgLayer?.GetNamedChild<LabelControl>("Text")
  control.bgLayer = bgLayer
  control.textLayer = textLayer
  control.SetTransformNormalizedOriginPoint(0.5, 0.5)
  control.SetTransformScale((tonumber(icon.size) ?? 1) * MM.vars.globalMult)
  textLayer?.SetFont(markerFont())
  textLayer?.SetScale(4 * MM.vars.fontScale)

  icon.control = control
  icon.key = key

  if (icon.bgTexture !== undefined && bgLayer !== undefined) {
    bgLayer.SetHidden(false)
    bgLayer.SetTexture(drawnTexture(icon.bgTexture))
    const [fileWidth] = bgLayer.GetTextureFileDimensions()
    const width = 100 * (fileWidth ?? 1)
    bgLayer.SetScale(width)
    bgLayer.SetTransformScale(1 / width)
    bgLayer.SetColor(
      icon.colour[0] ?? 1,
      icon.colour[1] ?? 1,
      icon.colour[2] ?? 1,
      icon.colour[3] ?? 1
    )
  }
  if (textLayer !== undefined) {
    textLayer.SetHidden(false)
    textLayer.SetText(icon.text)
  }
  return icon
}

export function destroyControl(this: void, icon: MarkerIcon): undefined {
  const control = icon.control
  if (control === undefined || controlPool === undefined || icon.key === undefined) return undefined
  control.SetHidden(true)
  control.bgLayer?.SetHidden(true)
  control.bgLayer?.SetScale(1)
  control.bgLayer?.SetTransformScale(1)
  control.textLayer?.SetText("")
  control.textLayer?.SetHidden(true)
  controlPool.ReleaseObject(icon.key)
  icon.control = undefined
  icon.key = undefined
  return undefined
}

function startUpdating(this: void): undefined {
  if (!currentlyUpdating) {
    EVENT_MANAGER.RegisterForUpdate(UPDATE_TICK, 0, updateMarkers)
    currentlyUpdating = true
  }
  return undefined
}

export function createIcon(this: void, given: MarkerIcon): undefined {
  const icon = createControl(given)
  const [x, y, z] = WorldPositionToGuiRender3DPosition(icon.x, icon.y, icon.z)
  icon.control?.SetTransformOffset(x, y, z)
  const orientation = icon.orientation
  if (orientation !== undefined) {
    icon.control?.SetTransformRotation(orientation[0] ?? 0, orientation[1] ?? 0, 0)
    MM.ground.push(icon)
  } else {
    MM.facing.push(icon)
    startUpdating()
  }
  return undefined
}

export function unloadEverything(this: void): undefined {
  for (const icon of MM.facing) destroyControl(icon)
  ZO_ClearNumericallyIndexedTable(MM.facing)
  for (const icon of MM.ground) destroyControl(icon)
  ZO_ClearNumericallyIndexedTable(MM.ground)
  return undefined
}
