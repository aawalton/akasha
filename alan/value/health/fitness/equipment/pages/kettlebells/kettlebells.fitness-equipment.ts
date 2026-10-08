import type { FitnessEquipment } from "akasha/alan/value/health/fitness/equipment/fitness-equipment.page-type.types.ts"

export const kettlebells = {
  id: "019f01e1-b168-7b90-ad55-91681ce407a8",
  type: "page-type/fitness-equipment",
  slug: "kettlebells",
  title: "Kettlebells",
  category: "kettlebells",
  configuration: "single",
  available: true,
  loads: [5, 10, 15],
  notes: "Single bells.",
  sortOrder: 2,
  covers: ["strength-exercise-implement/kettlebells"],
  createdAt: "2026-06-26T03:03:16.072Z",
  updatedAt: "2026-09-15T16:58:20.000Z",
} as const satisfies FitnessEquipment
