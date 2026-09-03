import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const drainVigor = {
  id: "019e6251-4caa-7bc4-be77-13ef22749d1a",
  pageTypeSlug: "temper-skill",
  slug: "drain-vigor",
  title: "Drain Vigor",
  key: "drain-vigor",
  baseName: "Vampiric Drain",
  description:
    '"Siphon away your enemies\' vitality, dealing 870 Magic Damage, healing you for 25% of your missing Health, and restoring 10% of your missing Stamina every 1 second for 3 seconds.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_u26_vampire_03_a.dds",
  esoSkillId: 40135905,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
