import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountElsweyrGeneral = {
  id: "01a06168-724f-7005-b23d-265beba49132",
  type: "page-type/temper-achievement-category",
  slug: "account-elsweyr-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-elsweyr",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.095Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
