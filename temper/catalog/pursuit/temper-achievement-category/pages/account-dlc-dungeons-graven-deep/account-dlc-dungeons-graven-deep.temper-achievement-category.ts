import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsGravenDeep = {
  id: "01a06168-7249-7014-a181-c071c8b4eaaa",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-graven-deep",
  title: "Graven Deep",
  category: "account",
  displayOrder: 16,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
