import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-02"
import { getSavedVariables } from "../trading-saved-variables/trading-saved-variables.module.code.ts"

declare global {
  var TemperListings: {
    getSavedVariables: typeof getSavedVariables
  }
}

globalThis.TemperListings = {
  getSavedVariables,
}
