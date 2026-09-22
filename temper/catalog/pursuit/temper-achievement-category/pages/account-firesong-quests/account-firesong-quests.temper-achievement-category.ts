import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountFiresongQuests = {
  id: "01a06168-724f-7015-b358-7bc2b6f02fce",
  type: "page-type/temper-achievement-category",
  slug: "account-firesong-quests",
  title: "Quests",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-firesong",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
