import {
  cameraAngles,
  createControl,
  destroyControl,
} from "akasha/temper/addon/pages/world/markers/modules/markers-render/markers-render.module.code.ts"
import type { MarkerIcon } from "akasha/temper/addon/pages/world/markers/modules/markers-state/markers-state.module.code.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-4/eso-api-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-space/eso-space.type-declaration.d.ts"

const TEMP_TICK = "TemperWorldMarkersTempIconsUpdateTick"

const UNIT_TAG_COLOURS: readonly number[][] = [
  [1, 1, 1, 1],
  [0, 0, 1, 1],
  [0, 1, 0, 1],
  [1, 0.5, 0, 1],
  [1, 0, 0.9, 1],
  [1, 0, 0, 1],
  [1, 0.8, 0, 1],
  [0, 1, 0.65, 1],
  [0.5, 0, 0.5, 1],
  [0.47, 0.52, 0.79, 1],
  [0.29, 0.08, 0.67, 1],
  [0.94, 0.81, 0.89, 1],
]

const TEMP_MARKERS: Record<string, MarkerIcon | undefined> = {}

for (let i = 1; i <= 12; i++) {
  TEMP_MARKERS[`group${i}`] = {
    x: 0,
    y: 0,
    z: 0,
    bgTexture: "M0RMarkers/textures/chevron.dds",
    colour: UNIT_TAG_COLOURS[i - 1] ?? [1, 1, 1, 1],
    text: "",
    size: 0.6,
  }
}

let currentlyUpdatingTemps = false

function updateTempMarkers(this: void): undefined {
  const [pitch, yaw] = cameraAngles()
  let somethingIsActive = false
  const currentTime = GetGameTimeMilliseconds()
  for (const [, icon] of pairs(TEMP_MARKERS)) {
    const control = icon.control
    if (control === undefined) continue
    if (icon.endTime !== undefined && icon.endTime > currentTime) {
      control.SetTransformRotation(pitch, yaw, 0)
      somethingIsActive = true
    } else {
      icon.endTime = undefined
      destroyControl(icon)
    }
  }
  if (!somethingIsActive) {
    EVENT_MANAGER.UnregisterForUpdate(TEMP_TICK)
    currentlyUpdatingTemps = false
  }
  return undefined
}

export function createTemporaryGroupIcon(
  this: void,
  groupTag: string,
  wx: number,
  wy: number,
  wz: number
): undefined {
  const icon = TEMP_MARKERS[groupTag]
  if (icon === undefined) return undefined
  icon.text = `${tostring(GetUnitDisplayName(groupTag))}\n\n`
  if (icon.control === undefined) {
    createControl(icon)
  }
  const [x, y, z] = WorldPositionToGuiRender3DPosition(wx, wy, wz)
  icon.control?.SetTransformOffset(x, y, z)
  icon.endTime = GetGameTimeMilliseconds() + 5000
  if (!currentlyUpdatingTemps) {
    EVENT_MANAGER.RegisterForUpdate(TEMP_TICK, 0, updateTempMarkers)
    currentlyUpdatingTemps = true
  }
  return undefined
}
