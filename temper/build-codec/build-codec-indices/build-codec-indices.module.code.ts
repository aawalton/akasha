import { requireFirst } from "@akasha/utils/narrow/require-first"
import { classes } from "akasha/temper/classes/character-class/character-class.module.code.ts"
import { poisons } from "akasha/temper/temper-alchemy/poison-source/poison-source.module.code.ts"
import { potions } from "akasha/temper/temper-alchemy/potion-source/potion-source.module.code.ts"
import { championPoints } from "akasha/temper/temper-champion-points/champion-point-source/champion-point-source.module.code.ts"
import { skills } from "akasha/temper/temper-character-skills/character-skills/character-skills.module.code.ts"
import { getSkillLineCategory } from "akasha/temper/temper-character-skills/passive-queries/passive-queries.module.code.ts"
import { scribedSkills } from "akasha/temper/temper-character-skills/scribed-skills/scribed-skills.module.code.ts"
import { grimoires } from "akasha/temper/temper-character-skills/scribing-grimoires/scribing-grimoires.module.code.ts"
import { armorEnchants } from "akasha/temper/temper-characters-equipment/armor-enchants/armor-enchants.module.code.ts"
import { standardArmorWeights } from "akasha/temper/temper-characters-equipment/armor-weights/armor-weights.module.code.ts"
import { jewelryEnchants } from "akasha/temper/temper-characters-equipment/jewelry-enchants/jewelry-enchants.module.code.ts"
import { setsAll } from "akasha/temper/temper-characters-equipment/sets-all/sets-all.module.code.ts"
import { weaponEnchantments } from "akasha/temper/temper-characters-equipment/weapon-enchants/weapon-enchants.module.code.ts"
import { weaponTypes } from "akasha/temper/temper-characters-equipment/weapon-types-data/weapon-types-data.module.code.ts"
import { armorTraits } from "akasha/temper/temper-equipment/armor-traits/armor-traits.module.code.ts"
import { jewelryTraits } from "akasha/temper/temper-equipment/jewelry-traits/jewelry-traits.module.code.ts"
import { weaponTraits } from "akasha/temper/temper-equipment/weapon-traits/weapon-traits.module.code.ts"
import { alliances } from "../../character-sources/alliances/alliances.module.code.ts"
import { curses } from "../../character-sources/curses/curses.module.code.ts"
import { esoPlus } from "../../character-sources/eso-plus-source/eso-plus-source.module.code.ts"
import { foodOrDrink } from "../../character-sources/food-or-drink-source/food-or-drink-source.module.code.ts"
import { mundus } from "../../character-sources/mundus-source/mundus-source.module.code.ts"
import { vampireStages } from "../../character-sources/vampire-stages/vampire-stages.module.code.ts"
import { armorSlots } from "../../equipment-kinds/armor-slots/armor-slots.module.code.ts"
import { equipmentQualities } from "../../equipment-kinds/equipment-qualities/equipment-qualities.module.code.ts"
import { jewelrySlots } from "../../equipment-kinds/jewelry-slots/jewelry-slots.module.code.ts"
import { races } from "../../races/races/races.module.code.ts"
import { affixScripts } from "../../skill-kinds/scribing-affix-scripts/scribing-affix-scripts.module.code.ts"
import { focusScripts } from "../../skill-kinds/scribing-focus-scripts/scribing-focus-scripts.module.code.ts"
import { signatureScripts } from "../../skill-kinds/scribing-signature-scripts/scribing-signature-scripts.module.code.ts"
import { skillSlots } from "../../skill-kinds/skill-slots/skill-slots.module.code.ts"
import { skillLines } from "../../skill-lines/skill-lines/skill-lines.module.code.ts"

const classIds = classes.ids
const raceIds = races.ids
const allianceIds = alliances.ids
const vampireStageIds = vampireStages.ids
const curseIds = curses.ids
const mundusIds = mundus.ids
export const skillLineIds = skillLines.ids.filter(
  (id) => skillLines.data[id].subcategoryId !== "companion"
)

