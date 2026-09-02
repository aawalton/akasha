import type { TemperQuality } from "../temper-quality.page-type.ts"

export const noQuality = {
  id: "01a05fd5-2054-774f-a1b5-0db2c8acd81d",
  pageTypeSlug: "temper-quality",
  slug: "no-quality",
  title: "No Quality",
  key: "no-quality",
  displayOrder: 0,
  available: true,
} as const satisfies TemperQuality
