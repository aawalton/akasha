import { slugAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { temperCompanionActivationBuff } from "akasha/temper/catalog/companion/activation-buff/temper-companion-activation-buff.page-type.ts"
import { temperCompanionBaseRole } from "akasha/temper/catalog/companion/base-role/temper-companion-base-role.page-type.ts"
import type { CompanionArmorWeight } from "akasha/temper/catalog/companion/companions-core/modules/companion-armor-weights/companion-armor-weights.module.code.ts"
import {
  type CompanionBaseRoleTemplate,
  isCompanionBaseRoleId,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import {
  type CompanionCatalog,
  type CompanionRoleTemplate,
  catalogOf,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import {
  type CompanionEquipmentQualityTemplate,
  isCompanionEquipmentQualityId,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-equipment-qualities/companion-equipment-qualities.module.code.ts"
import {
  COMPANION_KEYS,
  companionsFrom,
  inHashPlace,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-reading/companion-reading.module.code.ts"
import {
  byOrder,
  companionSkillLinesFrom,
  SKILL_LINE_KEYS,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-line-reading/companion-skill-line-reading.module.code.ts"
import {
  companionSkillsFrom,
  numberIn,
  SKILL_KEYS,
  textIn,
  textsIn,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-reading/companion-skill-reading.module.code.ts"
import {
  companionTraitsFrom,
  GRADE_KEYS,
  TRAIT_KEYS,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-trait-reading/companion-trait-reading.module.code.ts"
import type {
  CompanionWeaponRoleId,
  CompanionWeaponRoleTemplate,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-roles/companion-weapon-roles.module.code.ts"
import {
  type CompanionWeaponTypeTemplate,
  isCompanionWeaponTypeId,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-types/companion-weapon-types.module.code.ts"
import { temperCompanionEquipmentQuality } from "akasha/temper/catalog/companion/equipment-quality/temper-companion-equipment-quality.page-type.ts"
import { temperCompanionPassiveMetric } from "akasha/temper/catalog/companion/passive-metric/temper-companion-passive-metric.page-type.ts"
import { temperCompanionRole } from "akasha/temper/catalog/companion/role/temper-companion-role.page-type.ts"
import { temperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.ts"
import { temperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.ts"
import { temperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.ts"
import type { CompanionEquipmentConstant } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/modules/eso-companion-equipment-constant-pages/eso-companion-equipment-constant-pages.module.code.ts"
import { temperEsoCompanionEquipmentConstant } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/temper-eso-companion-equipment-constant.page-type.ts"
import { temperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.ts"
import { temperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.ts"
import { temperCompanionWeaponRole } from "akasha/temper/catalog/companion/weapon-role/temper-companion-weapon-role.page-type.ts"
import { temperCompanionWeaponType } from "akasha/temper/catalog/companion/weapon-type/temper-companion-weapon-type.page-type.ts"

type Row = Readonly<Record<string, unknown>>

export type RowsOf = (pageTypeSlug: string) => readonly Row[]

const NAMED_KEYS: readonly string[] = ["slug", "key", "title"]

const QUALITY_KEYS: readonly string[] = [
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

const WEAPON_ROLE_KEYS: readonly string[] = [
  "slug",
  "key",
  "title",
  "weaponSkillLineId",
  "validMainHandWeaponTypes",
  "validOffHandWeaponTypes",
]

const WEAPON_TYPE_KEYS: readonly string[] = [
  "slug",
  "key",
  "title",
  "isTwoHanded",
  "isOffHandOnly",
  "hashPlace",
]

const CONSTANT_KEYS: readonly string[] = ["slug", "key", "kind", "keyText", "valueNum", "valueText"]

const BASE_ROLE_KEYS: readonly string[] = [
  "slug",
  "key",
  "title",
  "abbreviation",
  "description",
  "displayOrder",
  "validWeaponRoleIds",
  "validTraitIds",
  "validArmorWeights",
]

export const CATALOG_READS: readonly (readonly [string, readonly string[]])[] = [
  [temperEsoCompanion.slug, COMPANION_KEYS],
  [temperCompanionSkill.slug, SKILL_KEYS],
  [temperCompanionSkillLine.slug, SKILL_LINE_KEYS],
  [temperCompanionTrait.slug, TRAIT_KEYS],
  [temperCompanionTraitGrade.slug, GRADE_KEYS],
  [temperCompanionRole.slug, NAMED_KEYS],
  [temperCompanionBaseRole.slug, BASE_ROLE_KEYS],
  [temperCompanionEquipmentQuality.slug, QUALITY_KEYS],
  [temperCompanionWeaponRole.slug, WEAPON_ROLE_KEYS],
  [temperCompanionWeaponType.slug, WEAPON_TYPE_KEYS],
  [temperEsoCompanionEquipmentConstant.slug, CONSTANT_KEYS],
  [temperCompanionActivationBuff.slug, NAMED_KEYS],
  [temperCompanionPassiveMetric.slug, NAMED_KEYS],
]

function constantsFrom(rows: readonly Row[]): readonly CompanionEquipmentConstant[] {
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

function weaponTypesFrom(rows: readonly Row[]): readonly CompanionWeaponTypeTemplate[] {
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
    }
  })
}

function byId(one: { readonly id: string }, other: { readonly id: string }): number {
  return one.id < other.id ? -1 : 1
}

function weaponRolesFrom(rows: readonly Row[]): readonly CompanionWeaponRoleTemplate[] {
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

function qualitiesFrom(rows: readonly Row[]): readonly CompanionEquipmentQualityTemplate[] {
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

function baseRolesFrom(rows: readonly Row[]): readonly CompanionBaseRoleTemplate[] {
  return [...rows].sort(byOrder).map((row) => {
    const at = String(row.slug ?? row.key ?? "a companion base role")
    const id = row.key
    if (!isCompanionBaseRoleId(id)) {
      throw new Error(`${at} states \`${String(id)}\`, which no companion rule knows as a role`)
    }
    return {
      id,
      name: textIn(row.title, "title", at),
      abbreviation: textIn(row.abbreviation, "abbreviation", at),
      description: textIn(row.description, "description", at),
      validWeaponRoleIds: textsIn(row.validWeaponRoleIds) as readonly CompanionWeaponRoleId[],
      validTraitIds: textsIn(row.validTraitIds),
      validArmorWeights: textsIn(row.validArmorWeights) as readonly CompanionArmorWeight[],
    }
  })
}

function namedFrom(rows: readonly Row[]): readonly CompanionRoleTemplate[] {
  return rows
    .map((row) => {
      const at = String(row.slug ?? row.key ?? "a companion role")
      return { id: textIn(row.key, "key", at), name: textIn(row.title, "title", at) }
    })
    .sort(byId)
}

export function companionCatalogFrom(rowsOf: RowsOf): CompanionCatalog {
  return catalogOf({
    companions: companionsFrom(rowsOf(temperEsoCompanion.slug)),
    skills: companionSkillsFrom(rowsOf(temperCompanionSkill.slug)),
    skillLines: companionSkillLinesFrom(rowsOf(temperCompanionSkillLine.slug)),
    traits: companionTraitsFrom(
      rowsOf(temperCompanionTrait.slug),
      rowsOf(temperCompanionTraitGrade.slug)
    ),
    roles: namedFrom(rowsOf(temperCompanionRole.slug)),
    baseRoles: baseRolesFrom(rowsOf(temperCompanionBaseRole.slug)),
    qualities: qualitiesFrom(rowsOf(temperCompanionEquipmentQuality.slug)),
    weaponRoles: weaponRolesFrom(rowsOf(temperCompanionWeaponRole.slug)),
    weaponTypes: weaponTypesFrom(rowsOf(temperCompanionWeaponType.slug)),
    equipmentConstants: constantsFrom(rowsOf(temperEsoCompanionEquipmentConstant.slug)),
    activationBuffs: namedFrom(rowsOf(temperCompanionActivationBuff.slug)),
    passiveMetrics: namedFrom(rowsOf(temperCompanionPassiveMetric.slug)),
  })
}
