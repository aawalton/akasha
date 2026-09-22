import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountGreymoorPrologue = {
  id: "01a06168-724f-7001-a93d-b08db532939d",
  type: "page-type/temper-achievement-category",
  slug: "account-greymoor-prologue",
  title: "Prologue",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-greymoor",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
