import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsFungalGrottoIi = {
  id: "01a06168-7248-7011-8eb4-ca0909715819",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-fungal-grotto-ii",
  title: "Fungal Grotto II",
  category: "account",
  displayOrder: 16,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
