import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountSolsticeAntiquities = {
  id: "01a06168-724d-700b-b763-1207cc80c52e",
  type: "page-type/temper-achievement-category",
  slug: "account-solstice-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-solstice",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
