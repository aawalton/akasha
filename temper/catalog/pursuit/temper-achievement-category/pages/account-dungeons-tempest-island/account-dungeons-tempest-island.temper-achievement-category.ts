import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDungeonsTempestIsland = {
  id: "01a06168-7248-7015-8da4-dee3ee647a45",
  type: "page-type/temper-achievement-category",
  slug: "account-dungeons-tempest-island",
  title: "Tempest Island",
  category: "account",
  displayOrder: 20,
  parent: "temper-achievement-category/account-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
