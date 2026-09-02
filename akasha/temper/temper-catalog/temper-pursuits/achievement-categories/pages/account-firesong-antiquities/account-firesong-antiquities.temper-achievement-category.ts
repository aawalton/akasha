import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountFiresongAntiquities = {
  id: "01a06168-724f-7017-a2be-6c2edbd5b083",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-firesong-antiquities",
  title: "Antiquities",
  category: "account",
  displayOrder: 4,
  parent: "account-firesong",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
