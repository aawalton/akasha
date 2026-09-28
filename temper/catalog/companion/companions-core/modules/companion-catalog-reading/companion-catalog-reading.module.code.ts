import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import { slugAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { temperCompanionActivationBuff } from "akasha/temper/catalog/companion/activation-buff/temper-companion-activation-buff.page-type.ts"
import { temperCompanionArmorSlot } from "akasha/temper/catalog/companion/armor-slot/temper-companion-armor-slot.page-type.ts"
import { temperCompanionArmorWeight } from "akasha/temper/catalog/companion/armor-weight/temper-companion-armor-weight.page-type.ts"
import { temperCompanionBaseRole } from "akasha/temper/catalog/companion/base-role/temper-companion-base-role.page-type.ts"
import { temperCompanionBaseStat } from "akasha/temper/catalog/companion/base-stat/temper-companion-base-stat.page-type.ts"
import { temperCompanionCombatMechanic } from "akasha/temper/catalog/companion/combat-mechanic/temper-companion-combat-mechanic.page-type.ts"
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
  categoriesFrom,
  categoryOrderFrom,
  EFFECT_CATEGORY_KEYS,
  EFFECT_KEYS,
  EFFECT_TYPES,
  effectValuesFrom,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-effect-reading/companion-effect-reading.module.code.ts"
import {
  ARMOR_SLOT_KEYS,
  ARMOR_WEIGHT_KEYS,
  armorWeightsFrom,
  byId,
  CONSTANT_KEYS,
  constantsFrom,
  EQUIP_TYPE_READ,
  equipTypesIn,
  JEWELRY_SLOT_KEYS,
  keysBySlug,
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
import {
  BREAKDOWN_ROW_KEYS,
  breakdownRowsFrom,
} from "akasha/temper/catalog/companion/companions-core/modules/rotation-breakdown-rows/rotation-breakdown-rows.module.code.ts"
import type { CombatMechanics } from "akasha/temper/catalog/companion/companions-core/modules/rotation-types/rotation-types.module.code.ts"
import { temperCompanionEquipmentQuality } from "akasha/temper/catalog/companion/equipment-quality/temper-companion-equipment-quality.page-type.ts"
import { temperCompanionJewelrySlot } from "akasha/temper/catalog/companion/jewelry-slot/temper-companion-jewelry-slot.page-type.ts"
import { temperCompanionPassiveMetric } from "akasha/temper/catalog/companion/passive-metric/temper-companion-passive-metric.page-type.ts"
import { temperCompanionRole } from "akasha/temper/catalog/companion/role/temper-companion-role.page-type.ts"
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
import { temperEffectCategory } from "akasha/temper/catalog/effect/category/temper-effect-category.page-type.ts"
import { temperSpecialEffectType } from "akasha/temper/catalog/effect/temper-special-effect-type/temper-special-effect-type.page-type.ts"
import { temperStatusEffectType } from "akasha/temper/catalog/effect/temper-status-effect-type/temper-status-effect-type.page-type.ts"
import { temperTargetArmor } from "akasha/temper/catalog/effect/temper-target-armor/temper-target-armor.page-type.ts"
import { temperTargetScope } from "akasha/temper/catalog/effect/temper-target-scope/temper-target-scope.page-type.ts"
import { temperTargetType } from "akasha/temper/catalog/effect/temper-target-type/temper-target-type.page-type.ts"
import {
  buffsAndDebuffsOf,
  holdBuffsAndDebuffs,
} from "akasha/temper/player/character/formula-framework/modules/buff-or-debuff-source/buff-or-debuff-source.module.code.ts"
import {
  holdTargetArmors,
  targetArmorsOf,
} from "akasha/temper/player/character/source/modules/target-armors/target-armors.module.code.ts"
import {
  companionQuestGroupsOf,
  holdCompanionQuestGroups,
} from "akasha/temper/player/completion/temper-player-completion/modules/companion-quest-data/companion-quest-data.module.code.ts"
import { temperMetricTree } from "akasha/temper/player/progress/temper-metric-tree/temper-metric-tree.page-type.ts"
import { temperRotationBreakdownRow } from "akasha/temper/player/progress/temper-rotation-breakdown-row/temper-rotation-breakdown-row.page-type.ts"

type Row = Readonly<Record<string, unknown>>

type RowsOf = (pageTypeSlug: string) => readonly Row[]

const NAMED_KEYS: readonly string[] = ["slug", "key", "title"]

const BASE_STAT_KEYS: readonly string[] = ["slug", "key", "metricId", "effectType", "value"]

const MECHANIC_KEYS: readonly string[] = ["slug", "key", "mechanicValue"]

const TARGET_ARMOR_KEYS: readonly string[] = ["slug", "key", "title", "armor", "defaultTarget"]

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
  "totalMetric",
  "primaryBreakdownRow",
  "defaultTraitId",
  "defaultMainHand",
  "defaultOffHand",
  "defaultWeaponRoleIds",
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
  [temperCompanionActivationBuff.slug, [...NAMED_KEYS, "effectCategory"]],
  ...EFFECT_TYPES.map((slug) => [slug, EFFECT_KEYS] as const),
  [temperCompanionPassiveMetric.slug, NAMED_KEYS],
  [temperCompanionArmorSlot.slug, ARMOR_SLOT_KEYS],
  [temperCompanionJewelrySlot.slug, JEWELRY_SLOT_KEYS],
  EQUIP_TYPE_READ,
  [temperCompanionWeaponSlot.slug, NAMED_KEYS],
  [temperCompanionSkillSlot.slug, NAMED_KEYS],
  [temperCompanionArmorWeight.slug, ARMOR_WEIGHT_KEYS],
  [temperCompanionBaseStat.slug, BASE_STAT_KEYS],
  [temperCompanionCombatMechanic.slug, MECHANIC_KEYS],
  [temperRotationBreakdownRow.slug, BREAKDOWN_ROW_KEYS],
  [temperTargetArmor.slug, TARGET_ARMOR_KEYS],
  [temperEffectCategory.slug, EFFECT_CATEGORY_KEYS],
  [temperMetricTree.slug, ["slug", "nodeId"]],
  [temperStatusEffectType.slug, NAMED_KEYS],
  [temperSpecialEffectType.slug, NAMED_KEYS],
  [temperTargetScope.slug, NAMED_KEYS],
  [temperTargetType.slug, NAMED_KEYS],
]

function mechanicsFrom(rows: readonly Row[]): CombatMechanics {
  const mechanicOf = (key: string): number => {
    const row = rows.find((one) => one.key === key)
    if (row === undefined) throw new Error(`no companion combat mechanic page states \`${key}\``)
    return numberIn(row.mechanicValue, "mechanicValue", key)
  }
  return {
    globalCooldown: mechanicOf("global-cooldown"),
    lightAttackCooldown: mechanicOf("light-attack-cooldown"),
    ultimateGenerationWindow: mechanicOf("ultimate-generation-window"),
    ultimateGenerationRate: mechanicOf("ultimate-generation-rate"),
    ultimateCap: mechanicOf("ultimate-cap"),
    baseCriticalHealing: mechanicOf("base-critical-healing"),
    lightAttackCoefficient: mechanicOf("light-attack-coefficient"),
    playerHealth: mechanicOf("player-health"),
    defaultUltimateCost: mechanicOf("default-ultimate-cost"),
    offHandWeaponDamage: mechanicOf("off-hand-weapon-damage"),
    armorLinePieces: mechanicOf("armor-line-pieces"),
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
      totalMetricId: slugAt(row, "totalMetric") as CompanionMetricId | null,
      primaryBreakdownRowId: slugAt(row, "primaryBreakdownRow"),
      defaultTraitId: stringIn(row.defaultTraitId),
      defaultMainHand: stringIn(row.defaultMainHand),
      defaultOffHand: stringIn(row.defaultOffHand),
      defaultWeaponRoleIds: textsIn(row.defaultWeaponRoleIds) as readonly CompanionWeaponRoleId[],
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
  holdTargetArmors(targetArmorsOf(rowsOf(temperTargetArmor.slug)))
  holdBuffsAndDebuffs(buffsAndDebuffsOf(rowsOf))
  holdCompanionQuestGroups(companionQuestGroupsOf(rowsOf(temperEsoCompanion.slug)))
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
    armorWeights: armorWeightsFrom(
      rowsOf(temperCompanionArmorWeight.slug),
      keysBySlug(rowsOf(temperCompanionSkill.slug))
    ),
    baseStats: baseStatsFrom(rowsOf(temperCompanionBaseStat.slug)),
    combatMechanics: mechanicsFrom(rowsOf(temperCompanionCombatMechanic.slug)),
    effectCategories: categoriesFrom(rowsOf),
    effectValues: effectValuesFrom(rowsOf),
    breakdownRows: breakdownRowsFrom(rowsOf(temperRotationBreakdownRow.slug)),
    effectCategoryOrder: categoryOrderFrom(rowsOf(temperEffectCategory.slug)),
    statusEffectTypes: namedFrom(rowsOf(temperStatusEffectType.slug)),
    specialEffectTypes: namedFrom(rowsOf(temperSpecialEffectType.slug)),
    targetScopes: namedFrom(rowsOf(temperTargetScope.slug)),
    targetTypes: namedFrom(rowsOf(temperTargetType.slug)),
    slots: {
      armor: slotsFrom(rowsOf(temperCompanionArmorSlot.slug), equipTypesIn(rowsOf)),
      jewelry: slotsFrom(rowsOf(temperCompanionJewelrySlot.slug), equipTypesIn(rowsOf)),
      weapon: slotsFrom(rowsOf(temperCompanionWeaponSlot.slug)),
      skill: slotsFrom(rowsOf(temperCompanionSkillSlot.slug)),
    },
  })
}
