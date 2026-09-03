import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const drainVigor135905 = {
  id: "019e6f53-a0ee-78e7-bdc1-08b0fa0c3daf",
  pageTypeSlug: "temper-skill",
  slug: "drain-vigor-135905",
  title: "Drain Vigor",
  key: "drain-vigor-135905",
  baseName: "Vampiric Drain",
  description:
    '"Siphon away your enemies\' vitality, dealing |cffffff3028|r Magic Damage, healing you for |cffffff26|r% of your missing Health, and restoring |cffffff10|r% of your missing Stamina every |cffffff1|r second for |cffffff3|r seconds.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_u26_vampire_03_a.dds",
  esoSkillId: 135905,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
