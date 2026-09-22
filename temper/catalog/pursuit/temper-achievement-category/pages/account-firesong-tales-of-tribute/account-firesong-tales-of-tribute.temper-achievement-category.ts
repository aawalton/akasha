import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountFiresongTalesOfTribute = {
  id: "01a06168-724f-7018-80a5-42d655ac7651",
  type: "page-type/temper-achievement-category",
  slug: "account-firesong-tales-of-tribute",
  title: "Tales of Tribute",
  category: "account",
  displayOrder: 5,
  parent: "temper-achievement-category/account-firesong",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
