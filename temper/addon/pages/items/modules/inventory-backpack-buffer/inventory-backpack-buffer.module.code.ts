import { getInventoryConfig } from "akasha/temper/addon/pages/items/modules/inventory-config/inventory-config.module.code.ts"
import { DEFAULT_BACKPACK_SETTINGS } from "akasha/temper/items/core/modules/backpack-settings-types/backpack-settings-types.module.code.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"

const DEFAULT_BUFFER_SLOTS = DEFAULT_BACKPACK_SETTINGS.bufferSlots

export function getConfiguredBufferSlots(): number {
  return getInventoryConfig().backpack?.bufferSlots ?? DEFAULT_BUFFER_SLOTS
}

function backpackFreeSlotsAboveBuffer(): number {
  return GetNumBagFreeSlots(BAG_BACKPACK) - getConfiguredBufferSlots()
}

export function hasRoomAboveBuffer(slotsNeeded: number): boolean {
  return backpackFreeSlotsAboveBuffer() >= slotsNeeded
}
