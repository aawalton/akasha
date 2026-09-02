import { companionArmorSlots } from "@akasha/temper-companions-core/companion-armor-slots"
import type { CompanionEquipmentQualityId } from "@akasha/temper-companions-core/companion-equipment-qualities"
import {
  ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT,
  ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT,
  ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT,
} from "@akasha/temper-companions-core/companion-eso-trait-map"
import { companionJewelrySlots } from "@akasha/temper-companions-core/companion-jewelry-slots"
import type { CompanionTraitId } from "@akasha/temper-companions-core/companion-traits"
import { companionTraits } from "@akasha/temper-companions-core/companion-traits"
import type { CompanionState } from "@akasha/temper-companions-core/companion-types"
import { companionWeaponSlots } from "@akasha/temper-companions-core/companion-weapon-slots"
import type { CompanionWeaponTypeId } from "@akasha/temper-companions-core/companion-weapon-types"
import { companionWeaponTypes } from "@akasha/temper-companions-core/companion-weapon-types"
import type { CompanionId } from "@akasha/temper-companions-core/companions"
import { capitalize } from "@akasha/utils-narrow/capitalize"
import {
  ESO_EQUIP_TYPES,
  ESO_QUALITY_TO_COMPANION_QUALITY,
} from "../eso-companion-equipment-constants-data/eso-companion-equipment-constants-data.module.code.ts"
import type { InventoryDatabase } from "../inventory-types/inventory-types.module.code.ts"

interface GearNeed {
  companionId: CompanionId
  companionName: string
  category: string
  slotId: string
  slotName: string
  trait: CompanionTraitId
  quality: CompanionEquipmentQualityId
  weight?: string
  weaponType?: CompanionWeaponTypeId
}

interface GearNeededSlot {
  companionId: CompanionId
  companionName: string
  category: "armor" | "jewelry" | "weapon"
  slotId: string
  slotName: string
  weight?: string
  weaponType?: string
  weaponTypeId?: string
}

export interface GearNeededGroup {
  trait: CompanionTraitId
  quality: CompanionEquipmentQualityId
  count: number
  categorySummary: string
  slots: readonly GearNeededSlot[]
}

const QUALITY_ORDER: Record<string, number> = {
  "no-quality": 0,
  normal: 1,
  fine: 2,
  superior: 3,
  epic: 4,
  legendary: 5,
}

function qualityRank(quality: CompanionEquipmentQualityId): number {
  return QUALITY_ORDER[quality] ?? 0
}

const ARMOR_TYPE_TO_WEIGHT: Record<number, string> = {
  1: "Light",
  2: "Medium",
  3: "Heavy",
}

const EQUIP_TYPE_TO_SLOT_CATEGORY: Record<number, string> = {}
for (const slot of companionArmorSlots.list) EQUIP_TYPE_TO_SLOT_CATEGORY[slot.equipType] = slot.id
for (const slot of companionJewelrySlots.list)
  EQUIP_TYPE_TO_SLOT_CATEGORY[slot.equipType] = slot.slotCategory
EQUIP_TYPE_TO_SLOT_CATEGORY[ESO_EQUIP_TYPES.EQUIP_TYPE_ONE_HAND] = "one-hand"
EQUIP_TYPE_TO_SLOT_CATEGORY[ESO_EQUIP_TYPES.EQUIP_TYPE_TWO_HAND] = "two-hand"
EQUIP_TYPE_TO_SLOT_CATEGORY[ESO_EQUIP_TYPES.EQUIP_TYPE_OFF_HAND] = "one-hand"

interface PlanEntity {
  companionId: CompanionId
  companionName: string
  targetBuildData: CompanionState | null
}

