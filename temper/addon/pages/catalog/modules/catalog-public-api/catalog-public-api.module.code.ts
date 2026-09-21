import "akasha/temper/addon/type/temper-catalog-global/temper-catalog-global.type-declaration.d.ts"

import { getSavedVariables } from "akasha/temper/catalog/core/modules/saved-variables-accessor/saved-variables-accessor.module.code.ts"

globalThis.TemperCatalog = {
  getSavedVariables,
}
