import { getPages } from "../addon-data-page-rows/addon-data-page-rows.module.code.ts"
import { withSidecars } from "../catalog-sidecars/catalog-sidecars.module.code.ts"
import { fetchMinedRestorePotions } from "../mined-restore-potions/mined-restore-potions.module.code.ts"
import type { MinedRestorePotion } from "../potion-restore-metrics/potion-restore-metrics.module.code.ts"

type PageResult = Awaited<ReturnType<typeof getPages>>

const WHOLE = 1000

const CHARACTER_SKILL_ACTIVATION_SELECT = ["descriptionTemplate", "activationEffects"]

const COMPANION_SKILL_SELECT = [
  "key",
  "abilityId",
  "companionId",
  "skillLineId",
  "skillType",
  "description",
  "validRoles",
  "tags",
  "alternateAbilityIds",
]

export type AddonDataPages = {
  affixScriptPages: PageResult
  alliancePages: PageResult
  armorEnchantPages: PageResult
  armorSlotPages: PageResult
  armorTraitPages: PageResult
  armorTypePages: PageResult
  armorWeightPages: PageResult
  buffMajorPages: PageResult
  buffMinorPages: PageResult
  buffOtherPages: PageResult
  characterRolePages: PageResult
  characterSkillActivationPages: PageResult
  classPages: PageResult
  companionActivationBuffPages: PageResult
  companionArmorSlotPages: PageResult
  companionBaseRolePages: PageResult
  companionEquipmentQualityPages: PageResult
  companionJewelrySlotPages: PageResult
  companionPages: PageResult
  companionPassiveMetricPages: PageResult
  companionRolePages: PageResult
  companionSkillPages: PageResult
  companionSkillLinePages: PageResult
  companionSkillSlotPages: PageResult
  companionTraitPages: PageResult
  companionWeaponRolePages: PageResult
  companionWeaponSlotPages: PageResult
  companionWeaponTypePages: PageResult
  comparisonOpPages: PageResult
  cursePages: PageResult
  debuffMajorPages: PageResult
  debuffMinorPages: PageResult
  debuffOtherPages: PageResult
  dungeonPages: PageResult
  questGiverPages: PageResult
  esoCompanionEquipmentConstantPages: PageResult
  esoPlayerEquipmentConstantPages: PageResult
  esoTraitMapPages: PageResult
  focusScriptPages: PageResult
  grimoirePages: PageResult
  inventoryCurrencyPages: PageResult
  itemCategoryTreePages: PageResult
  jewelryEnchantPages: PageResult
  jewelrySlotPages: PageResult
  jewelryTraitPages: PageResult
  jewelryTypePages: PageResult
  locationTypePages: PageResult
  metricTreePages: PageResult
  motifStylePages: PageResult
  poisonEffectPages: PageResult
  potionCraftedPages: PageResult
  potionCrownPages: PageResult
  potionDroppedPages: PageResult
  qualityPages: PageResult
  racePages: PageResult
  reagentPages: PageResult
  rotationBreakdownRowPages: PageResult
  ruleTemplatePages: PageResult
  scribedSkillPages: PageResult
  scribingSourcePages: PageResult
  setPages: PageResult
  setCategoryPages: PageResult
  signatureScriptPages: PageResult
  skillBarPages: PageResult
  skillPages: PageResult
  skillLinePages: PageResult
  skillLineCategoryPages: PageResult
  skillSlotPages: PageResult
  skillTypePages: PageResult
  sourceCategoryPages: PageResult
  specialEffectTypePages: PageResult
  statusEffectTypePages: PageResult
  targetArmorPages: PageResult
  targetScopePages: PageResult
  targetTypePages: PageResult
  ttcKioskLocationPages: PageResult
  vampireStagePages: PageResult
  weaponBarPages: PageResult
  weaponEnchantPages: PageResult
  weaponSlotPages: PageResult
  weaponTraitPages: PageResult
  weaponTypePages: PageResult
  zonePages: PageResult
  minedRestorePotions: readonly MinedRestorePotion[]
}

export type Asked = {
  readonly accessor: string
  readonly pageTypeSlug: string
  readonly limit?: number
  readonly select?: readonly string[]
  readonly sidecars?: true
}

