import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsBlessedCrucible = {
  id: "01a06168-7248-7006-9d72-95777c5a3b50",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-blessed-crucible",
  title: "Blessed Crucible",
  category: "account",
  displayOrder: 5,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
