import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsCastleThorn = {
  id: "01a06168-7249-700a-9291-9d8bad2ab303",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-castle-thorn",
  title: "Castle Thorn",
  category: "account",
  displayOrder: 6,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
