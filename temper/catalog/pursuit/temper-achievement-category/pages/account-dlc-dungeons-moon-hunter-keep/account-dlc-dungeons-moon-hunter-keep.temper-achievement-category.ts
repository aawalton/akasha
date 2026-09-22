import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsMoonHunterKeep = {
  id: "01a06168-724a-7003-93fa-fcade27bd3dc",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-moon-hunter-keep",
  title: "Moon Hunter Keep",
  category: "account",
  displayOrder: 22,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
