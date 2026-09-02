import type { CharacterState } from "@akasha/temper-character-build/build-types"
import { weaponTypes } from "@akasha/temper-characters-equipment/weapon-types-data"
import { companionArmorSlots } from "@akasha/temper-companions-core/companion-armor-slots"
import {
  ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT,
  ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT,
  ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT,
} from "@akasha/temper-companions-core/companion-eso-trait-map"
import { companionJewelrySlots } from "@akasha/temper-companions-core/companion-jewelry-slots"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import { companionWeaponTypes } from "@akasha/temper-companions-core/companion-weapon-types"
import { companions as companionsData } from "@akasha/temper-companions-core/companions"
import {
  PLAYER_ARMOR_TRAIT_TO_ESO,
  PLAYER_JEWELRY_TRAIT_TO_ESO,
  PLAYER_WEAPON_TRAIT_TO_ESO,
} from "@akasha/temper-equipment/eso-trait-map"
import { armorSlots } from "@akasha/temper-equipment-kinds/armor-slots"
import { resolveQuality } from "@akasha/temper-equipment-kinds/equipment-qualities"
import { jewelrySlots } from "@akasha/temper-equipment-kinds/jewelry-slots"
import {
  COMPANION_QUALITY_TO_ESO,
  ESO_EQUIP_TYPES,
} from "@akasha/temper-items-core/eso-companion-equipment-constants-data"
import {
  PLAYER_ARMOR_TYPE_TO_ESO,
  PLAYER_QUALITY_TO_ESO,
  PLAYER_WEAPON_TYPE_TO_ESO,
} from "@akasha/temper-items-core/eso-player-equipment-constants-data"
import type {
  WantedCompanionEquipmentSignature,
  WantedEquipmentSignature,
} from "../inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"

const PLAYER_ARMOR_SLOT_TO_EQUIP_TYPE: Record<string, number> = {
  head: ESO_EQUIP_TYPES.EQUIP_TYPE_HEAD,
  shoulders: ESO_EQUIP_TYPES.EQUIP_TYPE_SHOULDERS,
  chest: ESO_EQUIP_TYPES.EQUIP_TYPE_CHEST,
  hands: ESO_EQUIP_TYPES.EQUIP_TYPE_HAND,
  waist: ESO_EQUIP_TYPES.EQUIP_TYPE_WAIST,
  legs: ESO_EQUIP_TYPES.EQUIP_TYPE_LEGS,
  feet: ESO_EQUIP_TYPES.EQUIP_TYPE_FEET,
}

const PLAYER_JEWELRY_SLOT_TO_EQUIP_TYPE: Record<string, number> = {
  necklace: ESO_EQUIP_TYPES.EQUIP_TYPE_NECK,
  "ring-1": ESO_EQUIP_TYPES.EQUIP_TYPE_RING,
  "ring-2": ESO_EQUIP_TYPES.EQUIP_TYPE_RING,
}

const COMPANION_WEAPON_TRAIT_TO_ESO: Record<string, number> = {}
for (const [esoType, traitId] of Object.entries(ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT)) {
  COMPANION_WEAPON_TRAIT_TO_ESO[traitId] = Number(esoType)
}

const COMPANION_ARMOR_TRAIT_TO_ESO: Record<string, number> = {}
for (const [esoType, traitId] of Object.entries(ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT)) {
  COMPANION_ARMOR_TRAIT_TO_ESO[traitId] = Number(esoType)
}

const COMPANION_JEWELRY_TRAIT_TO_ESO: Record<string, number> = {}
for (const [esoType, traitId] of Object.entries(ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT)) {
  COMPANION_JEWELRY_TRAIT_TO_ESO[traitId] = Number(esoType)
}

