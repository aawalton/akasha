import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import { SKILL_ABILITY_ID_TO_INDEX } from "akasha/temper/addon/pages/characters/modules/companions-skill-map/companions-skill-map.module.code.ts"
import { temperCompanionArmorWeight } from "akasha/temper/catalog/companion/armor-weight/temper-companion-armor-weight.page-type.ts"
import type { TemperCompanionArmorWeight } from "akasha/temper/catalog/companion/armor-weight/temper-companion-armor-weight.page-type.types.ts"
import { noTrait } from "akasha/temper/catalog/companion/trait/pages/no-trait/no-trait.temper-companion-trait.ts"
import { temperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.ts"
import type { TemperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.types.ts"
import { temperCompanionWeaponType } from "akasha/temper/catalog/companion/weapon-type/temper-companion-weapon-type.page-type.ts"
import type { TemperCompanionWeaponType } from "akasha/temper/catalog/companion/weapon-type/temper-companion-weapon-type.page-type.types.ts"
import {
  ARMOR_TRAIT_TO_INDEX,
  ARMOR_TYPE_TO_INDEX,
  JEWELRY_TRAIT_TO_INDEX,
  QUALITY_TO_INDEX,
  WEAPON_TRAIT_TO_INDEX,
} from "akasha/temper/player/character/build/bit-codec/modules/equipment-mappings/equipment-mappings.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-08/eso-enums-08.type-declaration.d.ts"

type Placed = { readonly hashPlace: number; readonly title?: string }

type Names = { [place: number]: string | undefined }

function namesByPlace(this: void, pages: readonly Placed[]): Names {
  const names: Names = {}
  for (const page of pages) {
    if (page.hashPlace !== 0) names[page.hashPlace] = page.title
  }
  return names
}

const INDEX_TO_ARMOR_WEIGHT: Names = namesByPlace(
  $pagesOfType<Pick<TemperCompanionArmorWeight, "hashPlace" | "title">>(temperCompanionArmorWeight)
)

const INDEX_TO_TRAIT: Names = namesByPlace(
  $pagesOfType<Pick<TemperCompanionTrait, "hashPlace" | "title">>(temperCompanionTrait)
)

type WeaponTypeRow = Pick<TemperCompanionWeaponType, "hashPlace" | "title" | "isTwoHanded">

const WEAPON_TYPES = $pagesOfType<WeaponTypeRow>(temperCompanionWeaponType)

const INDEX_TO_WEAPON_TYPE: Names = namesByPlace(WEAPON_TYPES)

const TWO_HANDED_INDICES: { [place: number]: boolean | undefined } = {}
for (const weaponType of WEAPON_TYPES) {
  TWO_HANDED_INDICES[weaponType.hashPlace] = weaponType.isTwoHanded
}

const INDEX_TO_QUALITY_COLOR: [number, number, number][] = [
  [0.5, 0.5, 0.5],
  [1, 1, 1],
  [0.12, 0.76, 0.12],
  [0.24, 0.49, 0.92],
  [0.65, 0.28, 0.86],
  [0.98, 0.86, 0.24],
]

const INDEX_TO_SKILL_ABILITY_ID: number[] = []

for (const [abilityIdStr, skillIndex] of Object.entries(SKILL_ABILITY_ID_TO_INDEX)) {
  const abilityId = tonumber(abilityIdStr)
  if (abilityId !== undefined) {
    INDEX_TO_SKILL_ABILITY_ID[skillIndex] = abilityId
  }
}

const INDEX_TO_ARMOR_TYPE_CONST: number[] = []
for (const [esoConstStr, idx] of Object.entries(ARMOR_TYPE_TO_INDEX)) {
  const esoConst = tonumber(esoConstStr)
  if (esoConst !== undefined) {
    INDEX_TO_ARMOR_TYPE_CONST[idx] = esoConst
  }
}

const INDEX_TO_ARMOR_TRAIT: number[] = []
for (const [esoConstStr, idx] of Object.entries(ARMOR_TRAIT_TO_INDEX)) {
  const esoConst = tonumber(esoConstStr)
  if (esoConst !== undefined) {
    INDEX_TO_ARMOR_TRAIT[idx] = esoConst
  }
}

const INDEX_TO_JEWELRY_TRAIT: number[] = []
for (const [esoConstStr, idx] of Object.entries(JEWELRY_TRAIT_TO_INDEX)) {
  const esoConst = tonumber(esoConstStr)
  if (esoConst !== undefined) {
    INDEX_TO_JEWELRY_TRAIT[idx] = esoConst
  }
}

const INDEX_TO_WEAPON_TRAIT: number[] = []
for (const [esoConstStr, idx] of Object.entries(WEAPON_TRAIT_TO_INDEX)) {
  const esoConst = tonumber(esoConstStr)
  if (esoConst !== undefined) {
    INDEX_TO_WEAPON_TRAIT[idx] = esoConst
  }
}

const INDEX_TO_QUALITY: number[] = []
for (const [esoConstStr, idx] of Object.entries(QUALITY_TO_INDEX)) {
  const esoConst = tonumber(esoConstStr)
  if (esoConst !== undefined) {
    INDEX_TO_QUALITY[idx] = esoConst
  }
}

export function getArmorTypeFromIndex(idx: number): number {
  return INDEX_TO_ARMOR_TYPE_CONST[idx] ?? ARMORTYPE_NONE
}

export function getArmorTraitFromIndex(idx: number): number {
  return INDEX_TO_ARMOR_TRAIT[idx] ?? ITEM_TRAIT_TYPE_NONE
}

export function getJewelryTraitFromIndex(idx: number): number {
  return INDEX_TO_JEWELRY_TRAIT[idx] ?? ITEM_TRAIT_TYPE_NONE
}

export function getWeaponTraitFromIndex(idx: number): number {
  return INDEX_TO_WEAPON_TRAIT[idx] ?? ITEM_TRAIT_TYPE_NONE
}

export function getQualityFromIndex(idx: number): number {
  return INDEX_TO_QUALITY[idx] ?? ITEM_DISPLAY_QUALITY_TRASH
}

export function formatArmorFromIndices(
  isEmpty: boolean,
  weightIndex: number,
  traitIndex: number
): string {
  if (isEmpty) return "Empty"

  const parts: string[] = []
  const weight = INDEX_TO_ARMOR_WEIGHT[weightIndex]
  if (weight !== undefined && weight !== "") parts.push(weight)
  const trait = INDEX_TO_TRAIT[traitIndex]
  if (trait !== undefined && traitIndex !== 0) parts.push(trait)

  return parts.length > 0 ? table.concat(parts, ", ") : "Unknown"
}

export function formatJewelryFromIndices(isEmpty: boolean, traitIndex: number): string {
  if (isEmpty) return "Empty"

  const trait = INDEX_TO_TRAIT[traitIndex]
  if (trait !== undefined && traitIndex !== 0) return trait

  return noTrait.title
}

export function formatWeaponFromIndices(
  isEmpty: boolean,
  typeIndex: number,
  traitIndex: number
): string {
  if (isEmpty) return "Empty"

  const parts: string[] = []
  const typeName = INDEX_TO_WEAPON_TYPE[typeIndex]
  if (typeName !== undefined && typeName !== "") parts.push(typeName)
  const trait = INDEX_TO_TRAIT[traitIndex]
  if (trait !== undefined && traitIndex !== 0) parts.push(trait)

  return parts.length > 0 ? table.concat(parts, ", ") : "Unknown"
}

export function getQualityColorFromIndex(qualityIndex: number): [number, number, number] {
  return INDEX_TO_QUALITY_COLOR[qualityIndex] ?? [1, 1, 1]
}

export function getAbilityIdFromSkillIndex(skillIndex: number): number {
  return INDEX_TO_SKILL_ABILITY_ID[skillIndex] ?? 0
}

export function isWeaponIndexTwoHanded(typeIndex: number): boolean {
  return TWO_HANDED_INDICES[typeIndex] === true
}
