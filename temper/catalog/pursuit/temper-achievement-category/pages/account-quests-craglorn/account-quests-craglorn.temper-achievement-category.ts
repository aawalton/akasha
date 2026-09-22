import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountQuestsCraglorn = {
  id: "01a06168-724c-7009-b59d-92ef39b25071",
  type: "page-type/temper-achievement-category",
  slug: "account-quests-craglorn",
  title: "Craglorn",
  category: "account",
  displayOrder: 6,
  parent: "temper-achievement-category/account-quests",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
