import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import { getSavedVariables } from "akasha/temper/addon/pages/trading/modules/trading-saved-variables/trading-saved-variables.module.code.ts"
import "akasha/temper/addon/pages/trading/trading-globals-declarations/trading-globals-declarations.type-declaration.d.ts"

globalThis.TemperListings = {
  getSavedVariables,
}
