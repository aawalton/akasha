import type { TemperAchievementCategory } from "../../temper-achievement-category.page-type.ts"

export const accountNecromPrologue = {
  id: "01a06168-724e-7004-8af4-b0939930073e",
  pageTypeSlug: "temper-achievement-category",
  slug: "account-necrom-prologue",
  title: "Prologue",
  category: "account",
  displayOrder: 5,
  parent: "account-necrom",
  achievements: "jsonl",
} as const satisfies TemperAchievementCategory
