import { slugAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { temperCompanionActivationBuff } from "akasha/temper/catalog/companion/activation-buff/temper-companion-activation-buff.page-type.ts"
import { temperCompanionArmorSlot } from "akasha/temper/catalog/companion/armor-slot/temper-companion-armor-slot.page-type.ts"
import { temperCompanionArmorWeight } from "akasha/temper/catalog/companion/armor-weight/temper-companion-armor-weight.page-type.ts"
import { temperCompanionBaseRole } from "akasha/temper/catalog/companion/base-role/temper-companion-base-role.page-type.ts"
import { temperCompanionBaseStat } from "akasha/temper/catalog/companion/base-stat/temper-companion-base-stat.page-type.ts"
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
  ARMOR_SLOT_KEYS,
  ARMOR_WEIGHT_KEYS,
  armorWeightsFrom,
  byId,
  CONSTANT_KEYS,
  constantsFrom,
  JEWELRY_SLOT_KEYS,
  QUALITY_KEYS,
  qualitiesFrom,
  slotsFrom,
  WEAPON_ROLE_KEYS,
  WEAPON_TYPE_KEYS,
  weaponRolesFrom,
  weaponTypesFrom,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-gear-reading/companion-gear-reading.module.code.ts"
import type { CompanionMetricEffect as CompanionEffect } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-effect/companion-metric-effect.module.code.ts"
import type { CompanionMetricId } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-ids/companion-metric-ids.module.code.ts"
import {
  COMPANION_KEYS,
  companionsFrom,
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
import type { CompanionWeaponRoleId } from "akasha/temper/catalog/companion/companions-core/modules/companion-weapon-roles/companion-weapon-roles.module.code.ts"
import type { RotationTimings } from "akasha/temper/catalog/companion/companions-core/modules/rotation-types/rotation-types.module.code.ts"
import { temperCompanionEquipmentQuality } from "akasha/temper/catalog/companion/equipment-quality/temper-companion-equipment-quality.page-type.ts"
import { temperCompanionJewelrySlot } from "akasha/temper/catalog/companion/jewelry-slot/temper-companion-jewelry-slot.page-type.ts"
import { temperCompanionPassiveMetric } from "akasha/temper/catalog/companion/passive-metric/temper-companion-passive-metric.page-type.ts"
import { temperCompanionRole } from "akasha/temper/catalog/companion/role/temper-companion-role.page-type.ts"
import { temperCompanionRotationTiming } from "akasha/temper/catalog/companion/rotation-timing/temper-companion-rotation-timing.page-type.ts"
import { temperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.ts"
import { temperCompanionSkillLine } from "akasha/temper/catalog/companion/skill-line/temper-companion-skill-line.page-type.ts"
import { temperCompanionSkillSlot } from "akasha/temper/catalog/companion/skill-slot/temper-companion-skill-slot.page-type.ts"
import { temperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.ts"
import { temperEsoCompanionEquipmentConstant } from "akasha/temper/catalog/companion/temper-eso-companion-equipment-constant/temper-eso-companion-equipment-constant.page-type.ts"
import { temperCompanionTraitGrade } from "akasha/temper/catalog/companion/trait/grade/temper-companion-trait-grade.page-type.ts"
import { temperCompanionTrait } from "akasha/temper/catalog/companion/trait/temper-companion-trait.page-type.ts"
import { temperCompanionWeaponRole } from "akasha/temper/catalog/companion/weapon-role/temper-companion-weapon-role.page-type.ts"
import { temperCompanionWeaponSlot } from "akasha/temper/catalog/companion/weapon-slot/temper-companion-weapon-slot.page-type.ts"
import { temperCompanionWeaponType } from "akasha/temper/catalog/companion/weapon-type/temper-companion-weapon-type.page-type.ts"

type Row = Readonly<Record<string, unknown>>

export type RowsOf = (pageTypeSlug: string) => readonly Row[]

const NAMED_KEYS: readonly string[] = ["slug", "key", "title"]

const BASE_STAT_KEYS: readonly string[] = ["slug", "key", "metricId", "effectType", "value"]

const TIMING_KEYS: readonly string[] = ["slug", "key", "timingValue"]

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
  [temperCompanionArmorSlot.slug, ARMOR_SLOT_KEYS],
  [temperCompanionJewelrySlot.slug, JEWELRY_SLOT_KEYS],
  [temperCompanionWeaponSlot.slug, NAMED_KEYS],
  [temperCompanionSkillSlot.slug, NAMED_KEYS],
  [temperCompanionArmorWeight.slug, ARMOR_WEIGHT_KEYS],
  [temperCompanionBaseStat.slug, BASE_STAT_KEYS],
  [temperCompanionRotationTiming.slug, TIMING_KEYS],
]

function timingsFrom(rows: readonly Row[]): RotationTimings {
  const timingOf = (key: string): number => {
    const row = rows.find((one) => one.key === key)
    if (row === undefined) throw new Error(`no companion rotation timing page states \`${key}\``)
    return numberIn(row.timingValue, "timingValue", key)
  }
  return {
    globalCooldown: timingOf("global-cooldown"),
    lightAttackCooldown: timingOf("light-attack-cooldown"),
    ultimateGenerationWindow: timingOf("ultimate-generation-window"),
    ultimateGenerationRate: timingOf("ultimate-generation-rate"),
  }
}

function baseStatsFrom(rows: readonly Row[]): readonly CompanionEffect[] {
  return rows.map((row) => {
    const at = String(row.slug ?? row.key ?? "a companion base stat")
    const metricId = textIn(slugAt(row, "metricId"), "metricId", at) as CompanionMetricId
    const effectValue = numberIn(row.value, "value", at)
    if (row.effectType === "integer") return { metricId, effectType: "integer", effectValue }
    if (row.effectType === "fractional-change") {
      return { metricId, effectType: "fractional-change", effectValue }
    }
    throw new Error(`${at} states effect type \`${String(row.effectType)}\`, which no stat sums`)
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
    armorWeights: armorWeightsFrom(rowsOf(temperCompanionArmorWeight.slug)),
    baseStats: baseStatsFrom(rowsOf(temperCompanionBaseStat.slug)),
    rotationTimings: timingsFrom(rowsOf(temperCompanionRotationTiming.slug)),
    slots: {
      armor: slotsFrom(rowsOf(temperCompanionArmorSlot.slug)),
      jewelry: slotsFrom(rowsOf(temperCompanionJewelrySlot.slug)),
      weapon: slotsFrom(rowsOf(temperCompanionWeaponSlot.slug)),
      skill: slotsFrom(rowsOf(temperCompanionSkillSlot.slug)),
    },
  })
}
