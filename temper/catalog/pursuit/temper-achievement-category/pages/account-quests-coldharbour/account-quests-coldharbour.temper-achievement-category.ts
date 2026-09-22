import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountQuestsColdharbour = {
  id: "01a06168-724c-7008-9356-695edfd578de",
  type: "page-type/temper-achievement-category",
  slug: "account-quests-coldharbour",
  title: "Coldharbour",
  category: "account",
  displayOrder: 5,
  parent: "temper-achievement-category/account-quests",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
