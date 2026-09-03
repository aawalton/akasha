import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const replenishingBarrier40239 = {
  id: "019e6f53-a607-7fde-b435-f2084fd48dde",
  pageTypeSlug: "temper-skill",
  slug: "replenishing-barrier-40239",
  title: "Replenishing Barrier",
  key: "replenishing-barrier-40239",
  baseName: "Barrier",
  description:
    '"Invoke defensive tactics to protect yourself and nearby group members with wards that each absorb up to |cffffff41192|r damage. \\n\\nEach time a ward dissolves, you restore |cffffff1500|r Magicka."',
  icon: "/esoui/art/icons/ability_ava_006_a.dds",
  esoSkillId: 40239,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 6,
  morphIndex: 2,
  rank: 6,
  skillLineId: "alliance-war-support",
  skillType: "ultimate",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
