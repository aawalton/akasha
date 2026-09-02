import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-02"
import { getSavedVariables } from "../trading-saved-variables/trading-saved-variables.module.code.ts"

globalThis.TemperListings = {
  getSavedVariables,
}
