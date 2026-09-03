import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const eviscerate = {
  id: "019e6f53-a1af-7fe0-8249-d6d25d09bf3b",
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
