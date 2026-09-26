import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-declarations/combat-alerts-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const Draw = CRUTCH.Drawing

function doUpdate(this: void): undefined {
  let fX: number | undefined
  let fY = 0
  let fZ = 0
  let rX = 0
  let rY = 0
  let rZ = 0
  let uX = 0
  let uY = 0
  let uZ = 0

  let cameraPitch = 0
  let cameraYaw = 0

  let cX: number | undefined
  let cY = 0
  let cZ = 0
  Set3DRenderSpaceToCurrentCamera("TemperCombatAlertsDrawingCamera")

  for (const [, icon] of pairs(Draw.activeIcons)) {
    if (icon.updateFunc !== undefined) {
      icon.updateFunc(icon)
    }

    if (icon.faceCamera) {
      if (fX === undefined) {
        const camera = TemperCombatAlertsDrawingCamera
        ;[fX, fY, fZ] = camera.Get3DRenderSpaceForward()
        ;[rX, rY, rZ] = camera.Get3DRenderSpaceRight()
        ;[uX, uY, uZ] = camera.Get3DRenderSpaceUp()

        cameraPitch = zo_atan2(fY, zo_sqrt(fX * fX + fZ * fZ))
        cameraYaw = zo_atan2(fX, fZ) - math.pi
      }

      if (icon.isSpace) {
        icon.control.SetTransformRotation(cameraPitch, cameraYaw, 0)
      } else {
        icon.control.Set3DRenderSpaceForward(fX, fY, fZ)
        icon.control.Set3DRenderSpaceRight(rX, rY, rZ)
        icon.control.Set3DRenderSpaceUp(uX, uY, uZ)
      }
    }

    if (CRUTCH.savedOptions.drawing.useLevels && !icon.isSpace) {
      if (cX === undefined) {
        const [oX, oY, oZ] = TemperCombatAlertsDrawingCamera.Get3DRenderSpaceOrigin()
        ;[cX, cY, cZ] = GuiRender3DPositionToWorldPosition(oX, oY, oZ)
      }

      const distanceToCamera = math.floor(
        CRUTCH.GetSquaredDistance(icon.x, icon.y, icon.z, cX, cY, cZ)
      )
      icon.control.SetDrawLevel(-distanceToCamera)
    }
  }
}

let polling = false

function hasIcons(this: void): boolean {
  const [key] = next(Draw.activeIcons)
  return key !== undefined
}

Draw.MaybeStartPolling = (updateImmediately) => {
  if (polling) {
    if (updateImmediately === true) {
      doUpdate()
    }
    return
  }

  if (!hasIcons()) {
    return
  }

  EVENT_MANAGER.RegisterForUpdate(
    CRUTCH.name + "DrawingUpdate",
    CRUTCH.savedOptions.drawing.interval,
    doUpdate
  )
  polling = true

  doUpdate()
}

Draw.MaybeStopPolling = () => {
  if (!polling) {
    return
  }

  if (hasIcons()) {
    return
  }

  EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "DrawingUpdate")
  polling = false
}

Draw.ForceRestartPolling = () => {
  EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "DrawingUpdate")
  polling = false
  Draw.MaybeStartPolling()
}
