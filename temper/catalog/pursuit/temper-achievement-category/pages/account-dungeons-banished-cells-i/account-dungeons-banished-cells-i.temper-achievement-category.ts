import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsBanishedCellsI = {
  id: "01a06168-7248-7003-b3ac-41695039d698",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-banished-cells-i",
  title: "Banished Cells I",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
