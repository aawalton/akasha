import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-12"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-04"
import "@akasha/temper-eso-types/eso-functions-05"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import { collectCompanionProgress } from "../companions-progress/companions-progress.module.code.ts"
import { getSavedVariables } from "../companions-saved-variables/companions-saved-variables.module.code.ts"
import {
  captureAndSaveActiveCompanionBuild,
  setSelectedCompanionId,
} from "../companions-selector/companions-selector.module.code.ts"

export function refreshAllCompanionData(): undefined {
  if (HasActiveCompanion()) {
    captureAndSaveActiveCompanionBuild()
    collectCompanionProgress()
    setSelectedCompanionId(GetActiveCompanionDefId())
  }
}

export function resetAllCompanionData(): undefined {
  const savedVars = getSavedVariables()
  savedVars.companions = {}
  savedVars.selectedCompanionId = undefined
}
