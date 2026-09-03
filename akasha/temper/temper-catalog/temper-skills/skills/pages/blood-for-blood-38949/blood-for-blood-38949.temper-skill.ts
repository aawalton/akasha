import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bloodForBlood38949 = {
  id: "019e6f53-9f48-7f04-b483-6dbc8c7f01cf",
  pageTypeSlug: "temper-skill",
  slug: "blood-for-blood-38949",
  title: "Blood for Blood",
  key: "blood-for-blood-38949",
  baseName: "Eviscerate",
  description:
    '"Rend an enemy, dealing |cffffff8076|r Magic Damage and applying the Hemorrhaging status effect.\\n\\nDeals up to |cffffff75|r% more damage based on your missing Health.\\n\\nAfter you cast this ability, you cannot be healed by allies for |cffffff3|r seconds."',
  icon: "/esoui/art/icons/ability_u26_vampire_01_a.dds",
  esoSkillId: 38949,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 1,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
