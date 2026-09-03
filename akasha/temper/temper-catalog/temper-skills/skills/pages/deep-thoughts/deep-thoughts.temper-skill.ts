import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const deepThoughts = {
  id: "019e6238-c2b1-7347-b321-74fa09a497c2",
  pageTypeSlug: "temper-skill",
  slug: "deep-thoughts",
  title: "Deep Thoughts",
  key: "deep-thoughts",
  baseName: "Meditate",
  description:
    '"Focus your body and mind into a meditative state, healing for 1500 Health and restoring 1900 Magicka and Stamina every 1 second.\\n\\nYou will remain in a meditative state until you toggle this ability off or are interrupted."',
  icon: "/esoui/art/icons/ability_psijic_004_a.dds",
  esoSkillId: 40103652,
  isMorph: true,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-psijic-order",
  skillType: "active",
  subcategoryId: "guild-psijic-order",
} as const satisfies TemperSkill
