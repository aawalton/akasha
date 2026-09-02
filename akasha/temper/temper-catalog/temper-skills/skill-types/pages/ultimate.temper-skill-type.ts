import type { TemperSkillType } from "../temper-skill-type.page-type.ts"

export const ultimate = {
  id: "01a05fce-298e-756b-ae52-2c2dd206e5cc",
  pageTypeSlug: "temper-skill-type",
  slug: "ultimate",
  title: "Ultimate",
  key: "ultimate",
  description: "High-cost ability that requires Ultimate resource",
} as const satisfies TemperSkillType
