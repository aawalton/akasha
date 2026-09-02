import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-08"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-globals"

import type {
  ItemSetCatalogEntry,
  ItemSetCatalogPiece,
} from "@akasha/temper-capture-shapes/item-set-catalog"
import { runBatched } from "@akasha/temper-capture-writer/run-batched"
import { BATCH_DELAY, BATCH_SIZE } from "@akasha/temper-catalog-core/batch-config"
import { registerCatalogDomain } from "@akasha/temper-catalog-core/domain-registry"
import { getSavedVariables } from "@akasha/temper-catalog-core/saved-variables-accessor"
export function resolveCategoryNames(itemSetId: number): {
  categoryName?: string
  subcategoryName?: string
} {
  const directId = GetItemSetCollectionCategoryId(itemSetId)
  if (directId === 0) return {}

  const parentId = GetItemSetCollectionCategoryParentId(directId)
  if (parentId === 0) {
    const name = zo_strformat("<<1>>", GetItemSetCollectionCategoryName(directId))
    return { categoryName: name !== "" ? name : undefined }
  }

  let rootId = parentId
  let grandParentId = GetItemSetCollectionCategoryParentId(rootId)
  while (grandParentId !== 0) {
    rootId = grandParentId
    grandParentId = GetItemSetCollectionCategoryParentId(rootId)
  }

  const rootName = zo_strformat("<<1>>", GetItemSetCollectionCategoryName(rootId))
  const subName = zo_strformat("<<1>>", GetItemSetCollectionCategoryName(directId))
  return {
    categoryName: rootName !== "" ? rootName : undefined,
    subcategoryName: subName !== "" ? subName : undefined,
  }
}

export function collectItemSetCatalog(this: void, onComplete: (this: void) => void): undefined {
  const savedVars = getSavedVariables()
  const catalog: Record<number, ItemSetCatalogEntry> = {}

  const setIds: number[] = []
  let itemSetId = GetNextItemSetCollectionId(undefined)
  while (itemSetId !== undefined && itemSetId !== 0) {
    setIds.push(itemSetId)
    itemSetId = GetNextItemSetCollectionId(itemSetId)
  }

  runBatched<number>({
    items: setIds,
    batchSize: BATCH_SIZE,
    batchDelay: BATCH_DELAY,
    process: function (this: void, setId: number): undefined {
      const name = zo_strformat("<<1>>", GetItemSetName(setId))
      const totalSlots = GetNumItemSetCollectionPieces(setId)

      if (name !== undefined && name !== "" && totalSlots > 0) {
        const pieces: ItemSetCatalogPiece[] = []

        for (let i = 1; i <= totalSlots; i++) {
          const [pieceId] = GetItemSetCollectionPieceInfo(setId, i)
          if (pieceId === 0) continue

          const itemLink = GetItemSetCollectionPieceItemLink(
            pieceId,
            LINK_STYLE_DEFAULT,
            ITEM_TRAIT_TYPE_NONE,
            undefined
          )
          const pieceName =
            itemLink !== "" ? zo_strformat("<<C:1>>", GetItemLinkName(itemLink)) : `Piece ${i}`
          pieces.push({ name: pieceName })
        }

        catalog[setId] = {
          name,
          ...resolveCategoryNames(setId),
          totalSlots,
          pieces,
        }
      }
    },
    onComplete: function (this: void): undefined {
      savedVars.itemSetCatalog = catalog
      onComplete()
    },
  })
}
registerCatalogDomain({ key: "itemSetCatalog", collect: collectItemSetCatalog })
