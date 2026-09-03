import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const cripple = {
  id: "019e6f53-a031-79da-b090-ae354ffa60d6",
  pageTypeSlug: "temper-skill",
  slug: "cripple",
  title: "Cripple",
  key: "cripple",
  baseName: "Cripple",
  description:
    '"Sap an enemy\'s agility and wrack them with pain, dealing |cffffff15224|r Magic Damage over |cffffff20|r seconds and reducing their Movement Speed by |cffffff30|r% for |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_006.dds",
  esoSkillId: 33326,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "nightblade-siphoning",
  skillType: "active",
  subcategoryId: "nightblade-siphoning",
} as const satisfies TemperSkill
