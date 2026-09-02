import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"

declare global {
  var TemperCatalog: {
    getSavedVariables: typeof getSavedVariables
  }
}

globalThis.TemperCatalog = {
  getSavedVariables,
}
