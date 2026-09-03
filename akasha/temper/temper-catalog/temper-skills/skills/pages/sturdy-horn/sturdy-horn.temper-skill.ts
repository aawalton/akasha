import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const sturdyHorn = {
  id: "019e6251-4cf5-7b43-b27c-44f3bf8d1e82",
  pageTypeSlug: "temper-skill",
  slug: "sturdy-horn",
  title: "Sturdy Horn",
  key: "sturdy-horn",
  baseName: "War Horn",
  description:
    '"Sound a war horn to rally your forces, increasing you and your group\'s Max Magicka and Max Stamina by 10% for 30 seconds.\\n\\nYou and your allies gain 1320 Critical Resistance for 10 seconds, reducing incoming Critical Damage by 20%."',
  icon: "/esoui/art/icons/ability_ava_003_b.dds",
  esoSkillId: 46546,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 12,
  skillLineId: "alliance-war-assault",
  skillType: "ultimate",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
