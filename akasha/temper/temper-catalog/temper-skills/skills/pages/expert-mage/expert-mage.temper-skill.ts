import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const expertMage = {
  id: "019e6245-a67a-703d-9cd0-5d7991201252",
  pageTypeSlug: "temper-skill",
  slug: "expert-mage",
  title: "Expert Mage",
  key: "expert-mage",
  baseName: "Expert Mage",
  description:
    '"Increases your Weapon and Spell Damage by 108 for each Sorcerer ability slotted.\\n\\nCurrent bonus: 0."',
  icon: "/esoui/art/icons/ability_sorcerer_044.dds",
  esoSkillId: 45195,
  isMorph: false,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 0,
  rank: 2,
  skillLineId: "sorcerer-storm-calling",
  skillType: "passive",
  subcategoryId: "sorcerer-storm-calling",
  status: "unsupported",
} as const satisfies TemperSkill
