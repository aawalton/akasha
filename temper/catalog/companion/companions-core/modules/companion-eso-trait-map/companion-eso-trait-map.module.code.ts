import { COMPANION_TRAIT_PAGES } from "akasha/temper/catalog/companion/companions-core/modules/companion-trait-pages/companion-trait-pages.module.code.ts"
import type { CompanionTraitId } from "akasha/temper/catalog/companion/companions-core/modules/companion-traits/companion-traits.module.code.ts"

type EsoTraitField = "esoWeaponTraitType" | "esoArmorTraitType" | "esoJewelryTraitType"

function traitsByNumber(field: EsoTraitField): Record<number, CompanionTraitId> {
  const found: Record<number, CompanionTraitId> = {}
  for (const page of COMPANION_TRAIT_PAGES) {
    const esoNumber = page[field]
    if (esoNumber !== undefined) found[esoNumber] = page.key
  }
  return found
}

export const ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT: Record<number, CompanionTraitId> =
  traitsByNumber("esoWeaponTraitType")

export const ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT: Record<number, CompanionTraitId> =
  traitsByNumber("esoArmorTraitType")

export const ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT: Record<number, CompanionTraitId> =
  traitsByNumber("esoJewelryTraitType")

function toMap(record: Record<number, CompanionTraitId>): Map<number, CompanionTraitId> {
  return new Map(Object.entries(record).map(([k, v]) => [Number(k), v]))
}

export const COMPANION_WEAPON_ESO_TO_TRAIT: ReadonlyMap<number, CompanionTraitId> = toMap(
  ESO_WEAPON_TRAIT_TO_COMPANION_TRAIT
)

export const COMPANION_ARMOR_ESO_TO_TRAIT: ReadonlyMap<number, CompanionTraitId> = toMap(
  ESO_ARMOR_TRAIT_TO_COMPANION_TRAIT
)

export const COMPANION_JEWELRY_ESO_TO_TRAIT: ReadonlyMap<number, CompanionTraitId> = toMap(
  ESO_JEWELRY_TRAIT_TO_COMPANION_TRAIT
)
