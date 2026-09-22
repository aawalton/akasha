import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountInfiniteArchiveGeneral = {
  id: "01a06168-724c-7011-b7a6-a71badcb5107",
  type: "page-type/temper-achievement-category",
  slug: "account-infinite-archive-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-infinite-archive",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
