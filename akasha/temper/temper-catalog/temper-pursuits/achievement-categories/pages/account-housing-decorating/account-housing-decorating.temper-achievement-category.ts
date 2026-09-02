import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountHousingDecorating = {
  id: "01a06168-724d-7001-b058-dfb3487a2e81",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-housing-decorating",
  title: "Decorating",
  category: "account",
  displayOrder: 2,
  parent: "account-housing",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
