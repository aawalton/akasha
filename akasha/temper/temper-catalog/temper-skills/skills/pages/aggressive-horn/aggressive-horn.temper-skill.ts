import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const aggressiveHorn = {
  id: "01a05fd0-4343-7d9c-b64d-85e655e87ccf",
  pageTypeSlug: "temper-skill",
  slug: "aggressive-horn",
  title: "Aggressive Horn",
  key: "aggressive-horn",
  baseName: "War Horn",
  description:
    '"Sound a war horn to rally your forces, increasing you and your group\'s Max Magicka and Max Stamina by 10% for 30 seconds.\\n\\nYou and your allies gain Major Force, increasing your Critical Damage by 20% for 10 seconds."',
  icon: "/esoui/art/icons/ability_ava_003_a.dds",
  esoSkillId: 46537,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "alliance-war-assault",
  skillType: "ultimate",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
