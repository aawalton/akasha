import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountElsweyrExploration = {
  id: "01a06168-724f-7007-afab-82e51426b98c",
  type: "page-type/temper-achievement-category",
  slug: "account-elsweyr-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-elsweyr",
  achievements: "jsonl",
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.095Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
