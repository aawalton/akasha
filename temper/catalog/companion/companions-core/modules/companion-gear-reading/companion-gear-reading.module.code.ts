import { slugAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type CompanionArmorWeightTemplate,
  isCompanionArmorWeight,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-armor-weights/companion-armor-weights.module.code.ts"
import type { CompanionSlotTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import {
  type CompanionEquipmentQualityTemplate,
  isCompanionEquipmentQualityId,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-equipment-qualities/companion-equipment-qualities.module.code.ts"
import { inHashPlace } from "akasha/temper/catalog/companion/companions-core/modules/companion-reading/companion-reading.module.code.ts"
import {
  numberIn,
  textIn,
  textsIn,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-reading/companion-skill-reading.module.code.ts"
import type { CompanionWeaponRoleTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-roles/companion-weapon-roles.module.code.ts"
import {
  type CompanionWeaponTypeTemplate,
  isCompanionWeaponTypeId,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-types/companion-weapon-types.module.code.ts"
import type { CompanionEquipmentConstant } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/modules/eso-companion-equipment-constant-pages/eso-companion-equipment-constant-pages.module.code.ts"

type Row = Readonly<Record<string, unknown>>

export const QUALITY_KEYS: readonly string[] = [
  "slug",
  "key",
  "title",
  "available",
  "hashPlace",
  "lightArmorValue",
  "mediumArmorValue",
  "heavyArmorValue",
  "oneHandedWeaponDamage",
  "twoHandedWeaponDamage",
  "shieldArmorValue",
]

export const WEAPON_ROLE_KEYS: readonly string[] = [
  "slug",
  "key",
  "title",
  "weaponSkillLineId",
  "validMainHandWeaponTypes",
  "validOffHandWeaponTypes",
]

export const WEAPON_TYPE_KEYS: readonly string[] = [
  "slug",
  "key",
  "title",
  "isTwoHanded",
  "isOffHandOnly",
  "hashPlace",
  "equipmentIconName",
]

export const ARMOR_WEIGHT_KEYS: readonly string[] = [
  "slug",
  "key",
  "title",
  "hashPlace",
  "armorType",
  "armorPassiveId",
  "armorSkillLineId",
]

export const ARMOR_SLOT_KEYS: readonly string[] = [
  "slug",
  "key",
  "title",
  "equipType",
  "equipmentIconName",
]

export const JEWELRY_SLOT_KEYS: readonly string[] = [
  ...ARMOR_SLOT_KEYS,
  "slotCategory",
  "allowsLegendary",
]

export const CONSTANT_KEYS: readonly string[] = [
  "slug",
  "key",
  "kind",
  "keyText",
  "valueNum",
  "valueText",
]

function iconNameOf(row: Row): string | null {
  return typeof row.equipmentIconName === "string" ? row.equipmentIconName : null
}

export function byId(one: { readonly id: string }, other: { readonly id: string }): number {
  return one.id < other.id ? -1 : 1
}

export function keysBySlug(rows: readonly Row[]): ReadonlyMap<string, string> {
  const keys = new Map<string, string>()
  for (const row of rows) {
    if (typeof row.slug === "string" && typeof row.key === "string") keys.set(row.slug, row.key)
  }
  return keys
}

function keyAt(row: Row, key: string, keys: ReadonlyMap<string, string>, at: string) {
  const slug = slugAt(row, key)
  if (slug === null) return null
  const found = keys.get(slug)
  if (found === undefined) throw new Error(`${at} names \`${slug}\` at ${key}, and no page is it`)
  return found
}

export function armorWeightsFrom(
  rows: readonly Row[],
  skillKeys: ReadonlyMap<string, string>
): readonly CompanionArmorWeightTemplate[] {
  return inHashPlace(rows, "companion armor weight", (row, at) => {
    const id = row.key
    if (!isCompanionArmorWeight(id)) {
      throw new Error(`${at} states \`${String(id)}\`, which no companion rule knows as a weight`)
    }
    return {
      id,
      name: textIn(row.title, "title", at),
      armorType: typeof row.armorType === "number" ? row.armorType : null,
      passiveSkillId: keyAt(row, "armorPassiveId", skillKeys, at),
      skillLineId: slugAt(row, "armorSkillLineId"),
    }
  })
}

export function slotsFrom(rows: readonly Row[]): readonly CompanionSlotTemplate[] {
  return rows.map((row) => {
    const at = String(row.slug ?? row.key ?? "a companion slot")
    return {
      id: textIn(row.key, "key", at),
      name: textIn(row.title, "title", at),
      equipType: typeof row.equipType === "number" ? row.equipType : null,
      slotCategory: typeof row.slotCategory === "string" ? row.slotCategory : null,
      iconName: iconNameOf(row),
      allowsLegendary: row.allowsLegendary === true,
    }
  })
}

export function constantsFrom(rows: readonly Row[]): readonly CompanionEquipmentConstant[] {
  return rows.map((row) => {
    const at = String(row.slug ?? row.key ?? "a companion equipment constant")
    return {
      kind: textIn(row.kind, "kind", at),
      keyText: textIn(row.keyText, "keyText", at),
      valueNum: typeof row.valueNum === "number" ? row.valueNum : null,
      valueText: typeof row.valueText === "string" ? row.valueText : null,
    }
  })
}

export function weaponTypesFrom(rows: readonly Row[]): readonly CompanionWeaponTypeTemplate[] {
  return inHashPlace(rows, "companion weapon type", (row, at) => {
    const id = row.key
    if (!isCompanionWeaponTypeId(id)) {
      throw new Error(`${at} states \`${String(id)}\`, which no companion rule knows as a weapon`)
    }
    return {
      id,
      name: textIn(row.title, "title", at),
      isTwoHanded: row.isTwoHanded === true,
      isOffHandOnly: row.isOffHandOnly === true,
      iconName: iconNameOf(row),
    }
  })
}

export function weaponRolesFrom(rows: readonly Row[]): readonly CompanionWeaponRoleTemplate[] {
  return rows
    .map((row) => {
      const at = String(row.slug ?? row.key ?? "a companion weapon role")
      return {
        id: textIn(row.key, "key", at),
        name: textIn(row.title, "title", at),
        weaponSkillLineId: textIn(slugAt(row, "weaponSkillLineId"), "weaponSkillLineId", at),
        validMainHandWeaponTypes: textsIn(row.validMainHandWeaponTypes),
        validOffHandWeaponTypes: textsIn(row.validOffHandWeaponTypes),
      }
    })
    .sort(byId)
}

export function qualitiesFrom(rows: readonly Row[]): readonly CompanionEquipmentQualityTemplate[] {
  return inHashPlace(rows, "companion quality", (row, at) => {
    const id = row.key
    if (!isCompanionEquipmentQualityId(id)) {
      throw new Error(`${at} states \`${String(id)}\`, which no companion rule knows as a quality`)
    }
    return {
      id,
      name: textIn(row.title, "title", at),
      available: row.available === true,
      baseValues: {
        lightArmor: numberIn(row.lightArmorValue, "lightArmorValue", at),
        mediumArmor: numberIn(row.mediumArmorValue, "mediumArmorValue", at),
        heavyArmor: numberIn(row.heavyArmorValue, "heavyArmorValue", at),
        oneHandedDamage: numberIn(row.oneHandedWeaponDamage, "oneHandedWeaponDamage", at),
        twoHandedDamage: numberIn(row.twoHandedWeaponDamage, "twoHandedWeaponDamage", at),
        shieldArmor: numberIn(row.shieldArmorValue, "shieldArmorValue", at),
      },
    }
  })
}
