import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDungeonsBlessedCrucible = {
  id: "01a06168-7248-7006-9d72-95777c5a3b50",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dungeons-blessed-crucible",
  title: "Blessed Crucible",
  category: "account",
  displayOrder: 5,
  parent: "account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
