import type { TemperSkill } from "../temper-skill.page-type.ts"

export const meditate = {
  id: "01a05fd1-2df9-73b9-bcfe-d7402cafa4d5",
  pageTypeSlug: "temper-skill",
  slug: "meditate",
  title: "Meditate",
  key: "meditate",
  baseName: "Meditate",
  description:
    '"Focus your body and mind into a meditative state, healing for |cffffff1530|r Health and restoring |cffffff1500|r Magicka and Stamina every |cffffff1|r second.\\n\\nYou will remain in a meditative state until you toggle this ability off or are interrupted."',
  icon: "/esoui/art/icons/ability_psijic_004.dds",
  esoSkillId: 103492,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
