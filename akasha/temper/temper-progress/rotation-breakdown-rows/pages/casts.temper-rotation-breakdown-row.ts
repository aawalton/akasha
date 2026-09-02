import type { TemperRotationBreakdownRow } from "../temper-rotation-breakdown-row.page-type.ts"

export const casts = {
  id: "01a05fc9-c60f-7774-97e6-99ea0baea818",
  pageTypeSlug: "temper-rotation-breakdown-row",
  slug: "casts",
  title: "Casts",
  key: "casts",
  description: "Number of times the skill was used",
  fullName: "Total Casts",
} as const satisfies TemperRotationBreakdownRow
