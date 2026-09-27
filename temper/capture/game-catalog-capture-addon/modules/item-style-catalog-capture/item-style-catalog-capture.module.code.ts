import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import type { ItemStyleCatalogData } from "akasha/temper/capture/shape/modules/item-style-catalog/item-style-catalog.module.code.ts"
import { registerCatalogDomain } from "akasha/temper/catalog/core/modules/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/core/modules/saved-variables-accessor/saved-variables-accessor.module.code.ts"

function collectItemStyleCatalog(this: void, onComplete: (this: void) => void): undefined {
  const names: ItemStyleCatalogData = {}
  for (let styleId = ITEMSTYLE_MIN_VALUE; styleId <= ITEMSTYLE_MAX_VALUE; styleId++) {
    const name = zo_strformat("<<1>>", GetItemStyleName(styleId))
    if (name !== "") names[styleId] = name
  }
  getSavedVariables().itemStyleCatalog = names
  onComplete()
  return undefined
}

registerCatalogDomain({ key: "itemStyleCatalog", collect: collectItemStyleCatalog })
