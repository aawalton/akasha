import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountNecromQuests = {
  id: "01a06168-724e-7005-9cba-591362b0dfae",
  type: "page-type/temper-achievement-category",
  slug: "account-necrom-quests",
  title: "Quests",
  category: "account",
  displayOrder: 6,
  parent: "temper-achievement-category/account-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
