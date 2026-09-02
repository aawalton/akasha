import type { TemperSkillType } from "../temper-skill-type.page-type.ts"

export const active = {
  id: "01a05fce-298e-7da6-9934-9df731a79a0b",
  pageTypeSlug: "temper-skill-type",
  slug: "active",
  title: "Active",
  key: "active",
  description: "Regular ability with cooldown or resource cost",
} as const satisfies TemperSkillType
