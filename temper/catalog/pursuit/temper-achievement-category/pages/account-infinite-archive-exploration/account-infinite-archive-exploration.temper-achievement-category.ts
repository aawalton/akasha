import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountInfiniteArchiveExploration = {
  id: "01a06168-724c-7013-97c1-ad1b0e9956b7",
  type: "page-type/temper-achievement-category",
  slug: "account-infinite-archive-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-infinite-archive",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
