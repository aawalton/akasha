import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountTrialsAsylumSanctorium = {
  id: "01a06168-724a-7013-97a1-401febac7a4d",
  type: "page-type/temper-achievement-category",
  slug: "account-trials-asylum-sanctorium",
  title: "Asylum Sanctorium",
  category: "account",
  displayOrder: 2,
  parent: "temper-achievement-category/account-trials",
  achievements: "jsonl",
  activity: "temper-activity-category/trials",
  createdAt: "2026-09-02T09:17:10.090Z",
  updatedAt: "2026-09-27T03:05:59.000Z",
} as const satisfies TemperAchievementCategory
