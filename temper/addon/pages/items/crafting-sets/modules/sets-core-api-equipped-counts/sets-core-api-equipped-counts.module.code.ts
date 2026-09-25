import { asNumberOpt } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import {
  asGetSetEquippedInfoFn,
  asIndexNumberMap,
  asLibSlots,
} from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-core-casts/sets-core-casts.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-pins/eso-world-map-pins.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

const getSetEquippedInfo = asGetSetEquippedInfoFn(asLibSlots(lib)["_getSetEquippedInfo"])

function getNumEquippedItemsByItemIdsPublic(
  this: void,
  setsItemIds: { [itemId: number]: unknown } | undefined
): number {
  if (setsItemIds === undefined) {
    return 0
  }
  let equippedItems = 0
  const equippedItemsIds: number[] = []
  const bagWornItemCache = SHARED_INVENTORY.GetOrCreateBagCache(BAG_WORN)
  for (const [, data] of pairs(bagWornItemCache)) {
    equippedItemsIds.push(data.slotIndex)
  }
  if (equippedItemsIds.length > 0) {
    for (const [, equippedItemSlot] of pairs(asIndexNumberMap(equippedItemsIds))) {
      const wornItemId = tonumber(GetItemId(BAG_WORN, equippedItemSlot))
      if (wornItemId !== undefined && setsItemIds[wornItemId] !== undefined) {
        equippedItems = equippedItems + 1
      }
    }
  }
  return equippedItems
}
lib.GetNumEquippedItemsByItemIds = getNumEquippedItemsByItemIdsPublic

function getNumEquippedItemsBySetId(
  this: void,
  setId: number | undefined
): LuaMultiReturn<[number | undefined, number | undefined, number | undefined]> {
  if (setId === undefined) {
    return $multi(undefined, undefined, undefined)
  }
  const setsGetSetItemId = lib.GetSetItemId
  const itemId = setsGetSetItemId(setId)
  const [setIdRetRaw, equippedItems, maxEquipped] = getSetEquippedInfo(itemId)
  const setIdRet = asNumberOpt(setIdRetRaw)
  if (setIdRet === undefined) {
    return $multi(undefined, undefined, undefined)
  }
  return $multi(asNumberOpt(equippedItems), asNumberOpt(maxEquipped), itemId)
}
lib.GetNumEquippedItemsBySetId = getNumEquippedItemsBySetId

function getNumEquippedItemsByItemId(
  this: void,
  itemId: number | undefined
): LuaMultiReturn<[number | undefined, number | undefined, number | undefined]> {
  if (itemId === undefined) {
    return $multi(undefined, undefined, undefined)
  }
  const [setIdRetRaw, equippedItems, maxEquipped] = getSetEquippedInfo(itemId)
  const setIdRet = asNumberOpt(setIdRetRaw)
  if (setIdRet === undefined) {
    return $multi(undefined, undefined, undefined)
  }
  return $multi(asNumberOpt(equippedItems), asNumberOpt(maxEquipped), setIdRet)
}
lib.GetNumEquippedItemsByItemId = getNumEquippedItemsByItemId
