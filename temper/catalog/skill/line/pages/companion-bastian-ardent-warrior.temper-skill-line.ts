import type { TemperSkillLine } from "akasha/temper/catalog/skill/line/temper-skill-line.page-type.types.ts"

export const companionBastianArdentWarrior = {
  id: "019e61dc-f1f8-73d6-b103-dae1ac68511a",
  type: "page-type/temper-skill-line",
  slug: "companion-bastian-ardent-warrior",
  title: "Ardent Warrior",
  key: "companion-bastian-ardent-warrior",
  displayOrder: 75,
  esoSkillLineId: 174,
  maxRank: 20,
  category: "temper-skill-line-category/companion",
} as const satisfies TemperSkillLine
