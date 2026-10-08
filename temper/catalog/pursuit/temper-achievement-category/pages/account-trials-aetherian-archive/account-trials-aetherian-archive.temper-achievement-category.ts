import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountTrialsAetherianArchive = {
  id: "01a06168-724a-7012-b7b7-33f6ab1c5445",
  type: "page-type/temper-achievement-category",
  slug: "account-trials-aetherian-archive",
  title: "Aetherian Archive",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-trials",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.090Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
