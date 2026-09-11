import type { FitnessEquipment } from "akasha/alan/values/health/fitness/equipment/fitness-equipment.page-type.types.ts"

export const weightedVest = {
  id: "019f01e1-b319-7702-9a89-953151f9dbf5",
  type: "fitness-equipment",
  slug: "weighted-vest",
  title: "Weighted Vest",
  category: "vest",
  configuration: "n-a",
  available: false,
  notes:
    "Proposed purchase (discretionary income) — unlocks hands-free leg loading (squats/lunges/step-ups/Bulgarians) without arm-capping. Not owned yet.",
  sortOrder: 4,
} as const satisfies FitnessEquipment
