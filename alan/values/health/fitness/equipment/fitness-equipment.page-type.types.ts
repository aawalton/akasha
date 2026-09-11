import type { EquipmentAvailable } from "akasha/alan/values/health/fitness/equipment/properties/equipment-available.boolean-property.types.ts"
import type { EquipmentCategory } from "akasha/alan/values/health/fitness/equipment/properties/equipment-category.select-property.types.ts"
import type { EquipmentConfiguration } from "akasha/alan/values/health/fitness/equipment/properties/equipment-configuration.select-property.types.ts"
import type { EquipmentLoads } from "akasha/alan/values/health/fitness/equipment/properties/equipment-loads.number-property.types.ts"
import type { EquipmentNotes } from "akasha/alan/values/health/fitness/equipment/properties/equipment-notes.text-property.types.ts"
import type { EquipmentSortOrder } from "akasha/alan/values/health/fitness/equipment/properties/equipment-sort-order.number-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type FitnessEquipment = Page & {
  title: Title
  category: EquipmentCategory
  configuration: EquipmentConfiguration
  available: EquipmentAvailable
  loads?: EquipmentLoads
  notes?: EquipmentNotes
  sortOrder?: EquipmentSortOrder
}
