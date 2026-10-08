import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsVaultsOfMadness = {
  id: "01a06168-7249-7000-ad80-ababd067538a",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-vaults-of-madness",
  title: "Vaults of Madness",
  category: "account",
  displayOrder: 22,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.089Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
