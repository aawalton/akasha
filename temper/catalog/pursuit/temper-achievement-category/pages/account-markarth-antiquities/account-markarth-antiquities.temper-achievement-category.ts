import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountMarkarthAntiquities = {
  id: "01a06168-7250-700b-9365-8b6c4fbeb2ad",
  type: "page-type/temper-achievement-category",
  slug: "account-markarth-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 4,
  parent: "temper-achievement-category/account-markarth",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
