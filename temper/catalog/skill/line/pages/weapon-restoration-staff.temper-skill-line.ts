import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const weaponRestorationStaff = {
  id: "019e61dc-f1c4-70d0-b7a5-75f591906775",
  type: "page-type/temper-skill-line",
  slug: "weapon-restoration-staff",
  title: "Restoration Staff",
  key: "weapon-restoration-staff",
  displayOrder: 27,
  esoSkillLineId: 34,
  maxRank: 50,
  category: "temper-skill-line-category/weapon",
} as const satisfies TemperSkillLine
