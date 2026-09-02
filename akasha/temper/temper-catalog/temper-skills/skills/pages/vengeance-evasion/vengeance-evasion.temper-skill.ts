import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceEvasion = {
  id: "01a05fd1-d2a0-7ec4-8a54-6eaa30943f16",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-evasion",
  title: "Vengeance Evasion",
  key: "vengeance-evasion",
  baseName: "Vengeance Evasion",
  description:
    '"Shroud yourself in mist to gain Major Evasion, reducing damage taken from area attacks by |cffffff20|r% for |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_armor_002.dds",
  esoSkillId: 247587,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-armor",
  skillType: "active",
  subcategoryId: "vengeance-armor",
} as const satisfies TemperSkill
