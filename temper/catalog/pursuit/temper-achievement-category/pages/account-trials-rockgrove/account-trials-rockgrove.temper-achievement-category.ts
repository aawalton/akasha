import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountTrialsRockgrove = {
  id: "01a06168-724b-7005-864e-b3f25d4cd0f5",
  type: "page-type/temper-achievement-category",
  slug: "account-trials-rockgrove",
  title: "Rockgrove",
  category: "account",
  displayOrder: 11,
  parent: "temper-achievement-category/account-trials",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
