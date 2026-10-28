import { getSavedVariables } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type { ItemData } from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"

import { CRAFTED_BEFORE_THE_STAMP } from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"

const STAMP_KEPT_SECONDS = 30 * 86_400

let prunedThisSession = false

function uniqueIdAt(bagId: number, slotIndex: number): string | undefined {
  const id = GetItemUniqueId(bagId, slotIndex)
  if (id === undefined) return undefined
  const key = Id64ToString(id)
  return key === "" || key === "0" ? undefined : key
}

function pruneOldStamps(seen: Record<string, number>): undefined {
  if (prunedThisSession) return
  prunedThisSession = true
  const oldest = GetTimeStamp() - STAMP_KEPT_SECONDS
  for (const key of Object.keys(seen)) {
    const at = seen[key]
    if (at !== undefined && at !== CRAFTED_BEFORE_THE_STAMP && at < oldest) delete seen[key]
  }
}

function stamp(bagId: number, slotIndex: number, item: ItemData, heldBefore: boolean): undefined {
  if (item.crafted !== true) return
  const key = uniqueIdAt(bagId, slotIndex)
  if (key === undefined) return
  const sv = getSavedVariables()
  if (sv.craftedSeen === undefined) sv.craftedSeen = {}
  const seen = sv.craftedSeen
  let at = seen[key]
  if (at === undefined) {
    at = heldBefore ? CRAFTED_BEFORE_THE_STAMP : GetTimeStamp()
    seen[key] = at
  }
  item.craftedAt = at
}

export function stampScannedBag(
  locationKey: string,
  bagId: number,
  items: Record<number, ItemData>
): undefined {
  const sv = getSavedVariables()
  if (sv.craftedSeen !== undefined) pruneOldStamps(sv.craftedSeen)
  if (sv.craftedSeenPlaces === undefined) sv.craftedSeenPlaces = {}
  const place = `${locationKey}:${bagId}`
  const heldBefore = sv.craftedSeenPlaces[place] !== true
  const size = GetBagSize(bagId)
  for (let slot = 0; slot < size; slot++) {
    const item = items[slot]
    if (item !== undefined) stamp(bagId, slot, item, heldBefore)
  }
  sv.craftedSeenPlaces[place] = true
}

export function stampArrivedSlot(bagId: number, slotIndex: number, item: ItemData): undefined {
  stamp(bagId, slotIndex, item, false)
}
