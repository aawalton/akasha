import "@akasha/temper-eso-types/eso-enums-04"
import "@akasha/temper-eso-types/eso-functions-09"
import "@akasha/temper-eso-types/eso-functions-10"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/tstl-language-extensions"

import type {
  TributePatronCatalogCard,
  TributePatronCatalogEntry,
} from "@akasha/temper-capture-shapes/tribute-catalog"
import { registerCatalogDomain } from "@akasha/temper-catalog-core/domain-registry"
import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"

export function collectTributeCatalog(this: void, onComplete: (this: void) => void): undefined {
  const savedVars = getSavedVariables()
  const catalog: Record<number, TributePatronCatalogEntry> = {}

  const numPatrons = GetNumTributePatrons()
  for (let i = 1; i <= numPatrons; i++) {
    const patronId = GetTributePatronIdAtIndex(i)
    if (patronId === 0) continue

    const collectibleId = GetTributePatronCollectibleId(patronId)
    if (
      collectibleId === 0 ||
      GetCollectibleCategoryType(collectibleId) !== COLLECTIBLE_CATEGORY_TYPE_TRIBUTE_PATRON
    )
      continue

    const name = zo_strformat("<<1>>", GetTributePatronName(patronId))
    if (name === "") continue

    const categoryId = GetTributePatronCategoryId(patronId)
    const categoryName = zo_strformat("<<1>>", GetTributePatronCategoryName(categoryId))

    const cards: Record<number, TributePatronCatalogCard> = {}
    const numDockCards = GetTributePatronNumDockCards(patronId)

    for (let cardIndex = 1; cardIndex <= numDockCards; cardIndex++) {
      const [baseCardId, upgradeCardId] = GetTributePatronDockCardInfoByIndex(patronId, cardIndex)
      if (upgradeCardId === 0) continue

      const baseCardName = zo_strformat("<<1>>", GetTributeCardName(baseCardId))
      const upgradeCardName = zo_strformat("<<1>>", GetTributeCardName(upgradeCardId))

      cards[cardIndex] = { baseCardName, upgradeCardName }
    }

    catalog[patronId] = {
      name,
      categoryName,
      collectibleId,
      cards,
    }
  }

  savedVars.tributeCatalog = catalog
  onComplete()
}
registerCatalogDomain({ key: "tributeCatalog", collect: collectTributeCatalog })
