import type { TemperSkill } from "../temper-skill.page-type.ts"

export const cripplingGrasp = {
  id: "01a05fd0-8deb-726a-91cf-d3b1569f4311",
  pageTypeSlug: "temper-skill",
  slug: "crippling-grasp",
  title: "Crippling Grasp",
  key: "crippling-grasp",
  baseName: "Cripple",
  description:
    '"Sap an enemy\'s agility and wrack them with pain, dealing 1199 Magic Damage and an additional 4350 Magic Damage over 20 seconds, immobilizing them for 2 seconds, and reducing their Movement Speed by 30% for 4 seconds."',
  icon: "/esoui/art/icons/ability_nightblade_006_b.dds",
  esoSkillId: 37913,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
