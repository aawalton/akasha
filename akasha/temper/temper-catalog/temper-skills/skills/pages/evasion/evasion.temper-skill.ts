import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const evasion = {
  id: "019e6f53-a1a6-729d-b769-f1578bfb8d6e",
  pageTypeSlug: "temper-skill",
  slug: "evasion",
  title: "Evasion",
  key: "evasion",
  baseName: "Evasion",
  description:
    '"Shroud yourself in mist to gain Major Evasion, reducing damage taken from area attacks by |cffffff20|r% for |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_armor_002.dds",
  esoSkillId: 29556,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "armor-medium-armor",
  skillType: "active",
  subcategoryId: "armor-medium-armor",
} as const satisfies TemperSkill
