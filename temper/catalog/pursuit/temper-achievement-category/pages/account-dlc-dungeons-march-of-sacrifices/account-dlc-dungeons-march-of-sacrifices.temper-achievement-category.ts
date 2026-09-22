import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsMarchOfSacrifices = {
  id: "01a06168-724a-7002-89fb-3c2cd2cd0992",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-march-of-sacrifices",
  title: "March of Sacrifices",
  category: "account",
  displayOrder: 21,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
