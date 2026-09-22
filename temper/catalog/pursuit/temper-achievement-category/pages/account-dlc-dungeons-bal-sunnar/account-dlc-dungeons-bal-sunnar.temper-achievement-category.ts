import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsBalSunnar = {
  id: "01a06168-7249-7005-8b32-089db9b1e536",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-bal-sunnar",
  title: "Bal Sunnar",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
