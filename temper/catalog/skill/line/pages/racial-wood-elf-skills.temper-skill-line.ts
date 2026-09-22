import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const racialWoodElfSkills = {
  id: "019e61dc-f1e0-726f-957a-db363fc2c353",
  type: "page-type/temper-skill-line",
  slug: "racial-wood-elf-skills",
  title: "Wood Elf Skills",
  key: "racial-wood-elf-skills",
  displayOrder: 48,
  esoSkillLineId: 57,
  maxRank: 50,
  category: "temper-skill-line-category/racial",
} as const satisfies TemperSkillLine
