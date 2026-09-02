import type { TemperQuality } from "../temper-quality.page-type.ts"

export const normal = {
  id: "01a05fd5-2054-7b36-915b-a18091332ee9",
  pageTypeSlug: "temper-quality",
  slug: "normal",
  title: "Normal",
  key: "normal",
  displayOrder: 1,
  available: true,
} as const satisfies TemperQuality
