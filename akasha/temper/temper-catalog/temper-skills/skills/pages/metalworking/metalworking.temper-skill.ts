import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const metalworking = {
  id: "019e6224-cca5-771c-ab95-143208d7cbac",
  pageTypeSlug: "temper-skill",
  slug: "metalworking",
  title: "Metalworking",
  key: "metalworking",
  baseName: "Metalworking",
  description: '"Allows the use of Rubedite Ingots."',
  icon: "/esoui/art/icons/ability_smith_001.dds",
  esoSkillId: 70041,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 10,
  skillLineId: "craft-blacksmithing",
  skillType: "passive",
  subcategoryId: "craft-blacksmithing",
} as const satisfies TemperSkill
