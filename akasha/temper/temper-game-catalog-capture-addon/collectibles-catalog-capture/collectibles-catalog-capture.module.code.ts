import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/eso-functions-09"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/tstl-language-extensions"

import type { CollectiblesCatalogData } from "@akasha/temper-capture-shapes/collectibles-catalog"
import { runBatched } from "@akasha/temper-capture-writer/run-batched"
import { BATCH_DELAY, BATCH_SIZE } from "@akasha/temper-catalog-core/batch-config"
import { registerCatalogDomain } from "@akasha/temper-catalog-core/domain-registry"
import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"
import { requireNumericKey } from "@akasha/temper-narrow/require-numeric-key"
import { requireDefined } from "@akasha/utils-narrow/require-defined"

export interface CollectibleWorkItem {
  categoryIndex: number
  subCategoryIndex: number | undefined
  subCategoryName: string
  collectibleIndex: number
}

export function collectCollectiblesCatalog(
  this: void,
  onComplete: (this: void) => void
): undefined {
  const savedVars = getSavedVariables()
  const catalog: CollectiblesCatalogData = { categories: {} }

  const workItems: CollectibleWorkItem[] = []

  for (let categoryIndex = 1; categoryIndex <= GetNumCollectibleCategories(); categoryIndex++) {
    const [categoryNameRaw, numSubCategories, numGeneralCollectibles] =
      GetCollectibleCategoryInfo(categoryIndex)
    const categoryName = zo_strformat("<<1>>", categoryNameRaw)

    catalog.categories[categoryIndex] = {
      name: categoryName,
      subCategories: {},
    }

    for (let collectibleIndex = 1; collectibleIndex <= numGeneralCollectibles; collectibleIndex++) {
      workItems.push({
        categoryIndex,
        subCategoryIndex: undefined,
        subCategoryName: "General",
        collectibleIndex,
      })
    }

    for (let subIndex = 1; subIndex <= numSubCategories; subIndex++) {
      const [subNameRaw, numCollectibles] = GetCollectibleSubCategoryInfo(categoryIndex, subIndex)
      const subName = zo_strformat("<<1>>", subNameRaw)
      for (let collectibleIndex = 1; collectibleIndex <= numCollectibles; collectibleIndex++) {
        workItems.push({
          categoryIndex,
          subCategoryIndex: subIndex,
          subCategoryName: subName !== "" ? subName : `Subcategory ${subIndex}`,
          collectibleIndex,
        })
      }
    }
  }

  runBatched<CollectibleWorkItem>({
    items: workItems,
    batchSize: BATCH_SIZE,
    batchDelay: BATCH_DELAY,
    process: function (this: void, item: CollectibleWorkItem): undefined {
      const id = GetCollectibleId(item.categoryIndex, item.subCategoryIndex, item.collectibleIndex)
      if (id === 0) return

      if (IsCollectibleBlacklisted(id)) return

      const collectibleName = GetCollectibleName(id)
      if (collectibleName === "") return

      const categoryType = GetCollectibleCategoryType(id)
      const categoryEntry = catalog.categories[item.categoryIndex]
      if (!categoryEntry) return

      const entry = {
        name: zo_strformat("<<1>>", collectibleName),
        categoryType,
      }

      if (item.subCategoryIndex === undefined) {
        if (!categoryEntry.generalSubCategory) {
          categoryEntry.generalSubCategory = {
            name: item.subCategoryName,
            collectibles: {},
          }
        }
        categoryEntry.generalSubCategory.collectibles[id] = entry
      } else {
        if (!categoryEntry.subCategories[item.subCategoryIndex]) {
          categoryEntry.subCategories[item.subCategoryIndex] = {
            name: item.subCategoryName,
            collectibles: {},
          }
        }
        requireDefined(
          categoryEntry.subCategories[item.subCategoryIndex],
          "collectible subCategory"
        ).collectibles[id] = entry
      }
    },
    onComplete: function (this: void): undefined {
      for (const [key, categoryEntry] of Object.entries(catalog.categories)) {
        if (
          Object.keys(categoryEntry.subCategories).length === 0 &&
          !categoryEntry.generalSubCategory
        ) {
          delete catalog.categories[requireNumericKey(key, "collectible category")]
        }
      }
      savedVars.collectiblesCatalog = catalog
      onComplete()
    },
  })
}
registerCatalogDomain({ key: "collectiblesCatalog", collect: collectCollectiblesCatalog })
