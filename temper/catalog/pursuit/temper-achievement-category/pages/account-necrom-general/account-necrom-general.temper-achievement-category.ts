import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountNecromGeneral = {
  id: "01a06168-724d-7019-a7ca-e8253edcea27",
  type: "page-type/temper-achievement-category",
  slug: "account-necrom-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-necrom",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.093Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
