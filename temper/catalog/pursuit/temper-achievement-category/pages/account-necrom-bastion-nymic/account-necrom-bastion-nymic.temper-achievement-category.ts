import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountNecromBastionNymic = {
  id: "01a06168-724e-7006-966e-91308e647985",
  type: "page-type/temper-achievement-category",
  slug: "account-necrom-bastion-nymic",
  title: "Bastion Nymic",
  category: "account",
  displayOrder: 7,
  parent: "temper-achievement-category/account-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
