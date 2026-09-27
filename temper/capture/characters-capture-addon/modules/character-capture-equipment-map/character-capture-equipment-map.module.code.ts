import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperArmorTrait } from "akasha/temper/catalog/gear/temper-armor-trait/temper-armor-trait.page-type.ts"
import type { TemperArmorTrait } from "akasha/temper/catalog/gear/temper-armor-trait/temper-armor-trait.page-type.types.ts"
import { temperArmorWeight } from "akasha/temper/catalog/gear/temper-armor-weight/temper-armor-weight.page-type.ts"
import type { TemperArmorWeight } from "akasha/temper/catalog/gear/temper-armor-weight/temper-armor-weight.page-type.types.ts"
import { temperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.ts"
import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"
import { temperJewelryTrait } from "akasha/temper/catalog/gear/temper-jewelry-trait/temper-jewelry-trait.page-type.ts"
import type { TemperJewelryTrait } from "akasha/temper/catalog/gear/temper-jewelry-trait/temper-jewelry-trait.page-type.types.ts"
import { temperWeaponTrait } from "akasha/temper/catalog/gear/temper-weapon-trait/temper-weapon-trait.page-type.ts"
import type { TemperWeaponTrait } from "akasha/temper/catalog/gear/temper-weapon-trait/temper-weapon-trait.page-type.types.ts"
import { temperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.ts"
import type { TemperWeaponType } from "akasha/temper/catalog/gear/temper-weapon-type/temper-weapon-type.page-type.types.ts"

type Places = { [key: string]: number | undefined }

type Placed = { readonly slug: string; readonly hashPlace: number }

let weightPlaces: Places | undefined

let noWeightPlace = 0

function weightPlacesOf(this: void): Places {
  const found: Places = {}
  for (const one of $pagesOfType<Pick<TemperArmorWeight, "slug" | "armorType" | "hashPlace">>(
    temperArmorWeight
  )) {
    if (one.slug === "no-weight") noWeightPlace = one.hashPlace
    if (one.armorType !== undefined) found[`${one.armorType}`] = one.hashPlace
  }
  return found
}

export function getPlayerArmorWeightIndex(esoArmorType: number): number {
  weightPlaces ??= weightPlacesOf()
  return weightPlaces[`${esoArmorType}`] ?? noWeightPlace
}

let traitPlaces: Places | undefined

function placedIn(
  this: void,
  found: Places,
  pageType: string,
  pages: readonly Placed[]
): undefined {
  for (const one of pages) found[`${pageType}/${one.slug}`] = one.hashPlace
  return undefined
}

function traitPlacesOf(this: void): Places {
  const byAddress: Places = {}
  placedIn(
    byAddress,
    "temper-armor-trait",
    $pagesOfType<Pick<TemperArmorTrait, "slug" | "hashPlace">>(temperArmorTrait)
  )
  placedIn(
    byAddress,
    "temper-weapon-trait",
    $pagesOfType<Pick<TemperWeaponTrait, "slug" | "hashPlace">>(temperWeaponTrait)
  )
  placedIn(
    byAddress,
    "temper-jewelry-trait",
    $pagesOfType<Pick<TemperJewelryTrait, "slug" | "hashPlace">>(temperJewelryTrait)
  )
  const found: Places = {}
  for (const one of $pagesOfType<
    Pick<TemperEsoTraitMap, "traitFamily" | "traitId" | "esoTraitNum">
  >(temperEsoTraitMap)) {
    found[`${one.traitFamily}/${one.esoTraitNum}`] = byAddress[one.traitId]
  }
  return found
}

function traitPlace(this: void, family: string, esoId: number): number {
  traitPlaces ??= traitPlacesOf()
  return traitPlaces[`${family}/${esoId}`] ?? traitPlaces[`${family}/${ITEM_TRAIT_TYPE_NONE}`] ?? 0
}

export function getPlayerArmorTraitIndex(esoId: number): number {
  return traitPlace("armor", esoId)
}

export function getPlayerWeaponTraitIndex(esoId: number): number {
  return traitPlace("weapon", esoId)
}

export function getPlayerJewelryTraitIndex(esoId: number): number {
  return traitPlace("jewelry", esoId)
}

const PLAYER_ARMOR_ENCHANT_ESO_ID_TO_INDEX: Record<number, number> = {
  [ENCHANTMENT_SEARCH_CATEGORY_NONE]: 0,
  [ENCHANTMENT_SEARCH_CATEGORY_HEALTH]: 1,
  [ENCHANTMENT_SEARCH_CATEGORY_MAGICKA]: 2,
  [ENCHANTMENT_SEARCH_CATEGORY_STAMINA]: 3,
  [ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_DEFENSE]: 4,
}

export function getPlayerArmorEnchantIndex(esoId: number): number {
  return PLAYER_ARMOR_ENCHANT_ESO_ID_TO_INDEX[esoId] ?? 0
}

const PLAYER_WEAPON_ENCHANT_ESO_ID_TO_INDEX: Record<number, number> = {
  [ENCHANTMENT_SEARCH_CATEGORY_NONE]: 0,
  [ENCHANTMENT_SEARCH_CATEGORY_BERSERKER]: 1,
  [ENCHANTMENT_SEARCH_CATEGORY_ABSORB_HEALTH]: 2,
  [ENCHANTMENT_SEARCH_CATEGORY_ABSORB_MAGICKA]: 3,
  [ENCHANTMENT_SEARCH_CATEGORY_ABSORB_STAMINA]: 4,
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_ARMOR]: 5,
  [ENCHANTMENT_SEARCH_CATEGORY_DAMAGE_HEALTH]: 6,
  [ENCHANTMENT_SEARCH_CATEGORY_FIERY_WEAPON]: 7,
  [ENCHANTMENT_SEARCH_CATEGORY_FROZEN_WEAPON]: 8,
  [ENCHANTMENT_SEARCH_CATEGORY_CHARGED_WEAPON]: 9,
  [ENCHANTMENT_SEARCH_CATEGORY_POISONED_WEAPON]: 10,
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POWER]: 11,
  [ENCHANTMENT_SEARCH_CATEGORY_DAMAGE_SHIELD]: 12,
  [ENCHANTMENT_SEARCH_CATEGORY_BEFOULED_WEAPON]: 13,
  [ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_ONSLAUGHT]: 14,
}
export function getPlayerWeaponEnchantIndex(esoId: number): number {
  return PLAYER_WEAPON_ENCHANT_ESO_ID_TO_INDEX[esoId] ?? 0
}

