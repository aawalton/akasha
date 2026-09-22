import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountTrialsLucentCitadel = {
  id: "01a06168-724b-7002-a724-516e95edac65",
  type: "page-type/temper-achievement-category",
  slug: "account-trials-lucent-citadel",
  title: "Lucent Citadel",
  category: "account",
  displayOrder: 8,
  parent: "temper-achievement-category/account-trials",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
