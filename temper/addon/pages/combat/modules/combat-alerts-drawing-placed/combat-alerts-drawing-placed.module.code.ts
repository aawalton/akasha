import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import { unpackColor } from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-core/combat-alerts-drawing-core.module.code.ts"
import type {
  DrawingColor,
  DrawingKey,
  DrawingOrientation,
  DrawingUpdateFunc,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const Draw = CRUTCH.Drawing
const C = CRUTCH.Constants

Draw.CreatePlacedPositionMarker = (texture, x, y, z, sizeArg, colorArg) => {
  const size = sizeArg ?? 100

  const color = colorArg ?? C.WHITE
  const [r, g, b, alpha] = unpackColor(color)
  const placed = CRUTCH.savedOptions.drawing.placedPositioning
  const a = alpha ?? placed.opacity

  const faceCamera = !placed.flat
  let orientation: DrawingOrientation | undefined
  let markerY = y
  if (faceCamera) {
    markerY = markerY + size / 2
  } else {
    orientation = C.FLAT_ORIENTATION
    markerY = markerY + 5
  }

  return Draw.CreateWorldTexture(
    texture,
    x,
    markerY,
    z,
    size / 100,
    size / 100,
    [r, g, b, a],
    placed.useDepthBuffers,
    faceCamera,
    orientation
  )
}

Draw.RemovePlacedPositionMarker = (key) => {
  Draw.RemoveWorldTexture(key)
}

Draw.CreatePlacedIcon = (texture, x, y, z, sizeArg, colorArg, updateFunc) => {
  const size = sizeArg ?? 100

  const color = colorArg ?? C.WHITE

  return Draw.CreateWorldTexture(
    texture,
    x,
    y,
    z,
    size / 100,
    size / 100,
    color,
    CRUTCH.savedOptions.drawing.placedIcon.useDepthBuffers,
    true,
    undefined,
    updateFunc
  )
}

Draw.RemovePlacedIcon = (key) => {
  Draw.RemoveWorldTexture(key)
}

const DEFAULT_ORIENTED: DrawingOrientation = [
  [0, 1, 0],
  [1, 0, 0],
  [0, 0, 1],
]

function createOrientedTexture(
  this: void,
  texture: string,
  xArg?: number,
  yArg?: number,
  zArg?: number,
  sizeArg?: number,
  colorArg?: DrawingColor,
  orientationArg?: DrawingOrientation,
  updateFunc?: DrawingUpdateFunc,
  useDepthBuffersArg?: boolean
): DrawingKey {
  let x = xArg as number
  let y = yArg as number
  let z = zArg as number
  if (xArg === undefined) {
    ;[, x, y, z] = GetUnitRawWorldPosition("player")
  }

  const size = sizeArg ?? 1

  const color = colorArg ?? C.WHITE
  const [r, g, b, alpha] = unpackColor(color)
  const oriented = CRUTCH.savedOptions.drawing.placedOriented
  const a = alpha ?? oriented.opacity

  const orientation = orientationArg ?? DEFAULT_ORIENTED

  const useDepthBuffers = useDepthBuffersArg ?? oriented.useDepthBuffers

  return Draw.CreateWorldTexture(
    texture,
    x,
    y,
    z,
    size,
    size,
    [r, g, b, a],
    useDepthBuffers,
    false,
    orientation,
    updateFunc
  )
}
Draw.CreateOrientedTexture = createOrientedTexture

Draw.RemoveOrientedTexture = (key) => {
  Draw.RemoveWorldTexture(key)
}

Draw.CreateGroundCircle = (
  x,
  y,
  z,
  radiusArg,
  colorArg,
  orientation,
  updateFunc,
  useDepthBuffers
) => {
  const radius = radiusArg ?? 3
  const size = radius * 2

  const color = colorArg ?? C.RED

  return createOrientedTexture(
    "TemperCombat/assets/floor/circle.dds",
    x,
    y,
    z,
    size,
    color,
    orientation,
    updateFunc,
    useDepthBuffers
  )
}

Draw.RemoveGroundCircle = (key) => {
  Draw.RemoveWorldTexture(key)
}

function calculateValues(
  this: void,
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number
): LuaMultiReturn<[number, number, number, number, number, number]> {
  const oX = (x1 + x2) / 2
  const oY = (y1 + y2) / 2
  const oZ = (z1 + z2) / 2

  const xzDistance = math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2)
  const pitch = math.pi / 2 - math.atan2(y2 - y1, xzDistance)
  const yaw = math.pi / 2 - math.atan2(z2 - z1, x2 - x1)

  const distance = math.sqrt(CRUTCH.GetSquaredDistance(x1, y1, z1, x2, y2, z2))

  return $multi(oX, oY, oZ, pitch, yaw, distance / 100)
}

Draw.CreateLine = (
  x1,
  y1,
  z1,
  x2,
  y2,
  z2,
  widthArg,
  colorArg,
  useDepthBuffersArg,
  updateFunc,
  getPointsFunc
) => {
  const color = colorArg ?? C.WHITE
  const [r, g, b, alpha] = unpackColor(color)
  const oriented = CRUTCH.savedOptions.drawing.placedOriented
  const a = alpha ?? oriented.opacity

  const useDepthBuffers = useDepthBuffersArg ?? oriented.useDepthBuffers

  const [oX, oY, oZ, pitch, yaw, height] = calculateValues(x1, y1, z1, x2, y2, z2)

  let width = widthArg
  const updateFunctionWrapper: DrawingUpdateFunc = (icon) => {
    if (updateFunc !== undefined) {
      updateFunc(icon)
    }

    if (getPointsFunc !== undefined) {
      const [pX1, pY1, pZ1, pX2, pY2, pZ2] = getPointsFunc()

      const [nX, nY, nZ, nPitch, nYaw, nHeight] = calculateValues(pX1, pY1, pZ1, pX2, pY2, pZ2)

      icon.SetPosition(icon, nX, nY, nZ)
      icon.SetOrientation(icon, nPitch, nYaw, 0)

      if (width === undefined) {
        ;[width] = icon.control.Get3DLocalDimensions()
      }
      icon.control.Set3DLocalDimensions(width, nHeight)
    }
  }

  return Draw.CreateWorldTexture(
    "TemperCombat/assets/floor/square.dds",
    oX,
    oY,
    oZ,
    widthArg ?? 1,
    height,
    [r, g, b, a],
    useDepthBuffers,
    false,
    [pitch, yaw, 0],
    updateFunctionWrapper
  )
}

Draw.RemoveLine = (key) => {
  Draw.RemoveWorldTexture(key)
}
