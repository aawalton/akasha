import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountHousingProperty = {
  id: "01a06168-724d-7000-996c-5b34d3c8431a",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-housing-property",
  title: "Property",
  category: "account",
  displayOrder: 1,
  parent: "account-housing",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
