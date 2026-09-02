import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsBalSunnar = {
  id: "01a06168-7249-7005-8b32-089db9b1e536",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-bal-sunnar",
  title: "Bal Sunnar",
  category: "account",
  displayOrder: 1,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
