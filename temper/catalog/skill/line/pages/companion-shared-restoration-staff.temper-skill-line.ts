import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const companionSharedRestorationStaff = {
  id: "019e61dc-f1ef-78ae-b4b2-f7f858f911e5",
  type: "page-type/temper-skill-line",
  slug: "companion-shared-restoration-staff",
  title: "Restoration Staff",
  key: "companion-shared-restoration-staff",
  displayOrder: 68,
  esoSkillLineId: 185,
  maxRank: 20,
  category: "temper-skill-line-category/companion",
} as const satisfies TemperSkillLine
