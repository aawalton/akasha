import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const deathStroke = {
  id: "01a05fd0-8e01-770c-a323-0a07639572cb",
  pageTypeSlug: "temper-skill",
  slug: "death-stroke",
  title: "Death Stroke",
  key: "death-stroke",
  baseName: "Death Stroke",
  description:
    '"Ravage an enemy with a swift strike, dealing |cffffff12922|r Magic Damage and causing them to take |cffffff20|r% more damage from your attacks for |cffffff8|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_007.dds",
  esoSkillId: 33398,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "nightblade-assassination",
  skillType: "ultimate",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
