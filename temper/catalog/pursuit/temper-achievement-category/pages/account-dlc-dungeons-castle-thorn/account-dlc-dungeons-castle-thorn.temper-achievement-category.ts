import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsCastleThorn = {
  id: "01a06168-7249-700a-9291-9d8bad2ab303",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-castle-thorn",
  title: "Castle Thorn",
  category: "account",
  displayOrder: 6,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
