import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDarkBrotherhoodQuests = {
  id: "01a06168-7251-7000-8800-b2f3f41ab23f",
  type: "page-type/temper-achievement-category",
  slug: "account-dark-brotherhood-quests",
  title: "Quests",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-dark-brotherhood",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
