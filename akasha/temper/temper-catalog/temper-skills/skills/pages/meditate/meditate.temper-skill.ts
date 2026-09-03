import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const meditate = {
  id: "019e6f53-a46a-72c2-9293-c5bd152d40d0",
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
