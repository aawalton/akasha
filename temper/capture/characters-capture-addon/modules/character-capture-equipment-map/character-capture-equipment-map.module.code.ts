import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { temperArmorEnchant } from "akasha/temper/catalog/gear/temper-armor-enchant/temper-armor-enchant.page-type.ts"
import type { TemperArmorEnchant } from "akasha/temper/catalog/gear/temper-armor-enchant/temper-armor-enchant.page-type.types.ts"
import { temperArmorTrait } from "akasha/temper/catalog/gear/temper-armor-trait/temper-armor-trait.page-type.ts"
import type { TemperArmorTrait } from "akasha/temper/catalog/gear/temper-armor-trait/temper-armor-trait.page-type.types.ts"
import { temperArmorWeight } from "akasha/temper/catalog/gear/temper-armor-weight/temper-armor-weight.page-type.ts"
import type { TemperArmorWeight } from "akasha/temper/catalog/gear/temper-armor-weight/temper-armor-weight.page-type.types.ts"
import { temperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.ts"
import type { TemperEsoTraitMap } from "akasha/temper/catalog/gear/temper-eso-trait-map/temper-eso-trait-map.page-type.types.ts"
import { temperJewelryEnchant } from "akasha/temper/catalog/gear/temper-jewelry-enchant/temper-jewelry-enchant.page-type.ts"
import type { TemperJewelryEnchant } from "akasha/temper/catalog/gear/temper-jewelry-enchant/temper-jewelry-enchant.page-type.types.ts"
import { temperJewelryTrait } from "akasha/temper/catalog/gear/temper-jewelry-trait/temper-jewelry-trait.page-type.ts"
import type { TemperJewelryTrait } from "akasha/temper/catalog/gear/temper-jewelry-trait/temper-jewelry-trait.page-type.types.ts"
import { temperWeaponEnchant } from "akasha/temper/catalog/gear/temper-weapon-enchant/temper-weapon-enchant.page-type.ts"
import type { TemperWeaponEnchant } from "akasha/temper/catalog/gear/temper-weapon-enchant/temper-weapon-enchant.page-type.types.ts"
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

type Numbered = { readonly esoEnchantSearchCategory: number; readonly hashPlace: number }

let enchantPlaces: Places | undefined

function numberedIn(
  this: void,
  found: Places,
  family: string,
  pages: readonly Numbered[]
): undefined {
  for (const one of pages) found[`${family}/${one.esoEnchantSearchCategory}`] = one.hashPlace
  return undefined
}

function enchantPlacesOf(this: void): Places {
  const found: Places = {}
  numberedIn(
    found,
    "armor",
    $pagesOfType<Pick<TemperArmorEnchant, "esoEnchantSearchCategory" | "hashPlace">>(
      temperArmorEnchant
    )
  )
  numberedIn(
    found,
    "weapon",
    $pagesOfType<Pick<TemperWeaponEnchant, "esoEnchantSearchCategory" | "hashPlace">>(
      temperWeaponEnchant
    )
  )
  numberedIn(
    found,
    "jewelry",
    $pagesOfType<Pick<TemperJewelryEnchant, "esoEnchantSearchCategory" | "hashPlace">>(
      temperJewelryEnchant
    )
  )
  return found
}

function enchantPlace(this: void, family: string, esoId: number): number {
  enchantPlaces ??= enchantPlacesOf()
  return (
    enchantPlaces[`${family}/${esoId}`] ??
    enchantPlaces[`${family}/${ENCHANTMENT_SEARCH_CATEGORY_NONE}`] ??
    0
  )
}

export function getPlayerArmorEnchantIndex(esoId: number): number {
  return enchantPlace("armor", esoId)
}

export function getPlayerWeaponEnchantIndex(esoId: number): number {
  return enchantPlace("weapon", esoId)
}

export function getPlayerJewelryEnchantIndex(esoId: number): number {
  return enchantPlace("jewelry", esoId)
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
