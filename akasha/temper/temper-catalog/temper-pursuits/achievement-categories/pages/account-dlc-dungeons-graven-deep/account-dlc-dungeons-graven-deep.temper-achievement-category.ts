import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDlcDungeonsGravenDeep = {
  id: "01a06168-7249-7014-a181-c071c8b4eaaa",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dlc-dungeons-graven-deep",
  title: "Graven Deep",
  category: "account",
  displayOrder: 16,
  parent: "account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
