import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountFiresongPrologue = {
  id: "01a06168-724f-7014-9fb9-3b91ac243488",
  type: "page-type/temper-achievement-category",
  slug: "account-firesong-prologue",
  title: "Prologue",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-firesong",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
