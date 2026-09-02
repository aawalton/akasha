import "../companions-declarations/companions-declarations.module.code.ts"
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
import {
  refreshAllCompanionData,
  resetAllCompanionData,
} from "../companions-commands/companions-commands.module.code.ts"

declare global {
  var TemperCompanions_RefreshAllData: typeof refreshAllCompanionData
  var TemperCompanions_ResetAllData: typeof resetAllCompanionData
}

globalThis.TemperCompanions_RefreshAllData = refreshAllCompanionData
globalThis.TemperCompanions_ResetAllData = resetAllCompanionData