export const armorSlotIds = armorSlots.ids
const armorWeightIds = standardArmorWeights.ids
const armorTraitIds = armorTraits.ids
const armorEnchantIds = armorEnchants.ids

export const jewelrySlotIds = jewelrySlots.ids
const jewelryTraitIds = jewelryTraits.ids
const jewelryEnchantIds = jewelryEnchants.ids

const weaponTypeIds = weaponTypes.ids
const weaponTraitIds = weaponTraits.ids
const weaponEnchantIds = weaponEnchantments.ids
const poisonIds = poisons.ids

const qualityIds = equipmentQualities.ids

const setIds = setsAll.ids

const skillIds = skills.ids
export const skillSlotIds = skillSlots.ids

export const passiveSkillIds = skills.ids.filter((id) => {
  const skill = skills.data[id]
  if (!skill) return false
  return skill.skillType === "passive" && getSkillLineCategory(skill.skillLineId) !== "companion"
})
export const PASSIVE_SKILL_COUNT = passiveSkillIds.length

const grimoireIds = grimoires.ids
const focusScriptIds = focusScripts.ids
const signatureScriptIds = signatureScripts.ids
const affixScriptIds = affixScripts.ids

const championPointIds = championPoints.ids

const foodOrDrinkIds = foodOrDrink.ids
const potionIds = potions.ids

const esoPlusIds = esoPlus.ids

function bitsNeeded(count: number): number {
  if (count <= 1) return 1
  return Math.ceil(Math.log2(count))
}

export const CLASS_BITS = bitsNeeded(classIds.length)
export const RACE_BITS = bitsNeeded(raceIds.length)
export const ALLIANCE_BITS = bitsNeeded(allianceIds.length)
export const VAMPIRE_STAGE_BITS = bitsNeeded(vampireStageIds.length)
export const CURSE_BITS = bitsNeeded(curseIds.length)
export const MUNDUS_BITS = bitsNeeded(mundusIds.length)
export const SKILL_LINE_BITS = bitsNeeded(skillLineIds.length)
export const ATTRIBUTE_BITS = 7

export const ARMOR_WEIGHT_BITS = bitsNeeded(armorWeightIds.length)
export const ARMOR_TRAIT_BITS = bitsNeeded(armorTraitIds.length)
export const ARMOR_ENCHANT_BITS = bitsNeeded(armorEnchantIds.length)
export const JEWELRY_TRAIT_BITS = bitsNeeded(jewelryTraitIds.length)
export const JEWELRY_ENCHANT_BITS = bitsNeeded(jewelryEnchantIds.length)
export const WEAPON_TYPE_BITS = bitsNeeded(weaponTypeIds.length)
export const WEAPON_TRAIT_BITS = bitsNeeded(weaponTraitIds.length)
export const WEAPON_ENCHANT_BITS = bitsNeeded(weaponEnchantIds.length)
export const POISON_BITS = bitsNeeded(poisonIds.length)
export const QUALITY_BITS = bitsNeeded(qualityIds.length)
export const SET_BITS = bitsNeeded(setIds.length)

export const SKILL_BITS = bitsNeeded(skillIds.length)

export const GRIMOIRE_BITS = bitsNeeded(grimoireIds.length)
export const FOCUS_SCRIPT_BITS = bitsNeeded(focusScriptIds.length)
export const SIGNATURE_SCRIPT_BITS = bitsNeeded(signatureScriptIds.length)
export const AFFIX_SCRIPT_BITS = bitsNeeded(affixScriptIds.length)

export const CHAMPION_POINT_BITS = bitsNeeded(championPointIds.length)

export const FOOD_OR_DRINK_BITS = bitsNeeded(foodOrDrinkIds.length)
export const POTION_BITS = bitsNeeded(potionIds.length)

export const ESO_PLUS_BITS = bitsNeeded(esoPlusIds.length)

const scribedSkillIds = scribedSkills.ids

