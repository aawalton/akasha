import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsDirefrostKeep = {
  id: "01a06168-7248-700d-8398-79689877703e",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-direfrost-keep",
  title: "Direfrost Keep",
  category: "account",
  displayOrder: 12,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
