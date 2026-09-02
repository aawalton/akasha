import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountFiresongGeneral = {
  id: "01a06168-724f-7013-9657-edad3a07a256",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-firesong-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "account-firesong",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
