import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountSolsticeAntiquities = {
  id: "01a06168-724d-700b-b763-1207cc80c52e",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-solstice-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 1,
  parent: "account-solstice",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
