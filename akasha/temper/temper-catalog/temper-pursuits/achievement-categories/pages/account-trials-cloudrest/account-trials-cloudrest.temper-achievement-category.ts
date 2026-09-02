import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountTrialsCloudrest = {
  id: "01a06168-724a-7014-9d11-75bc2fcc5192",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-trials-cloudrest",
  title: "Cloudrest",
  category: "account",
  displayOrder: 3,
  parent: "account-trials",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
