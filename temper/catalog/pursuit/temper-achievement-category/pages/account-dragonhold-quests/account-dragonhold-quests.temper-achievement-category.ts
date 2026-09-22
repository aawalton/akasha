import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDragonholdQuests = {
  id: "01a06168-7250-7010-b200-9b417e1e847f",
  type: "page-type/temper-achievement-category",
  slug: "account-dragonhold-quests",
  title: "Quests",
  category: "account",
  displayOrder: 3,
  parent: "temper-achievement-category/account-dragonhold",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
