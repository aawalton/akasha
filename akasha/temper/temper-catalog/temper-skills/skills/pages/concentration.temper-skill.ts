import type { TemperSkill } from "../temper-skill.page-type.ts"

export const concentration = {
  id: "01a05fd0-439f-7482-a105-7d9d9aee8c06",
  pageTypeSlug: "temper-skill",
  slug: "concentration",
  title: "Concentration",
  key: "concentration",
  baseName: "Concentration",
  description:
    '"Increases your Physical and Spell Penetration by 939 for each piece of Light Armor worn.\\n\\nCurrent bonus: 0"',
  icon: "/esoui/art/icons/ability_sorcerer_060.dds",
  esoSkillId: 45562,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 2,
  skillLineId: "armor-light-armor",
  skillType: "passive",
  subcategoryId: "armor-light-armor",
  status: "supported",
} as const satisfies TemperSkill
