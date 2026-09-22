import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountTrialsSanctumOphidia = {
  id: "01a06168-724b-7006-9702-c429626eb28d",
  type: "page-type/temper-achievement-category",
  slug: "account-trials-sanctum-ophidia",
  title: "Sanctum Ophidia",
  category: "account",
  displayOrder: 12,
  parent: "temper-achievement-category/account-trials",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