export const ASKED: readonly Asked[] = [
  { accessor: "affixScriptPages", pageTypeSlug: "temper-affix-script" },
  { accessor: "alliancePages", pageTypeSlug: "temper-alliance" },
  { accessor: "armorEnchantPages", pageTypeSlug: "temper-armor-enchant", sidecars: true },
  { accessor: "armorSlotPages", pageTypeSlug: "temper-armor-slot" },
  { accessor: "armorTraitPages", pageTypeSlug: "temper-armor-trait", sidecars: true },
  { accessor: "armorTypePages", pageTypeSlug: "temper-armor-type" },
  { accessor: "armorWeightPages", pageTypeSlug: "temper-armor-weight" },
  { accessor: "buffMajorPages", pageTypeSlug: "temper-buff-major", sidecars: true },
  { accessor: "buffMinorPages", pageTypeSlug: "temper-buff-minor", sidecars: true },
  { accessor: "buffOtherPages", pageTypeSlug: "temper-buff-other", sidecars: true },
  { accessor: "characterRolePages", pageTypeSlug: "temper-character-role" },
  {
    accessor: "characterSkillActivationPages",
    pageTypeSlug: "temper-character-skill-activation",
    select: CHARACTER_SKILL_ACTIVATION_SELECT,
  },
  { accessor: "classPages", pageTypeSlug: "temper-class" },
  { accessor: "companionActivationBuffPages", pageTypeSlug: "temper-companion-activation-buff" },
  { accessor: "companionArmorSlotPages", pageTypeSlug: "temper-companion-armor-slot" },
  { accessor: "companionBaseRolePages", pageTypeSlug: "temper-companion-base-role" },
  {
    accessor: "companionEquipmentQualityPages",
    pageTypeSlug: "temper-companion-equipment-quality",
  },
  { accessor: "companionJewelrySlotPages", pageTypeSlug: "temper-companion-jewelry-slot" },
  { accessor: "companionPages", pageTypeSlug: "temper-eso-companion", sidecars: true },
  { accessor: "companionPassiveMetricPages", pageTypeSlug: "temper-companion-passive-metric" },
  { accessor: "companionRolePages", pageTypeSlug: "temper-companion-role" },
  {
    accessor: "companionSkillPages",
    pageTypeSlug: "temper-companion-skill",
    select: COMPANION_SKILL_SELECT,
  },
  { accessor: "companionSkillLinePages", pageTypeSlug: "temper-companion-skill-line" },
  { accessor: "companionSkillSlotPages", pageTypeSlug: "temper-companion-skill-slot" },
  { accessor: "companionTraitPages", pageTypeSlug: "temper-companion-trait", sidecars: true },
  { accessor: "companionWeaponRolePages", pageTypeSlug: "temper-companion-weapon-role" },
  { accessor: "companionWeaponSlotPages", pageTypeSlug: "temper-companion-weapon-slot" },
  { accessor: "companionWeaponTypePages", pageTypeSlug: "temper-companion-weapon-type" },
  { accessor: "comparisonOpPages", pageTypeSlug: "temper-comparison-op" },
  { accessor: "cursePages", pageTypeSlug: "temper-curse" },
  { accessor: "debuffMajorPages", pageTypeSlug: "temper-debuff-major", sidecars: true },
  { accessor: "debuffMinorPages", pageTypeSlug: "temper-debuff-minor", sidecars: true },
  { accessor: "debuffOtherPages", pageTypeSlug: "temper-debuff-other", sidecars: true },
  { accessor: "dungeonPages", pageTypeSlug: "temper-dungeon" },
  { accessor: "questGiverPages", pageTypeSlug: "temper-quest-giver" },
  {
    accessor: "esoCompanionEquipmentConstantPages",
    pageTypeSlug: "temper-eso-companion-equipment-constant",
  },
  {
    accessor: "esoPlayerEquipmentConstantPages",
    pageTypeSlug: "temper-eso-player-equipment-constant",
  },
  { accessor: "esoTraitMapPages", pageTypeSlug: "temper-eso-trait-map" },
  { accessor: "focusScriptPages", pageTypeSlug: "temper-focus-script" },
  { accessor: "grimoirePages", pageTypeSlug: "temper-grimoire", sidecars: true },
  { accessor: "inventoryCurrencyPages", pageTypeSlug: "temper-inventory-currency" },
  { accessor: "itemCategoryTreePages", pageTypeSlug: "temper-item-category-tree" },
  { accessor: "jewelryEnchantPages", pageTypeSlug: "temper-jewelry-enchant", sidecars: true },
  { accessor: "jewelrySlotPages", pageTypeSlug: "temper-jewelry-slot" },
  { accessor: "jewelryTraitPages", pageTypeSlug: "temper-jewelry-trait", sidecars: true },
  { accessor: "jewelryTypePages", pageTypeSlug: "temper-jewelry-type" },
  { accessor: "locationTypePages", pageTypeSlug: "temper-location-type" },
  { accessor: "metricTreePages", pageTypeSlug: "temper-metric-tree" },
  { accessor: "motifStylePages", pageTypeSlug: "temper-motif-style" },
  { accessor: "poisonEffectPages", pageTypeSlug: "temper-poison-effect" },
  { accessor: "potionCraftedPages", pageTypeSlug: "temper-potion-crafted" },
  { accessor: "potionDroppedPages", pageTypeSlug: "temper-potion-dropped" },
  { accessor: "qualityPages", pageTypeSlug: "temper-quality" },
  { accessor: "racePages", pageTypeSlug: "temper-race" },
  { accessor: "reagentPages", pageTypeSlug: "temper-reagent" },
  { accessor: "rotationBreakdownRowPages", pageTypeSlug: "temper-rotation-breakdown-row" },
  { accessor: "ruleTemplatePages", pageTypeSlug: "temper-rule-template" },
  { accessor: "scribedSkillPages", pageTypeSlug: "temper-scribed-skill" },
  { accessor: "scribingSourcePages", pageTypeSlug: "temper-scribing-source" },
  { accessor: "setPages", pageTypeSlug: "temper-set" },
  { accessor: "setCategoryPages", pageTypeSlug: "temper-set-category" },
  { accessor: "signatureScriptPages", pageTypeSlug: "temper-signature-script" },
  { accessor: "skillBarPages", pageTypeSlug: "temper-skill-bar" },
  { accessor: "skillPages", pageTypeSlug: "temper-skill", limit: 5000, sidecars: true },
  { accessor: "skillLinePages", pageTypeSlug: "temper-skill-line" },
  { accessor: "skillLineCategoryPages", pageTypeSlug: "temper-skill-line-category" },
  { accessor: "skillSlotPages", pageTypeSlug: "temper-skill-slot" },
  { accessor: "skillTypePages", pageTypeSlug: "temper-skill-type" },
  { accessor: "sourceCategoryPages", pageTypeSlug: "temper-source-category" },
  { accessor: "specialEffectTypePages", pageTypeSlug: "temper-special-effect-type" },
  { accessor: "statusEffectTypePages", pageTypeSlug: "temper-status-effect-type" },
  { accessor: "targetArmorPages", pageTypeSlug: "temper-target-armor" },
  { accessor: "targetScopePages", pageTypeSlug: "temper-target-scope" },
  { accessor: "targetTypePages", pageTypeSlug: "temper-target-type" },
  { accessor: "ttcKioskLocationPages", pageTypeSlug: "temper-guild-trader" },
  { accessor: "vampireStagePages", pageTypeSlug: "temper-vampire-stage" },
  { accessor: "weaponBarPages", pageTypeSlug: "temper-weapon-bar" },
  { accessor: "weaponEnchantPages", pageTypeSlug: "temper-weapon-enchant", sidecars: true },
  { accessor: "weaponSlotPages", pageTypeSlug: "temper-weapon-slot" },
  { accessor: "weaponTraitPages", pageTypeSlug: "temper-weapon-trait", sidecars: true },
  { accessor: "weaponTypePages", pageTypeSlug: "temper-weapon-type" },
  { accessor: "zonePages", pageTypeSlug: "temper-zone" },
  { accessor: "potionCrownPages", pageTypeSlug: "temper-potion-crown" },
]

export async function answered(one: Asked): Promise<readonly [string, PageResult]> {
  const got = await getPages({
    pageTypeSlug: one.pageTypeSlug,
    limit: one.limit ?? WHOLE,
    ...(one.select === undefined ? {} : { select: one.select }),
  })
  if (one.sidecars !== true) return [one.accessor, got]
  return [one.accessor, { ...got, rows: withSidecars(one.pageTypeSlug, got.rows) }]
}

export async function fetchAddonDataPages(): Promise<AddonDataPages> {
  const held: Record<string, unknown> = Object.fromEntries(await Promise.all(ASKED.map(answered)))
  held.minedRestorePotions = await fetchMinedRestorePotions()
  return held as AddonDataPages
}
