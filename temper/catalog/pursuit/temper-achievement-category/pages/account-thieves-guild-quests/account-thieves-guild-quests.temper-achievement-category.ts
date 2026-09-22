import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountThievesGuildQuests = {
  id: "01a06168-7251-7004-b16c-59e539e0e754",
  type: "page-type/temper-achievement-category",
  slug: "account-thieves-guild-quests",
  title: "Quests",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-thieves-guild",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
