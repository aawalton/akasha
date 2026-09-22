import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountThievesGuildExploration = {
  id: "01a06168-7251-7003-824e-c58d491094bc",
  type: "page-type/temper-achievement-category",
  slug: "account-thieves-guild-exploration",
  title: "Exploration",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-thieves-guild",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
