import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const eviscerate = {
  id: "01a05fd0-8e28-7b61-9e9f-f6a103a79316",
  pageTypeSlug: "temper-skill",
  slug: "eviscerate",
  title: "Eviscerate",
  key: "eviscerate",
  baseName: "Eviscerate",
  description:
    '"Rend an enemy, dealing |cffffff8076|r Magic Damage and applying the Hemorrhaging status effect.\\n\\nDeals up to |cffffff33|r% more damage based on your missing Health."',
  icon: "/esoui/art/icons/ability_u26_vampire_01.dds",
  esoSkillId: 32893,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
