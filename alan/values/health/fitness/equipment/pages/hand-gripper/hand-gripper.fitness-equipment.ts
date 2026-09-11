import type { FitnessEquipment } from "akasha/alan/values/health/fitness/equipment/fitness-equipment.page-type.types.ts"

export const handGripper = {
  id: "019f0aaa-882e-7851-b3e2-c733095ecb9c",
  type: "fitness-equipment",
  slug: "hand-gripper",
  title: "Hand Gripper",
  category: "other",
  configuration: "adjustable",
  available: true,
  notes:
    "Adjustable resistance gripper, range 10-132 lb. Crush/forearm grip. Watch joint-swelling response (repetitive hand work).",
} as const satisfies FitnessEquipment
