import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bitterHarvest = {
  id: "01a05fd0-4364-7ae7-9d08-ac0f86ea5551",
  pageTypeSlug: "temper-skill",
  slug: "bitter-harvest",
  title: "Bitter Harvest",
  key: "bitter-harvest",
  baseName: "Bitter Harvest",
  description:
    '"Sap the lingering life from fresh corpses, granting you |cffffff2|r Ultimate and healing |cffffff830|r Health every |cffffff1|r second for |cffffff2|r seconds per corpse consumed. This ability scales off your Max Health.\\n\\nWhile slotted, your damage taken is reduced by |cffffff3|r%."',
  icon: "/esoui/art/icons/ability_necromancer_011.dds",
  esoSkillId: 115238,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
} as const satisfies TemperSkill
