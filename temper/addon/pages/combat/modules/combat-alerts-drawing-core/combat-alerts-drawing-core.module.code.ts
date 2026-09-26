import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import type {
  DrawingColor,
  DrawingGetCompositeTexture,
  DrawingIcon,
  DrawingKey,
  DrawingOrientation,
  DrawingSetBackdropColors,
  DrawingSetBackdropRoll,
  DrawingSetColor,
  DrawingSetFontColor,
  DrawingSetOrientation,
  DrawingSetPosition,
  DrawingSetText,
  DrawingSetTexture,
  DrawingSetTextureHidden,
  DrawingUpdateFunc,
  OrientationPart,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const Draw = CRUTCH.Drawing
const C = CRUTCH.Constants

export function unpackColor(
  this: void,
  color: DrawingColor
): LuaMultiReturn<[number, number, number, number | undefined]> {
  return $multi(color[0] as number, color[1] as number, color[2] as number, color[3])
}

export function setRenderSpaceOrigin(
  this: void,
  control: Control,
  x: number,
  y: number,
  z: number
): undefined {
  const [gX, gY, gZ] = WorldPositionToGuiRender3DPosition(x, y, z)
  control.Set3DRenderSpaceOrigin(gX, gY, gZ)
}

Draw.activeIcons = {}

function isDOF(this: void, value: OrientationPart | undefined): boolean {
  return type(value) === "number"
}

function firstPart(
  this: void,
  first: OrientationPart | undefined,
  second: OrientationPart | undefined,
  third: OrientationPart | undefined
): OrientationPart | undefined {
  if (first !== undefined) {
    return first
  }
  if (second !== undefined) {
    return second
  }
  return third
}

const setPosition: DrawingSetPosition = (icon, x, y, z) => {
  if (icon.x !== x || icon.z !== z || icon.y !== y) {
    icon.x = x ?? icon.x
    icon.y = y ?? icon.y
    icon.z = z ?? icon.z
    if (icon.isSpace) {
      const [oX, , oZ] = GuiRender3DPositionToWorldPosition(0, 0, 0)
      const tX = (icon.x - oX) / 100
      const tY = icon.y / 100
      const tZ = (icon.z - oZ) / 100
      icon.control.SetTransformOffset(tX, tY, tZ)
    } else {
      setRenderSpaceOrigin(icon.control, icon.x, icon.y, icon.z)
    }
  }
}
Draw.SetPosition = setPosition

const setColor: DrawingSetColor = (icon, r, g, b, a, childControlName) => {
  let control: TextureControl
  if (icon.isSpace) {
    control = icon.control.GetNamedChild(childControlName ?? "Texture") as TextureControl
  } else {
    control = icon.control as TextureControl
  }

  const [oldR, oldG, oldB] = control.GetColor()
  control.SetColor(r ?? oldR, g ?? oldG, b ?? oldB, a)
}
Draw.SetColor = setColor

function convertToPitchYawRollIfNeeded(
  this: void,
  first?: OrientationPart,
  second?: OrientationPart,
  third?: OrientationPart
): LuaMultiReturn<[number | undefined, number | undefined, number | undefined]> {
  if (isDOF(firstPart(first, second, third))) {
    return $multi(
      first as number | undefined,
      second as number | undefined,
      third as number | undefined
    )
  }

  const forward = first as readonly number[]
  const right = second as readonly number[]
  const fX = forward[0] as number
  const fY = forward[1] as number
  const fZ = forward[2] as number
  const rX = right[0] as number
  const rY = right[1] as number
  const rZ = right[2] as number

  const pitch = zo_atan2(fY, zo_sqrt(fX * fX + fZ * fZ))
  const yaw = zo_atan2(fX, fZ) - math.pi
  const roll = zo_atan2(rY, zo_sqrt(rX * rX + rZ * rZ))

  return $multi(pitch, yaw, roll)
}
Draw.ConvertToPitchYawRollIfNeeded = convertToPitchYawRollIfNeeded

const setOrientation: DrawingSetOrientation = (icon, first, second, third) => {
  if (first === undefined && second === undefined && third === undefined) {
    return
  }

  if (!isDOF(firstPart(first, second, third))) {
    if (first === undefined || second === undefined || third === undefined) {
      CRUTCH.msg(
        "|cFF0000Caller attempted to use {forward, right, up} system but not all values are specified!"
      )
      return
    }
  }

  const [newPitch, newYaw, newRoll] = convertToPitchYawRollIfNeeded(first, second, third)
  const pitch = newPitch ?? icon.orientation.pitch
  const yaw = newYaw ?? icon.orientation.yaw
  const roll = newRoll ?? icon.orientation.roll

  if (
    pitch !== icon.orientation.pitch ||
    yaw !== icon.orientation.yaw ||
    roll !== icon.orientation.roll
  ) {
    icon.orientation.pitch = pitch
    icon.orientation.yaw = yaw
    icon.orientation.roll = roll
    if (icon.isSpace) {
      icon.control.SetTransformRotation(pitch as number, yaw as number, roll as number)
    } else {
      icon.control.Set3DRenderSpaceOrientation(pitch as number, yaw as number, roll as number)
    }
  }
}
Draw.SetOrientation = setOrientation

const setTexture: DrawingSetTexture = (icon, path) => {
  if (path !== undefined && icon.texture !== path) {
    icon.texture = path
    if (icon.isSpace) {
      ;(icon.control.GetNamedChild("Texture") as TextureControl).SetTexture(path)
    } else {
      ;(icon.control as TextureControl).SetTexture(path)
    }
  }
}
Draw.SetTexture = setTexture

const setTextureHidden: DrawingSetTextureHidden = (icon, hidden) => {
  if (icon.isSpace) {
    ;(icon.control.GetNamedChild("Texture") as Control).SetHidden(hidden)
  } else {
    icon.control.SetHidden(hidden)
  }
}
Draw.SetTextureHidden = setTextureHidden

function createControlCommon(
  this: void,
  isSpace: boolean,
  control: Control,
  key: DrawingKey,
  texture: string | undefined,
  x: number,
  y: number,
  z: number,
  faceCamera: boolean,
  pitch: number | undefined,
  yaw: number | undefined,
  roll: number | undefined,
  updateFunc: DrawingUpdateFunc | undefined,
  setPositionFunc: DrawingSetPosition,
  setOrientationFunc: DrawingSetOrientation,
  setColorFunc?: DrawingSetColor,
  setTextureFunc?: DrawingSetTexture,
  setTextureHiddenFunc?: DrawingSetTextureHidden,
  setTextFunc?: DrawingSetText,
  setFontColorFunc?: DrawingSetFontColor,
  setBackdropColorsFunc?: DrawingSetBackdropColors,
  setBackdropRollFunc?: DrawingSetBackdropRoll,
  getCompositeFunc?: DrawingGetCompositeTexture
): undefined {
  const icon: DrawingIcon = {
    isSpace,
    control,
    faceCamera,
    x,
    y,
    z,
    orientation: { pitch, yaw, roll },
    texture,
    updateFunc,
    SetPosition: setPositionFunc,
    SetOrientation: setOrientationFunc,
    SetColor: setColorFunc,
    SetTexture: setTextureFunc,
    SetTextureHidden: setTextureHiddenFunc,
    SetText: setTextFunc,
    SetFontColor: setFontColorFunc,
    SetBackdropColors: setBackdropColorsFunc,
    SetBackdropRoll: setBackdropRollFunc,
    GetCompositeTexture: getCompositeFunc,
  }
  Draw.activeIcons[key] = icon
  Draw.MaybeStartPolling(faceCamera)

  let controlDebugString = ""
  if (texture !== undefined) {
    controlDebugString = string.format("texture |t100%%:100%%:%s|t", texture)
  } else if (setTextFunc !== undefined) {
    controlDebugString = "text label"
  }

  CRUTCH.dbgSpam(
    string.format(
      "Created %s key %s %s {%d, %d, %d} %s",
      controlDebugString,
      key,
      isSpace ? "Space" : "RenderSpace",
      x,
      y,
      z,
      control.GetName()
    )
  )
}
Draw.CreateControlCommon = createControlCommon

const ORIENTATION_TABLE: number[] = []

function createWorldTexture(
  this: void,
  texture: string,
  x: number,
  y: number,
  z: number,
  width: number,
  height: number,
  color: DrawingColor,
  useDepthBuffer: boolean,
  faceCamera: boolean,
  orientation?: DrawingOrientation,
  updateFunc?: DrawingUpdateFunc
): DrawingKey {
  const chosen = orientation ?? C.ZERO_ORIENTATION
  const [pitch, yaw, roll] = convertToPitchYawRollIfNeeded(chosen[0], chosen[1], chosen[2])
  ORIENTATION_TABLE[0] = pitch as number
  ORIENTATION_TABLE[1] = yaw as number
  ORIENTATION_TABLE[2] = roll as number

  const isSpace = !useDepthBuffer && width === height
  let control: Control
  let key: DrawingKey
  if (isSpace) {
    ;[control, key] = Draw.CreateSpaceTexture(
      texture,
      x,
      y,
      z,
      width,
      height,
      color,
      ORIENTATION_TABLE
    )
  } else {
    ;[control, key] = Draw.CreateRenderSpaceTexture(
      texture,
      x,
      y,
      z,
      width,
      height,
      color,
      useDepthBuffer,
      ORIENTATION_TABLE
    )
  }

  createControlCommon(
    isSpace,
    control,
    key,
    texture,
    x,
    y,
    z,
    faceCamera,
    pitch,
    yaw,
    roll,
    updateFunc,
    setPosition,
    setOrientation,
    setColor,
    setTexture,
    setTextureHidden
  )

  return key
}
Draw.CreateWorldTexture = createWorldTexture

export function removeWorldTexture(this: void, key: DrawingKey): undefined {
  const icon = Draw.activeIcons[key]
  if (icon === undefined) {
    CRUTCH.dbgOther('|cFF0000Icon "' + tostring(key) + '" does not exist')
    return
  }
  CRUTCH.dbgSpam("Removing texture " + tostring(key))

  if (icon.isSpace) {
    Draw.ReleaseSpaceControl(key)
  } else {
    Draw.ReleaseRenderSpaceTexture(key)
  }

  delete Draw.activeIcons[key]
  Draw.MaybeStopPolling()
}
Draw.RemoveWorldTexture = removeWorldTexture
