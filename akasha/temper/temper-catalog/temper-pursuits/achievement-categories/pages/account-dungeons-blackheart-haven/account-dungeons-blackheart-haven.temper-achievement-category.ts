import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDungeonsBlackheartHaven = {
  id: "01a06168-7248-7005-a77e-c50341992187",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dungeons-blackheart-haven",
  title: "Blackheart Haven",
  category: "account",
  displayOrder: 4,
  parent: "account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
