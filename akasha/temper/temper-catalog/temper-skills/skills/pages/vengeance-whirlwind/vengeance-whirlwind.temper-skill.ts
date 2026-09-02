import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceWhirlwind = {
  id: "01a05fd2-1e90-7fc5-aa96-c1f6ab40d339",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-whirlwind",
  title: "Vengeance Whirlwind",
  key: "vengeance-whirlwind",
  baseName: "Vengeance Whirlwind",
  description:
    '"Launch yourself into a lethal spin, dealing |cffffff8820|r Physical Damage to up to 3 nearby enemies.\\nDeals up to |cffffff33|r% more damage to enemies below |cffffff50|r% Health."',
  icon: "/esoui/art/icons/ability_dualwield_005.dds",
  esoSkillId: 240594,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-dual-wield",
  skillType: "active",
  subcategoryId: "vengeance-weapon-dual-wield",
} as const satisfies TemperSkill