function collectGearNeeds(entities: readonly PlanEntity[]): readonly GearNeed[] {
  const needs: GearNeed[] = []

  for (const entity of entities) {
    const buildData = entity.targetBuildData
    if (!buildData) continue

    const { equipment } = buildData

    for (const slot of companionArmorSlots.list) {
      const item = equipment.armor[slot.id]
      if (item.itemType !== "armor") continue
      if (item.data.trait === "no-trait" && item.data.quality === "no-quality") continue

      const weightName = item.data.weight !== "no-weight" ? capitalize(item.data.weight) : undefined

      needs.push({
        companionId: entity.companionId,
        companionName: entity.companionName,
        category: slot.id,
        slotId: slot.id,
        slotName: slot.name,
        trait: item.data.trait,
        quality: item.data.quality,
        weight: weightName,
      })
    }

    for (const slot of companionJewelrySlots.list) {
      const item = equipment.jewelry[slot.id]
      if (item.itemType !== "jewelry") continue
      if (item.data.trait === "no-trait" && item.data.quality === "no-quality") continue

      needs.push({
        companionId: entity.companionId,
        companionName: entity.companionName,
        category: slot.slotCategory,
        slotId: slot.id,
        slotName: slot.name,
        trait: item.data.trait,
        quality: item.data.quality,
      })
    }

    const mainHand = equipment.weapons["main-hand"]
    if (mainHand.itemType === "weapon" && mainHand.data.type !== "no-type") {
      const isTwoHanded = companionWeaponTypes.data[mainHand.data.type]?.isTwoHanded ?? false

      needs.push({
        companionId: entity.companionId,
        companionName: entity.companionName,
        category: isTwoHanded ? "two-hand" : "one-hand",
        slotId: "main-hand",
        slotName: companionWeaponSlots.data["main-hand"].name,
        trait: mainHand.data.trait,
        quality: mainHand.data.quality,
        weaponType: mainHand.data.type,
      })

      if (!isTwoHanded) {
        const offHand = equipment.weapons["off-hand"]
        if (offHand.itemType === "weapon" && offHand.data.type !== "no-type") {
          needs.push({
            companionId: entity.companionId,
            companionName: entity.companionName,
            category: "one-hand",
            slotId: "off-hand",
            slotName: companionWeaponSlots.data["off-hand"].name,
            trait: offHand.data.trait,
            quality: offHand.data.quality,
            weaponType: offHand.data.type,
          })
        }
      }
    }
  }

  return needs
}

type InventoryKey = string & { __inventoryKey: true }

function asInventoryKey(key: string): InventoryKey {
  return key as InventoryKey
}

function makeKey(category: string, trait: string, quality: string, weight?: string): InventoryKey {
  const base = `${category}:${trait}:${quality}`
  return asInventoryKey(weight != null ? `${base}:${weight}` : base)
}

function indexInventory(inventory: InventoryDatabase): Map<InventoryKey, number> {
  const counts = new Map<InventoryKey, number>()

  for (const location of Object.values(inventory.locations)) {
    for (const bag of Object.values(location.bags)) {
      for (const item of Object.values(bag)) {
        let broadCategory: string
        let trait: CompanionTraitId | undefined

        if (ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT[item.traitType] != null) {
          broadCategory = "weapon"
          trait = ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT[item.traitType]
        } else if (ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT[item.traitType] != null) {
          broadCategory = "armor"
          trait = ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT[item.traitType]
        } else if (ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT[item.traitType] != null) {
          broadCategory = "jewelry"
          trait = ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT[item.traitType]
        } else {
          continue
        }

        const quality = ESO_QUALITY_TO_COMPANION_QUALITY[item.quality]
        if (quality == null) continue
        if (trait === undefined) continue

        const slotCategory =
          item.equipType !== undefined
            ? (EQUIP_TYPE_TO_SLOT_CATEGORY[item.equipType] ?? broadCategory)
            : broadCategory
        const weight =
          broadCategory === "armor" ? ARMOR_TYPE_TO_WEIGHT[item.armorType ?? 0] : undefined
        const key = makeKey(slotCategory, trait, quality, weight)
        counts.set(key, (counts.get(key) ?? 0) + 1)
      }
    }
  }

  return counts
}

const BROAD_CATEGORY: Record<string, string> = {
  head: "armor",
  shoulders: "armor",
  chest: "armor",
  hands: "armor",
  waist: "armor",
  legs: "armor",
  feet: "armor",
  necklace: "jewelry",
  ring: "jewelry",
  "one-hand": "weapon",
  "two-hand": "weapon",
}

function tagInventory(
  needs: readonly GearNeed[],
  inventoryCounts: Map<InventoryKey, number>
): readonly { need: GearNeed; owned: boolean }[] {
  if (inventoryCounts.size === 0) {
    return needs.map((need) => ({ need, owned: false }))
  }

  const remaining = new Map(inventoryCounts)
  const tagged: { need: GearNeed; owned: boolean }[] = []

  for (const need of needs) {
    let owned = false

    const fallbackCategory = BROAD_CATEGORY[need.category]

    const key = makeKey(need.category, need.trait, need.quality, need.weight)
    const count = remaining.get(key) ?? 0
    if (count > 0) {
      remaining.set(key, count - 1)
      owned = true
    }

    if (!owned && fallbackCategory != null) {
      const broadKey = makeKey(fallbackCategory, need.trait, need.quality, need.weight)
      const broadCount = remaining.get(broadKey) ?? 0
      if (broadCount > 0) {
        remaining.set(broadKey, broadCount - 1)
        owned = true
      }
    }

    tagged.push({ need, owned })
  }

  return tagged
}