export function compileWantedEquipmentForBuild(
  decoded: CharacterState,
  esoCharId: string
): readonly WantedEquipmentSignature[] {
  const signatures: WantedEquipmentSignature[] = []

  for (const slotId of armorSlots.ids) {
    const slot = decoded.equipment.armor[slotId]
    if (slot.itemType !== "armor") continue
    const traitType = PLAYER_ARMOR_TRAIT_TO_ESO[slot.data.trait]
    if (traitType == null || traitType === 0) continue
    const equipType = PLAYER_ARMOR_SLOT_TO_EQUIP_TYPE[slotId]
    if (equipType == null) continue

    const quality = PLAYER_QUALITY_TO_ESO[resolveQuality(slot.data.quality)] ?? 5
    const armorType = PLAYER_ARMOR_TYPE_TO_ESO[slot.data.weight]
    const sig: WantedEquipmentSignature = { esoCharId, equipType, traitType, quality }
    if (armorType != null && armorType !== 0) sig.armorType = armorType
    signatures.push(sig)
  }

  for (const slotId of jewelrySlots.ids) {
    const slot = decoded.equipment.jewelry[slotId]
    if (slot.itemType !== "jewelry") continue
    const traitType = PLAYER_JEWELRY_TRAIT_TO_ESO[slot.data.trait]
    if (traitType == null || traitType === 0) continue
    const equipType = PLAYER_JEWELRY_SLOT_TO_EQUIP_TYPE[slotId]
    if (equipType == null) continue

    const quality = PLAYER_QUALITY_TO_ESO[resolveQuality(slot.data.quality)] ?? 5
    signatures.push({ esoCharId, equipType, traitType, quality })
  }

  for (const barId of ["primary-weapon-bar", "backup-weapon-bar"] as const) {
    const bar = decoded.equipment[barId]

    const mainHand = bar["main-hand"]
    if (mainHand.itemType === "weapon" && mainHand.data.type !== "no-type") {
      const traitType = PLAYER_WEAPON_TRAIT_TO_ESO[mainHand.data.trait]
      if (traitType != null && traitType !== 0) {
        const weaponTypeData = weaponTypes.data[mainHand.data.type]
        const isTwoHanded = weaponTypeData?.isTwoHanded ?? false
        const equipType = isTwoHanded
          ? ESO_EQUIP_TYPES.EQUIP_TYPE_TWO_HAND
          : ESO_EQUIP_TYPES.EQUIP_TYPE_ONE_HAND
        const quality = PLAYER_QUALITY_TO_ESO[resolveQuality(mainHand.data.quality)] ?? 5
        const weaponType = PLAYER_WEAPON_TYPE_TO_ESO[mainHand.data.type]
        const sig: WantedEquipmentSignature = { esoCharId, equipType, traitType, quality }
        if (weaponType != null) sig.weaponType = weaponType
        signatures.push(sig)
      }
    } else if (mainHand.itemType === "shield") {
      const traitType = PLAYER_ARMOR_TRAIT_TO_ESO[mainHand.data.trait]
      if (traitType != null && traitType !== 0) {
        const quality = PLAYER_QUALITY_TO_ESO[resolveQuality(mainHand.data.quality)] ?? 5
        signatures.push({
          esoCharId,
          equipType: ESO_EQUIP_TYPES.EQUIP_TYPE_OFF_HAND,
          traitType,
          quality,
        })
      }
    }

    const offHand = bar["off-hand"]
    if (offHand.itemType === "weapon" && offHand.data.type !== "no-type") {
      const traitType = PLAYER_WEAPON_TRAIT_TO_ESO[offHand.data.trait]
      if (traitType != null && traitType !== 0) {
        const weaponTypeData = weaponTypes.data[offHand.data.type]
        const isTwoHanded = weaponTypeData?.isTwoHanded ?? false
        const equipType = isTwoHanded
          ? ESO_EQUIP_TYPES.EQUIP_TYPE_TWO_HAND
          : ESO_EQUIP_TYPES.EQUIP_TYPE_ONE_HAND
        const quality = PLAYER_QUALITY_TO_ESO[resolveQuality(offHand.data.quality)] ?? 5
        const weaponType = PLAYER_WEAPON_TYPE_TO_ESO[offHand.data.type]
        const sig: WantedEquipmentSignature = { esoCharId, equipType, traitType, quality }
        if (weaponType != null) sig.weaponType = weaponType
        signatures.push(sig)
      }
    } else if (offHand.itemType === "shield") {
      const traitType = PLAYER_ARMOR_TRAIT_TO_ESO[offHand.data.trait]
      if (traitType != null && traitType !== 0) {
        const quality = PLAYER_QUALITY_TO_ESO[resolveQuality(offHand.data.quality)] ?? 5
        signatures.push({
          esoCharId,
          equipType: ESO_EQUIP_TYPES.EQUIP_TYPE_OFF_HAND,
          traitType,
          quality,
        })
      }
    }
  }

  return signatures
}

