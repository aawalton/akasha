import type { TemperQuality } from "akasha/temper/catalog/gear/temper-quality/temper-quality.page-type.types.ts"

export const noQuality = {
  id: "019e2fc4-de0e-7488-a429-384e5d0630eb",
  type: "page-type/temper-quality",
  slug: "no-quality",
  title: "No Quality",
  key: "no-quality",
  displayOrder: 0,
  available: true,
  hashPlace: 0,
  esoDisplayQuality: 0,
  gameName: "Trash",
  createdAt: "2026-05-16T07:51:31.598Z",
  updatedAt: "2026-09-27T04:11:30.000Z",
} as const satisfies TemperQuality
