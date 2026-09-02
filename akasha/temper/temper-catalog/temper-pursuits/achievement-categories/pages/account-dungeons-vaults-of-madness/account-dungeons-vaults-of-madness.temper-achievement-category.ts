import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountDungeonsVaultsOfMadness = {
  id: "01a06168-7249-7000-ad80-ababd067538a",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-dungeons-vaults-of-madness",
  title: "Vaults of Madness",
  category: "account",
  displayOrder: 22,
  parent: "account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
