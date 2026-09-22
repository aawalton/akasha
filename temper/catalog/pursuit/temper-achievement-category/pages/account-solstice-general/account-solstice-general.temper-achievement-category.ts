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
} as const satisfies TemperAchievementCategory
