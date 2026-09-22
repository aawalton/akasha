import type { TemperAchievementCategory } from "akasha/temper/catalog/pursuit/temper-achievement-category/temper-achievement-category.page-type.types.ts"

export const accountDlcDungeonsEarthenRootEnclave = {
  id: "01a06168-7249-700f-be5b-055961e2417d",
  type: "page-type/temper-achievement-category",
  slug: "account-dlc-dungeons-earthen-root-enclave",
  title: "Earthen Root Enclave",
  category: "account",
  displayOrder: 11,
  parent: "temper-achievement-category/account-dlc-dungeons",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
