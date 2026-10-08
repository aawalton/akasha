import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountSolsticeGeneral = {
  id: "01a06168-724d-700a-92cf-66d5d7652bc3",
  type: "page-type/temper-achievement-category",
  slug: "account-solstice-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-solstice",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.093Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
