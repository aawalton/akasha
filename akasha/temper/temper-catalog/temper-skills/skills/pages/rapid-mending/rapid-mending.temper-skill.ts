import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const rapidMending = {
  id: "01a05fd1-2e2a-716a-8ec7-40bf72c08e37",
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
} as const satisfies TemperSkill
