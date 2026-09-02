import type { SetId } from "@akasha/temper-equipment/set-ids"
import { keysOf } from "@akasha/temper-formula-framework/record-parts"
import type {
  Loadout,
  WeaponSlot,
  WeaponSlotItem,
} from "../loadout-types/loadout-types.module.code.ts"

export function clearIncompatibleSets(
  loadout: Loadout,
  incompatibleSetIds: readonly SetId[]
): Loadout {
  const incompatibleIds = new Set(incompatibleSetIds)

  if (incompatibleIds.size === 0) {
    return loadout
  }

  const clearedArmor = { ...loadout.armor }
  const armorSlots = keysOf(clearedArmor)
  for (const slot of armorSlots) {
    const item = clearedArmor[slot]
    if (item.itemType === "armor" && incompatibleIds.has(item.data.set)) {
      clearedArmor[slot] = {
        itemType: "armor" as const,
        data: { ...item.data, set: "no-set" },
      }
    }
  }

  const clearedJewelry = { ...loadout.jewelry }
  const jewelrySlots = keysOf(clearedJewelry)
  for (const slot of jewelrySlots) {
    const item = clearedJewelry[slot]
    if (item.itemType === "jewelry" && incompatibleIds.has(item.data.set)) {
      clearedJewelry[slot] = {
        itemType: "jewelry" as const,
        data: { ...item.data, set: "no-set" },
      }
    }
  }

  const clearWeaponBar = (bar: WeaponSlot) => {
    const clearedBar = { ...bar }
    const slots = keysOf(clearedBar)
    for (const slot of slots) {
      const item = clearedBar[slot]
      if (item.itemType === "weapon" && incompatibleIds.has(item.data.set)) {
        const updatedSlot: WeaponSlotItem = {
          itemType: "weapon",
          data: { ...item.data, set: "no-set" },
        }
        clearedBar[slot] = updatedSlot
      } else if (item.itemType === "shield" && incompatibleIds.has(item.data.set)) {
        const updatedSlot: WeaponSlotItem = {
          itemType: "shield",
          data: { ...item.data, set: "no-set" },
        }
        clearedBar[slot] = updatedSlot
      }
    }
    return clearedBar
  }

  const clearedPrimaryBar = clearWeaponBar(loadout["primary-weapon-bar"])
  const clearedBackupBar = clearWeaponBar(loadout["backup-weapon-bar"])

  return {
    ...loadout,
    armor: clearedArmor,
    jewelry: clearedJewelry,
    "primary-weapon-bar": clearedPrimaryBar,
    "backup-weapon-bar": clearedBackupBar,
  }
}
