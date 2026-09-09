import "@akasha/temper-addon-library-types/temper-catalog-global"

import { getSavedVariables } from "../../catalog-core/saved-variables-accessor/saved-variables-accessor.module.code.ts"

globalThis.TemperCatalog = {
  getSavedVariables,
}
