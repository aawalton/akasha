import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountMarkarthPrologue = {
  id: "01a06168-7250-7009-9016-48103bc639c3",
  type: "page-type/temper-achievement-category",
  slug: "account-markarth-prologue",
  title: "Prologue",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-markarth",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
