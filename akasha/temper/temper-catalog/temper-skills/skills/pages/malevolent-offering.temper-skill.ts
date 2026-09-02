import type { TemperSkill } from "../temper-skill.page-type.ts"

export const malevolentOffering = {
  id: "01a05fd1-2df5-7b96-a346-2b416a7eebb1",
  pageTypeSlug: "temper-skill",
  slug: "malevolent-offering",
  title: "Malevolent Offering",
  key: "malevolent-offering",
  baseName: "Malevolent Offering",
  description:
    '"Pour out your lifesblood and channel the arcane, healing yourself or an ally in front of you for |cffffff10960|r Health, while draining |cffffff1080|r Health from yourself over |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_011.dds",
  esoSkillId: 33308,
  isMorph: false,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 4,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
