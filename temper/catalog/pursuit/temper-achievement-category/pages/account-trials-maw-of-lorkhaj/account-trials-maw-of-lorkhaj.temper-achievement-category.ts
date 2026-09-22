import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountTrialsMawOfLorkhaj = {
  id: "01a06168-724b-7003-afa8-3fcca64bc288",
  type: "page-type/temper-achievement-category",
  slug: "account-trials-maw-of-lorkhaj",
  title: "Maw of Lorkhaj",
  category: "account",
  displayOrder: 9,
  parent: "temper-achievement-category/account-trials",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
