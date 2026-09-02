import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountExplorationPublicDungeons = {
  id: "01a06168-724c-7001-bdd8-2291e71a23a3",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-exploration-public-dungeons",
  title: "Public Dungeons",
  category: "account",
  displayOrder: 9,
  parent: "account-exploration",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
