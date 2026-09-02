import type { TemperSkill } from "../temper-skill.page-type.ts"

export const vengeanceCripple = {
  id: "01a05fd1-d292-7122-b37a-57a92526bf5d",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-cripple",
  title: "Vengeance Cripple",
  key: "vengeance-cripple",
  baseName: "Vengeance Cripple",
  description:
    '"Sap an enemy\'s agility and wrack them with pain, dealing |cffffff14178|r Magic Damage over |cffffff5|r seconds and reducing their Movement Speed by |cffffff30|r% for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_006.dds",
  esoSkillId: 237713,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-nightblade-siphoning",
  skillType: "active",
  subcategoryId: "vengeance-nightblade-siphoning",
} as const satisfies TemperSkill