export const SCRIBED_SKILL_BITS = bitsNeeded(scribedSkillIds.length)

function indexIn<Id extends string>(ids: readonly Id[]): (id: string) => number {
  const map = new Map<string, number>()
  for (const [i, id] of ids.entries()) {
    map.set(id, i)
  }
  return (id) => map.get(id) ?? 0
}

function idIn<Id extends string>(ids: readonly Id[]): (index: number) => Id {
  return (index) => ids[index] ?? requireFirst(ids)
}

export const getClassIndex = indexIn(classIds)
export const getRaceIndex = indexIn(raceIds)
export const getAllianceIndex = indexIn(allianceIds)
export const getVampireStageIndex = indexIn(vampireStageIds)
export const getCurseIndex = indexIn(curseIds)
export const getMundusIndex = indexIn(mundusIds)
export const getSkillLineIndex = indexIn(skillLineIds)
export const getArmorWeightIndex = indexIn(armorWeightIds)
export const getArmorTraitIndex = indexIn(armorTraitIds)
export const getArmorEnchantIndex = indexIn(armorEnchantIds)
export const getJewelryTraitIndex = indexIn(jewelryTraitIds)
export const getJewelryEnchantIndex = indexIn(jewelryEnchantIds)
export const getWeaponTypeIndex = indexIn(weaponTypeIds)
export const getWeaponTraitIndex = indexIn(weaponTraitIds)
export const getWeaponEnchantIndex = indexIn(weaponEnchantIds)
export const getPoisonIndex = indexIn(poisonIds)
export const getQualityIndex = indexIn(qualityIds)
export const getSetIndex = indexIn(setIds)
export const getSkillIndex = indexIn(skillIds)
export const getGrimoireIndex = indexIn(grimoireIds)
export const getFocusScriptIndex = indexIn(focusScriptIds)
export const getSignatureScriptIndex = indexIn(signatureScriptIds)
export const getAffixScriptIndex = indexIn(affixScriptIds)
export const getScribedSkillIndex = indexIn(scribedSkillIds)
export const getChampionPointIndex = indexIn(championPointIds)
export const getFoodOrDrinkIndex = indexIn(foodOrDrinkIds)
export const getPotionIndex = indexIn(potionIds)
export const getEsoPlusIndex = indexIn(esoPlusIds)

export const getClassId = idIn(classIds)
export const getRaceId = idIn(raceIds)
export const getAllianceId = idIn(allianceIds)
export const getVampireStageId = idIn(vampireStageIds)
export const getCurseId = idIn(curseIds)
export const getMundusId = idIn(mundusIds)
export const getSkillLineId = idIn(skillLineIds)
export const getArmorWeightId = idIn(armorWeightIds)
export const getArmorTraitId = idIn(armorTraitIds)
export const getArmorEnchantId = idIn(armorEnchantIds)
export const getJewelryTraitId = idIn(jewelryTraitIds)
export const getJewelryEnchantId = idIn(jewelryEnchantIds)
export const getWeaponTypeId = idIn(weaponTypeIds)
export const getWeaponTraitId = idIn(weaponTraitIds)
export const getWeaponEnchantId = idIn(weaponEnchantIds)
export const getPoisonId = idIn(poisonIds)
export const getQualityId = idIn(qualityIds)
export const getSetId = idIn(setIds)
export const getSkillId = idIn(skillIds)
export const getPassiveSkillId = idIn(passiveSkillIds)
export const getGrimoireId = idIn(grimoireIds)
export const getFocusScriptId = idIn(focusScriptIds)
export const getSignatureScriptId = idIn(signatureScriptIds)
export const getAffixScriptId = idIn(affixScriptIds)
export const getScribedSkillId = idIn(scribedSkillIds)
export const getChampionPointId = idIn(championPointIds)
export const getFoodOrDrinkId = idIn(foodOrDrinkIds)
export const getPotionId = idIn(potionIds)
export const getEsoPlusId = idIn(esoPlusIds)
