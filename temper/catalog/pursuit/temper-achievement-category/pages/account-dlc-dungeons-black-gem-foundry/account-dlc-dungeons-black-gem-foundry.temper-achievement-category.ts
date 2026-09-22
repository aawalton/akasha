import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsBlackGemFoundry = {
  id: "01a06168-7249-7008-957f-36bf4f6bdb5e",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-black-gem-foundry",
  title: "Black Gem Foundry",
  category: "account",
  displayOrder: 4,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
