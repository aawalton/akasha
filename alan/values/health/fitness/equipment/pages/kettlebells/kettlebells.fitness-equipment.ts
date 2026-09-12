import type { FitnessEquipment } from "akasha/alan/values/health/fitness/equipment/fitness-equipment.page-type.types.ts"

export const kettlebells = {
  id: "019f01e1-b168-7b90-ad55-91681ce407a8",
  type: "fitness-equipment",
  slug: "kettlebells",
  title: "Kettlebells",
  category: "kettlebells",
  configuration: "single",
  available: true,
  loads: [5, 10, 15],
  notes: "Single bells.",
  sortOrder: 2,
  covers: ["kettlebells"],
} as const satisfies FitnessEquipment
