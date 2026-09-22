import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCraftingProvisioning = {
  id: "01a06168-7247-700f-b79c-8aa8e6fb7a03",
  type: "page-type/temper-achievement-category",
  slug: "account-crafting-provisioning",
  title: "Provisioning",
  category: "account",
  displayOrder: 6,
  parent: "temper-achievement-category/account-crafting",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
