import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsFungalGrottoI = {
  id: "01a06168-7248-7010-a29f-e6248795ccfa",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-fungal-grotto-i",
  title: "Fungal Grotto I",
  category: "account",
  displayOrder: 15,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
