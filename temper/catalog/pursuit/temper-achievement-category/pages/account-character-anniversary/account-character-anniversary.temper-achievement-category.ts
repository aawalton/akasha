import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCharacterAnniversary = {
  id: "01a06168-7247-7002-b6ab-69dce050c9ac",
  type: "page-type/temper-achievement-category",
  slug: "account-character-anniversary",
  title: "Anniversary",
  category: "account",
  displayOrder: 11,
  parent: "temper-achievement-category/account-character",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.087Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
