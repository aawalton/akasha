import type { fitnessEquipmentCovers } from "akasha/alan/values/health/fitness/equipment/properties/fitness-equipment-covers.select-property.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"

export type FitnessEquipmentCovers = List<(typeof fitnessEquipmentCovers.values)[number]>
