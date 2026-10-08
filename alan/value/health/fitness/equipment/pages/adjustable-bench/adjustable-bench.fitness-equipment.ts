import type { FitnessEquipment } from "akasha/alan/value/health/fitness/equipment/fitness-equipment.page-type.types.ts"

export const adjustableBench = {
  id: "019f01e1-b22e-7858-a88e-87c274072184",
  type: "page-type/fitness-equipment",
  slug: "adjustable-bench",
  title: "Adjustable Bench",
  category: "bench",
  configuration: "adjustable",
  available: true,
  notes: "Flat + incline.",
  sortOrder: 3,
  createdAt: "2026-06-26T03:03:16.270Z",
  updatedAt: "2026-09-15T16:58:20.000Z",
} as const satisfies FitnessEquipment
