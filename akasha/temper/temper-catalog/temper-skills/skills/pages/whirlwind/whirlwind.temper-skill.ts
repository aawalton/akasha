import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const whirlwind = {
  id: "019e6f53-a9ed-790d-a689-427d7fea4001",
  pageTypeSlug: "temper-skill",
  slug: "whirlwind",
  title: "Whirlwind",
  key: "whirlwind",
  baseName: "Whirlwind",
  description:
    '"Launch yourself into a lethal spin, dealing |cffffff6400|r Physical Damage to nearby enemies. Deals up to |cffffff33|r% more damage to enemies with less than |cffffff50|r% Health."',
  icon: "/esoui/art/icons/ability_dualwield_005.dds",
  esoSkillId: 28591,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 0,
  rank: 14,
  skillLineId: "weapon-dual-wield",
  skillType: "active",
  subcategoryId: "weapon-dual-wield",
} as const satisfies TemperSkill
