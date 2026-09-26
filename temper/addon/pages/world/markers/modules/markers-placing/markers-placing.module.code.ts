import { markersChanged } from "akasha/temper/addon/pages/world/markers/modules/markers-codec/markers-codec.module.code.ts"
import { showNotice } from "akasha/temper/addon/pages/world/markers/modules/markers-dialogs/markers-dialogs.module.code.ts"
import {
  cameraAngles,
  createIcon,
  destroyControl,
} from "akasha/temper/addon/pages/world/markers/modules/markers-render/markers-render.module.code.ts"
import {
  CHAT_PREFIX,
  type MarkerSelections,
  MM,
} from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import "akasha/temper/addon/pages/world/markers/markers-declarations/markers-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-4/eso-api-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-space/eso-space.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-window/eso-world-map-window.type-declaration.d.ts"

const MIN_ANGLE = zo_rad(-2)

const READ_ONLY = "Markers are Read-Only when multiple profiles are loaded."

export function isReadOnly(this: void): boolean {
  if (MM.multipleProfilesLoaded) {
    showNotice("Notice", READ_ONLY, "")
    return true
  }
  return false
}

export function cursorWorldPosition(
  this: void,
  refusal: string
): LuaMultiReturn<[x: number, y: number, z: number] | []> {
  Set3DRenderSpaceToCurrentCamera("TemperWorldMarkersCameraToplevel")
  const [ox, oy, oz] = TemperWorldMarkersCameraToplevel.Get3DRenderSpaceOrigin()
  const [cX, cY, cZ] = GuiRender3DPositionToWorldPosition(ox, oy, oz)
  const [pitch, yaw] = cameraAngles()
  if (pitch > MIN_ANGLE) {
    showNotice("Notice", refusal, "")
    return $multi()
  }
  const [, , y] = GetUnitRawWorldPosition("player")
  const r = (cY - y) / zo_tan(pitch)
  return $multi(r * zo_sin(yaw) + cX, y, r * zo_cos(yaw) + cZ)
}

function placeWith(
  this: void,
  selections: MarkerSelections,
  x: number,
  y: number,
  z: number,
  orientation?: number[]
): undefined {
  createIcon({
    x,
    y,
    z,
    bgTexture: selections.texture,
    orientation,
    colour: selections.rgba ?? [1, 1, 1, 1],
    text: selections.text ?? "",
    size: selections.size ?? 1,
  })
  markersChanged()
  return undefined
}

function offsetOf(this: void, percent: number | undefined, size: number | undefined): number {
  return percent !== undefined && size !== undefined ? percent * size : 0
}

export function placeIcon(this: void): undefined {
  if (isReadOnly()) return undefined
  const [, x, y, z] = GetUnitRawWorldPosition("player")
  const selections = MM.currentSelections
  let orientation: number[] | undefined
  if (selections.floating !== true) {
    orientation = [
      selections.pitch !== undefined ? zo_rad(selections.pitch) : -math.pi / 2,
      selections.yaw !== undefined ? zo_rad(selections.yaw) : 0,
    ]
  }
  placeWith(selections, x, y + offsetOf(selections.offsetYPercent, selections.size), z, orientation)
  return undefined
}

export function placeQuickMenuIcon(this: void): undefined {
  if (isReadOnly()) return undefined
  const [, x, y, z] = GetUnitRawWorldPosition("player")
  const selections = MM.quickSelections
  placeWith(selections, x, y + offsetOf(selections.offsetY, selections.size), z)
  return undefined
}

export function placeQuickMenuIconAtCursor(this: void, useSettingsConfig?: boolean): undefined {
  if (isReadOnly()) return undefined
  const [x, y, z] = cursorWorldPosition(
    "You cannot place markers at your cursor unless there is a minimum 2 degree angle from the horizon"
  )
  if (x === undefined || y === undefined || z === undefined) return undefined
  const selections = useSettingsConfig === true ? MM.currentSelections : MM.quickSelections
  let offset = offsetOf(selections.offsetY, selections.size)
  if (selections.offsetYPercent !== undefined && selections.size !== undefined) {
    offset = selections.offsetYPercent * selections.size
  }
  placeWith(selections, x, y + offset, z)
  return undefined
}

export function removeClosestIcon(this: void, atX?: number, atY?: number, atZ?: number): undefined {
  if (MM.multipleProfilesLoaded) {
    showNotice("Notice", READ_ONLY, "")
    d(CHAT_PREFIX + READ_ONLY)
    return undefined
  }
  const [, px, py, pz] = GetUnitRawWorldPosition("player")
  const x = atX ?? px
  const y = atY ?? py
  const z = atZ ?? pz

  let minDistance = math.huge
  let closest = -1
  let floating = true
  MM.facing.forEach((icon, index) => {
    const distance = zo_floor(zo_distance3D(x, y, z, icon.x, icon.y, icon.z))
    if (distance < minDistance) {
      minDistance = distance
      closest = index
    }
  })
  MM.ground.forEach((icon, index) => {
    const distance = zo_floor(zo_distance3D(x, y, z, icon.x, icon.y, icon.z))
    if (distance < minDistance) {
      minDistance = distance
      closest = index
      floating = false
    }
  })
  if (closest === -1) {
    d(`${CHAT_PREFIX}Failed to find closest icon to delete`)
    return undefined
  }
  const list = floating ? MM.facing : MM.ground
  const icon = list[closest]
  if (icon !== undefined) destroyControl(icon)
  list.splice(closest, 1)
  markersChanged()
  return undefined
}

export function removeIconAtCursor(this: void): undefined {
  if (isReadOnly()) return undefined
  const [x, y, z] = cursorWorldPosition(
    "You cannot remove markers at your cursor unless there is a minimum 2 degree angle from the horizon"
  )
  if (x === undefined) return undefined
  removeClosestIcon(x, y, z)
  return undefined
}

export function setYaw(this: void): number {
  const [fX, , fZ] = GetCameraForward(SPACE_WORLD)
  const yaw = zo_floor(zo_deg(zo_atan2(fX, fZ) + math.pi))
  MM.currentSelections.yaw = yaw
  return yaw
}

export function toggleQuickMenu(this: void): undefined {
  TemperWorldMarkerPlaceToplevel.SetHidden(!TemperWorldMarkerPlaceToplevel.IsHidden())
  return undefined
}
