import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountElsweyrExploration = {
  id: "01a06168-724f-7007-afab-82e51426b98c",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-elsweyr-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 2,
  parent: "account-elsweyr",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
