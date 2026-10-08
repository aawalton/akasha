import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountCharacterGuilds = {
  id: "01a06168-7246-7007-bc5c-b79e97d847af",
  type: "page-type/temper-achievement-category",
  slug: "account-character-guilds",
  title: "Guilds",
  category: "account",
  displayOrder: 1,
  parent: "temper-achievement-category/account-character",
  achievements: "jsonl",
  activity: "temper-activity-category/characters",
  createdAt: "2026-09-02T09:17:10.086Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
