import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceDeathScythe = {
  id: "019e6f53-a8e8-703f-9c45-b300758c6a07",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-death-scythe",
  title: "Vengeance Death Scythe",
  key: "vengeance-death-scythe",
  baseName: "Vengeance Death Scythe",
  description:
    '"Slice into your enemy\'s life force, dealing |cffffff2351|r Magic Damage and healing for |cffffff3016|r Health."',
  icon: "/esoui/art/icons/ability_necromancer_007.dds",
  esoSkillId: 238137,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-necromancer-bone-tyrant",
  skillType: "active",
  subcategoryId: "vengeance-necromancer-bone-tyrant",
} as const satisfies TemperSkill
