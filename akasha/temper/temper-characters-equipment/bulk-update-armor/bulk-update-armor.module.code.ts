import type { ArmorTraitId } from "@akasha/temper-equipment/armor-traits"
import type { StandardArmorWeightId } from "@akasha/temper-equipment/armor-weight-ids"
import type { SetId } from "@akasha/temper-equipment/set-ids"
import type { SetTemplate } from "@akasha/temper-equipment/set-template"
import { armorSlots } from "@akasha/temper-equipment-kinds/armor-slots"
import type { EquipmentQualityOptionId } from "@akasha/temper-equipment-kinds/equipment-qualities"
import type { ArmorEnchantId } from "../armor-enchants/armor-enchants.module.code.ts"
import type { Loadout } from "../loadout-types/loadout-types.module.code.ts"
import { isSetValidForArmorSlot } from "../set-pattern-matcher/set-pattern-matcher.module.code.ts"

export function bulkUpdateArmorWeight(
  equipment: Loadout,
  oldValue: StandardArmorWeightId | null,
  newValue: StandardArmorWeightId | null
): Partial<Loadout> {
  const newArmor = { ...equipment.armor }
  const oldWeightId = oldValue ?? "no-weight"
  const newWeightId = newValue ?? "no-weight"

  for (const slotConfig of armorSlots.list) {
    const item = newArmor[slotConfig.id]
    if (item.itemType === "armor") {
      const currentWeight = item.data.weight
      if (currentWeight === oldWeightId) {
        newArmor[slotConfig.id] = {
          itemType: "armor",
          data: { ...item.data, weight: newWeightId },
        }
      }
    }
  }
  return { armor: newArmor }
}

export function bulkUpdateArmorTrait(
  equipment: Loadout,
  oldValue: ArmorTraitId,
  newValue: ArmorTraitId
): Partial<Loadout> {
  const newArmor = { ...equipment.armor }
  for (const slotConfig of armorSlots.list) {
    const item = newArmor[slotConfig.id]
    if (item.itemType === "armor") {
      const currentTrait = item.data.trait
      if (currentTrait === oldValue) {
        newArmor[slotConfig.id] = {
          itemType: "armor",
          data: { ...item.data, trait: newValue },
        }
      }
    }
  }

  const newPrimaryBar = { ...equipment["primary-weapon-bar"] }
  const newBackupBar = { ...equipment["backup-weapon-bar"] }

  if (newPrimaryBar["off-hand"].itemType === "shield") {
    const item = newPrimaryBar["off-hand"]
    const currentTrait = item.data.trait
    if (currentTrait === oldValue) {
      newPrimaryBar["off-hand"] = {
        itemType: "shield",
        data: { ...item.data, trait: newValue },
      }
    }
  }
  if (newBackupBar["off-hand"].itemType === "shield") {
    const item = newBackupBar["off-hand"]
    const currentTrait = item.data.trait
    if (currentTrait === oldValue) {
      newBackupBar["off-hand"] = {
        itemType: "shield",
        data: { ...item.data, trait: newValue },
      }
    }
  }

  return { armor: newArmor, "primary-weapon-bar": newPrimaryBar, "backup-weapon-bar": newBackupBar }
}

export function bulkUpdateArmorEnchant(
  equipment: Loadout,
  oldValue: ArmorEnchantId,
  newValue: ArmorEnchantId
): Partial<Loadout> {
  const newArmor = { ...equipment.armor }
  for (const slotConfig of armorSlots.list) {
    const item = newArmor[slotConfig.id]
    if (item.itemType === "armor") {
      const currentEnchant = item.data.enchantment
      if (currentEnchant === oldValue) {
        newArmor[slotConfig.id] = {
          itemType: "armor",
          data: { ...item.data, enchantment: newValue },
        }
      }
    }
  }

  const newPrimaryBar = { ...equipment["primary-weapon-bar"] }
  const newBackupBar = { ...equipment["backup-weapon-bar"] }

  if (newPrimaryBar["off-hand"].itemType === "shield") {
    const item = newPrimaryBar["off-hand"]
    const currentEnchant = item.data.enchantment
    if (currentEnchant === oldValue) {
      newPrimaryBar["off-hand"] = {
        itemType: "shield",
        data: { ...item.data, enchantment: newValue },
      }
    }
  }
  if (newBackupBar["off-hand"].itemType === "shield") {
    const item = newBackupBar["off-hand"]
    const currentEnchant = item.data.enchantment
    if (currentEnchant === oldValue) {
      newBackupBar["off-hand"] = {
        itemType: "shield",
        data: { ...item.data, enchantment: newValue },
      }
    }
  }

  return { armor: newArmor, "primary-weapon-bar": newPrimaryBar, "backup-weapon-bar": newBackupBar }
}

export function bulkUpdateArmorSet(
  equipment: Loadout,
  oldValue: SetId,
  newValue: SetId,
  availableSets: readonly SetTemplate[]
): Partial<Loadout> {
  const newArmor = { ...equipment.armor }
  const newSet = newValue !== "no-set" ? availableSets.find((s) => s.id === newValue) : null

  for (const slotConfig of armorSlots.list) {
    const item = newArmor[slotConfig.id]
    if (item.itemType === "armor") {
      const currentSet = item.data.set ?? "no-set"
      if (currentSet === oldValue) {
        if (!newSet || isSetValidForArmorSlot(newSet, slotConfig.id)) {
          newArmor[slotConfig.id] = {
            itemType: "armor",
            data: { ...item.data, set: newValue },
          }
        }
      }
    }
  }
  return { armor: newArmor }
}

export function bulkUpdateArmorQuality(
  equipment: Loadout,
  oldValue: EquipmentQualityOptionId,
  newValue: EquipmentQualityOptionId
): Partial<Loadout> {
  const newArmor = { ...equipment.armor }
  for (const slotConfig of armorSlots.list) {
    const item = newArmor[slotConfig.id]
    if (item.itemType === "armor") {
      const currentQuality = item.data.quality ?? "no-quality"
      if (currentQuality === "mythic" && oldValue !== "mythic") continue
      if (currentQuality === oldValue) {
        newArmor[slotConfig.id] = {
          itemType: "armor",
          data: { ...item.data, quality: newValue },
        }
      }
    }
  }

  const newPrimaryBar = { ...equipment["primary-weapon-bar"] }
  const newBackupBar = { ...equipment["backup-weapon-bar"] }

  if (newPrimaryBar["off-hand"].itemType === "shield") {
    const item = newPrimaryBar["off-hand"]
    const currentQuality = item.data.quality ?? "no-quality"
    if (!(currentQuality === "mythic" && oldValue !== "mythic") && currentQuality === oldValue) {
      newPrimaryBar["off-hand"] = {
        itemType: "shield",
        data: { ...item.data, quality: newValue },
      }
    }
  }
  if (newBackupBar["off-hand"].itemType === "shield") {
    const item = newBackupBar["off-hand"]
    const currentQuality = item.data.quality ?? "no-quality"
    if (!(currentQuality === "mythic" && oldValue !== "mythic") && currentQuality === oldValue) {
      newBackupBar["off-hand"] = {
        itemType: "shield",
        data: { ...item.data, quality: newValue },
      }
    }
  }

  return { armor: newArmor, "primary-weapon-bar": newPrimaryBar, "backup-weapon-bar": newBackupBar }
}
