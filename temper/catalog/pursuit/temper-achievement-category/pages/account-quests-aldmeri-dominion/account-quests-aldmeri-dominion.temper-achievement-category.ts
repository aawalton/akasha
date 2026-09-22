import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountQuestsAldmeriDominion = {
  id: "01a06168-724c-7005-b984-829e8df5469d",
  type: "page-type/temper-achievement-category",
  slug: "account-quests-aldmeri-dominion",
  title: "Aldmeri Dominion",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-quests",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
