import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const rapidMending = {
  id: "019e6238-c2fc-77f3-a462-75fb8f0ce69a",
  pageTypeSlug: "temper-skill",
  slug: "rapid-mending",
  title: "Rapid Mending",
  key: "rapid-mending",
  baseName: "Rapid Mending",
  description:
    '"Increases your healing received by 1% for each piece of Heavy Armor worn.\\n\\nCurrent bonus: 0%"',
  icon: "/esoui/art/icons/ability_armor_015.dds",
  esoSkillId: 45529,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 42,
  morphIndex: 0,
  rank: 2,
  skillLineId: "armor-heavy-armor",
  skillType: "passive",
  subcategoryId: "armor-heavy-armor",
  status: "supported",
  effects: "jsonl",
} as const satisfies TemperSkill
