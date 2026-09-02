import { dontRotateGameCamera } from "../quiet-camera/quiet-camera.module.code.ts"
import { getSavedVariables } from "../quiet-saved-variables/quiet-saved-variables.module.code.ts"
import { BINDING_NAME_NOCAMROTATE_TOGGLE } from "../quiet-strings/quiet-strings.module.code.ts"

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

globalThis.NTY_ToggleRotateGameCamera = toggleRotateGameCamera
