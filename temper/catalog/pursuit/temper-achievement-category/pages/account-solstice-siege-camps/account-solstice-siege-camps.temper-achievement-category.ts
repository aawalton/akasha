import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountSolsticeSiegeCamps = {
  id: "01a06168-724d-700f-ba08-526d1c26529e",
  type: "page-type/temper-achievement-category",
  slug: "account-solstice-siege-camps",
  title: "Siege Camps",
  category: "account",
  displayOrder: 5,
  parent: "temper-achievement-category/account-solstice",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
