import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const expertMage31425 = {
  id: "019e6f53-a1c7-7a09-b71a-fbd6367275c2",
  pageTypeSlug: "temper-skill",
  slug: "expert-mage-31425",
  title: "Expert Mage",
  key: "expert-mage-31425",
  baseName: "Expert Mage",
  description:
    '"Increases your Weapon and Spell Damage by |cffffff54|r for each Sorcerer ability slotted.\\n\\nCurrent bonus: |cffffff0|r."',
  icon: "/esoui/art/icons/ability_sorcerer_044.dds",
  esoSkillId: 31425,
  isMorph: false,
  learnedLevel: 39,
  lineRankNeeded: 39,
  morphIndex: 0,
  rank: 39,
  skillLineId: "sorcerer-storm-calling",
  skillType: "passive",
  subcategoryId: "sorcerer-storm-calling",
} as const satisfies TemperSkill