export interface UnfulfilledGearNeed {
  companionId: CompanionId
  companionName: string
  category: "armor" | "jewelry" | "weapon"
  slotId: string
  slotName: string
  trait: CompanionTraitId
  quality: CompanionEquipmentQualityId
  weight?: string
  weaponType?: string
  weaponTypeId?: string
}

export interface CompanionGearNeed extends UnfulfilledGearNeed {
  owned: boolean
}

function toBroadCategory(category: string): "armor" | "jewelry" | "weapon" {
  const broad = BROAD_CATEGORY[category]
  if (broad === "armor" || broad === "jewelry" || broad === "weapon") return broad
  if (category === "armor" || category === "jewelry" || category === "weapon") return category
  return "armor"
}

function gearNeedToUnfulfilled(need: GearNeed): UnfulfilledGearNeed {
  return {
    companionId: need.companionId,
    companionName: need.companionName,
    category: toBroadCategory(need.category),
    slotId: need.slotId,
    slotName: need.slotName,
    trait: need.trait,
    quality: need.quality,
    weight: need.weight,
    weaponType:
      need.weaponType != null
        ? companionWeaponTypes.has(need.weaponType)
          ? companionWeaponTypes.data[need.weaponType].name
          : need.weaponType
        : undefined,
    weaponTypeId: need.weaponType,
  }
}

export function computeAllGearNeeds(
  entities: readonly PlanEntity[],
  inventory: InventoryDatabase | null
): { totalCount: number; ownedCount: number; needs: readonly CompanionGearNeed[] } {
  const rawNeeds = collectGearNeeds(entities)

  if (rawNeeds.length === 0) {
    return { totalCount: 0, ownedCount: 0, needs: [] }
  }

  const inventoryCounts = inventory ? indexInventory(inventory) : new Map()
  const tagged = tagInventory(rawNeeds, inventoryCounts)

  const needs = tagged.map(({ need, owned }) => ({
    ...gearNeedToUnfulfilled(need),
    owned,
  }))

  const ownedCount = needs.filter((n) => n.owned).length

  return {
    totalCount: needs.length,
    ownedCount,
    needs,
  }
}

export function aggregateUnfulfilledByTraitQuality(
  needs: readonly UnfulfilledGearNeed[]
): readonly GearNeededGroup[] {
  const groupMap = new Map<
    string,
    {
      trait: CompanionTraitId
      quality: CompanionEquipmentQualityId
      slots: GearNeededSlot[]
      categories: Map<string, number>
    }
  >()

  for (const need of needs) {
    const groupKey = `${need.trait}:${need.quality}`

    let group = groupMap.get(groupKey)
    if (!group) {
      group = {
        trait: need.trait,
        quality: need.quality,
        slots: [],
        categories: new Map(),
      }
      groupMap.set(groupKey, group)
    }

    group.slots.push({
      companionId: need.companionId,
      companionName: need.companionName,
      category: need.category,
      slotId: need.slotId,
      slotName: need.slotName,
      weight: need.weight,
      weaponType: need.weaponType,
      weaponTypeId: need.weaponTypeId,
    })

    group.categories.set(need.category, (group.categories.get(need.category) ?? 0) + 1)
  }

  const groups: GearNeededGroup[] = []

  for (const group of groupMap.values()) {
    const parts: string[] = []
    for (const cat of ["armor", "jewelry", "weapon"] as const) {
      const count = group.categories.get(cat)
      if (count != null && count > 0) parts.push(`${count} ${cat}`)
    }

    groups.push({
      trait: group.trait,
      quality: group.quality,
      count: group.slots.length,
      categorySummary: parts.join(", "),
      slots: group.slots,
    })
  }

  groups.sort((a, b) => {
    const qualDiff = qualityRank(b.quality) - qualityRank(a.quality)
    if (qualDiff !== 0) return qualDiff
    const traitNameA = companionTraits.has(a.trait) ? companionTraits.data[a.trait].name : a.trait
    const traitNameB = companionTraits.has(b.trait) ? companionTraits.data[b.trait].name : b.trait
    return traitNameA.localeCompare(traitNameB)
  })

  return groups
}
