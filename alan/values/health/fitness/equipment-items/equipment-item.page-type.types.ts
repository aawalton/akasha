import type { Page } from "../../../../../pages/page.page-type.types.ts"
import type { Title } from "../../../../../pages/properties/title.text-property.ts"
import type { EquipmentAvailable } from "./properties/equipment-available.boolean-property.ts"
import type { EquipmentCategory } from "./properties/equipment-category.select-property.ts"
import type { EquipmentConfiguration } from "./properties/equipment-configuration.select-property.ts"
import type { EquipmentLoads } from "./properties/equipment-loads.number-property.ts"
import type { EquipmentNotes } from "./properties/equipment-notes.text-property.ts"
import type { EquipmentSortOrder } from "./properties/equipment-sort-order.number-property.ts"

export type EquipmentItem = Page & {
  title: Title
  category: EquipmentCategory
  configuration: EquipmentConfiguration
  available: EquipmentAvailable
  loads?: EquipmentLoads
  notes?: EquipmentNotes
  sortOrder?: EquipmentSortOrder
}
