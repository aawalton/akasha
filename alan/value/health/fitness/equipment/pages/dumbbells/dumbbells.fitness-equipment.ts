import type { FitnessEquipment } from "akasha/alan/value/health/fitness/equipment/fitness-equipment.page-type.types.ts"

export const dumbbells = {
  id: "019f01e1-b0dc-72f8-9040-f0924d81a528",
  type: "page-type/fitness-equipment",
  slug: "dumbbells",
  title: "Dumbbells",
  category: "dumbbells",
  configuration: "pair",
  available: true,
  loads: [3, 5, 8, 10, 15, 20, 25, 30],
  notes: "Standard + light DB pairs, one continuous ladder.",
  sortOrder: 1,
  covers: ["strength-exercise-implement/dumbbell"],
  createdAt: "2026-06-26T03:03:15.932Z",
  updatedAt: "2026-09-15T16:58:20.000Z",
} as const satisfies FitnessEquipment
