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
} as const satisfies TemperAchievementCategory
