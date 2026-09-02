import type { TemperRotationBreakdownRow } from "../temper-rotation-breakdown-row.page-type.ts"

export const damage = {
  id: "01a05fc9-c60f-7147-a2d9-fb9e6e35a039",
  pageTypeSlug: "temper-rotation-breakdown-row",
  slug: "damage",
  title: "Damage",
  key: "damage",
  description: "Total damage dealt over the rotation",
  fullName: "Total Damage",
} as const satisfies TemperRotationBreakdownRow
