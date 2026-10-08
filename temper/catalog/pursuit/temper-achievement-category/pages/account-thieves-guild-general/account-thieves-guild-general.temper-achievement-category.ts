import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountThievesGuildGeneral = {
  id: "01a06168-7251-7002-a2e7-6a171cea1827",
  type: "page-type/temper-achievement-category",
  slug: "account-thieves-guild-general",
  title: "General",
  category: "account",
  displayOrder: 0,
  parent: "temper-achievement-category/account-thieves-guild",
  achievements: "jsonl",
  createdAt: "2026-09-02T09:17:10.097Z",
  updatedAt: "2026-09-22T20:48:07.000Z",
} as const satisfies TemperAchievementCategory
