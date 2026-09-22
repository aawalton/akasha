import { dontRotateGameCamera } from "akasha/temper/addon/pages/hud/temper-interface/modules/quiet-camera/quiet-camera.module.code.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/hud/temper-interface/modules/quiet-saved-variables/quiet-saved-variables.module.code.ts"
import { BINDING_NAME_NOCAMROTATE_TOGGLE } from "akasha/temper/addon/pages/hud/temper-interface/modules/quiet-strings/quiet-strings.module.code.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/addon/pages/hud/temper-interface/quiet-camera-keybind-declarations/quiet-camera-keybind-declarations.type-declaration.d.ts"

ZO_CreateStringId("SI_BINDING_NAME_NOCAMROTATE_TOGGLE", BINDING_NAME_NOCAMROTATE_TOGGLE)

function toggleRotateGameCamera(this: void): undefined {
  const savedVars = getSavedVariables()
  if (savedVars.noCameraSpin) {
    savedVars.noCameraSpin = false
  } else {
    savedVars.noCameraSpin = true
  }
  dontRotateGameCamera()
}

globalThis.TemperToggleRotateGameCamera = toggleRotateGameCamera
