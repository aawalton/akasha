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
} as const satisfies TemperAchievementCategory
