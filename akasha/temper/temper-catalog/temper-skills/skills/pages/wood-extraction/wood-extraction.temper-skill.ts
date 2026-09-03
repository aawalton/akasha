import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const woodExtraction = {
  id: "019e6224-ccb6-7168-a599-fce5e9cada0c",
  pageTypeSlug: "temper-skill",
  slug: "wood-extraction",
  title: "Wood Extraction",
  key: "wood-extraction",
  baseName: "Wood Extraction",
  description:
    '"Maximizes the chances of extracting Woodworking ingredients and allows the refining of the most powerful resins from raw materials."',
  icon: "/esoui/art/icons/ability_tradecraft_006.dds",
  esoSkillId: 48180,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-woodworking",
  skillType: "passive",
  subcategoryId: "craft-woodworking",
} as const satisfies TemperSkill
