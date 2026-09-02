import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const exhilaratingDrain = {
  id: "01a05fd0-8e2a-7e17-abc8-80e0b7a69c85",
  pageTypeSlug: "temper-skill",
  slug: "exhilarating-drain",
  title: "Exhilarating Drain",
  key: "exhilarating-drain",
  baseName: "Vampiric Drain",
  description:
    '"Siphon away your enemies\' vitality, dealing 870 Magic Damage, healing you for 25% of your missing Health, and generating 5 Ultimate every 1 second for 3 seconds.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_u26_vampire_03_b.dds",
  esoSkillId: 40137259,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "world-vampire",
  skillType: "active",
  subcategoryId: "world-vampire",
} as const satisfies TemperSkill
