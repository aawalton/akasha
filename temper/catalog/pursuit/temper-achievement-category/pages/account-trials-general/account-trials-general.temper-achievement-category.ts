import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountTrialsGeneral = {
  id: "01a06168-724a-7011-a4e2-57de6801c885",
  type: "page-type/temper-achievement-category",
  slug: "account-trials-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-trials",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
