import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import { unpackColor } from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-core/combat-alerts-drawing-core.module.code.ts"
import type {
  DrawingColor,
  DrawingOrientation,
  DrawingSetBackdropColors,
  DrawingSetBackdropRoll,
  DrawingSetText,
  DrawingUpdateFunc,
  SpaceOptions,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const Draw = CRUTCH.Drawing
const C = CRUTCH.Constants

let controlPool: ZoControlPool

function child<T extends Control>(this: void, control: Control, name: string): T {
  return control.GetNamedChild(name) as T
}

function acquireControl(this: void): LuaMultiReturn<[Control, string]> {
  const [control, key] = controlPool.AcquireObject()
  control.SetTransformNormalizedOriginPoint(0.5, 0.5)

  control.SetHidden(false)
  control.SetTransformScale(0.01)

  control.SetAnchor(CENTER, GuiRoot, CENTER)

  const spaceKey = "Space" + key
  return $multi(control, spaceKey)
}

function createSpaceControlCommon(
  this: void,
  x: number,
  y: number,
  z: number,
  orientation: DrawingOrientation
): LuaMultiReturn<[Control, string]> {
  const [control, key] = acquireControl()

  const [oX, , oZ] = GuiRender3DPositionToWorldPosition(0, 0, 0)
  const tX = (x - oX) / 100
  const tY = y / 100
  const tZ = (z - oZ) / 100
  control.SetTransformOffset(tX, tY, tZ)

  control.SetTransformRotation(
    orientation[0] as number,
    orientation[1] as number,
    orientation[2] as number
  )
  return $multi(control, key)
}

Draw.ReleaseSpaceControl = (key) => {
  const icon = Draw.activeIcons[key]
  if (icon === undefined) {
    return
  }
  const control = icon.control

  control.SetHidden(true)
  const backdrop = child<BackdropControl>(control, "Backdrop")
  backdrop.SetHidden(true)
  backdrop.SetAlpha(1)
  backdrop.SetScale(1)
  const texture = child<TextureControl>(control, "Texture")
  texture.SetHidden(true)
  texture.SetAlpha(1)
  texture.SetScale(1)
  const composite = child<TextureCompositeControl>(control, "Composite")
  composite.SetHidden(true)
  composite.ClearAllSurfaces()
  composite.SetAlpha(1)
  composite.SetScale(1)
  const label = child<LabelControl>(control, "Label")
  label.SetHidden(true)
  label.SetAlpha(1)
  label.SetScale(1)

  const realKey = tonumber(string.sub(tostring(key), 6)) as number
  controlPool.ReleaseObject(realKey)
}

Draw.CreateSpaceTexture = (texture, x, y, z, width, _height, color, orientation) => {
  const [control, key] = createSpaceControlCommon(x, y, z, orientation)

  const textureControl = child<TextureControl>(control, "Texture")
  textureControl.SetHidden(false)
  textureControl.SetTexture(texture)
  const [r, g, b, a] = unpackColor(color)
  textureControl.SetColor(r, g, b, a)
  textureControl.SetScale(width)

  return $multi(control, key)
}

const setText: DrawingSetText = (icon, text) => {
  const label = child<LabelControl>(icon.control, "Label")
  if (label.GetText() !== text) {
    label.SetText(text)
    label.SetDimensions(2000, 2000)
    label.SetDimensions(label.GetTextWidth(), label.GetTextHeight())
  }
}

const setBackdropColors: DrawingSetBackdropColors = (
  icon,
  centerR,
  centerG,
  centerB,
  centerA,
  edgeR,
  edgeG,
  edgeB,
  edgeA
) => {
  const backdrop = child<BackdropControl>(icon.control, "Backdrop")

  if (centerR !== undefined || centerG !== undefined || centerB !== undefined) {
    backdrop.SetCenterColor(centerR as number, centerG as number, centerB as number, centerA)
  }

  if (edgeR !== undefined || edgeG !== undefined || edgeB !== undefined) {
    backdrop.SetEdgeColor(edgeR as number, edgeG as number, edgeB as number, edgeA)
  }
}

const setBackdropRoll: DrawingSetBackdropRoll = (icon, roll) => {
  child<BackdropControl>(icon.control, "Backdrop").SetTransformRotation(0, 0, roll)
}

function createSpaceControl(
  this: void,
  x: number,
  y: number,
  z: number,
  faceCamera: boolean,
  orientation: DrawingOrientation | undefined,
  options: SpaceOptions,
  updateFunc?: DrawingUpdateFunc
): string {
  const chosen = orientation ?? C.ZERO_ORIENTATION
  const [control, key] = createSpaceControlCommon(x, y, z, chosen)

  const labelOptions = options.label
  if (labelOptions?.text !== undefined) {
    const label = child<LabelControl>(control, "Label")
    label.SetFont(CRUTCH.GetStyles().GetMarkerFont(labelOptions.size as number))
    label.SetAlpha(1)
    const [r, g, b, a] = unpackColor(labelOptions.color as DrawingColor)
    label.SetColor(r, g, b, a)
    label.SetText(labelOptions.text)
    label.SetDimensions(5000, 5000)
    label.SetDimensions(label.GetTextWidth() + 5, label.GetTextHeight() + 5)
    label.SetHidden(false)
  }

  const compositeOptions = options.composite
  if (compositeOptions?.size !== undefined) {
    const composite = child<TextureCompositeControl>(control, "Composite")
    composite.SetScale(compositeOptions.size)
    compositeOptions.init(composite)
    composite.SetHidden(false)
  }

  const textureOptions = options.texture
  if (textureOptions?.path !== undefined) {
    const textureControl = child<TextureControl>(control, "Texture")
    textureControl.SetTexture(textureOptions.path)

    if (textureOptions.left !== undefined) {
      textureControl.SetTextureCoords(
        textureOptions.left,
        textureOptions.right as number,
        textureOptions.top as number,
        textureOptions.bottom as number
      )
    }

    const [r, g, b, a] = unpackColor(textureOptions.color as DrawingColor)
    textureControl.SetColor(r, g, b, a)
    textureControl.SetScale(textureOptions.size as number)
    textureControl.SetHidden(false)
  }

  const backdropOptions = options.backdrop
  if (backdropOptions?.centerColor !== undefined) {
    const backdrop = child<BackdropControl>(control, "Backdrop")
    backdrop.SetDimensions(backdropOptions.width ?? 100, backdropOptions.height ?? 100)
    const [cR, cG, cB, cA] = unpackColor(backdropOptions.centerColor)
    backdrop.SetCenterColor(cR, cG, cB, cA)
    const [eR, eG, eB, eA] = unpackColor(backdropOptions.edgeColor as DrawingColor)
    backdrop.SetEdgeColor(eR, eG, eB, eA)
    backdrop.SetTransformRotation(0, 0, backdropOptions.roll ?? 0)
    backdrop.SetHidden(false)
  }

  const [pitch, yaw, roll] = Draw.ConvertToPitchYawRollIfNeeded(chosen[0], chosen[1], chosen[2])

  const hasTexture = textureOptions !== undefined
  Draw.CreateControlCommon(
    true,
    control,
    key,
    textureOptions?.path,
    x,
    y,
    z,
    faceCamera,
    pitch,
    yaw,
    roll,
    updateFunc,
    Draw.SetPosition,
    Draw.SetOrientation,
    hasTexture ? Draw.SetColor : undefined,
    hasTexture ? Draw.SetTexture : undefined,
    hasTexture ? Draw.SetTextureHidden : undefined,
    labelOptions !== undefined ? setText : undefined,
    labelOptions !== undefined
      ? (icon, r, g, b, a) => {
          Draw.SetColor(icon, r, g, b, a, "Label")
        }
      : undefined,
    backdropOptions !== undefined ? setBackdropColors : undefined,
    backdropOptions !== undefined ? setBackdropRoll : undefined,
    compositeOptions !== undefined
      ? (icon) => child<TextureCompositeControl>(icon.control, "Composite")
      : undefined
  )

  return key
}
Draw.CreateSpaceControl = createSpaceControl

Draw.CreateSpaceLabel = (text, x, y, z, fontSize, color, faceCamera, orientation, updateFunc) => {
  const options: SpaceOptions = {
    label: {
      text,
      size: fontSize,
      color,
    },
  }
  return createSpaceControl(x, y, z, faceCamera, orientation, options, updateFunc)
}

Draw.InitializeSpace = () => {
  controlPool = ZO_ControlPool.New("TemperCombatAlertsSpaceControl", TemperCombatAlertsSpace)
}
