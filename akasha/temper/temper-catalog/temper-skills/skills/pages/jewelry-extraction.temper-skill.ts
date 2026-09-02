import type { TemperSkill } from "../temper-skill.page-type.ts"

export const jewelryExtraction = {
  id: "01a05fd0-dccb-7196-a116-e6a7648d0b6b",
  pageTypeSlug: "temper-skill",
  slug: "jewelry-extraction",
  title: "Jewelry Extraction",
  key: "jewelry-extraction",
  baseName: "Jewelry Extraction",
  description:
    '"Maximizes the chances of extracting Jewelry Crafting ingredients and allows the refining of more powerful Platings from raw materials."',
  icon: "/esoui/art/icons/passive_jewelryextraction.dds",
  esoSkillId: 103645,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 0,
  rank: 3,
  skillLineId: "craft-jewelry-crafting",
  skillType: "passive",
  subcategoryId: "craft-jewelry-crafting",
} as const satisfies TemperSkill
