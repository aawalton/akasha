import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountCharacterSkillStyling = {
  id: "01a06168-7247-7003-97b9-6570628b1e02",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-character-skill-styling",
  title: "Skill Styling",
  category: "account",
  displayOrder: 12,
  parent: "account-character",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
