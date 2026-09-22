import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountPlayerVsPlayerAllianceWar = {
  id: "01a06168-7247-7006-8f49-a0e47afa52f3",
  type: "page-type/temper-achievement-category",
  slug: "account-player-vs-player-alliance-war",
  title: "Alliance War",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-player-vs-player",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
