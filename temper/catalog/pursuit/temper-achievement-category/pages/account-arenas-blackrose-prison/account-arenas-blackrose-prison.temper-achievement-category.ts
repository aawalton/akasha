import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountArenasBlackrosePrison = {
  id: "01a06168-724b-700a-ae92-6b05cb38eab0",
  type: "page-type/temper-achievement-category",
  slug: "account-arenas-blackrose-prison",
  title: "Blackrose Prison",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-arenas",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