const PLAYER_JEWELRY_ENCHANT_ESO_ID_TO_INDEX: Record<number, number> = {
  [ENCHANTMENT_SEARCH_CATEGORY_NONE]: 0,
  [ENCHANTMENT_SEARCH_CATEGORY_INCREASE_PHYSICAL_DAMAGE]: 1,
  [ENCHANTMENT_SEARCH_CATEGORY_INCREASE_SPELL_DAMAGE]: 2,
  [ENCHANTMENT_SEARCH_CATEGORY_MAGICKA_REGEN]: 3,
  [ENCHANTMENT_SEARCH_CATEGORY_STAMINA_REGEN]: 4,
  [ENCHANTMENT_SEARCH_CATEGORY_HEALTH_REGEN]: 5,
  [ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_REGEN]: 6,
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_SPELL_COST]: 7,
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_FEAT_COST]: 8,
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POWER]: 9,
  [ENCHANTMENT_SEARCH_CATEGORY_FIRE_RESISTANT]: 10,
  [ENCHANTMENT_SEARCH_CATEGORY_FROST_RESISTANT]: 11,
  [ENCHANTMENT_SEARCH_CATEGORY_SHOCK_RESISTANT]: 12,
  [ENCHANTMENT_SEARCH_CATEGORY_POISON_RESISTANT]: 13,
  [ENCHANTMENT_SEARCH_CATEGORY_DISEASE_RESISTANT]: 14,
  [ENCHANTMENT_SEARCH_CATEGORY_DECREASE_PHYSICAL_DAMAGE]: 15,
  [ENCHANTMENT_SEARCH_CATEGORY_DECREASE_SPELL_DAMAGE]: 16,
  [ENCHANTMENT_SEARCH_CATEGORY_INCREASE_BASH_DAMAGE]: 17,
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_BLOCK_AND_BASH]: 18,
  [ENCHANTMENT_SEARCH_CATEGORY_INCREASE_POTION_EFFECTIVENESS]: 19,
  [ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POTION_COOLDOWN]: 20,
}
export function getPlayerJewelryEnchantIndex(esoId: number): number {
  return PLAYER_JEWELRY_ENCHANT_ESO_ID_TO_INDEX[esoId] ?? 0
}

let weaponTypePlaces: Places | undefined

let noTypePlace = 0

function weaponTypePlacesOf(this: void): Places {
  const found: Places = {}
  for (const one of $pagesOfType<
    Pick<TemperWeaponType, "slug" | "esoWeaponTypeNumber" | "hashPlace">
  >(temperWeaponType)) {
    if (one.slug === "no-type") noTypePlace = one.hashPlace
    found[`${one.esoWeaponTypeNumber}`] = one.hashPlace
  }
  return found
}

export function getPlayerWeaponTypeIndex(esoId: number): number {
  weaponTypePlaces ??= weaponTypePlacesOf()
  return weaponTypePlaces[`${esoId}`] ?? noTypePlace
}
