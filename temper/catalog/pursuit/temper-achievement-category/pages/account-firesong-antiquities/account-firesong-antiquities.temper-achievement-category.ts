import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountFiresongAntiquities = {
  id: "01a06168-724f-7017-a2be-6c2edbd5b083",
  type: "page-type/temper-achievement-category",
  slug: "account-firesong-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 4,
  parent: "temper-achievement-category/account-firesong",
  achievements: "jsonl",
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.095Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
