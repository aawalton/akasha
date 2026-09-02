import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const grace = {
  id: "01a05fd0-dca0-7e64-b641-c7b9bf91b7e8",
  pageTypeSlug: "temper-skill",
  slug: "grace",
  title: "Grace",
  key: "grace",
  baseName: "Grace",
  description:
    '"Reduces the effectiveness of snares applied to you by 4% for each piece of Light Armor worn.\\n\\nCurrent bonus: 0%.\\n\\nReduces the cost of Sprint by 3% for each piece of Light Armor worn.\\n\\nCurrent bonus: 0%."',
  icon: "/esoui/art/icons/ability_armor_004.dds",
  esoSkillId: 45549,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 3,
  skillLineId: "armor-light-armor",
  skillType: "passive",
  subcategoryId: "armor-light-armor",
  status: "partially-supported",
} as const satisfies TemperSkill
