import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import {
  setRenderSpaceOrigin,
  unpackColor,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-core/combat-alerts-drawing-core.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const Draw = CRUTCH.Drawing

let controlPool: ZoControlPool<TextureControl>

function acquireTexture(this: void): LuaMultiReturn<[TextureControl, number]> {
  const [control, key] = controlPool.AcquireObject()

  control.SetHidden(false)
  control.Create3DRenderSpace()
  control.SetColor(1, 1, 1, 1)

  return $multi(control, key)
}

Draw.CreateRenderSpaceTexture = (
  texture,
  x,
  y,
  z,
  width,
  height,
  color,
  useDepthBuffer,
  orientation
) => {
  const [control, key] = acquireTexture()
  control.SetTexture(texture)
  const [r, g, b, a] = unpackColor(color)
  control.SetColor(r, g, b, a)
  setRenderSpaceOrigin(control, x, y, z)
  control.Set3DLocalDimensions(width, height)
  control.Set3DRenderSpaceUsesDepthBuffer(useDepthBuffer)

  control.Set3DRenderSpaceOrientation(
    orientation[0] as number,
    orientation[1] as number,
    orientation[2] as number
  )
  return $multi(control, key)
}

Draw.ReleaseRenderSpaceTexture = (key) => {
  const icon = Draw.activeIcons[key]
  if (icon === undefined) {
    return
  }

  icon.control.SetHidden(true)
  icon.control.Destroy3DRenderSpace()

  controlPool.ReleaseObject(key as number)
}

Draw.InitializeRenderSpace = () => {
  TemperCombatAlertsDrawingCamera.Create3DRenderSpace()
  controlPool = ZO_ControlPool.New<TextureControl>(
    "TemperCombatAlertsDrawingTexture",
    TemperCombatAlertsDrawing
  )
}