export function compileWantedCompanionEquipmentForBuild(
  decoded: CompanionState,
  companionId: string
): readonly WantedCompanionEquipmentSignature[] {
  const signatures: WantedCompanionEquipmentSignature[] = []

  const companionName = companionsData.has(companionId)
    ? companionsData.data[companionId].name
    : companionId

  for (const slotId of companionArmorSlots.ids) {
    const slot = decoded.equipment.armor[slotId]
    if (slot.itemType !== "armor") continue
    if (slot.data.trait === "no-trait") continue
    const traitType = COMPANION_ARMOR_TRAIT_TO_ESO[slot.data.trait]
    if (traitType == null) continue
    const equipType = companionArmorSlots.data[slotId].equipType
    if (equipType == null) continue

    const quality = COMPANION_QUALITY_TO_ESO[slot.data.quality] ?? 5
    const armorType = PLAYER_ARMOR_TYPE_TO_ESO[slot.data.weight]
    const sig: WantedCompanionEquipmentSignature = {
      companionName,
      equipType,
      traitType,
      quality,
    }
    if (armorType != null && armorType !== 0) sig.armorType = armorType
    signatures.push(sig)
  }

  for (const slotId of companionJewelrySlots.ids) {
    const slot = decoded.equipment.jewelry[slotId]
    if (slot.itemType !== "jewelry") continue
    if (slot.data.trait === "no-trait") continue
    const traitType = COMPANION_JEWELRY_TRAIT_TO_ESO[slot.data.trait]
    if (traitType == null) continue
    const equipType = companionJewelrySlots.data[slotId].equipType
    if (equipType == null) continue

    const quality = COMPANION_QUALITY_TO_ESO[slot.data.quality] ?? 5
    signatures.push({ companionName, equipType, traitType, quality })
  }

  const mainHand = decoded.equipment.weapons["main-hand"]
  if (mainHand.itemType === "weapon" && mainHand.data.type !== "no-type") {
    if (mainHand.data.trait !== "no-trait" && mainHand.data.type !== "shield") {
      const traitType = COMPANION_WEAPON_TRAIT_TO_ESO[mainHand.data.trait]
      if (traitType != null) {
        const isTwoHanded = companionWeaponTypes.data[mainHand.data.type]?.isTwoHanded ?? false
        const equipType = isTwoHanded
          ? ESO_EQUIP_TYPES.EQUIP_TYPE_TWO_HAND
          : ESO_EQUIP_TYPES.EQUIP_TYPE_ONE_HAND
        const quality = COMPANION_QUALITY_TO_ESO[mainHand.data.quality] ?? 5
        const weaponType = PLAYER_WEAPON_TYPE_TO_ESO[mainHand.data.type]
        const sig: WantedCompanionEquipmentSignature = {
          companionName,
          equipType,
          traitType,
          quality,
        }
        if (weaponType != null) sig.weaponType = weaponType
        signatures.push(sig)
      }
    }

    const isTwoHanded = companionWeaponTypes.data[mainHand.data.type]?.isTwoHanded ?? false
    if (!isTwoHanded) {
      const offHand = decoded.equipment.weapons["off-hand"]
      if (
        offHand.itemType === "weapon" &&
        offHand.data.type !== "no-type" &&
        offHand.data.trait !== "no-trait"
      ) {
        if (offHand.data.type === "shield") {
          const traitType = COMPANION_ARMOR_TRAIT_TO_ESO[offHand.data.trait]
          if (traitType != null) {
            const quality = COMPANION_QUALITY_TO_ESO[offHand.data.quality] ?? 5
            signatures.push({
              companionName,
              equipType: ESO_EQUIP_TYPES.EQUIP_TYPE_OFF_HAND,
              traitType,
              quality,
            })
          }
        } else {
          const traitType = COMPANION_WEAPON_TRAIT_TO_ESO[offHand.data.trait]
          if (traitType != null) {
            const equipType = ESO_EQUIP_TYPES.EQUIP_TYPE_ONE_HAND
            const quality = COMPANION_QUALITY_TO_ESO[offHand.data.quality] ?? 5
            const weaponType = PLAYER_WEAPON_TYPE_TO_ESO[offHand.data.type]
            const sig: WantedCompanionEquipmentSignature = {
              companionName,
              equipType,
              traitType,
              quality,
            }
            if (weaponType != null) sig.weaponType = weaponType
            signatures.push(sig)
          }
        }
      }
    }
  }

  return signatures
}
