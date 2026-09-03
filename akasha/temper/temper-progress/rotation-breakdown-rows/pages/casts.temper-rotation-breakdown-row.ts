import type { TemperRotationBreakdownRow } from "../temper-rotation-breakdown-row.page-type.ts"

export const casts = {
  id: "019e5d79-3e5a-75c8-be5d-d7cf27860199",
  pageTypeSlug: "temper-rotation-breakdown-row",
  slug: "casts",
  title: "Casts",
  key: "casts",
  description: "Number of times the skill was used",
  fullName: "Total Casts",
} as const satisfies TemperRotationBreakdownRow
