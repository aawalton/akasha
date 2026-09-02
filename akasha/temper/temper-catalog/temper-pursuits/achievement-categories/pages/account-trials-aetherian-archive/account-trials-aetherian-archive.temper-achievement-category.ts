import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountTrialsAetherianArchive = {
  id: "01a06168-724a-7012-b7b7-33f6ab1c5445",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-trials-aetherian-archive",
  title: "Aetherian Archive",
  category: "account",
  displayOrder: 1,
  parent: "account-trials",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
