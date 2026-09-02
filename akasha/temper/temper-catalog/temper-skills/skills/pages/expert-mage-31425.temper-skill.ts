import type { TemperSkill } from "../temper-skill.page-type.ts"

export const expertMage31425 = {
  id: "01a05fd0-8e2c-7912-a3ea-b25e8e103c87",
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
