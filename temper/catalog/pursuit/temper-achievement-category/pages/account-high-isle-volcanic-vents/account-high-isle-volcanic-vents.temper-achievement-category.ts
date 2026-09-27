import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountHighIsleVolcanicVents = {
  id: "01a06168-724e-700f-be80-80a48e1c49e0",
  type: "page-type/temper-achievement-category",
  slug: "account-high-isle-volcanic-vents",
  title: "Volcanic Vents",
  category: "account",
  displayOrder: 7,
  parent: "temper-achievement-category/account-high-isle",
  achievements: "jsonl",
  activity: "temper-activity-category/exploration",
} as const satisfies TemperAchievementCategory
