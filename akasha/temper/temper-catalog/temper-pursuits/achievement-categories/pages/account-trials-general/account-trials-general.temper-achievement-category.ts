import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountTrialsGeneral = {
  id: "01a06168-724a-7011-a4e2-57de6801c885",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-trials-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-trials",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
