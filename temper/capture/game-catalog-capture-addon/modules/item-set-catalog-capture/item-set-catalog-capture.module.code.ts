import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

import type {
  ItemSetCatalogEntry,
  ItemSetCatalogPiece,
} from "akasha/temper/capture/shape/modules/item-set-catalog/item-set-catalog.module.code.ts"
import { runBatched } from "akasha/temper/capture/writer/modules/run-batched/run-batched.module.code.ts"
import {
  BATCH_DELAY,
  BATCH_SIZE,
} from "akasha/temper/catalog/core/modules/batch-config/batch-config.module.code.ts"
import { registerCatalogDomain } from "akasha/temper/catalog/core/modules/domain-registry/domain-registry.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/core/modules/saved-variables-accessor/saved-variables-accessor.module.code.ts"
import { resolveCategoryNames } from "akasha/temper/catalog/gear/item-set/modules/item-set-categories/item-set-categories.module.code.ts"

function collectItemSetCatalog(this: void, onComplete: (this: void) => void): undefined {
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
          if (itemLink === "") {
            pieces.push({ name: `Piece ${i}` })
            continue
          }
          pieces.push({
            name: zo_strformat("<<C:1>>", GetItemLinkName(itemLink)),
            itemId: GetItemLinkItemId(itemLink),
            armorType: GetItemLinkArmorType(itemLink),
            equipType: GetItemLinkEquipType(itemLink),
            weaponType: GetItemLinkWeaponType(itemLink),
          })
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
