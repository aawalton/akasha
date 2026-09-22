import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCharacterSkillStyling = {
  id: "01a06168-7247-7003-97b9-6570628b1e02",
  type: "page-type/temper-achievement-category",
  slug: "account-character-skill-styling",
  title: "Skill Styling",
  category: "account",
  displayOrder: 12,
  parent: "temper-achievement-category/account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
