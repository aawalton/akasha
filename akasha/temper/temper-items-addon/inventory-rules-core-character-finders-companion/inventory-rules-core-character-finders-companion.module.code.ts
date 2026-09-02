import { LOC_COMPANION_PREFIX } from "../inventory-constants/inventory-constants.module.code.ts"
import { getCompiledConfig } from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { getDatabase } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type { ItemData } from "../inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
export function equipTypeToEquipSlot(equipType: number): number | undefined {
  if (equipType === EQUIP_TYPE_HEAD) return EQUIP_SLOT_HEAD
  if (equipType === EQUIP_TYPE_CHEST) return EQUIP_SLOT_CHEST
  if (equipType === EQUIP_TYPE_SHOULDERS) return EQUIP_SLOT_SHOULDERS
  if (equipType === EQUIP_TYPE_HAND) return EQUIP_SLOT_HAND
  if (equipType === EQUIP_TYPE_WAIST) return EQUIP_SLOT_WAIST
  if (equipType === EQUIP_TYPE_LEGS) return EQUIP_SLOT_LEGS
  if (equipType === EQUIP_TYPE_FEET) return EQUIP_SLOT_FEET
  if (equipType === EQUIP_TYPE_NECK) return EQUIP_SLOT_NECK
  if (equipType === EQUIP_TYPE_RING) return EQUIP_SLOT_RING1
  if (equipType === EQUIP_TYPE_MAIN_HAND) return EQUIP_SLOT_MAIN_HAND
  if (equipType === EQUIP_TYPE_ONE_HAND) return EQUIP_SLOT_MAIN_HAND
  if (equipType === EQUIP_TYPE_TWO_HAND) return EQUIP_SLOT_MAIN_HAND
  if (equipType === EQUIP_TYPE_OFF_HAND) return EQUIP_SLOT_OFF_HAND
  return undefined
}

export function liveWornSlotMatches(
  bagId: number,
  equipSlot: number,
  traitType: number,
  quality: number,
  armorType: number | undefined,
  weaponType: number | undefined
): boolean {
  const wornLink = GetItemLink(bagId, equipSlot, LINK_STYLE_BRACKETS)
  if (wornLink === "") return false
  if (GetItemLinkTraitType(wornLink) !== traitType) return false
  if (GetItemLinkDisplayQuality(wornLink) !== quality) return false
  if (armorType !== undefined && GetItemLinkArmorType(wornLink) !== armorType) return false
  if (weaponType !== undefined && GetItemLinkWeaponType(wornLink) !== weaponType) return false
  return true
}

export function savedWornSlotMatches(
  item: ItemData,
  traitType: number,
  quality: number,
  armorType: number | undefined,
  weaponType: number | undefined
): boolean {
  if (item.traitType !== traitType) return false
  if (item.quality !== quality) return false
  if (armorType !== undefined && (item.armorType ?? 0) !== armorType) return false
  if (weaponType !== undefined && (item.weaponType ?? 0) !== weaponType) return false
  return true
}

export function isCompanionWornSlotFilled(
  companionName: string,
  equipType: number,
  traitType: number,
  quality: number,
  armorType: number | undefined,
  weaponType: number | undefined
): boolean {
  const equipSlot = equipTypeToEquipSlot(equipType)
  if (equipSlot === undefined) return false

  const isActive =
    HasActiveCompanion() &&
    ((): boolean => {
      const activeId = GetActiveCompanionDefId()
      const activeName = zo_strformat("<<1>>", GetCompanionName(activeId))
      return activeName === companionName
    })()

  if (isActive) {
    if (
      liveWornSlotMatches(BAG_COMPANION_WORN, equipSlot, traitType, quality, armorType, weaponType)
    ) {
      return true
    }
    if (equipType === EQUIP_TYPE_RING) {
      if (
        liveWornSlotMatches(
          BAG_COMPANION_WORN,
          EQUIP_SLOT_RING2,
          traitType,
          quality,
          armorType,
          weaponType
        )
      ) {
        return true
      }
    }
    if (equipType === EQUIP_TYPE_ONE_HAND) {
      if (
        liveWornSlotMatches(
          BAG_COMPANION_WORN,
          EQUIP_SLOT_OFF_HAND,
          traitType,
          quality,
          armorType,
          weaponType
        )
      ) {
        return true
      }
    }
    return false
  }

  const db = getDatabase()
  const locationKey = `${LOC_COMPANION_PREFIX}${companionName}`
  const location = db.locations[locationKey]
  if (!location) return false
  const bag = location.bags[BAG_COMPANION_WORN]
  if (!bag) return false

  const item = bag[equipSlot]
  if (item && savedWornSlotMatches(item, traitType, quality, armorType, weaponType)) {
    return true
  }
  if (equipType === EQUIP_TYPE_RING) {
    const item2 = bag[EQUIP_SLOT_RING2]
    if (item2 && savedWornSlotMatches(item2, traitType, quality, armorType, weaponType)) {
      return true
    }
  }
  if (equipType === EQUIP_TYPE_ONE_HAND) {
    const item2 = bag[EQUIP_SLOT_OFF_HAND]
    if (item2 && savedWornSlotMatches(item2, traitType, quality, armorType, weaponType)) {
      return true
    }
  }

  return false
}

export function findCompanionEquipNameByPriority(itemLink: string): string | undefined {
  const compiled = getCompiledConfig()
  if (!compiled || compiled.wantedCompanionEquipment.length === 0) return undefined

  const equipType = GetItemLinkEquipType(itemLink)
  const traitType = GetItemLinkTraitType(itemLink)
  if (equipType === 0 || traitType === 0) return undefined

  if (traitType < 34 || traitType > 60) return undefined

  const armorType = GetItemLinkArmorType(itemLink)
  const weaponType = GetItemLinkWeaponType(itemLink)
  const quality = GetItemLinkDisplayQuality(itemLink)

  for (const sig of compiled.wantedCompanionEquipment) {
    if (sig.equipType !== equipType) continue
    if (sig.traitType !== traitType) continue
    if (sig.quality !== quality) continue
    if (sig.armorType !== undefined && sig.armorType !== armorType) continue
    if (sig.weaponType !== undefined && sig.weaponType !== weaponType) continue
    if (
      isCompanionWornSlotFilled(
        sig.companionName,
        sig.equipType,
        sig.traitType,
        sig.quality,
        sig.armorType,
        sig.weaponType
      )
    )
      continue
    return sig.companionName
  }

  return undefined
}
