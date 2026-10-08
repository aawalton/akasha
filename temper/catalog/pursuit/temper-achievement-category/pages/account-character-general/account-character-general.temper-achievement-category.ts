import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCharacterGeneral = {
  id: "01a06168-7246-7006-99f7-c8d2dedd9b78",
  type: "page-type/temper-achievement-category",
  slug: "account-character-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-character",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.086Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
