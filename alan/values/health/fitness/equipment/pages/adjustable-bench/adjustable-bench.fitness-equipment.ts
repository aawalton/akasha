import type { FitnessEquipment } from "akasha/alan/values/health/fitness/equipment/fitness-equipment.page-type.types.ts"

export const adjustableBench = {
  id: "019f01e1-b22e-7858-a88e-87c274072184",
  type: "fitness-equipment",
  slug: "adjustable-bench",
  title: "Adjustable Bench",
  category: "bench",
  configuration: "adjustable",
  available: true,
  notes: "Flat + incline.",
  sortOrder: 3,
} as const satisfies FitnessEquipment
