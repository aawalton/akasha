import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountTrialsCloudrest = {
  id: "01a06168-724a-7014-9d11-75bc2fcc5192",
  type: "page-type/temper-achievement-category",
  slug: "account-trials-cloudrest",
  title: "Cloudrest",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-trials",
  achievements: "jsonl",
  activity: "temper-activity-category/trials",
  createdAt: "2026-09-02T09:17:10.090Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
