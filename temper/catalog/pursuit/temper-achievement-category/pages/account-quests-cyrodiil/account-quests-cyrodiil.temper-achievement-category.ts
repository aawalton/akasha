import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountQuestsCyrodiil = {
  id: "01a06168-724c-700a-8be1-bb66f28868d0",
  type: "page-type/temper-achievement-category",
  slug: "account-quests-cyrodiil",
  title: "Cyrodiil",
  category: "account",
  displayOrder: 7,
  parent: "temper-achievement-category/account-quests",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
