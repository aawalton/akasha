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
  activity: "temper-activity-category/exploration",
  createdAt: "2026-09-02T09:17:10.097Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
