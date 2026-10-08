import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCharacter = {
  id: "01a06168-7246-7005-bf35-d1e3371af7c2",
  type: "page-type/temper-achievement-category",
  slug: "account-character",
  title: "Character",
  category: "account",
  displayOrder: 1,
  activity: "temper-activity-category/characters",
  createdAt: "2026-09-02T09:17:10.086Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
