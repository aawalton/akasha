import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCharacterScribing = {
  id: "01a06168-7247-7001-9935-8f541552d1dc",
  type: "page-type/temper-achievement-category",
  slug: "account-character-scribing",
  title: "Scribing",
  category: "account",
  displayOrder: 10,
  parent: "temper-achievement-category/account-character",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.087Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
