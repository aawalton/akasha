import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsBanishedCellsIi = {
  id: "01a06168-7248-7004-9765-0f746327face",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-banished-cells-ii",
  title: "Banished Cells II",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
