import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountNecromTalesOfTribute = {
  id: "01a06168-724e-7000-8efc-a42483129242",
  type: "page-type/temper-achievement-category",
  slug: "account-necrom-tales-of-tribute",
  title: "Tales of Tribute",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-necrom",
  achievements: "jsonl",
  activity: "temper-activity-category/other",
  createdAt: "2026-09-02T09:17:10.094Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
