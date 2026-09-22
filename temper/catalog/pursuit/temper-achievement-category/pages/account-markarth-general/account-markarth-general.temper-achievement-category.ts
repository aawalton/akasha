import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountMarkarthGeneral = {
  id: "01a06168-7250-7007-8338-94c894e53967",
  type: "page-type/temper-achievement-category",
  slug: "account-markarth-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-markarth",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
