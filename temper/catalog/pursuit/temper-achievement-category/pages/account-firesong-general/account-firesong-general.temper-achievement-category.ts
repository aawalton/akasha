import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountFiresongGeneral = {
  id: "01a06168-724f-7013-9657-edad3a07a256",
  type: "page-type/temper-achievement-category",
  slug: "account-firesong-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-firesong",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
