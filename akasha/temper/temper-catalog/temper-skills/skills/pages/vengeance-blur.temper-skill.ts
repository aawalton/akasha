import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceBlur = {
  id: "01a05fd1-d28c-7136-af34-f8669d74cc89",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-blur",
  title: "Vengeance Blur",
  key: "vengeance-blur",
  baseName: "Vengeance Blur",
  description:
    '"Surround yourself in a phantasmic aura to gain Major Resolve and Minor Evasion, increasing your Physical and Spell Resistance by |cffffff5948|r and reducing your damage taken from area attacks by |cffffff10|r% for |cffffff20|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_009.dds",
  esoSkillId: 237632,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-shadow",
  skillType: "active",
  subcategoryId: "vengeance-nightblade-shadow",
} as const satisfies TemperSkill
