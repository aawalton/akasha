import type { TemperSkill } from "../temper-skill.page-type.ts"

export const swallowSoul34835 = {
  id: "01a05fd1-d258-7fbd-8c3a-fe12160c249a",
  pageTypeSlug: "temper-skill",
  slug: "swallow-soul-34835",
  title: "Swallow Soul",
  key: "swallow-soul-34835",
  baseName: "Strife",
  description:
    '"Steal an enemy\'s life force, dealing |cffffff7509|r Magic Damage and healing you for |cffffff36|r% of the damage inflicted every |cffffff2|r seconds for |cffffff10|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_012_a.dds",
  esoSkillId: 34835,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 1,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
