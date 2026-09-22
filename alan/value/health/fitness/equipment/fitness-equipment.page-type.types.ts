import type { FitnessEquipmentAvailable } from "akasha/alan/value/health/fitness/equipment/properties/fitness-equipment-available.boolean-property.types.ts"
import type { FitnessEquipmentCategory } from "akasha/alan/value/health/fitness/equipment/properties/fitness-equipment-category.select-property.types.ts"
import type { FitnessEquipmentConfiguration } from "akasha/alan/value/health/fitness/equipment/properties/fitness-equipment-configuration.select-property.types.ts"
import type { FitnessEquipmentCovers } from "akasha/alan/value/health/fitness/equipment/properties/fitness-equipment-covers.multi-relation-property.types.ts"
import type { FitnessEquipmentLoads } from "akasha/alan/value/health/fitness/equipment/properties/fitness-equipment-loads.number-property.types.ts"
import type { FitnessEquipmentNotes } from "akasha/alan/value/health/fitness/equipment/properties/fitness-equipment-notes.text-property.types.ts"
import type { FitnessEquipmentSortOrder } from "akasha/alan/value/health/fitness/equipment/properties/fitness-equipment-sort-order.number-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type FitnessEquipment = Page & {
  title: Title
  category: FitnessEquipmentCategory
  configuration: FitnessEquipmentConfiguration
  available: FitnessEquipmentAvailable
  loads?: FitnessEquipmentLoads
  notes?: FitnessEquipmentNotes
  sortOrder?: FitnessEquipmentSortOrder
  covers?: FitnessEquipmentCovers
}
