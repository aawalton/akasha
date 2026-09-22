import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const craftProvisioning = {
  id: "019e61dc-f1e6-7d79-809f-77cf5bd63d34",
  type: "page-type/temper-skill-line",
  slug: "craft-provisioning",
  title: "Provisioning",
  key: "craft-provisioning",
  displayOrder: 61,
  esoSkillLineId: 76,
  maxRank: 50,
  category: "temper-skill-line-category/craft",
} as const satisfies TemperSkillLine
