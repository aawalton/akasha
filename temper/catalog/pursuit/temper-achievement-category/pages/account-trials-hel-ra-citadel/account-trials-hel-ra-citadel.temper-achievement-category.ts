import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountTrialsHelRaCitadel = {
  id: "01a06168-724b-7000-b210-312f77c7dc68",
  type: "page-type/temper-achievement-category",
  slug: "account-trials-hel-ra-citadel",
  title: "Hel Ra Citadel",
  category: "account",
  displayOrder: 6,
  parent: "temper-achievement-category/account-trials",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
