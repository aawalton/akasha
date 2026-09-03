import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const deadenPain = {
  id: "019e6245-a642-7301-b90b-73ef046644be",
  pageTypeSlug: "temper-skill",
  slug: "deaden-pain",
  title: "Deaden Pain",
  key: "deaden-pain",
  baseName: "Bitter Harvest",
  description:
    '"Sap the lingering life from fresh corpses, granting you 2 Ultimate and healing 682 Health every 1 second for 4 seconds per corpse consumed. While you have the heal effect, you gain Major Protection, reducing the damage you take by 10%. This ability scales off your Max Health.\\n\\nWhile slotted, your damage taken is reduced by 3%."',
  icon: "/esoui/art/icons/ability_necromancer_011_a.dds",
  esoSkillId: 40118623,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "necromancer-bone-tyrant",
  effects: "jsonl",
} as const satisfies TemperSkill
