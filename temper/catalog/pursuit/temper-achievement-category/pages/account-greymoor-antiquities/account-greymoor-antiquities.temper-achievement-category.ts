import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountGreymoorAntiquities = {
  id: "01a06168-724e-7019-9a87-90bca391adf1",
  type: "page-type/temper-achievement-category",
  slug: "account-greymoor-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-greymoor",
  achievements: "jsonl",
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.094Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
