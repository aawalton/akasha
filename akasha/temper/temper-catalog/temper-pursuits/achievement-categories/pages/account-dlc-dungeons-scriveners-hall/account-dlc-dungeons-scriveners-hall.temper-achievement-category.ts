import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsScrivenersHall = {
  id: "01a06168-724a-700a-a5c5-54552fa7a3bd",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-scriveners-hall",
  title: "Scrivener's Hall",
  category: "account",
  displayOrder: 29,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
